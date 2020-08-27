"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductDetailComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@environments/environment");
var ProductDetailComponent = /** @class */ (function () {
    function ProductDetailComponent(chn, layout, route, http, translate, app, meta, title) {
        this.chn = chn;
        this.layout = layout;
        this.route = route;
        this.http = http;
        this.translate = translate;
        this.app = app;
        this.meta = meta;
        this.title = title;
        this.first = 0;
        this.maxHeight = 0;
        this.modalDisplay = 'none';
        this.captionText = '';
        this.latestWidth = 0;
        this.innerHeight = 0;
        this.slideIndex = 1;
        var param = this.route.snapshot.paramMap.get('name');
        var splittedParam = param.split('-');
        if (param && splittedParam.length > 0) {
            this.productId = splittedParam[splittedParam.length - 1];
        }
        this.layout.openTopPadding();
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layout.openLoader();
        this.http.get(environment_1.environment.apiUrl + '/client/product?d=' + this.productId).toPromise().then(function (v) {
            _this.data = v;
            // this.data.images = this.data.images.map(t => ({
            //   link: t.link,
            //   alt: t.alt,
            //   display: 'none';
            // }))
            _this.meta.addTag({ name: 'description', content: _this.data.metaDescription });
            _this.title.setTitle(_this.data.header + ' - REDJET Stage');
            // this.app.addFrontScripts();
            _this.chn.detectChanges();
            _this.layout.renderAshade();
            _this.maxHeight = _this.row.nativeElement.clientWidth;
            _this.layout.closeLoader();
            // document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel');
        });
        this.metaSubscribe = this.translate.onLangChange.subscribe(function (t) {
            if (_this.first > 0) {
                location.replace("/products");
            }
            _this.first++;
        });
        document.body.classList.remove('ashade-home-template', 'has-spotlight');
    };
    ProductDetailComponent.prototype.ngAfterViewInit = function () {
    };
    ProductDetailComponent.prototype.ngOnDestroy = function () {
        this.metaSubscribe.unsubscribe();
        // this.layout.removePhotoSwipe();
        this.meta.removeTag("name='description'");
    };
    ProductDetailComponent.prototype.openModal = function () {
        this.modalDisplay = 'block';
        this.innerHeight = window.innerHeight - 150;
    };
    // Close the Modal
    ProductDetailComponent.prototype.closeModal = function () {
        this.modalDisplay = 'none';
    };
    ProductDetailComponent.prototype.plusSlides = function (n) {
        this.showSlides(this.slideIndex += n);
    };
    // Thumbnail image controls
    ProductDetailComponent.prototype.currentSlide = function (n) {
        this.showSlides(this.slideIndex = n);
    };
    ProductDetailComponent.prototype.showSlides = function (n) {
        this.slideIndex = n;
        if (n > this.data.images.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.data.images.length;
        }
    };
    __decorate([
        core_1.ViewChild('row')
    ], ProductDetailComponent.prototype, "row");
    ProductDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-product-detail',
            templateUrl: './product-detail.component.html',
            styleUrls: ['./product-detail.component.scss']
        })
    ], ProductDetailComponent);
    return ProductDetailComponent;
}());
exports.ProductDetailComponent = ProductDetailComponent;
