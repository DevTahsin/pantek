import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class NewsComponent implements OnInit,OnDestroy {

  constructor(private app: AppComponent,private front: FrontComponent,private meta: Meta,private title: Title,public translate: TranslateService, private http: HttpClient,
    private googleAnalyticsService: GoogleAnalyticsService) { }
  news: New[] = [];
  
  metaSubscribe:Subscription;
  selectedCategory =0;
  selectedGroup =0;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.front.openTopPadding();
    this.metaSubscribe= this.translate.onLangChange.subscribe(t => {
      this.http.get(environment.apiUrl+'/client/news?lan='+this.translate.currentLang).toPromise().then(
        (v:any) => {
          this.news = v;
          this.app.addFrontScripts();
        }
      )
      this.translate.get(['SAYFALAR.HABERLER.META-BASLIK','SAYFALAR.HABERLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.addTag({name: 'description', content:t['SAYFALAR.HABERLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.HABERLER.META-BASLIK']);
      });});
  }

  locateLink(link,name) {
    this.googleAnalyticsService.eventEmitter("HABER_TIKLAMASI", name, "userLabel", 1);
    location.replace(link);
  }

}
