import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {Error} from '../_models/error';
import {ApiUrl} from '../constants/api-url';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {ErrorCode} from '../constants/error-code';
import {ServerData} from '../_models/server-data';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private refreshCount =0;

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
                    console.log('request in interceptor b4');
                    console.log(request);
                    this.authService.refreshToken()
                        .pipe(first()).subscribe(
                        (data: ServerData) => {
                            console.log('in auth refresh');
                            console.log(data);
                            if (data && data.data['access_token']) {
                                // store user details and jwt token in local storage to keep user logged in between page refreshes
                                localStorage.setItem('currentUser', JSON.stringify(data.data['access_token']));
                                console.log('after refresh');
                                console.log(JSON.parse(localStorage.getItem('currentUser')));
                                // request = this.addAuthHeader(request);
                                console.log('request in interceptor after');
                                console.log(request);
                                return next.handle(request);
                            }
                        },
                        (error) => {
                            console.log('error in refresh token');
                        }
                    );


                } else {/*else redirect to login*/
                    this.router.navigate(['login']);
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
