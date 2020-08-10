import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';
import { FrontComponent } from '@app/layout/front/front.component';
import { GoogleAnalyticsService } from '@app/services/google-analytics.service';

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
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnDestroy {

  constructor(private app: AppComponent,private front: FrontComponent,private meta: Meta,private title: Title,public translate: TranslateService, private http: HttpClient,private googleAnalyticsService: GoogleAnalyticsService) { }
  categories: Categories[];
  
  metaSubscribe:Subscription;
  selectedCategory =0;
  selectedGroup =0;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.front.openTopPadding();
    this.metaSubscribe= this.translate.onLangChange.subscribe(t => {
      this.http.get(environment.apiUrl+'/client/categories?lan='+this.translate.currentLang).toPromise().then(
        (v:any) => {
          this.categories = v;
          this.app.addFrontScripts();
        }
      )
      this.translate.get(['SAYFALAR.URUNLER.META-BASLIK','SAYFALAR.URUNLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.addTag({name: 'description', content:t['SAYFALAR.URUNLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.URUNLER.META-BASLIK']);
      });});
  }

  locateLink(link, name) {
    this.googleAnalyticsService.eventEmitter("URUN_TIKLAMASI", name, "userLabel", 1);
    location.replace(link);
  }

}
