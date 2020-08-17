import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  link:string;
  descriptionHtml: string;
  header: string;
  metaDescription: string;
  group:string;
  groupLink:string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  metaSubscribe: Subscription;
  first = 0;
  data: ProductDetail;
  newId
  constructor(private front: FrontComponent, private chn:ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient, public translate: TranslateService, private app: AppComponent, private meta: Meta, private title: Title) {
    const param = this.route.snapshot.paramMap.get('name');
    const splittedParam = param.split('-');
    if (param && splittedParam.length > 0) {
      this.newId = splittedParam[splittedParam.length - 1];
    }
    this.front.openTopPadding();
  }
  ngOnInit() {
    this.front.openLoader();
    this.http.get(environment.apiUrl + '/client/new?d=' + this.newId).toPromise().then(
      (v: any) => {
        this.data = v;
        this.meta.addTag({ name: 'description', content: this.data.metaDescription })
        this.title.setTitle(this.data.header + ' - PANTEK');
        // this.app.addFrontScripts();
        this.chn.detectChanges();
        this.front.renderAshade();
        this.front.closeLoader();
        this.maxHeight = this.row.nativeElement.clientWidth;
        // document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel');
      }
    )
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      if (this.first > 0) {
      }
      this.first++;
    });
    document.body.classList.remove('ashade-home-template');
    document.body.classList.add('ashade-smooth-scroll', 'has-spotlight');
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
  openModal() {
    this.modalDisplay = 'block';
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
