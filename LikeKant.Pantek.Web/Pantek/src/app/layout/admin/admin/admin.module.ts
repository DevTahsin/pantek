import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './';
import { FooterModule, LoginFormModule } from './components';
import { AuthService, ScreenService, AppInfoService } from './services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor, appInitializer } from './services';

@NgModule({
  declarations: [AdminComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AdminRoutingModule
  ],
  providers: [
    ScreenService, 
    AppInfoService
  ]
})
export class AdminModule { }
