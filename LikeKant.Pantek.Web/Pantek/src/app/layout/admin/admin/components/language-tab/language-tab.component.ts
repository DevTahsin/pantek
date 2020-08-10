
import { Component, NgModule, ViewChild, Injectable, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { DxFileUploaderModule, DxButtonModule, DxFileUploaderComponent, DxTabsModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { map } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';


@Component({
    selector: 'app-language-tab',
    template: `<dx-tabs #apiTabs [dataSource]="tabs" [selectedIndex]="0" (onItemClick)="selectTab($event)" itemTemplate="tabItem">
    <div *dxTemplate="let itemData of 'tabItem'">
        <img width="24px" [src]="itemData.flagUrl"> {{itemData.name}}
    </div>
</dx-tabs>`
})

export class LanguageTabComponent implements OnInit {
    tabs;
    constructor(
        private http: HttpClient
    ) { }

    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() loaded: EventEmitter<any> = new EventEmitter();
    @Input('isCodeNeed') isCodeNeed=false;

    ngOnInit() {
        this.http.get<any>(environment.apiUrl + '/language', { withCredentials: true }).toPromise().then(data => { 
            this.tabs = data;this.loaded.emit(data); 
            if(this.isCodeNeed===false){
                this.change.emit((data.find(t => t.isSelected === true).id));
            } else {
                const found = data.find(t => t.isSelected === true);
                this.change.emit({id: found.id, code: found.code});
            }
        })
    }

    selectTab(e) {
        if(this.isCodeNeed===false){
            this.change.emit(this.tabs[e.itemIndex].id);
        } else {
            this.change.emit({id: this.tabs[e.itemIndex].id, code: this.tabs[e.itemIndex].code});
        }
    }

}



@NgModule({
    imports: [
        CommonModule,
        DxTabsModule
    ],
    declarations: [LanguageTabComponent],
    exports: [LanguageTabComponent]
})
export class LanguageTabModule { }
