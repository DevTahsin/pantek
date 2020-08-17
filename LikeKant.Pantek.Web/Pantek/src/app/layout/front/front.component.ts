import { Component, OnInit, AfterViewInit, ɵɵresolveBody, ViewEncapsulation, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterEvent, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { filter, map } from "rxjs/operators";
import { DOCUMENT } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';

declare var window: any;
@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FrontComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private app: AppComponent,
    private router: Router,
    private chn: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private translate: TranslateService) {
    if (this.activeRoute.snapshot.params['language']) {
      localStorage['lang'] = this.activeRoute.snapshot.params['language'];
    }
    document.body.className = 'ashade-smooth-scroll';
    // router.events.forEach((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.pages.isHomeBlockOverlayVisible = event.url == '/';
    //     this.pages.isFooter = (event.url == '/');
    //     this.pages.isProductSlider = event.url.startsWith('/category');
    //     if (this.pages.isProductSlider) {
    //       document.body.className = 'has-spotlight ashade-albums-template ashade-albums-template--carousel is-init is-loaded';
    //     }
    //     console.log(window);
    //     window.ashade.layout();
    //   }
    // });
  }
  pages = {
    isHomeBlockOverlayVisible: false,
    isFooter: false,
    isProductSlider: false
  }
  showOverlay = false;
  first = true;
  openFooter(){
    this.pages.isFooter= true;
    this.chn.detectChanges();

  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
      // window.ga('set', 'page', event.urlAfterRedirects);
      // window.ga('send', 'pageview');
      this.pages.isHomeBlockOverlayVisible = event.url == '/';
      this.pages.isFooter = (event.url == '/');
      this.pages.isProductSlider = event.url.startsWith('/category');
      if (this.pages.isProductSlider) {
        document.body.className = 'has-spotlight ashade-albums-template ashade-albums-template--carousel is-init is-loaded';
      }
      // if (!this.first) {
      //   this.renderAshade();
      // } else this.first = false;
      // this.renderAshade();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
  ashadeint;
  renderAshade() {
    if (window.ashade && this.ashadeint) {
      window.ashade.init();
      window.ashade.layout();
      clearInterval(this.ashadeint);
    }
    else if (window.ashade) {
      // if(!this.first){
      window.ashade.init();
      window.ashade.layout();
    } else if (!window.ashade && !this.ashadeint) {
      this.ashadeint = setInterval(() => {
        this.renderAshade()
      }, 250)
    }
    // window.ashade.init();
    // document.body.classList.remove('is-loaded', 'is-init');
    // document.body.removeAttribute('style');
    // }
    this.first = false;
  }
  carouselint;
  renderCarousel() {
    if (window.ashade_ribbon && this.carouselint) {
      window.ashade_ribbon.init();
      clearInterval(this.carouselint);
    }
    else if (window.ashade_ribbon) {
      // if(!this.first){
        window.ashade_ribbon.init();
    } else if (!window.ashade_ribbon && !this.carouselint) {
      this.carouselint = setInterval(() => {
        this.renderCarousel()
      }, 250)
    }
  }
  removePhotoSwipe(){
    if(window.ashade){
      window.ashade.removePswp();
    }
  }
  renderLayout() {
    window.ashade.layout();
  }
  openLoader() {
    document.getElementById('main-loader').classList.remove('loaded');
  }
  closeLoader(){
    document.getElementById('main-loader').classList.add('loaded');
  }
  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
    this.app.loadStyle('front.css');
    this.app.loadScripts([
      { name: "jquery", src: "/assets/js/jquery.min.js" },
      { name: "gsap", src: "/assets/js/gsap.min.js" },
      { name: "masonry", src: "/assets/js/masonry.min.js" },
      { name: "jquery-justified-gallery", src: "/assets/js/jquery.justifiedGallery.min.js" },
      { name: "jquery-lazy", src: "/assets/js/jquery.lazy.min.js" },
      { name: "photoswipe-ui-default", src: "/assets/js/photoswipe-ui-default.min.js" },
      { name: "photoswipe", src: "/assets/js/photoswipe.min.js" },
      { name: "tiny-slider", src: "/assets/js/tiny-slider.js" },
    ]);
    this.app.addFrontScripts();
  }
  ngAfterViewInit() {
    // this.scriptLoaderService.loadAsArray(ScriptStore.map(t => t.name));
  }
  openTopPadding() {
    this.closeTopPadding();
    document.body.classList.add('no-top-padding');
  }
  closeTopPadding() {
    document.body.classList.remove('no-top-padding');
  }

}
