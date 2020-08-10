import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from '../layout/front/front.component';
import { HeaderComponent } from '../layout/front/header/header.component';
import { FooterComponent } from '../layout/front/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleAnalyticsService } from '@app/services/google-analytics.service';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'news', component: NewsComponent},
      { path: 'contact', component: ContactComponent},
      { path: 'product/:name', component: ProductDetailComponent },
      { path: 'article/:name', component: ArticleComponent },
      { path: 'product-group/:name', component: ProductGroupComponent },
      // { path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  declarations: [
    FrontComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, ContactComponent,
    ProductsComponent, ProductGroupComponent, ProductDetailComponent, LoadingComponent, NotFoundComponent,NewsComponent, ArticleComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [RouterModule],
  providers: [GoogleAnalyticsService]
})
export class FrontModule { }
