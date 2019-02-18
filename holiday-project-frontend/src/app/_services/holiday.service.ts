import {Injectable} from '@angular/core';
import {ApiUrl} from '../constants/api-url';
import {ServerData} from '../_models/server-data';
import {Router} from '@angular/router';
import {Holiday} from '../_models/holiday';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HolidayService {
    private holiday: Holiday;
    public holidays: Holiday [] = [];

    constructor(private router: Router, private http: HttpClient) {
    }


    getHolidays() {
        return this.http.get<ServerData>(ApiUrl.SERVER_URL + ApiUrl.STATUS_URL);
    }

    creatHoliday(data: Object): Observable<ServerData> {
        return this.http.post<ServerData>(ApiUrl.SERVER_URL + ApiUrl.CREATE_HOLIDAY_URL, data);
    }

    updateHoliday(data: Object, id): Observable<ServerData> {
        let hiddenField: any = {};
        hiddenField._method = 'put';
        let updatedData: any = {};
        Object.assign(updatedData, data, hiddenField);
        return this.http.post<ServerData>((ApiUrl.SERVER_URL + ApiUrl.UPDATE_HOLIDAY_URL).replace(':id', id), updatedData);
    }

    deleteHoliday(id) {
        return this.http.delete<ServerData>((ApiUrl.SERVER_URL + ApiUrl.DELETE_HOLIDAY_URL).replace(':id', id));
    }

    getHolidaysToApprove() {
        return this.http.get<ServerData>(ApiUrl.SERVER_URL + ApiUrl.GET_APPROVE_HOLIDAYS_URL);
    }

    approveHoliday(data: Object, id) {
        let hiddenField: any = {};
        hiddenField._method = 'patch';
        let updatedData: any = {};
        Object.assign(updatedData, data, hiddenField);
        return this.http.post<ServerData>((ApiUrl.SERVER_URL + ApiUrl.APPROVE_HOLIDAY_URL).replace(':id', id), updatedData);
    }


}


