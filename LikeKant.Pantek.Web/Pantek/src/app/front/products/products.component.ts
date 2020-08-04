import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

interface Group {
  name: string,
  image: string,
  description: string,
  link: string
}

interface Categories {
  name: string,
  groups: Group[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnDestroy {

  constructor(private meta: Meta,private title: Title,public translate: TranslateService) { }
  categories: Categories[];
  
  metaSubscribe:Subscription;
  ngOnDestroy(): void {
    this.metaSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.metaSubscribe= this.translate.onLangChange.subscribe(t => {
      this.translate.get(['SAYFALAR.URUNLER.META-BASLIK','SAYFALAR.URUNLER.META-ACIKLAMA']).toPromise().then(t => {
        this.meta.addTag({name: 'description', content:t['SAYFALAR.URUNLER.META-ACIKLAMA'] })
        this.title.setTitle(t['SAYFALAR.URUNLER.META-BASLIK']);
      });})
    this.categories = [{
      name: 'Işık',
      groups: [{
        name: 'DSL 100',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/isiklar'
      },
      {
        name: 'DSL 200',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/isiklar'
      },
      {
        name: 'DSL 300',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/isiklar'
      },
      {
        name: 'DSL 400',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/isiklar'
      }]
    },
    {
      name: 'Ses',
      groups: [{
        name: 'ADX 100',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/ses'
      },
      {
        name: 'ADX 200',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/ses'
      },
      {
        name: 'ADX 300',
        image: 'https://via.placeholder.com/800x640',
        description: 'In sit amet elit scelerisque, ullamcorper augue et, sodales justo. Praesent nec arcu mauris. Nam at sollicitudin nisi. Nulla at dolor mollis, maximus ligula at.',
        link: '/category/ses'
      }]
    }];
  }

}
