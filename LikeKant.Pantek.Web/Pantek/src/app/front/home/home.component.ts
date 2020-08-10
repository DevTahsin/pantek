import { Component, OnInit, OnDestroy, INJECTOR, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { elementAt } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  images = [];
  imagesVisible = false;
  width;
  first=0;
  constructor(@Inject(DOCUMENT) private document: Document, private meta: Meta, private title: Title, private http: HttpClient, public translate: TranslateService, private app: AppComponent) { }

  metaSubscribe: Subscription;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }
  setImageWidth() {
    const docwidth = this.document.body.clientWidth;
    if (docwidth > 1600) {
      return 1980;
    }
    else if (docwidth > 1280) {
      return 1600;
    } else if (docwidth > 992) {
      return 1280;
    } else if (docwidth > 768) {
      return 992;
    } else {
      return 768;
    }
  }

  ngOnInit() {
    // this.http.get(environment.apiUrl+'/sampleMeta').toPromise().then((t: any) => {
    //   t.conten.forEach(element => {
    //     this.meta.addTag({name: element.name, content: element.content}) 
    //   });
    // });
    this.width = this.setImageWidth();
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      if(this.first>0){
        location.replace("/");
      }
      this.http.get(environment.apiUrl + '/client/homepage?lan=' + t.lang).toPromise().then((t: any) => { this.images = t.map(a => a + '?width=' + this.width); this.imagesVisible = true;
      this.app.addFrontScripts();
    });
      this.translate.get(['SAYFALAR.ANASAYFA.META-BASLIK', 'SAYFALAR.ANASAYFA.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.addTag({ name: 'description', content: t['SAYFALAR.ANASAYFA.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.ANASAYFA.META-BASLIK']);
      });
      this.first++;
    })
    // 
    document.body.classList.add('ashade-home-template');
  }
  locateHref(link) {
    location.replace(link);
  }
}
