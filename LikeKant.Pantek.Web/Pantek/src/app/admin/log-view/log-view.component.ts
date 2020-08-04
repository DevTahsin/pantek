import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { LogType, LogStatus  } from '@admin/index';
import { AuthService } from '@app/layout/admin/admin/services/auth.service';
import ODataStore from 'devextreme/data/odata/store';
@Component({
  templateUrl: 'log-view.component.html',
  styleUrls: [ './log-view.component.scss' ]
})

export class LogViewComponent {    
  dataSource: any;
  typeLookupData = LogType;
  statusLookupData = LogStatus;
  constructor(private authService: AuthService) {
      this.dataSource = {
          store: new ODataStore({
              url: environment.odataUrl+'/logs',
              key: 'Id',
              version: 4,
              withCredentials: true,
              beforeSend: function (request) {  
                request.headers['Authorization'] = 'Bearer ' + this.authService.userValue.jwtToken;  
                // request.timeout = 500000;  
            }.bind(this)
          }),
          select: [
              'Id',
              'LogTime',
              'Type',
              'Status',
              'Message',
              'IP'
          ],
          sort: [
            {'selector': 'LogTime', desc: true}
          ]
      }
  }
}
