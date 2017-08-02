import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { getSharedConfig } from './app.module.shared';
import { Side, SideService } from "./services/side.service";
import { ModuleLoaderService } from "./services/module.loader.service";
import { ObservableMedia } from "@angular/flex-layout";
import { Subject } from "rxjs/Subject";

const sharedConfig = getSharedConfig(new ModuleLoaderService(new SideService(Side.Server)));

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    schemas: [NO_ERRORS_SCHEMA], // for disabling flex-layout directives
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: ObservableMedia, useClass: Subject },
        { provide: 'ORIGIN_URL', useValue: "http://localhost:80" },
        { provide: 'SIDE', useValue: Side.Server },
        ...sharedConfig.providers
    ]
})
export class AppModule
{
}
