import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { createServerRenderer } from 'aspnet-prerendering';
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine';

// Grab the (Node) server-specific NgModule
const { AppModuleNgFactory } = require('./app/app.module.server.ngfactory'); // <-- ignore this - this is Production only
import { Settings } from './app/models/settings.model';

enableProdMode();

export default createServerRenderer(params =>
  {
      // Platform-server provider configuration
      const setupOptions: IEngineOptions = {
          appSelector: '<ml-app></ml-app>',
          ngModule: AppModuleNgFactory,
          request: params,
          providers: [
              { provide: 'BASE_URL', useValue: params.origin + params.baseUrl },
              { provide: 'USER', useValue: params.data.user },
              { provide: Settings, useValue: params.data.settings }
          ]
      };
  
      return ngAspnetCoreEngine(setupOptions).then(response =>
      {
          // Apply your transferData to response.globals
          response.globals.transferData = createTransferScript({
              settings: params.data.settings // example of data coming from dotnet, in HomeController
          });
  
          return ({
              html: response.html, // our <app-root> serialized
              globals: response.globals // all of our styles/scripts/meta-tags/link-tags for aspnet to serve up
          });
      });
  });
  