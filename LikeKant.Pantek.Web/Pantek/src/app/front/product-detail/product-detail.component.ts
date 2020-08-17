import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  display: string;
}
interface ProductDetail {
  images: Image[];
  link: string;
  descriptionHtml: string;
  header: string;
  metaDescription: string;
  group: string;
  groupLink: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  metaSubscribe: Subscription;
  first = 0;
  data: ProductDetail;
  productId
  constructor(private chn: ChangeDetectorRef, private layout: FrontComponent, private route: ActivatedRoute, private http: HttpClient, public translate: TranslateService, private app: AppComponent, private meta: Meta, private title: Title) {
    const param = this.route.snapshot.paramMap.get('name');
    const splittedParam = param.split('-');
    if (param && splittedParam.length > 0) {
      this.productId = splittedParam[splittedParam.length - 1];
    }
    this.layout.openTopPadding();
  }
  ngOnInit() {
    this.layout.openLoader();
    this.http.get(environment.apiUrl + '/client/product?d=' + this.productId).toPromise().then(
      (v: any) => {
        this.data = v;
        // this.data.images = this.data.images.map(t => ({
        //   link: t.link,
        //   alt: t.alt,
        //   display: 'none';
        // }))
        this.meta.addTag({ name: 'description', content: this.data.metaDescription })
        this.title.setTitle(this.data.header + ' - PANTEK');
        // this.app.addFrontScripts();

        this.chn.detectChanges();
        this.layout.renderAshade();
        this.maxHeight = this.row.nativeElement.clientWidth;
        this.layout.closeLoader();

        // document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel');
      }
    )
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      if (this.first > 0) {
        location.replace("/products")
      }
      this.first++;
    });
    document.body.classList.remove('ashade-home-template', 'has-spotlight');
  }

  @ViewChild('row') row: ElementRef;
  maxHeight = 0;
  ngAfterViewInit() {
  }
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
    // this.layout.removePhotoSwipe();
    this.meta.removeTag("name='description'")
  }
  modalDisplay = 'none';
  captionText = '';
  latestWidth = 0;
  innerHeight = 0;
  openModal() {
    this.modalDisplay = 'block';
    this.innerHeight = window.innerHeight - 150;
  }

  // Close the Modal
  closeModal() {
    this.modalDisplay = 'none';
  }

  slideIndex = 1;
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    this.slideIndex = n;
    if (n > this.data.images.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.data.images.length}
  }
}
