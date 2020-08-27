"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.createTranslateLoader = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
// import { FrontModule } from './front/front.module';
var services_1 = require("./layout/admin/admin/services");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var tr_1 = require("@angular/common/locales/tr");
var common_1 = require("@angular/common");
common_1.registerLocaleData(tr_1["default"]);
function generateGuid() {
    var value = "";
    for (var i = 0; i < 32; i++) {
        value += Math.round(15 * Math.random()).toString(16);
    }
    return value;
}
// AoT requires an exported function for factories
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, '/assets/i18n/', '.json?v=' + generateGuid());
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.HttpClient]
                    }
                })
                // FrontModule
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: "tr" },
                { provide: core_1.APP_INITIALIZER, useFactory: services_1.appInitializer, multi: true, deps: [services_1.AuthService] },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: services_1.JwtInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: services_1.ErrorInterceptor, multi: true },
                services_1.AuthService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
