import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(private meta: Meta, private title: Title, public translate: TranslateService) { }
  metaSubscribe: Subscription;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
      this.translate.get(['SAYFALAR.HAKKIMIZDA.META-BASLIK', 'SAYFALAR.HAKKIMIZDA.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.addTag({ name: 'description', content: t['SAYFALAR.HAKKIMIZDA.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.HAKKIMIZDA.META-BASLIK']);
      });
    })
  }

}
