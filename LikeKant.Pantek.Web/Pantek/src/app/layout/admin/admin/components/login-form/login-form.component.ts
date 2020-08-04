import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { AuthService, AppInfoService } from '../../services';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { first } from 'rxjs/operators';
import { DxLoadIndicatorModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  login = '';
  password = '';
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public appInfo: AppInfoService) {
    if (this.authService.userValue) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  onLoginClick(args) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }

    this.loading = true;
    this.authService.logIn(this.login, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error: any) => {
          if (error.message) {
            notify(error.message, 'error', 2000);
          } else {
            notify(error, 'error', 20000);
          }
          this.loading = false
        }
      });

    args.validationGroup.reset();
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxLoadIndicatorModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
