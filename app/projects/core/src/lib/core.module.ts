import { NgModule } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { SideService } from './side.service';

@NgModule({
  providers: [AuthService, SideService]
})
export class CoreModule { }
