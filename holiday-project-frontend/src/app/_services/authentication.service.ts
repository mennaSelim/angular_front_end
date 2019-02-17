import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {ApiUrl} from '../constants/api-url';
import {ServerData} from '../_models/server-data';
import {User} from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    login(user: User) {
        return this.http.post<ServerData>(`${ApiUrl.SERVER_URL}` + `${ApiUrl.LOGIN_URL}`, user)
            .pipe(map((data: ServerData) => {
                // login successful if there's a jwt token in the response
                if (data && data.data['access_token']) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.data['access_token']));
                }

                // return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        console.log('logged out');
    }

    refreshToken() {
        return this.http.get(ApiUrl.SERVER_URL + ApiUrl.REFRESH_TOKEN_URL)
            .pipe(first()).subscribe(
                (data: ServerData) => {
                    console.log('in auth refresh');
                    console.log(data);
                    if (data && data.data['access_token']) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(data.data['access_token']));
                    }
                }
            );
        // .pipe(map((data: ServerData) => {
        //     console.log('in auth refresh');
        //     console.log(data);
        //     // login successful if there's a jwt token in the response
        //     if (data && data.data['access_token']) {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('currentUser', JSON.stringify(data.data['access_token']));
        //         console.log('refresheddddddddddddd token');
        //         console.log(data.data['access_token']);
        //     }
        // }));
    }
}
