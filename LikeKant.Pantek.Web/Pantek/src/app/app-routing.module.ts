import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontComponent } from './layout/front/front.component';

const routes: Routes = [{
  path: '',
  loadChildren: './front/front.module#FrontModule'
},
  { path: 'admin', loadChildren: () => import('./layout/admin/admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
