import { Component, OnInit, AfterViewInit, ɵɵresolveBody, ViewEncapsulation, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from "rxjs/operators";
import { DOCUMENT } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

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
    private router: Router) {
    document.body.className = 'has-spotlight ashade-smooth-scroll';
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.pages.isHomeBlockOverlayVisible = event.url == '/';
        this.pages.isFooter = (event.url == '/');
        this.pages.isProductSlider = event.url.startsWith('/category');

        if (this.pages.isProductSlider) {
          document.body.className = 'has-spotlight ashade-albums-template ashade-albums-template--carousel is-init is-loaded';
        }
      }
    });
  }
  pages = {
    isHomeBlockOverlayVisible: false,
    isFooter: false,
    isProductSlider: false
  }
  ngOnInit(): void {
    this.app.loadStyle('front.css')
  }
  ngAfterViewInit() {
    // this.scriptLoaderService.loadAsArray(ScriptStore.map(t => t.name));
    this.app.loadScripts([
      { name: "jquery", src: "/assets/js/jquery.min.js"},
      { name: "gsap", src: "/assets/js/gsap.min.js" },
      { name: "masonry", src: "/assets/js/masonry.min.js" },
      { name: "jquery-justified-gallery", src: "/assets/js/jquery.justifiedGallery.min.js" },
      { name: "jquery-lazy", src: "/assets/js/jquery.lazy.min.js" },
      { name: "photoswipe-ui-default", src: "/assets/js/photoswipe-ui-default.min.js" },
      { name: "photoswipe", src: "/assets/js/photoswipe.min.js" },
      { name: "tiny-slider", src: "/assets/js/tiny-slider.js" },
      { name: 'core', src: '/assets/js/core.js'  },
      { name: "ashade-ribbon", src: "/assets/js/ashade-ribbon.js"},
      { name: "ashade-slider", src: "/assets/js/ashade-slider.js" }
  ]);
  }
  openTopPadding() {
    this.closeTopPadding();
    document.body.classList.add('no-top-padding');
  }
  closeTopPadding() {
    document.body.classList.remove('no-top-padding');
  }

}
