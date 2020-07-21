import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from '../layout/front/front.component';
import { HeaderComponent } from '../layout/front/header/header.component';
import { FooterComponent } from '../layout/front/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent }
    ]
  }
];

@NgModule({
  declarations: [FrontComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class FrontModule { }
