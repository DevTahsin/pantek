import { AuthService } from '../services';
import { environment } from '@environments/environment';

export function appInitializer(authService: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        if (document.URL.startsWith(environment.domain + '/admin')) {
            loadStyle('admin.css');
            document.body.className = 'dx-viewport dx-theme-material dx-theme-material-typography dx-color-scheme-orange-dark';
            authService.refreshToken()
                .subscribe()
                .add(resolve);
        } else {
            loadStyle('admin.css');
            var urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('lang')){
                localStorage['lang'] = urlParams.get('lang');
            }
            resolve();
        }
    });
}

function loadStyle(styleName: string) {
    const head = document.getElementsByTagName('head')[0];

    let themeLink = document.getElementById(
        'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
        themeLink.href = styleName;
    } else {
        const style = document.createElement('link');
        style.id = 'client-theme';
        style.rel = 'stylesheet';
        style.href = `${styleName}`;

        head.appendChild(style);
    }
}