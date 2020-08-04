import { Component, OnInit, ViewEncapsulation, HostBinding, Inject } from '@angular/core';
import { AppInfoService, ScreenService, AuthService } from './services';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { User } from './models';

import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";

// Dictionaries for German and Russian languages
import trMessages from "devextreme/localization/messages/tr.json";

// Common and language-specific CLDR JSONs
import supplemental from "devextreme-cldr-data/supplemental.json";
import trCldrData from "devextreme-cldr-data/tr.json";

import Globalize from "globalize";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: User;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private app: AppComponent,
    private authService: AuthService, 
    private screen: ScreenService, 
    public appInfo: AppInfoService) { 
      this.app.loadScripts([]);
      this.authService.user.subscribe(x => this.user = x);
      Globalize.load(
        supplemental, trCldrData
      );
      Globalize.loadMessages(trMessages);
      Globalize.locale(navigator.language);
    }

  ngOnInit(): void {
  }

  isAuthorized() {
    return this.user;
  }

}
