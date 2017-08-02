import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { getSharedConfig } from './app.module.shared';
import { Side, SideService } from "./services/side.service";
import { ModuleLoaderService } from "./services/module.loader.service";

const sharedConfig = getSharedConfig(new ModuleLoaderService(new SideService(Side.Client)));

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: 'SIDE', useValue: Side.Client },
        ...sharedConfig.providers
    ]
})
export class AppModule {
}
