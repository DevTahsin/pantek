import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ImageUploadModule, LanguageTabModule } from './components';
import { AuthGuardService } from './services';
import { HomeComponent } from '../../../admin/home/home.component';
import { ProfileComponent } from '../../../admin/profile/profile.component';
import { DisplayDataComponent } from '../../../admin/display-data/display-data.component';
import { DxDataGridModule, DxFormModule, DxBoxModule, DxButtonGroupModule, DxResponsiveBoxModule, DxTabsModule, DxFileUploaderModule, DxButtonModule, DxNumberBoxModule, DxHtmlEditorModule, DxPopupComponent, DxPopupModule, DxTextBoxModule, DxValidationGroupModule, DxTextAreaModule, DxSelectBoxModule, DxValidatorComponent, DxValidatorModule, DxCheckBoxModule } from 'devextreme-angular';
import { AdminComponent } from './admin.component';
import { LogViewComponent } from '../../../admin/log-view/log-view.component';
import { HakkimizdaComponent, AnasayfaComponent, HaberlerComponent, IletisimComponent, UrunlerComponent } from '../../../admin/arayuz-sayfalar';
import { CokluDilComponent, GenelAyarlarComponent } from '../../../admin/ayarlar';
import { DxiColumnModule, DxoLookupModule } from 'devextreme-angular/ui/nested';
import { CommonModule } from '@angular/common';
import { NgJsonEditorModule } from 'ang-jsoneditor' 

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'display-data',
        component: DisplayDataComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'ayarlar',
        children: [{
          path: 'coklu-dil',
          component: CokluDilComponent,
          canActivate: [AuthGuardService]
        },{
          path: 'genel-ayarlar',
          component: GenelAyarlarComponent,
          canActivate: [AuthGuardService]
        }]
      },
      {
        path: 'sayfalar',
        children: [{
          path: 'hakkimizda',
          component: HakkimizdaComponent,
          canActivate: [AuthGuardService]
        }, {
          path: 'anasayfa',
          component: AnasayfaComponent,
          canActivate: [AuthGuardService]
        }, {
          path: 'haberler',
          component: HaberlerComponent,
          canActivate: [AuthGuardService]
        }, {
          path: 'iletisim',
          component: IletisimComponent,
          canActivate: [AuthGuardService]
        }, {
          path: 'urunler',
          component: UrunlerComponent,
          canActivate: [AuthGuardService]
        }]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login-form',
        component: LoginFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'log-view',
        component: LogViewComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: '',
        canActivate: [AuthGuardService]
      }]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), DxDataGridModule, DxiColumnModule, DxoLookupModule, DxFormModule, DxButtonGroupModule, LanguageTabModule,
    DxButtonModule, ImageUploadModule, DxNumberBoxModule, DxHtmlEditorModule, DxPopupModule, DxTextBoxModule, DxTabsModule, DxValidationGroupModule, DxTextAreaModule,
    DxSelectBoxModule, DxValidatorModule, DxCheckBoxModule, NgJsonEditorModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent,GenelAyarlarComponent, ProfileComponent, DisplayDataComponent, LogViewComponent, AnasayfaComponent,
    HakkimizdaComponent, AnasayfaComponent, UrunlerComponent, HaberlerComponent, IletisimComponent, CokluDilComponent]
})
export class AdminRoutingModule { }
