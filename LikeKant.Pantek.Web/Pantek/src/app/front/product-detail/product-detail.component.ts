import { Component, OnInit } from '@angular/core';
import { FrontComponent } from 'src/app/layout/front/front.component';

interface Image{
    link: string;
    alt: string;
}
interface ProductDetail {
    images: Image[];
    descriptionHtml: string;
    header: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  data: ProductDetail;
  constructor(private layout: FrontComponent) { 
    this.layout.openTopPadding();
    this.data = {
      images: [{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 1'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 2'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 3'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 4'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 5'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 6'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 7'
      },{
        link: 'https://via.placeholder.com/1920x1080',
        alt: 'image 8'
      }],
      header: 'DSL 100 0.1',
      descriptionHtml: `<p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui
      in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
      quo voluptas nulla pariatur?"</p>

  <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui
      in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
      quo voluptas nulla pariatur?"</p>
  <div class="align-right ashade-signature-wrap">
      <img src="upload/signature.png" alt="Signature" width="200" height="116">
  </div>`
    }
  }
  ngOnInit(): void {
  }

}
