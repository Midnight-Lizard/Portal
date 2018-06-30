import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import * as crypto from 'crypto';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
const bodyParser = require('body-parser');
import { STATIC_ROUTES } from './static.paths';
import * as auth from './auth';

import * as session from 'express-session';
import { Settings, defaultSettings, AuthConstants, User } from './dist/core';
const MemoryStore = require('memorystore')(session);


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const settings: Settings = { ...defaultSettings };
Object.keys(settings)
    .filter(set => set in process.env)
    .forEach((set: keyof Settings) => settings[set] = process.env[set]!);
const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');
// NOTE: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/portal-server/main');
const H24 = 86400000;

auth.initAuth(settings).then(() =>
{
    // Express server
    const app = express();
    app.use(compression());
    app.use(cookieparser());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(session({
        name: 'node.sid',
        rolling: true,
        store: new MemoryStore({
            checkPeriod: H24 // prune expired entries every 24h
        }),
        secret: process.env.PORTAL_SESSION_SECRET || 'secret'
    }));

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    app.engine('html', ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    }));

    app.set('view engine', 'html');
    app.set('views', join(DIST_FOLDER, 'portal-browser'));

    // Kubernetes liveness and readiness probe
    app.get([
        '/status/isready',
        '/status/isalive'
    ], (req, res) => res.status(200).send('OK'));

    // static files
    app.get('*.*', express.static(join(DIST_FOLDER, 'portal-browser'), {
        maxAge: '1y'
    }));
    // prerendered routes
    app.get(STATIC_ROUTES, express.static(join(DIST_FOLDER, 'portal-static'), {
        maxAge: '1y'
    }));

    { // auth
        app.get('/signin', async (req, res, next) =>
        {
            req.session!.nonce = crypto.randomBytes(16).toString('hex');
            req.session!.state = crypto.randomBytes(16).toString('hex');
            req.session!.returnUrl = req.param('returnUrl', '/');

            const authUrl = auth.getSignInUrl({
                sessionId: req.session!.id,
                nonce: req.session!.nonce,
                state: req.session!.state,
                settings: settings
            });

            if (authUrl)
            {
                res.redirect(authUrl);
            }
            else
            {
                res.redirect('/');
                return next();
            }
        });

        app.post('/refresh-user', async (req, res, next) =>
        {
            const user = await auth.refreshUser(req.session!.id);
            setAuthCookie(res, user);
            res.json(user);
        });

        app.post('/signedin', async (req, res, next) =>
        {
            const { id: sessionId, state, nonce, returnUrl } = req.session as any;
            delete req.session!.state;
            delete req.session!.nonce;
            delete req.session!.returnUrl;

            const user = await auth.handleSignInCallback({ sessionId, state, nonce, settings, params: req });

            setAuthCookie(res, user);

            res.redirect(returnUrl || '/');

            return next();
        });

        app.get('/signout', async (req, res, next) =>
        {
            req.session!.returnUrl = req.param('returnUrl', '/');

            const signOutUrl = await auth.signOut(req.session!.id);

            if (signOutUrl)
            {
                res.redirect(signOutUrl);
            }
            else
            {
                res.redirect('/');
                return next();
            }
        });
    } // auth end

    // All regular routes use the Universal engine
    app.get('*', async (req, res) =>
    {
        res.render('index', {
            req, res,
            providers: [
                { provide: 'ORIGIN_URL', useValue: settings.PORTAL_URL },
                { provide: 'SETTINGS', useValue: settings },
                { provide: 'USER', useValue: auth.getUser(req.session!.id) }
            ]
        });
    });

    // Start up the Node server
    app.listen(PORT, () =>
    {
        console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
});

function setAuthCookie(res: express.Response, user: User | null)
{
    res.cookie(AuthConstants.Cookies.SignedIn, user ? 'true' : 'false', {
        maxAge: H24, httpOnly: false
    });
}

