import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import { STATIC_ROUTES } from './static.paths';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/portal-server/main');

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

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'portal-browser'), {
    maxAge: '1y'
}));
app.get(STATIC_ROUTES, express.static(join(DIST_FOLDER, 'portal-static'), {
    maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) =>
{
    const protocol = req.headers['x-forwarded-proto'] === undefined
        ? 'https' : req.headers['x-forwarded-proto'];
    res.render('index', {
        req: req,
        res: res,
        providers: [
            {
                provide: 'ORIGIN_URL',
                useValue: (`${protocol}://${req.headers.host}`)
            }
        ]
    });
});

// Start up the Node server
app.listen(PORT, () =>
{
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
