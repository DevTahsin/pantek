import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';
import { FrontComponent } from '@app/layout/front/front.component';
import { GoogleAnalyticsService } from '@app/services/google-analytics.service';

interface New {
  name: string,
  image: {link: string, alt:string},
  description: string,
  link: string,
  date: Date
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit,OnDestroy, AfterViewInit {

  constructor(private app: AppComponent,private chn:ChangeDetectorRef,private front: FrontComponent,private meta: Meta,private title: Title,public translate: TranslateService, private http: HttpClient,
    private googleAnalyticsService: GoogleAnalyticsService) { }
  news: New[] = [];
  
  metaSubscribe:Subscription;
  selectedCategory =0;
  selectedGroup =0;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
    this.meta.removeTag("name='description'")
  }

  ngOnInit(): void {
    this.front.openTopPadding();
    this.metaSubscribe= this.translate.onLangChange.subscribe(t => {
      this.front.openLoader();
      this.http.get(environment.apiUrl+'/client/news?lan='+this.translate.currentLang).toPromise().then(
        (v:any) => {
          this.news = v;
          this.chn.detectChanges();
          this.front.renderAshade();
          // this.app.addFrontScripts();
          this.front.closeLoader();
        }
      )
      this.translate.get(['SAYFALAR.HABERLER.META-BASLIK','SAYFALAR.HABERLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.removeTag("name='description'")
        this.meta.addTag({name: 'description', content:t['SAYFALAR.HABERLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.HABERLER.META-BASLIK']);
      });
    });
      document.body.classList.remove('ashade-home-template');
      document.body.classList.add('ashade-smooth-scroll', 'has-spotlight');
  }

  locateLink(link,name) {
    this.googleAnalyticsService.eventEmitter("HABER_TIKLAMASI", name, "userLabel", 1);
    location.replace(link);
  }
  ngAfterViewInit(): void {
    if(this.translate.currentLang){
      this.front.openLoader();
      this.http.get(environment.apiUrl+'/client/news?lan='+this.translate.currentLang).toPromise().then(
        (v:any) => {
          this.news = v;
          this.chn.detectChanges();
          this.front.renderAshade();
          // this.app.addFrontScripts();
      this.front.closeLoader();
        }
      );
      this.translate.get(['SAYFALAR.HABERLER.META-BASLIK','SAYFALAR.HABERLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.removeTag("name='description'")
        this.meta.addTag({name: 'description', content:t['SAYFALAR.HABERLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.HABERLER.META-BASLIK']);
      });
    
    }
  }

}
