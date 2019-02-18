import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ServerData} from '../_models/server-data';
import {ApiUrl} from '../constants/api-url';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private router: Router, private http: HttpClient) {
    }


    getUserHolidayBalance() {
        return this.http.get<ServerData>(ApiUrl.SERVER_URL + ApiUrl.HOLIDAY_BALANCE_URL);
    }
}
