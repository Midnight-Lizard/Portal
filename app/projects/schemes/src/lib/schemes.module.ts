import { NgModule } from '@angular/core';

import { schemesRoutingComponents, SchemesRoutingModule } from './schemes.routing.module';
import { SchemesService } from './backend/schemes.service';

@NgModule({
  declarations: [schemesRoutingComponents],
  imports: [
    SchemesRoutingModule
  ],
  providers: [SchemesService]
})
export class SchemesModule { }
