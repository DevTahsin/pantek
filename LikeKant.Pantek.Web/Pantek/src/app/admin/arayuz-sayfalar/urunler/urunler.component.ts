import { Component, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { DxValidationGroupComponent, DxHtmlEditorComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import CustomStore from 'devextreme/data/custom_store';
@Component({
  templateUrl: 'urunler.component.html',
  styleUrls: ['./urunler.component.scss']
})

export class UrunlerComponent {
  constructor(private http: HttpClient) {
  }

  languageId;
  languageChanged(id) {
    this.languageId = id;
    this.loadCategories();
  }

  categoryTabs;
  @ViewChild('categoryValidation') categoryValidation: DxValidationGroupComponent
  category = {
    id: 0,
    name: null
  }
  categoryPopup = false;
  selectedCategory;
  loadCategories() {
    this.http.get<any>(environment.apiUrl + '/client/categories-server?lang=' + this.languageId, { withCredentials: true }).toPromise().then(data => { this.categoryTabs = data; this.selectedCategory = data ? data[0].id : null;if(data){data[0]['isSelected']=true;} this.groupClear(); this.loadGroups(); });
    this.categoryClear();
  }
  categoriesChanged(e) {
    this.selectedCategory = this.categoryTabs[e.itemIndex].id;
    this.groupClear();
    this.loadGroups();
  }
  categoryClear() {
    this.category = {
      id: 0,
      name: null
    }
    if (this.categoryValidation.instance) {
      this.categoryValidation.instance.reset();
    }
  }
  categoryDelete(name, id) {
    confirm("<b>" + name + "</b> adlı kategoriyi silmek istediğinize emin misiniz?", "Değişiklikleri onayla").then(t => {
      if (t) {
        this.http.delete(environment.apiUrl + '/client/categories?id=' + id, { withCredentials: true }).toPromise().then(resp => {
          this.loadCategories();
          notify(name + " silindi", "success", 500);
        });
      }
    })
  }
  categorySave() {
    if (this.categoryValidation.instance.validate().isValid) {
      if (this.category.id) {
        this.http.put(environment.apiUrl + '/client/categories', { id: this.category.id, name: this.category.name }, { withCredentials: true }).toPromise().then(t => {
          this.categoryClear();
          this.categoryPopup = false;
          this.loadCategories();
          notify("Kategori güncellendi", "success", 500);
        });
      } else {
        this.http.post(environment.apiUrl + '/client/categories', { languageId: this.languageId, name: this.category.name }, { withCredentials: true }).toPromise().then(t => {
          this.categoryClear();
          this.categoryPopup = false;
          this.loadCategories();
          notify("Kategori kaydedildi", "success", 500);
        });
      }
    }
  }


  groupTabs;
  @ViewChild('groupValidation') groupValidation: DxValidationGroupComponent
  group = {
    id: 0,
    name: null,
    imageUrl: null,
    description: null,
    categoryId: this.selectedCategory
  }
  groupPopup = false;
  selectedGroup = null;
  loadGroups() {
    this.http.get<any>(environment.apiUrl + '/client/groups-server?cid=' + this.group.categoryId, { withCredentials: true }).toPromise().then(data => { this.groupTabs = data; this.selectedGroup = data ? data[0].id : null;if(data){data[0]['isSelected']=true;} this.loadProducts(); this.productClear(); });
    this.categoryClear();
  }
  groupsChanged(e) {
    this.selectedGroup = this.groupTabs[e.itemIndex].id;
    this.loadProducts();
    this.productClear();
  }
  groupClear() {
    this.group = {
      id: 0,
      name: null,
      imageUrl: null,
      description: null,
      categoryId: this.selectedCategory
    }
    if (this.groupValidation.instance) {
      this.groupValidation.instance.reset();
    }
  }
  groupDelete(name, id) {
    confirm("<b>" + name + "</b> adlı grubu silmek istediğinize emin misiniz?", "Değişiklikleri onayla").then(t => {
      if (t) {
        this.http.delete(environment.apiUrl + '/client/groups?id=' + id, { withCredentials: true }).toPromise().then(resp => {
          this.loadCategories();
          notify(name + " silindi", "success", 500);
        });
      }
    })
  }
  groupSave() {
    if (this.groupValidation.instance.validate().isValid) {
      if (this.group.imageUrl) {
        if (this.group.id) {
          this.http.put(environment.apiUrl + '/client/groups', { id: this.group.id, name: this.group.name, description: this.group.description, imageUrl: this.group.imageUrl, categoryId: this.group.categoryId }, { withCredentials: true }).toPromise().then(t => {
            this.groupClear();
            this.groupPopup = false;
            this.loadGroups();
            notify("Grup güncellendi", "success", 500);
          });
        } else {
          this.http.post(environment.apiUrl + '/client/groups', { categoryId: this.selectedCategory, name: this.group.name, description: this.group.description, imageUrl: this.group.imageUrl }, { withCredentials: true }).toPromise().then(t => {
            this.groupClear();
            this.groupPopup = false;
            this.loadGroups();
            notify("Grup kaydedildi", "success", 500);
          });
        }
      } else {
        notify('Resim girmek zorunludur', 'info', 2000)
      }
    }
  }
  groupImageUploaded(e) {
    if (e) {
      this.group.imageUrl = e;
    }
  }
  groupImageDeleted() {
    this.group.imageUrl = null;
  }

  productDataSource;
  @ViewChild('productValidation') productValidation: DxValidationGroupComponent
  product = {
    id: 0,
    title: null,
    metaDescription: null,
    innerHTML: null,
    groupId: this.selectedGroup,
    images: []
  }
  loadProducts() {
    this.productDataSource = new CustomStore({
      key: "id",
      load: function (loadOptions: any) {
        return this.http.get(environment.apiUrl + '/client/products-server?gid='+this.selectedGroup, { withCredentials: true })
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
  productClear() {
    this.product = {
      id: 0,
      title: null,
      metaDescription: null,
      innerHTML: null,
      groupId: this.selectedGroup,
      images: []
    }
    this.htmlEditor.writeValue(null);
    if (this.productValidation.instance) {
      this.productValidation.instance.reset();
    }
    this.product.groupId = this.selectedGroup;
  }
  productDelete(name, id) {
    confirm("<b>" + name + "</b> adlı ürünü silmek istediğinize emin misiniz?", "Değişiklikleri onayla").then(t => {
      if (t) {
        this.http.delete(environment.apiUrl + '/client/products?id=' + id, { withCredentials: true }).toPromise().then(resp => {
          this.loadCategories();
          notify(name + " silindi", "success", 500);
        });
      }
    })
  }
  editProduct(data) {
    if (this.productValidation.instance) {
      this.productValidation.instance.reset();
    }
    this.product = {
      id: data.id,
      title: data.title,
      metaDescription: data.metaDescription,
      innerHTML: data.innerHTML,
      groupId: this.selectedGroup,
      images: data.images
    }
    this.htmlEditor.writeValue(data.innerHTML);
  }
  productImageDelete(id, url) {
    if (!id) {
      this.product.images = this.product.images.filter(v => v.imageURL != url);
    } else {
      confirm("Ürün fotoğrafını silmek istediğinize emin misiniz?", "Değişiklikleri onayla").then(t => {
        if (t) {
          this.http.delete(environment.apiUrl + '/client/products/image?id=' + id, { withCredentials: true }).toPromise().then(resp => {
            this.product.images = this.product.images.filter(v => v.imageURL != url);
            notify("Ürün fotoğrafı silindi", "success", 500);
          });
        }
      })
    }
  }
  productSave() {
    if (this.productValidation.instance.validate().isValid) {
      if (this.product.id) {
        this.http.put(environment.apiUrl + '/client/products', { id: this.product.id, title: this.product.title, metaDescription: this.product.metaDescription, innerHTML: this.htmlEditor.value, groupId: this.product.groupId, images: this.product.images }, { withCredentials: true }).toPromise().then(t => {
          this.productClear();
          this.loadProducts();
          notify("Ürün güncellendi", "success", 500);
        });
      } else {
        this.http.post(environment.apiUrl + '/client/products', { title: this.product.title, metaDescription: this.product.metaDescription, innerHTML:this.htmlEditor.value, groupId: this.product.groupId, images: this.product.images }, { withCredentials: true }).toPromise().then(t => {
          this.productClear();
          this.loadProducts();
          notify("Ürün kaydedildi", "success", 500);
        });
      }
    }
  }
  productImageUploaded(e) {
    this.product.images.push({ id: 0, imageURL: e.url, altText: e.altText });
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