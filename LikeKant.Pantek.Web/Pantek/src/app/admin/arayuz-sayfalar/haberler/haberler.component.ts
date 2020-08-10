import { Component, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { DxHtmlEditorComponent, DxValidationGroupComponent } from 'devextreme-angular';
import { environment } from '@environments/environment';
import CustomStore from 'devextreme/data/custom_store';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: 'haberler.component.html',
  styleUrls: ['./haberler.component.scss']
})

export class HaberlerComponent {
  constructor(private http: HttpClient) {
  }

  languageId;
  languageTabs;
  languageChanged(id) {
    this.languageId = id;
    this.loadNews();
    this.newsClear();
  }
  languageTabsLoaded(e){this.languageTabs = e;}
  
  newDataSource;
  @ViewChild('newValidation') newsValidation: DxValidationGroupComponent
  news = {
    id: 0,
    title: null,
    metaDescription: null,
    innerHTML: null,
    languageId: this.languageId,
    images: []
  }
  loadNews() {
    this.newDataSource = new CustomStore({
      key: "id",
      load: function (loadOptions: any) {
        return this.http.get(environment.apiUrl + '/client/news-server?lang='+this.languageId, { withCredentials: true })
          .toPromise()
          .then((data: any) => {
            return {
              data: data,
            };
          })
          .catch(error => { throw 'Data Loading Error' });
      }.bind(this)
    });
  }
  newsClear() {
    this.news = {
      id: 0,
      title: null,
      metaDescription: null,
      innerHTML: null,
      languageId: this.languageId,
      images: []
    }
    this.htmlEditor.writeValue(null);
    if (this.newsValidation.instance) {
      this.newsValidation.instance.reset();
    }
    this.news.languageId = this.languageId;
  }
  newsDelete(name, id) {
    confirm("<b>" + name + "</b> adlı haberi silmek istediğinize emin misiniz?", "Değişiklikleri onayla").then(t => {
      if (t) {
        this.http.delete(environment.apiUrl + '/client/news?id=' + id, { withCredentials: true }).toPromise().then(resp => {
          this.loadNews();
          notify(name + " silindi", "success", 500);
        });
      }
    })
  }
  editNews(data) {
    if (this.newsValidation.instance) {
      this.newsValidation.instance.reset();
    }
    this.news = {
      id: data.id,
      title: data.title,
      metaDescription: data.metaDescription,
      innerHTML: data.innerHTML,
      languageId: this.languageId,
      images: data.images
    }
    this.htmlEditor.writeValue(data.innerHTML);
  }
  newsImageDelete(id, url) {
    if (!id) {
      this.news.images = this.news.images.filter(v => v.imageURL != url);
    } else {
      confirm("Haber fotoğrafını silmek istediğinize emin misiniz?", "Değişiklikleri onayla").then(t => {
        if (t) {
          this.http.delete(environment.apiUrl + '/client/news/image?id=' + id, { withCredentials: true }).toPromise().then(resp => {
            this.news.images = this.news.images.filter(v => v.imageURL != url);
            notify("Haber fotoğrafı silindi", "success", 500);
          });
        }
      })
    }
  }
  newsSave() {
    if (this.newsValidation.instance.validate().isValid) {
      if (this.news.id) {
        this.http.put(environment.apiUrl + '/client/news', { id: this.news.id, title: this.news.title, metaDescription: this.news.metaDescription, innerHTML: this.htmlEditor.value, languageId: this.news.languageId, images: this.news.images }, { withCredentials: true }).toPromise().then(t => {
          this.newsClear();
          this.loadNews();
          notify("Haber güncellendi", "success", 500);
        });
      } else {
        this.http.post(environment.apiUrl + '/client/news', { title: this.news.title, metaDescription: this.news.metaDescription, innerHTML:this.htmlEditor.value, languageId: this.news.languageId, images: this.news.images }, { withCredentials: true }).toPromise().then(t => {
          this.newsClear();
          this.loadNews();
          notify("Haber kaydedildi", "success", 500);
        });
      }
    }
  }
  newsImageUploaded(e) {
    this.news.images.push({ id: 0, imageURL: e.url, altText: e.altText, isDefault: e.isDefault });
  }
  isDefaultChanged(e, url) {
    const ind = this.news.images.findIndex(t => t.imageURL==url);
    if (ind != -1) {
      this.news.images[ind].isDefault = e;
    }
  }
  // productImageDeleted(e) {
  //   const foundProduct = this.product.images.find(t => t.imageURL == e);
  //   if(foundProduct) {
  //     foundProduct.deleted
  //   }
  // }  
  @ViewChild('htmlEditor') htmlEditor: DxHtmlEditorComponent;
  popup = {
    image: false
  }
  lastIndex;
  altText;
  toolbarButtonOptions: any = {
    icon: 'image',
    onClick: () => { this.popup.image = true; this.lastIndex = this.htmlEditor.instance.getSelection() }
  };

  imageUploaded(e) {
    if (!!this.altText) {
      this.htmlEditor.instance.insertEmbed(this.lastIndex ? this.lastIndex.index : 0, "extendedImage", {
        src: e,
        alt: this.altText
      })
    }
    this.popup.image = false;
  }
}