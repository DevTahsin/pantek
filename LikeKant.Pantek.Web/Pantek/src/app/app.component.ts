import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
declare var window;
interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore = [
  { name: "jquery", src: "/assets/js/jquery.min.js" },
  { name: "gsap", src: "/assets/js/gsap.min.js" },
  { name: "masonry", src: "/assets/js/masonry.min.js" },
  { name: "jquery-justified-gallery", src: "/assets/js/jquery.justifiedGallery.min.js" },
  { name: "jquery-lazy", src: "/assets/js/jquery.lazy.min.js" },
  { name: "photoswipe-ui-default", src: "/assets/js/photoswipe-ui-default.min.js" },
  { name: "photoswipe", src: "/assets/js/photoswipe.min.js" },
  { name: "tiny-slider", src: "/assets/js/tiny-slider.js" },
  { name: 'core', src: '/assets/js/core.js' },
  { name: "ashade-ribbon", src: "/assets/js/ashade-ribbon.js" },
  { name: "ashade-slider", src: "/assets/js/ashade-slider.js" }
]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private loadedScripts: Scripts[] = [];
  public showOverlay = true;
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {

  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'preload';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }


  removeAllScripts() {
    this.loadedScripts.forEach(element => {
      const eleman = this.document.getElementsByName(element.name)[0];
      if (eleman) {
        eleman.parentNode.removeChild(eleman);
      }
    });
  }

  loadScripts(data: Scripts[]) {
    this.removeAllScripts();
    this.loadedScripts = [...data];
    for (let i = 0; i < data.length; i++) {
      const node = this.document.createElement('script');
      node.src = data[i].src;
      node.id = data[i].name;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      this.document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

  addFrontScripts() {
    const data = [
      { name: 'core', src: '/assets/js/core.js' }];
    data.forEach(element => {
      const eleman = this.document.getElementById(element.name);
      if (eleman) {
        eleman.parentNode.removeChild(eleman);
      }
    });
    for (let i = 0; i < data.length; i++) {
      const node = this.document.createElement('script');
      node.src = data[i].src;
      node.id = data[i].name;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      this.document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

  addNavigationKategoriScripts(){
    const data = [
      { name: "dl-menu-modernizer--script", src: "/assets/js/modernizr.custom.js" },
      { name: 'dl-menu--script', src: '/assets/js/jquery.dlmenu.js' }];
    data.forEach(element => {
      const eleman = this.document.getElementById(element.name);
      if (eleman) {
        eleman.parentNode.removeChild(eleman);
      }
    });
    for (let i = 0; i < data.length; i++) {
      const node = this.document.createElement('script');
      node.src = data[i].src;
      node.id = data[i].name;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      this.document.getElementsByTagName('body')[0].appendChild(node);
    }
  }
  removeNavigationKategoriScripts() {
    const data = [
      { name: "dl-menu-modernizer--script", src: "/assets/js/modernizr.custom.js" },
      { name: 'dl-menu--script', src: '/assets/js/jquery.dlmenu.js' }];
    data.forEach(element => {
      const eleman = this.document.getElementById(element.name);
      if (eleman) {
        eleman.parentNode.removeChild(eleman);
      }
    });
  }
}
