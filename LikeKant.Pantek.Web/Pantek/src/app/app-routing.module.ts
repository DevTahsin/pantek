import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //   {
  //   path: '',
  //   loadChildren: './front/front.module#FrontModule'
  // },
  { path: 'admin', loadChildren: () => import('./layout/admin/admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: '/tr', pathMatch: 'full'  },
  { path: '', loadChildren: () => import('./front/front.module').then(m => m.FrontModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
