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
        return this.http.post<ServerData>(`${ApiUrl.SERVER_URL}` + `${ApiUrl.LOGIN_URL}`, user);

    }

    logout() {
        return this.http.post(ApiUrl.SERVER_URL + ApiUrl.LOGOUT_URL, {});
    }

    refreshToken() {
        console.log('b4 refreshhh');
        console.log(JSON.parse(localStorage.getItem('currentUser')));
        return this.http.get(ApiUrl.SERVER_URL + ApiUrl.REFRESH_TOKEN_URL);
            // .pipe(first()).subscribe(
            //     (data: ServerData) => {
            //         console.log('in auth refresh');
            //         console.log(data);
            //         if (data && data.data['access_token']) {
            //             // store user details and jwt token in local storage to keep user logged in between page refreshes
            //             localStorage.setItem('currentUser', JSON.stringify(data.data['access_token']));
            //             console.log('after refresh');
            //             console.log(JSON.parse(localStorage.getItem('currentUser')));
            //         }
            //     },
            //     (error) => {
            //         console.log('error in refresh token');
            //     }
            // );

    }
}
