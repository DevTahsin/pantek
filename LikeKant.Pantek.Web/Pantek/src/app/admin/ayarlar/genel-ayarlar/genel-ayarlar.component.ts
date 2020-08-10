import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  templateUrl: 'genel-ayarlar.component.html',
  styleUrls: ['./genel-ayarlar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GenelAyarlarComponent implements OnInit {
  languageId;
  code;
  public editorOptions: JsonEditorOptions;
  public data: any;
  default: any;
  beforeChange;
  notFound = false;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor(private http: HttpClient) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['tree']; // set all allowed modes
  }

  generateGuid() {
    var value = "";
    for (var i = 0; i < 32; i++) {
      value += Math.round(15 * Math.random()).toString(16)
    }
    return value
  }
  ngOnInit() {
    this.http.get(environment.imagePathBase + 'assets/i18n/defaultv1.json').toPromise().then(
      r => this.default = r
    )
  }
  imageUploaded(e) { }

  languageChanged(e) {
    this.languageId = e.id;
    this.code = e.code;
    setTimeout(() =>
      this.http.get(environment.imagePathBase + 'assets/i18n/' + e.code + '.json?v=' + this.generateGuid()).toPromise().then(
        r => { this.data = r; this.beforeChange = r; this.notFound = false; }
      ).catch(error => {
        this.notFound = true;
        this.clearLanguage();
      }), 150);
  }

  saveLanguage() {
    if (this.editor.isValidJson()) {
      this.http.post(environment.apiUrl + '/settings/language', { languageId: this.languageId, json: JSON.stringify(this.editor.get()) }).toPromise().then(resp => {
        notify("Dil ayarları başarılı bir şekilde kaydedildi", 'success', 500);
        this.languageChanged({ id: this.languageId, code: this.code });
      }).catch(error => {
        notify("Dil ayarları kaydedilirken bir hata meydana geldi", 'error', 500);
      })
    } else {
      notify("Düzenleme yaparken bir şeyi  yanlış yaptın. Geri al ve tekrar dene", 'error', 5000);
    }
  }
  clearLanguage() {
    if (this.notFound) {
      this.data = { ...this.default };
    } else {
      this.data = { ...this.beforeChange }
    }
  }
}