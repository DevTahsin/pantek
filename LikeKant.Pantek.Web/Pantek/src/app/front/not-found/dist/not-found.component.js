"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotFoundComponent = void 0;
var core_1 = require("@angular/core");
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(http, front, meta, title, translate, app) {
        this.http = http;
        this.front = front;
        this.meta = meta;
        this.title = title;
        this.translate = translate;
        this.app = app;
        this.first = false;
    }
    NotFoundComponent.prototype.ngOnDestroy = function () {
        this.metaSubscribe.unsubscribe();
    };
    NotFoundComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.metaSubscribe = this.translate.onLangChange.subscribe(function (t) {
            _this.translate.get(['NOT-FOUND.DESCRIPTION', 'NOT-FOUND.TITLE']).toPromise().then(function (t) {
                _this.meta.addTag({ name: 'description', content: t['NOT-FOUND.DESCRIPTION'] });
                _this.title.setTitle(t['NOT-FOUND.TITLE']);
            });
            if (!_this.first) {
                document.body.classList.add('is-centered', 'ashade-maintenance-wrap');
                _this.front.renderAshade();
                // this.app.addFrontScripts();
                _this.front.closeLoader();
                // this.app.addFrontScripts();
            }
            _this.first = true;
        });
        this.front.openTopPadding();
    };
    NotFoundComponent.prototype.locateHref = function () {
        location.replace('/' + this.translate.currentLang);
    };
    NotFoundComponent = __decorate([
        core_1.Component({
            selector: 'app-not-found',
            templateUrl: './not-found.component.html',
            styleUrls: ['./not-found.component.scss']
        })
    ], NotFoundComponent);
    return NotFoundComponent;
}());
exports.NotFoundComponent = NotFoundComponent;
