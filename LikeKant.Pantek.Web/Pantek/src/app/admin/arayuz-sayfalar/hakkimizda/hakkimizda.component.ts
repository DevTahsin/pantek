import { Component, ViewChild, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { DxHtmlEditorComponent } from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: 'hakkimizda.component.html',
  styleUrls: ['./hakkimizda.component.scss']
})

export class HakkimizdaComponent implements OnInit{
  languageId;
  altText;
  @ViewChild('htmlEditor') htmlEditor: DxHtmlEditorComponent;
  popup = {
    image: false
  }
  lastIndex;
  toolbarButtonOptions :any = {
    icon: 'image',
    onClick: () => {this.popup.image = true;this.lastIndex = this.htmlEditor.instance.getSelection()}
};
toolbarSaveButtonOptions :any = {
  icon: 'save',
  type: 'success',
  onClick: () => this.save()
};
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  languageChanged(id) {
    this.languageId = id;
    this.reloadHtml();
  }
  reloadHtml() {
    this.http.get(environment.apiUrl+'/client/about/html?lang='+this.languageId).toPromise().then((resp:any) => {
      if(resp) {
        this.htmlEditor.writeValue(resp.html);
      } else {
        this.htmlEditor.writeValue(null);
      }
    })
  }
  save() {
    this.http.post(environment.apiUrl+'/client/about', {
      languageId: this.languageId,
      html: this.htmlEditor.value
    }).toPromise().then(() => {
      notify('İçerik güncellendi', 'success', 2000)
    })
  }
  imageUploaded(e) {
    if(!!this.altText){
      this.htmlEditor.instance.insertEmbed(this.lastIndex?this.lastIndex.index:0, "extendedImage", {
        src: e,
        alt: this.altText
    })
    }
    this.popup.image = false;
  }
}