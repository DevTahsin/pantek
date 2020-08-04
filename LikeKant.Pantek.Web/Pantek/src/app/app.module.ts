import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FrontModule } from './front/front.module';
import { AuthService, ErrorInterceptor, JwtInterceptor, appInitializer } from './layout/admin/admin/services';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

function generateGuid() {
  var value = "";
  for (var i = 0; i < 32; i++) {
      value += Math.round(15 * Math.random()).toString(16)
  }
  return value
}
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v='+generateGuid());
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
    // FrontModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
