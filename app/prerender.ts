// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, writeFileSync } from 'fs';
import { sync as createPathSync } from 'mkdirp';
import { join } from 'path';

import { enableProdMode, InjectionToken } from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import { STATIC_ROUTES } from './static.paths';
import { Settings, defaultSettings } from './dist/core';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/portal-server/main');

const STATIC_FOLDER = join(process.cwd(), 'portal-static');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('portal-browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();
const settings: Settings = { ...defaultSettings };
Object.keys(settings)
    .filter(set => set in process.env)
    .forEach((set: keyof Settings) => settings[set] = process.env[set]!);

// Iterate each route path
STATIC_ROUTES.forEach(route =>
{
    const fullPath = join(STATIC_FOLDER, route);

    // Make sure the directory structure is there
    createPathSync(fullPath);

    // Writes rendered HTML to index.html, replacing the file if it already exists.
    previousRender = previousRender
        .then(_ => renderModuleFactory(AppServerModuleNgFactory, {
            document: index,
            url: route,
            extraProviders: [
                provideModuleMap(LAZY_MODULE_MAP),
                { provide: 'ORIGIN_URL', useValue: settings.PORTAL_URL },
                { provide: 'SETTINGS', useValue: settings },
                { provide: 'USER', useValue: null }
            ]
        }))
        .then(html => writeFileSync(join(fullPath, 'index.html'), html))
        .then(_ => console.log(`route prerendered: ${route}`));
});
