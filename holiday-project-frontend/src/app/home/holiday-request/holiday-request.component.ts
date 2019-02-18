import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ServerData} from '../../_models/server-data';
import {Holiday} from '../../_models/holiday';
import {Route, Router} from '@angular/router';
import {Alert} from '../../_helpers/alert';
import {HolidayService} from '../../_services/holiday.service';
import {HolidayConstant} from '../../constants/holiday-constant';
import {ErrorCode} from '../../constants/error-code';


@Component({
    selector: 'app-holiday-request',
    templateUrl: './holiday-request.component.html',
    styleUrls: ['./holiday-request.component.css']
})
export class HolidayRequestComponent implements OnInit {
    private holiday: Holiday;
    private response: ServerData;
    private formErrors = {};
    private holidays = [HolidayConstant.PLANNED, HolidayConstant.CASUAL];
    private holidayMap = new Map();


    constructor(private router: Router,
                private alertService: Alert, private holidayService: HolidayService) {
        this.holiday = new Holiday();
        this.holidayMap = new Map();
        this.holidayMap.set(HolidayConstant.PLANNED, 'planned');
        this.holidayMap.set(HolidayConstant.CASUAL, 'casual');
    }

    ngOnInit() {
    }


    onSelect(f: NgForm): void {
        this.holiday = new Holiday();
        this.formErrors = {};
        this.holiday.type = f.value['holidayType'];
        this.holiday.from = f.value['fromDate'];
        this.holiday.to = f.value['toDate'];
        this.holiday.amount = f.value['amount'];
        console.log(this.holiday);
        this.getServerCreateHolidayResponse();

    }

    getServerCreateHolidayResponse() {
        // this.serverService.postServerRequest(this.holiday, CREATE_HOLIDAY_URL).pipe(first())
        this.holidayService.creatHoliday(this.holiday).pipe(first())
            .subscribe((data: ServerData) => {
                    console.log((this.response = data));
                    this.router.navigate(['user-home']);
                }
                ,
                (error: any) => {
                    console.log('in request holiday error');
                    console.log(error);

                    /*form validation error*/
                    if (error.status === 422) {
                        let errorData = error.error.message;
                        // iterate the keys in errors
                        for (let key in errorData) {
                            // if key has nested "errors", get and set the error message, else set null
                            errorData[key] ? this.formErrors[key] = errorData[key] : this.formErrors[key] = null;
                        }
                        console.log('validation form errors');
                        console.log(this.formErrors);
                    } else if (error.error.code === ErrorCode.HOLIDAY_NOT_ENOUGH_LEFT) {
                        this.alertService.error(error.error.message);
                    }
                }
            );


    }

}
