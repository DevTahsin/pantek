import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontComponent } from './layout/front/front.component';

const routes: Routes = [{
  path: '',
  loadChildren: './front/front.module#FrontModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
