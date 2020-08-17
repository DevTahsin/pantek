import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '../home/home.component';
import { FrontComponent } from '@app/layout/front/front.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

    html;
    first = false;
    constructor(private http: HttpClient, private front: FrontComponent, private meta: Meta, private title: Title, public translate: TranslateService, private app: AppComponent) { }
    metaSubscribe: Subscription;
    ngOnDestroy(): void {
        this.metaSubscribe.unsubscribe();
    }

    ngOnInit(): void {
        this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
            this.translate.get(['NOT-FOUND.DESCRIPTION', 'NOT-FOUND.TITLE']).toPromise().then(t => {
                this.meta.addTag({ name: 'description', content: t['NOT-FOUND.DESCRIPTION'] })
                this.title.setTitle(t['NOT-FOUND.TITLE']);
              });
            if (!this.first) {
                document.body.classList.add('is-centered','ashade-maintenance-wrap');
                // this.app.addFrontScripts();
            }
            this.first=true;
        });
        this.front.openTopPadding();
    }

    locateHref() {
        location.replace('/');
    }
}
