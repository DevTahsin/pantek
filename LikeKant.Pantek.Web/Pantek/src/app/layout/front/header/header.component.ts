import { Component, OnInit } from '@angular/core';
import { FrontComponent } from '../front.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedLanguage;
  languages: Array<any>= [];
  constructor(public frontCom: FrontComponent, private http: HttpClient, public translate: TranslateService) { 
  }

  ngOnInit(): void {
    this.http.get(environment.apiUrl + '/language/for').toPromise().then((t: any) => {
      const codes = [];
      t.forEach(element => {
        codes.push(element.code);
        if (element.isDefault && !localStorage["lang"]) {
          localStorage["lang"] = element.code;
        }
        this.languages.push({
          name: element.name,
          code: element.code,
          order: element.order,
          flagUrl: element.flagUrl,
          isSelected: element.code == localStorage["lang"]
        })
      });
      this.languages.sort((a,b) => a.order-b.order);
      this.translate.addLangs(codes);
      this.translate.setDefaultLang(localStorage["lang"]);
      this.changeLanguage(localStorage["lang"]);
    })
  }
  
  changeLanguage(code) {
    const found = this.languages.find(t => t.code == code);
    if(found){
      this.languages.forEach(t => {
        t.isSelected = false;
        if (t.code == code) {
          t.isSelected = true;
        }
      })
      found.isSelected = true;
      localStorage["lang"] = code;
      this.translate.use(code);
      this.selectedLanguage = found.name;
    }
  }
  
  
}
