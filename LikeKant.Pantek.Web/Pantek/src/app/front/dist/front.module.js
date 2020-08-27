"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FrontModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var front_component_1 = require("../layout/front/front.component");
var header_component_1 = require("../layout/front/header/header.component");
var footer_component_1 = require("../layout/front/footer/footer.component");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var products_component_1 = require("./products/products.component");
var product_group_component_1 = require("./product-group/product-group.component");
var product_detail_component_1 = require("./product-detail/product-detail.component");
var core_2 = require("@ngx-translate/core");
var loading_component_1 = require("./loading/loading.component");
var not_found_component_1 = require("./not-found/not-found.component");
var news_component_1 = require("./news/news.component");
var article_component_1 = require("./article/article.component");
var contact_component_1 = require("./contact/contact.component");
var forms_1 = require("@angular/forms");
var google_analytics_service_1 = require("@app/services/google-analytics.service");
var routes = [
    {
        path: ':language',
        component: front_component_1.FrontComponent,
        children: [
            { path: '', component: home_component_1.HomeComponent },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'products', component: products_component_1.ProductsComponent },
            { path: 'news', component: news_component_1.NewsComponent },
            { path: 'contact', component: contact_component_1.ContactComponent },
            { path: 'product/:name', component: product_detail_component_1.ProductDetailComponent },
            { path: 'article/:name', component: article_component_1.ArticleComponent },
            { path: 'product-group/:name', component: product_group_component_1.ProductGroupComponent },
            { path: '**', component: not_found_component_1.NotFoundComponent }
        ]
    }
];
var FrontModule = /** @class */ (function () {
    function FrontModule() {
    }
    FrontModule = __decorate([
        core_1.NgModule({
            declarations: [
                front_component_1.FrontComponent, header_component_1.HeaderComponent, footer_component_1.FooterComponent, home_component_1.HomeComponent, about_component_1.AboutComponent, contact_component_1.ContactComponent,
                products_component_1.ProductsComponent, product_group_component_1.ProductGroupComponent, product_detail_component_1.ProductDetailComponent, loading_component_1.LoadingComponent, not_found_component_1.NotFoundComponent, news_component_1.NewsComponent, article_component_1.ArticleComponent
            ],
            imports: [
                router_1.RouterModule.forChild(routes),
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule
            ],
            exports: [router_1.RouterModule],
            providers: [google_analytics_service_1.GoogleAnalyticsService]
        })
    ], FrontModule);
    return FrontModule;
}());
exports.FrontModule = FrontModule;
