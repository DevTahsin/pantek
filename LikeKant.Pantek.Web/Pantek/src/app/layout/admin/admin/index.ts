import ODataStore from 'devextreme/data/odata/store';
import { environment } from '@environments/environment';

export * from './side-nav-outer-toolbar/side-nav-outer-toolbar.component';
export * from './side-nav-inner-toolbar/side-nav-inner-toolbar.component';
export * from './single-card/single-card.component';
export * from './lookup'

export function createODataStore(entityName:string,jwtToken:string, keyName?:string) {
    return new ODataStore({
        url: environment.odataUrl+'/'+entityName,
        key: keyName ? keyName:'Id',
        version: 4,
        withCredentials: true,
        beforeSend: function (request) {  
          request.headers['Authorization'] = 'Bearer ' + jwtToken;  
          // request.timeout = 500000;  
      }});
}