import { Component, OnInit, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { DxFormComponent, DxFileUploaderComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

export class HomepagePost {
    languageId = 0;
    images: {
        imageUrl: string
    }[] = [];
}

@Component({
    templateUrl: 'anasayfa.component.html',
    styleUrls: ['./anasayfa.component.scss']
})

export class AnasayfaComponent implements OnInit {
    tabs;
    languageId;
    images: any;
    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get<any>(environment.apiUrl + '/language', { withCredentials: true }).toPromise().then(data => { this.tabs = data; this.languageChanged(data.find(t => t.isSelected === true).id) })
    }

    languageChanged(id) {
        this.languageId = id;
        this.refreshImages();
    }
    imageUploaded(e) {
        if (e) {
            var req = {
                languageId: this.languageId,
                images: [{ imageUrl: e }]
            }
            this.http.post(environment.apiUrl + '/client/homepage/', req, { withCredentials: true }).toPromise().then(() => this.refreshImages());
        }
    }
    imageDeleted(e) {

    }
    refreshImages() {
        if (this.languageId) {
            this.http.get(environment.apiUrl + '/client/homepage/photos?lang=' + this.languageId, { withCredentials: true }).toPromise().then((data: any) => this.images = data);
        }
    }
    delete(id) {
        this.http.delete(environment.apiUrl + '/client/homepage/photos?id=' + id, { withCredentials: true }).toPromise().then(() => {
            notify('Resim silindi', 'success', 500);
            this.refreshImages();
        });
    }
    orderChanged(e, id) {
        this.http.get(environment.apiUrl+'/client/homepage/order?id='+id+'&order='+e.value, {withCredentials: true}).toPromise().then(resp => {
            notify('Sıra numarası değiştirildi', 'success', 500);
        });
    }
}