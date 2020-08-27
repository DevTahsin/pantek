"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticleComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@environments/environment");
var ArticleComponent = /** @class */ (function () {
    function ArticleComponent(front, chn, route, http, translate, app, meta, title) {
        this.front = front;
        this.chn = chn;
        this.route = route;
        this.http = http;
        this.translate = translate;
        this.app = app;
        this.meta = meta;
        this.title = title;
        this.first = 0;
        this.modalDisplay = 'none';
        this.captionText = '';
        this.latestWidth = 0;
        this.slideIndex = 1;
        var param = this.route.snapshot.paramMap.get('name');
        var splittedParam = param.split('-');
        if (param && splittedParam.length > 0) {
            this.newId = splittedParam[splittedParam.length - 1];
        }
        this.front.openTopPadding();
    }
    ArticleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.front.openLoader();
        this.http.get(environment_1.environment.apiUrl + '/client/new?d=' + this.newId).toPromise().then(function (v) {
            _this.data = v;
            _this.meta.addTag({ name: 'description', content: _this.data.metaDescription });
            _this.title.setTitle(_this.data.header + ' - REDJET Stage');
            // this.app.addFrontScripts();
            _this.chn.detectChanges();
            _this.front.renderAshade();
            _this.front.closeLoader();
            // document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel');
        });
        this.metaSubscribe = this.translate.onLangChange.subscribe(function (t) {
            if (_this.first > 0) {
            }
            _this.first++;
        });
        document.body.classList.remove('ashade-home-template');
        document.body.classList.add('ashade-smooth-scroll', 'has-spotlight');
    };
    ArticleComponent.prototype.ngAfterViewInit = function () {
    };
    ArticleComponent.prototype.ngOnDestroy = function () {
        this.metaSubscribe.unsubscribe();
        // this.layout.removePhotoSwipe();
        this.meta.removeTag("name='description'");
    };
    ArticleComponent.prototype.openModal = function () {
        this.modalDisplay = 'block';
    };
    // Close the Modal
    ArticleComponent.prototype.closeModal = function () {
        this.modalDisplay = 'none';
    };
    ArticleComponent.prototype.plusSlides = function (n) {
        this.showSlides(this.slideIndex += n);
    };
    // Thumbnail image controls
    ArticleComponent.prototype.currentSlide = function (n) {
        this.showSlides(this.slideIndex = n);
    };
    ArticleComponent.prototype.showSlides = function (n) {
        this.slideIndex = n;
        if (n > this.data.images.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.data.images.length;
        }
    };
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'app-article',
            templateUrl: './article.component.html',
            styleUrls: ['./article.component.scss']
        })
    ], ArticleComponent);
    return ArticleComponent;
}());
exports.ArticleComponent = ArticleComponent;
