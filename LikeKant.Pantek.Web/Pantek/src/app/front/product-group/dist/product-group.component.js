"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductGroupComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@environments/environment");
var ProductGroupComponent = /** @class */ (function () {
    function ProductGroupComponent(chn, front, app, route, router, http, translate, meta, title) {
        this.chn = chn;
        this.front = front;
        this.app = app;
        this.route = route;
        this.router = router;
        this.http = http;
        this.translate = translate;
        this.meta = meta;
        this.title = title;
        this.first = 0;
        this.data = null;
        var param = this.route.snapshot.paramMap.get('name');
        var splittedParam = param.split('-');
        if (param && splittedParam.length > 0) {
            this.groupId = splittedParam[splittedParam.length - 1];
        }
    }
    ProductGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.front.openLoader();
        this.http.get(environment_1.environment.apiUrl + '/client/group?d=' + this.groupId).toPromise().then(function (v) {
            _this.data = v;
            _this.meta.addTag({ name: 'description', content: _this.data.description });
            _this.title.setTitle(_this.data.name + ' - REDJET Stage');
            // this.app.addFrontScripts();
            _this.chn.detectChanges();
            _this.front.renderAshade();
            _this.front.addCarousel();
            setTimeout(function () {
                _this.front.closeLoader();
            }, 250);
        });
        this.metaSubscribe = this.translate.onLangChange.subscribe(function (t) {
            if (_this.first > 0) {
                location.replace("/" + _this.translate.currentLang + "/products");
            }
            _this.first++;
        });
        document.body.classList.remove('ashade-home-template');
        document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel', 'has-spotlight');
    };
    ProductGroupComponent.prototype.ngOnDestroy = function () {
        this.metaSubscribe.unsubscribe();
        document.body.classList.remove('ashade-albums-template', 'ashade-albums-template--carousel');
        this.meta.removeTag("name='description'");
        this.front.removeCarousel();
        document.getElementsByClassName('ashade-cursor')[0].classList.remove('int-grab-h');
    };
    ProductGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-product-group',
            templateUrl: './product-group.component.html',
            styleUrls: ['./product-group.component.scss']
        })
    ], ProductGroupComponent);
    return ProductGroupComponent;
}());
exports.ProductGroupComponent = ProductGroupComponent;
