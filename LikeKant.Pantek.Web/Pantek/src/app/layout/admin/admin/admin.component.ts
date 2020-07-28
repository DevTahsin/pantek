import { Component, OnInit, ViewEncapsulation, HostBinding, Inject } from '@angular/core';
import { AppInfoService, ScreenService, AuthService } from './services';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @HostBinding('class') get getClass() {
    console.log(this.appInfo.title)
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private app: AppComponent,
    private authService: AuthService, 
    private screen: ScreenService, 
    public appInfo: AppInfoService) { }

  ngOnInit(): void {
    this.app.loadScripts([]);
    this.app.loadStyle('admin.css');
    this.document.body.className = 'dx-viewport dx-theme-material dx-theme-material-typography dx-color-scheme-orange-light';
  }

  isAutorized() {
    return this.authService.isLoggedIn;
  }

}
