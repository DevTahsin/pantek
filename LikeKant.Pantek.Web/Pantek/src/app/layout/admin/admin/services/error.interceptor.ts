import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authService.logOut();
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            if((err.status === 404 || err.ok===false) && err.url.includes('assets/i18n')){
                location.replace('/tr/not-found');
            }
            console.error(err);
            return throwError(error);
        }))
    }
}