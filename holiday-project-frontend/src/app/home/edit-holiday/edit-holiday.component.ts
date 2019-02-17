import {Component, OnInit} from '@angular/core';
import {Holiday} from '../../_models/holiday';
import {ServerData} from '../../_models/server-data';
import {ServerService} from '../../_services/server.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AlertService} from '../../_services/alert.service';
import {NgForm} from '@angular/forms';
import {first, switchMap} from 'rxjs/operators';
import {HolidayService} from '../../_services/holiday.service';

const UPDATE_HOLIDAY_URL = '';

@Component({
    selector: 'app-edit-holiday',
    templateUrl: './edit-holiday.component.html',
    styleUrls: ['./edit-holiday.component.css']
})
export class EditHolidayComponent implements OnInit {

    private holiday: Holiday;
    private holidayId;
    private response: ServerData;
    private formErrors = {};
    private holidays = ['planned', 'casual'];
    private isLoading ;

    constructor(private serverService: ServerService, private router: Router
        , private alertService: AlertService, private holidayService: HolidayService,
                private route: ActivatedRoute

                ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.holiday = new Holiday();
        this.holidayId = this.route.snapshot.paramMap.get('id');
        this.holiday = this.holidayService.holidays[this.holidayId];
        this.isLoading = false;

    }


    onSelect(f: NgForm): void {
        this.holiday = new Holiday();
        this.formErrors = {};
        this.holiday.type = f.value['holidayType'];
        this.holiday.from = f.value['fromDate'];
        this.holiday.to = f.value['toDate'];
        this.holiday.amount = f.value['amount'];
        console.log(this.holiday);
        this.getServerUpdateHolidayResponse();

    }

    getServerUpdateHolidayResponse() {
        this.serverService.postServerRequest(this.holiday, UPDATE_HOLIDAY_URL).pipe(first())
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
