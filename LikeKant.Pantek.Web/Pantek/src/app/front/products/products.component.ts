import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewEncapsulation, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';
import { FrontComponent } from '@app/layout/front/front.component';
import { GoogleAnalyticsService } from '@app/services/google-analytics.service';
declare var $: any;
interface Group {
  name: string,
  image: string,
  description: string,
  link: string,
  products: Product[]
}

interface Product {
  name: string,
  link: string
}

interface Categories {
  name: string,
  groups: Group[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private chn: ChangeDetectorRef, private front: FrontComponent, private app: AppComponent, private meta: Meta, private title: Title, public translate: TranslateService, private http: HttpClient, private googleAnalyticsService: GoogleAnalyticsService) { }
  categories: Categories[];

  metaSubscribe: Subscription;
  selectedCategory = 0;
  selectedGroup = 0;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
    this.app.removeNavigationKategoriScripts();
    document.getElementsByTagName('html')[0].removeAttribute('class')
    this.meta.removeTag("name='description'")
  }

  ngOnInit(): void {
    this.front.openTopPadding();
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      this.front.openLoader();
      this.http.get(environment.apiUrl + '/client/categories?lan=' + this.translate.currentLang).toPromise().then(
        (v: any) => {
          this.categories = v;
          // this.app.addFrontScripts();
          this.chn.detectChanges();
          this.front.renderAshade();
          this.dlmenuWait();
          this.front.closeLoader();
        }
      )
      this.translate.get(['SAYFALAR.URUNLER.META-BASLIK', 'SAYFALAR.URUNLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.removeTag("name='description'")
        this.meta.addTag({ name: 'description', content: t['SAYFALAR.URUNLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.URUNLER.META-BASLIK']);
      });
    });
    document.body.classList.remove('ashade-home-template');
    document.body.classList.add('ashade-smooth-scroll', 'has-spotlight');
    this.app.addNavigationKategoriScripts();
  }
  ngAfterViewInit() {
    if (this.translate.currentLang) {
      this.front.openLoader();
      this.http.get(environment.apiUrl + '/client/categories?lan=' + this.translate.currentLang).toPromise().then(
        (v: any) => {
          this.categories = v;
          this.chn.detectChanges();
          this.front.renderAshade();
          // this.app.addFrontScripts();
          this.dlmenuWait();
          this.front.closeLoader();
        }
      )
      this.translate.get(['SAYFALAR.URUNLER.META-BASLIK', 'SAYFALAR.URUNLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.removeTag("name='description'")
        this.meta.addTag({ name: 'description', content: t['SAYFALAR.URUNLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.URUNLER.META-BASLIK']);
      });
    }
  }
  dlmenuInterval;
  dlmenuWait() {
    this.dlmenuInterval = setInterval(function () {
      if ($ && $.DLMenu) {
        $('#dl-menu').dlmenu();
        clearInterval(this.dlmenuInterval);
      }
    }.bind(this), 250)
  }

  locateLink(link, name) {
    this.googleAnalyticsService.eventEmitter("URUN_TIKLAMASI", name, "userLabel", 1);
    location.replace(link);
  }

  categoryShow = false;
  categoryToggle() {
    this.categoryShow = !this.categoryShow;
  }

  searchMaxWidth = 0;
  searchResults = [];
  searchActive = false;
  search(e) {
    if (e.code === 'Escape') {
      this.searchActive = false;
    } else {
      if (e.target.value.length > 2) {
        this.searchMaxWidth = e.target.offsetWidth
        this.searchActive = true;
        this.searchResults = [];
        this.categories.forEach(element => {
          element.groups.forEach(element => {
            this.searchResults = this.searchResults.concat(element.products.filter(t=> t.name.toLowerCase().includes(e.target.value.toLowerCase())));
          });
        });
      }
    }
  }
  
  @ViewChild('searchArea') searchAreaElement: ElementRef;
  @ViewChild('searchInput') searchInputElement: ElementRef;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(event.path[0] instanceof HTMLAnchorElement){
      return;
    }
    if(!(event.path.find( t=> t==this.searchAreaElement.nativeElement || t==this.searchInputElement.nativeElement)) ){
      this.searchActive = false;
    }else {
      if(this.searchResults.length>0){this.searchActive = true;}
    }
  }
}
