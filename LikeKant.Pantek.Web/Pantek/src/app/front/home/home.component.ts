import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { elementAt } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private meta: Meta,private title: Title, private http: HttpClient,public translate: TranslateService) { }

  metaSubscribe:Subscription;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    // this.http.get(environment.apiUrl+'/sampleMeta').toPromise().then((t: any) => {
    //   t.conten.forEach(element => {
    //     this.meta.addTag({name: element.name, content: element.content}) 
    //   });
    // });
    this.metaSubscribe= this.translate.onLangChange.subscribe(t => {
      this.translate.get(['SAYFALAR.ANASAYFA.META-BASLIK','SAYFALAR.ANASAYFA.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.addTag({name: 'description', content:t['SAYFALAR.ANASAYFA.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.ANASAYFA.META-BASLIK']);
      });})
    // 
    document.body.classList.add('ashade-home-template');
  }

}
