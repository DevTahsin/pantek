
import { Component, NgModule, ViewChild, Injectable, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { DxFileUploaderModule, DxButtonModule, DxFileUploaderComponent, DxTextBoxModule, DxCheckBoxModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { map } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class ImageUploadService {

    constructor(private http: HttpClient) { }

    uploadImage(dosya: FormData) {
        const headers = new HttpHeaders();
        headers.append('enctype', 'multipart/form-data');
        return this.http.post(environment.apiUrl + '/cdn/image', dosya, { headers: headers, withCredentials: true });
    }

    uploadLogo(dosya: FormData) {
        const headers = new HttpHeaders();
        headers.append('enctype', 'multipart/form-data');
        return this.http.post(environment.apiUrl + '/settings/logo', dosya, { headers: headers, withCredentials: true });
    }
}

@Component({
    selector: 'app-image-upload',
    template: `<dx-file-uploader id="file" #dxGorsel selectButtonText="Görsel Seç"
  [multiple]="false" labelText="" accept="image/jpeg,image/png" uploadMode="useForm" (onValueChanged)="gorsellerSecildi($event)" >
  </dx-file-uploader>
   <img *ngIf="gorselUrl" [src]="gorselUrl+'?width=200&height=200'" width="200" height="200" /><br><br>
   <dx-text-box *ngIf="altTextVisible" placeholder="Resim açıklamasını giriniz" [(value)]="altText" style="margin-top:24px;width:240px;"> </dx-text-box>
   <ng-container *ngIf="isDefaultVisible"> Varsayılan Fotoğraf mı? <dx-check-box [(value)]="isDefault" style="margin-top:24px;width:240px;"> </dx-check-box></ng-container>
   <div style="margin-top:12px;">
  <dx-button width="120" [disabled]="!isUploadActive || (dxGorsel.value?.length==0 || dxGorsel.disabled)" icon="upload" text="Yükle" (click)="karsiyaYukle()"></dx-button>
  <dx-button width="120" [disabled]="dxGorsel.value?.length==0" icon="remove" style="margin-left:15px;" text="Kaldır" (click)="gorselIptal()"></dx-button></div>`
})

export class ImageUploadComponent implements OnChanges {

    constructor(
        private servis: ImageUploadService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.url) {
            this.gorselUrl = changes.url.currentValue;
        }
    }

    @Input('gorselUrl') gorselUrl: string;
    @Input('altTextVisible') altTextVisible = false;
    @Input('isLogo') isLogo = false;
    @Input('isDefaultVisible') isDefaultVisible = false;
    altText;
    isDefault=false;
    gorselData: any = null;
    cdnEndpoint = environment.apiUrl + '/cdn/image';
    //   @Input('fileName') fileName: string;
    @ViewChild('dxGorsel') dxGorsel: DxFileUploaderComponent;
    //   @Input('subPath') subPath: string;
    @Output() uploaded: EventEmitter<any> = new EventEmitter();
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    @Input('isUploadActive') isUploadActive: boolean = true;
    //   @Input('url') url: string;

    karsiyaYukle() {
        // if (!this.fileName) {
        //   this.gorselIptal();
        // }

        if (this.gorselData) {
            const formData: FormData = new FormData();
            formData.append('file', this.gorselData);
            // formData.append('fileName', this.gorselData.fileName + random);
            // formData.append('path', environment.IMAGE_CDN.PATH + (this.subPath ? '/' + this.subPath : ''));
            if(this.isLogo) {
                this.servis.uploadLogo(formData).toPromise().then(
                    (resp:any) => {
                        this.gorselUrl = '/assets/logo/logo-256x256.png';
                        this.dxGorsel.value = [];
                        this.uploaded.emit(this.gorselUrl);
                        notify('Logo başarıyla yüklendi', 'info');
                    }
                )
                return;
            }
            this.servis.uploadImage(formData).toPromise().then(
                (resp: any) => {
                    // this.gorselUrl = environment.IMAGE_CDN.ENDPOINT +
                    //   '/uploads/image/' +
                    //   environment.IMAGE_CDN.PATH +
                    //   (this.subPath ? '/' + this.subPath : '') +
                    //   '/' + this.gorselData.fileName + random +
                    //   '.jpg';
                    this.gorselUrl = environment.imagePathBase + resp.path;
                    this.dxGorsel.value = [];
                    if (this.altTextVisible && this.isDefaultVisible) {
                        this.uploaded.emit({url: this.gorselUrl, altText: this.altText, isDefault: this.isDefault});
                    } else if(this.altTextVisible && !this.isDefaultVisible){
                        this.uploaded.emit({url: this.gorselUrl, altText: this.altText});
                    } else if(!this.altTextVisible && this.isDefaultVisible){
                        this.uploaded.emit({url: this.gorselUrl, isDefault: this.isDefault});
                    }                  
                    else {
                        this.uploaded.emit(this.gorselUrl);
                    }
                    notify('Görsel başarıyla yüklendi', 'info');
                }
            );
        } else {
            notify('Yüklenecek bir dosya bulunamadı', 'warning');
        }
    }

    gorselIptal() {
        this.dxGorsel.disabled = false;
        this.dxGorsel.value = [];
        this.gorselUrl = '';
        if (this.altTextVisible) { this.altText = null; }
        if (this.isDefaultVisible) {this.isDefault = null;}
        this.deleted.emit();
    }

    gorsellerSecildi(event) {
        if (event.value.length > event.previousValue.length) { // yükleme
            this.gorselData = event.value[0];
            //   if (this.gorselData) {
            //     this.gorselData = event.value[0];
            //   } else {
            //     this.gorselIptal();
            //     notify('Dosya yükleyebilmek için ilk olarak Url girmelisiniz.', 'warning');
            //   }
        } else { // silme
            this.gorselData = null;
        }
    }
}



@NgModule({
    imports: [
        CommonModule,
        DxFileUploaderModule,
        DxButtonModule,
        DxTextBoxModule,
        DxCheckBoxModule,
        ReactiveFormsModule
    ],
    declarations: [ImageUploadComponent],
    exports: [ImageUploadComponent],
    providers: [ImageUploadService]
})
export class ImageUploadModule { }
