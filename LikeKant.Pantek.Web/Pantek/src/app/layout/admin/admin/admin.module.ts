import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './';
import { FooterModule, LoginFormModule } from './components';
import { AuthService, ScreenService, AppInfoService } from './services';



@NgModule({
  declarations: [AdminComponent ],
  imports: [
    CommonModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AdminRoutingModule
  ],
  providers: [AuthService, ScreenService, AppInfoService]})
export class AdminModule { }
