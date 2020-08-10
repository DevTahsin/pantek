import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontComponent } from 'src/app/layout/front/front.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';

interface Group {
    description,
    name,
    products: Product[]
}
interface Product {
    link: string;
    name: string;
    image: string;
}

@Component({
    selector: 'app-product-group',
    templateUrl: './product-group.component.html',
    styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit, OnDestroy {

    metaSubscribe: Subscription;
    first = 0;
    groupId;
    data = null;
    constructor(private app:AppComponent, private route: ActivatedRoute, private router: Router, private http: HttpClient, public translate: TranslateService, private meta: Meta, private title: Title) {
        const param = this.route.snapshot.paramMap.get('name');
        const splittedParam = param.split('-');
        if (param && splittedParam.length > 0) {
            this.groupId = splittedParam[splittedParam.length - 1];
        }
    }

    ngOnInit() {
        this.http.get(environment.apiUrl + '/client/group?d=' + this.groupId).toPromise().then(
            (v: any) => {
                this.data = v;
                this.meta.addTag({ name: 'description', content: this.data.description })
                this.title.setTitle(this.data.name + ' - PANTEK');
                this.app.addFrontScripts();
                document.body.classList.remove('ashade-home-template');
                document.body.classList.add('ashade-albums-template', 'ashade-albums-template--carousel');
            }
        )
        this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
            if (this.first > 0) {
                location.replace("/products")
            }
            this.first++;
        });

    }

    ngOnDestroy(): void {
        this.metaSubscribe.unsubscribe();
    }
}
