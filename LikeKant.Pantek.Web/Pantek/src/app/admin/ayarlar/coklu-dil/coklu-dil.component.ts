import { Component, ViewChild } from '@angular/core';
import 'devextreme/data/odata/store';
import { AuthService } from '@app/layout/admin/admin/services';
import { createODataStore } from '@app/layout/admin/admin';
import { DxValidationGroupComponent, DxFormComponent } from 'devextreme-angular';
import DataSource from "devextreme/data/data_source";

export class Language {
  Id = 0;
  IsDeleted = false;
  Name = '';
  Code = '';
  Order = 1;
  FlagUrl = '';
  IsDefault = false;
}

@Component({
  templateUrl: 'coklu-dil.component.html',
  styleUrls: ['./coklu-dil.component.scss']
})
export class CokluDilComponent {
  dataSource: DataSource;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent
  saveButton = {
    icon: "save",
    text: "Kaydet",
    type: 'success',
    onClick: () => { this.save(); }
  };
  clearButton = {
    text: "TEMİZLE",
    onClick: () => { this.clear(); }
  };
  language = new Language();

  constructor(private authService: AuthService) {
    this.dataSource = new DataSource({
      store: createODataStore('languages', this.authService.userValue.jwtToken),
      select: [
        'Id',
        'Name',
        'Code',
        'Version',
        'Order',
        'FlagUrl',
        'IsDefault'
      ],
      filter: [
        ['IsDeleted', '=', false]
      ],
      sort: [
        { 'selector': 'Order' }
      ]
    })
  }
  ngOnInit() { }

  save() {
    if (!this.form.instance.validate().isValid) {
      return;
    }
    this.language.Id = this.language.Id;
    if (this.language.Id) {
      this.dataSource.store().update(this.language.Id, this.language).then(() => {
        this.dataSource.reload();
        this.clear();
      })
    } else {
      this.dataSource.store().insert(this.language).then(() => {
        this.dataSource.reload();
        this.clear();
      })
    }
  }

  clear() {
    this.language = new Language();
    this.form.instance.resetValues();
  }

  edit(row: Language) {
    this.language = new Language();
    this.language.Id = row.Id;
    this.language.Name = row.Name;
    this.language.Code = row.Code;
    this.language.FlagUrl = row.FlagUrl;
    this.language.Order = row.Order;
    this.language.IsDefault = row.IsDefault;
  }

  delete(id: number) {
    this.dataSource.store().remove(id).then(() => {
      this.dataSource.reload();
      this.clear();
    })
  }
}