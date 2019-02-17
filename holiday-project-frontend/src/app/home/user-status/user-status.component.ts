import {Component, OnInit} from '@angular/core';
import {ServerService} from '../../_services/server.service';
import {Router} from '@angular/router';
import {ApiUrl} from '../../constants/api-url';
import {ServerData} from '../../_models/server-data';
import {AlertService} from '../../_services/alert.service';
import {Holiday} from '../../_models/holiday';
import {HolidayService} from '../../_services/holiday.service';


@Component({
    selector: 'app-user-status',
    templateUrl: './user-status.component.html',
    styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
    private data;
    private planned;
    private casual;
    private loadingHolidayStatus = true;
    private loadingHolidayBalance = true;
    private currentHoliday: Holiday;

    constructor(private serverService: ServerService, private router: Router,
                private alertService: AlertService, private holidayService: HolidayService) {
        // this.data = serverService.response.data;
        // this.getServerUserStatusResponse();
    }

    ngOnInit() {
        this.getServerHolidayBalanceResponse();
        this.getServerUserStatusResponse();

    }

    getServerUserStatusResponse() {
        // this.serverService.getServerResponse(ApiUrl.STATUS_URL)
        this.holidayService.getHolidays()
        // clone the data object, using its known Config shape
            .subscribe((data: ServerData) => {
                console.log(this.serverService.response = data);
                this.holidayService.holidays = data.data['data'];
                console.log('data.data');
                console.log(this.holidayService.holidays);
                },
                (err) => {
                    console.log(err.error);
                    this.alertService.error(err.error.message);
                    // this.serverService.handleError(err);

                },
                () => {
                    this.data = this.serverService.response.data;
                    this.loadingHolidayStatus = false;

                });


    }

    getServerHolidayBalanceResponse() {
        this.serverService.getServerResponse(ApiUrl.HOLIDAY_BALANCE_URL)
            .subscribe((data: ServerData) => {
                    console.log(data);
                    this.casual = data.data['casual'];
                    this.planned = data.data['planned'];
                },
                (err) => {
                    console.log(err.err);
                    this.alertService.error(err.error);
                    // this.serverService.handleError(err);
                },
                () => {
                    this.loadingHolidayBalance = false;

                });

    }

    onUpdate(index, holidayId, type, to, from, amount) {
        // console.log('updateeee');
        // this.holidayService.holiday = new Holiday();
        // this.currentHoliday.id = holidayId;
        // this.currentHoliday.type = type;
        // this.currentHoliday.to = to;
        // this.currentHoliday.from = from;
        // this.currentHoliday.amount = amount;
        this.router.navigate(['app-edit-holiday', index]);


    }

    onDelete(index, holidayId) {
        this.serverService.deleteServerRequest('/api/v1/holidays/' + holidayId + '/actions/delete')
            .subscribe((data: ServerData) => {
                    console.log(data);
                    this.data['data'].splice(index, 1);
                },
                (err) => {
                    console.log(err.err);
                    this.alertService.error(err.error.message);
                }
            );
    }


}
