import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Error} from '../_models/error';
import {ApiUrl} from '../constants/api-url';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {ErrorCode} from '../constants/error-code';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            console.log('in error interceptor');
            console.log(error);
            if (error.error instanceof ErrorEvent) { // ----------->
                console.log('client side error');
            } else if (error.status === 403) { // unauthorized
                console.log('unauthorized');

            } else if (error.status === 401) { // unauthenticated
                console.log('unauthenticated');
                /*check if token expired refresh while keeping track of original request*/
                if (error.error.code === ErrorCode.TOKEN_EXPIRED) {
                    this.authService.refreshToken();
                    // request = this.addAuthHeader(request);
                    console.log('request in interceptor');
                    console.log(request);
                    return next.handle(request);

                } else {/*else redirect to login*/
                    this.router.navigate(['login-new']);
                }


            } else if (error.status === 500 || error.statusText === 'Unknown Error') { // server error
                console.log('server error');
                this.router.navigate(['server-down']);
            } else if (error.status === 404) { // not found
                console.log('not found');
                this.router.navigate(['not-found']);
            }
            return throwError(error);


        }));
    }
}
