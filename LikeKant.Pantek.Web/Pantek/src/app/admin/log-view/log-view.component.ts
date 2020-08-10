import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { LogType, LogStatus, createODataStore  } from '@admin/index';
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
          store: createODataStore('logs', this.authService.userValue.jwtToken),
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
