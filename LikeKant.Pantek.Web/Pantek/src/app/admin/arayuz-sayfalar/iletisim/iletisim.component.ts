import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: 'iletisim.component.html',
  styleUrls: ['./iletisim.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class IletisimComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  mesajPopup = false;
  messages;
  okunduCount = 0;
  okunmadiCount = 0;
  message = {
    id: null,
    name: null,
    phone: null,
    message: null,
    email: null,
    ipAddress: null,
    insertTime: null,
    isRead: null
  }
  ngOnInit() {
    this.loadMessages();
  }
  loadMessages() {
    this.messages = new CustomStore({
      key: "id",
      load: function (loadOptions: any) {
        return this.http.get(environment.apiUrl + '/client/contacts/all', { withCredentials: true })
          .toPromise()
          .then((data: any) => {
            this.okunduCount = data.data.filter(t => t.isRead).length;
            this.okunmadiCount = data.count - this.okunduCount;
            return {
              totalCount: data.count,
              data: data.data,
            };
          })
          .catch(error => { throw 'Data Loading Error' });
      }.bind(this)
    });
  }

  read(id) {
    this.http.put(environment.apiUrl + '/client/contact/read?id=' + id, null, { withCredentials: true }).toPromise().then(resp => {
      notify('Mesaj okundu', 'success', 500);
      this.loadMessages();
    })
  }
  show(value) {
    this.message = value;
    this.mesajPopup = true;
  }
  rowYuklendi(e) {
    if (e.rowType !== "data")
      return
    if (e.data.isRead === false) {
      e.rowElement.classList.add('colored-row')
    }
  }
}