import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components';
import { AuthGuardService } from './services';
import { HomeComponent } from '../../../admin/home/home.component';
import { ProfileComponent } from '../../../admin/profile/profile.component';
import { DisplayDataComponent } from '../../../admin/display-data/display-data.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AdminComponent } from './admin.component';
import { LogViewComponent } from '../../../admin/log-view/log-view.component';
import { DxiColumnModule, DxoLookupModule } from 'devextreme-angular/ui/nested';

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
  imports: [RouterModule.forChild(routes), DxDataGridModule, DxiColumnModule, DxoLookupModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent, LogViewComponent]
})
export class AdminRoutingModule { }
