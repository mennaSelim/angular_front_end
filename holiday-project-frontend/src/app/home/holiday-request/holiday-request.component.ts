import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from '../../_services/server.service';
import {first} from 'rxjs/operators';
import {ServerData} from '../../_models/server-data';
import {Holiday} from '../../_models/holiday';
import {Route, Router} from '@angular/router';
import {AlertService} from '../../_services/alert.service';

const CREATE_HOLIDAY_URL = '/api/v1/holidays/actions/create';

@Component({
    selector: 'app-holiday-request',
    templateUrl: './holiday-request.component.html',
    styleUrls: ['./holiday-request.component.css']
})
export class HolidayRequestComponent implements OnInit {
    private holiday: Holiday;
    private response: ServerData;
    private formErrors = {};
    private holidays = ['planned', 'casual'];

    constructor(private serverService: ServerService, private router: Router, private alertService: AlertService) {
        this.holiday = new Holiday();
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
        this.serverService.postServerRequest(this.holiday, CREATE_HOLIDAY_URL).pipe(first())
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
                    } else {/*another error*/
                        this.alertService.error(error.error.message);
                    }
                }
            );


    }

}
