import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServerData} from '../../_models/server-data';
import {Alert} from '../../_helpers/alert';
import {HolidayService} from '../../_services/holiday.service';
import {UserService} from '../../_services/user.service';
import {HolidayConstant} from '../../constants/holiday-constant';


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
    private response: ServerData;
    private pendingStatus = HolidayConstant.PENDING_STATUS;
    private holidayStatusMap;
    private holidayTypeMap;

    constructor(private router: Router,
                private alert: Alert,
                private holidayService: HolidayService,
                private userService: UserService) {
        this.holidayStatusMap = new Map();
        this.holidayStatusMap.set(HolidayConstant.PENDING_STATUS, 'pending');
        this.holidayStatusMap.set(HolidayConstant.APPROVE_STATUS, 'approved');
        this.holidayStatusMap.set(HolidayConstant.REJECT_STATUS, 'rejected');

        this.holidayTypeMap = new Map();
        this.holidayTypeMap.set(HolidayConstant.PLANNED, 'planned');
        this.holidayTypeMap.set(HolidayConstant.CASUAL, 'casual');

    }

    ngOnInit() {
        this.getServerHolidayBalanceResponse();
        this.getServerUserStatusResponse();

    }

    getServerUserStatusResponse() {
        this.holidayService.getHolidays()
        // clone the data object, using its known Config shape
            .subscribe((data: ServerData) => {
                    console.log(this.response = data);
                    this.holidayService.holidays = data.data['data'];
                    console.log('data.data');
                    console.log(this.holidayService.holidays);
                },
                (err) => {
                    console.log(err.error);
                    // this.alert.error(err.error.message);

                },
                () => {
                    this.data = this.response.data;
                    this.loadingHolidayStatus = false;

                });


    }

    getServerHolidayBalanceResponse() {
        this.userService.getUserHolidayBalance()
            .subscribe((data: ServerData) => {
                    console.log('balance succeeddddddddd');
                    console.log(data);
                    this.casual = data.data[HolidayConstant.CASUAL];
                    this.planned = data.data[HolidayConstant.PLANNED];


                },
                (err) => {
                    console.error(err.error);
                    // this.alert.error(err.error.message);
                },
                () => {
                    this.loadingHolidayBalance = false;

                });

    }

    onUpdate(index) {

        this.router.navigate(['app-edit-holiday', index]);


    }

    onDelete(index, holidayId) {
        this.holidayService.deleteHoliday(holidayId)
            .subscribe((data: ServerData) => {
                    console.log(data);
                    this.data['data'].splice(index, 1);
                },
                (err) => {
                    console.log(err.error);
                    // this.alert.error(err.error.message);
                }
            );
    }


}
