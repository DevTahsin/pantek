import { Component, OnInit, OnDestroy } from '@angular/core';
import { FrontComponent } from 'src/app/layout/front/front.component';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '@app/app.component';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

interface Image {
  link: string;
  alt: string;
}
interface ProductDetail {
  images: Image[];
  descriptionHtml: string;
  header: string;
  metaDescription: string;
  group:string;
  groupLink:string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  metaSubscribe: Subscription;
  first = 0;
  data: ProductDetail;
  productId
  constructor(private layout: FrontComponent, private route: ActivatedRoute, private http: HttpClient, private translate: TranslateService, private app: AppComponent, private meta: Meta, private title: Title) {
    const param = this.route.snapshot.paramMap.get('name');
    const splittedParam = param.split('-');
    if (param && splittedParam.length > 0) {
      this.productId = splittedParam[splittedParam.length - 1];
    }
    this.layout.openTopPadding();
  }
  ngOnInit() {
    this.http.get(environment.apiUrl + '/client/product?d=' + this.productId).toPromise().then(
      (v: any) => {
        this.data = v;
        this.meta.addTag({ name: 'description', content: this.data.metaDescription })
        this.title.setTitle(this.data.header + ' - PANTEK');
        this.app.addFrontScripts();
        document.body.classList.remove('ashade-home-template');
        // document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel');
      }
    )
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      if (this.first > 0) {
        location.replace("/products")
      }
      this.first++;
    });

  }
  returnBack(link){
    location.replace(link);
  }

  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }
}
