import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '../home/home.component';
import { FrontComponent } from '@app/layout/front/front.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    contactForm: FormGroup;
    first = true;
    constructor(private http: HttpClient, private front: FrontComponent, private meta: Meta, private title: Title, public translate: TranslateService, private app: AppComponent, private formBuilder: FormBuilder) {
        this.contactForm = this.formBuilder.group({
            name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            phone: [null, [Validators.required, Validators.minLength(8)]],
            message: [null, [Validators.required, Validators.maxLength(1500)]],
        });
    }
    metaSubscribe: Subscription;
    ngOnDestroy(): void {
        this.metaSubscribe.unsubscribe();
    }

    ngOnInit(): void {
        this.metaSubscribe = this.translate.onLangChange.subscribe(t => {
            //   this.http.get(environment.apiUrl+'/client/about?lan='+t.lang).toPromise().then((t:any)=> {if(t){this.html = t.html} });
            this.translate.get(['SAYFALAR.ILETISIM.META-BASLIK', 'SAYFALAR.ILETISIM.META-ACIKLAMA']).toPromise().then(t => {
                this.meta.addTag({ name: 'description', content: t['SAYFALAR.ILETISIM.META-ACIKLAMA'] })
                this.title.setTitle(t['SAYFALAR.ILETISIM.META-BASLIK']);
            });
            if (this.first) {
                this.app.addFrontScripts();
            }
            this.first = false;
        });
        this.front.openTopPadding();
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    onSubmit(customerData) {
        if (this.contactForm.valid) {
            this.http.post(environment.apiUrl + '/client/contact', customerData).toPromise().then(resp => {
                alert('Mesajınız iletilmiştir.');
                this.contactForm.reset();
            });
        } else {
            this.validateAllFormFields(this.contactForm);
        }
    }

    get name() {
        return this.contactForm.get('name');
    }
    get email() {
        return this.contactForm.get('email');
    }
    get phone() {
        return this.contactForm.get('phone');
    }
    get message() {
        return this.contactForm.get('message');
    }

}
