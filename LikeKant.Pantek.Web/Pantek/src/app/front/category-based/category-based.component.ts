import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontComponent } from 'src/app/layout/front/front.component';

interface Product {
    id: string;
    name: string;
    image: string;
}

@Component({
    selector: 'app-category-based',
    templateUrl: './category-based.component.html',
    styleUrls: ['./category-based.component.scss']
})
export class CategoryBasedComponent implements OnInit {

    kategori;
    data: Product[];
    constructor(private route: ActivatedRoute) {
        this.kategori = this.route.snapshot.paramMap.get('name');
        this.data = [{
            id: '1',
            name: 'DSL 100 0.1',
            image: 'https://via.placeholder.com/500x600'
        },{
            id: '2',
            name: 'DSL 100 0.2',
            image: 'https://via.placeholder.com/500x600'
        },{
            id: '3',
            name: 'DSL 100 0.3',
            image: 'https://via.placeholder.com/500x600'
        },{
            id: '4',
            name: 'DSL 100 0.4',
            image: 'https://via.placeholder.com/500x600'
        }];
    }
    ngOnInit(): void {
    }

}
