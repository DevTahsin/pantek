import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
  constructor(private meta: Meta, public translate: TranslateService, private http: HttpClient) {}

  ngOnInit(){
  }
}
