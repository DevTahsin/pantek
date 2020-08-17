import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '../home/home.component';
import { FrontComponent } from '@app/layout/front/front.component';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {

  html;
  constructor(private chn: ChangeDetectorRef, private http: HttpClient, private front: FrontComponent, private meta: Meta, private title: Title, public translate: TranslateService, private app: AppComponent) { }
  metaSubscribe: Subscription;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
    this.meta.removeTag("name='description'")
  }

  ngOnInit(): void {
    // this.app.addFrontScripts();
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      this.front.openLoader();
      this.http.get(environment.apiUrl + '/client/about?lan=' + t.lang).toPromise().then((t: any) => {
        if (t) {
          this.html = t.html;
          this.chn.detectChanges();
          this.front.renderAshade();
        }
        this.front.closeLoader();
      });
      this.translate.get(['SAYFALAR.HAKKIMIZDA.META-BASLIK', 'SAYFALAR.HAKKIMIZDA.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.removeTag("name='description'")
        this.meta.addTag({ name: 'description', content: t['SAYFALAR.HAKKIMIZDA.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.HAKKIMIZDA.META-BASLIK']);
      });
    });
    // this.front.openTopPadding();
    document.body.classList.remove('ashade-home-template');
    document.body.classList.add('ashade-smooth-scroll', 'has-spotlight');
  }
  ngAfterViewInit() {
    if (this.translate.currentLang) {
      this.front.openLoader();
      this.http.get(environment.apiUrl + '/client/about?lan=' + this.translate.currentLang).toPromise().then((t: any) => {
        if (t) {
          this.html = t.html;
          this.chn.detectChanges();
          this.front.renderAshade();
        }
        this.front.closeLoader();
      });
      this.translate.get(['SAYFALAR.HAKKIMIZDA.META-BASLIK', 'SAYFALAR.HAKKIMIZDA.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.removeTag("name='description'")
        this.meta.addTag({ name: 'description', content: t['SAYFALAR.HAKKIMIZDA.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.HAKKIMIZDA.META-BASLIK']);
      });
    }
  }

}
