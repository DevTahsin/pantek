import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

    metaSubscribe: Subscription;
    loadingText;
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
        this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
            this.translate.get(['LOADING']).toPromise().then(t => {
                this.loadingText = t['LOADING'];
            });
        });

    }

    ngOnDestroy(): void {
        this.metaSubscribe.unsubscribe();
    }
}
