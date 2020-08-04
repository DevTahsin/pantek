import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, first } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  loggedIn = true;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  logIn(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }, { withCredentials: true })
      .pipe(map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }


  logOut() {
    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/admin/login-form']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  get isLoggedIn() {
    return this.userSubject.value;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.userValue;
    const isLoginForm = route.routeConfig.path === 'login-form';
    if ((!!isLoggedIn) && isLoginForm) {
      this.router.navigate(['/admin']);
      return false;
    }

    if (!isLoggedIn && !isLoginForm) {
      this.router.navigate(['/admin/login-form'], {
        queryParams: {
          returnUrl: route.pathFromRoot
            .map(v => v.url.map(segment => segment.toString()).join('/'))
            .join('/')
        }
      });
    }

    return (!!isLoggedIn) || isLoginForm;
  }
}
