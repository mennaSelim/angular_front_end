import { Injectable } from '@angular/core';
import {ApiUrl} from '../constants/api-url';
import {ServerData} from '../_models/server-data';
import {Router} from '@angular/router';
import {Holiday} from '../_models/holiday';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private holiday: Holiday;
  public holidays: Holiday [] = [];

  constructor(private router: Router, private http: HttpClient) { }
  getHolidays() {
    return this.http.get<ServerData>(ApiUrl.SERVER_URL + ApiUrl.STATUS_URL);
  }
}


