import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from '../layout/front/front.component';
import { HeaderComponent } from '../layout/front/header/header.component';
import { FooterComponent } from '../layout/front/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { CategoryBasedComponent } from './category-based/category-based.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:name', component: ProductDetailComponent },
      { path: 'category/:name', component: CategoryBasedComponent }
    ]
  }
];

@NgModule({
  declarations: [
    FrontComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent,
    ProductsComponent, CategoryBasedComponent, ProductDetailComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class FrontModule { }
