import {Component, OnInit} from '@angular/core';
import {Holiday} from '../../_models/holiday';
import {ServerService} from '../../_services/server.service';
import {ServerData} from '../../_models/server-data';
import {first} from 'rxjs/operators';
import {ApproveHoliday} from '../../_models/approve-holiday';
import {AlertService} from '../../_services/alert.service';
import {ApiUrl} from '../../constants/api-url';
import {ErrorCode} from '../../constants/error-code';

const GET_EMPLOYEE_HOLIDAYS_URL = '/api/v1/holidays/employees';
const GET_SUPERVISORS_HOLIDAYS_URL = '/api/v1/holidays/supervisors';
const APPROVE_HOLIDAY_URL = '/api/v1/holidays/:id/actions/approve';

@Component({
    selector: 'app-approve-holiday-request',
    templateUrl: './approve-holiday-request.component.html',
    styleUrls: ['./approve-holiday-request.component.css']
})
export class ApproveHolidayRequestComponent implements OnInit {
    private holidays: [Holiday];
    private serverData: ServerData;
    private response: ServerData;
    private requests;
    private status;
    private approveHolidayResponse: ApproveHoliday;
    private unauthorized = false;
    // private error: Error;
    private isAuthorized = true;

    constructor(private serverService: ServerService, private alertService: AlertService) {

    }

    ngOnInit() {
        // this.error = new Error();
        // this.getServerApproveHolidayResponse();
        this.serverService.getServerResponse(ApiUrl.APPROVE_HOLIDAYS_URL)
            .subscribe((data: ServerData) => console.log(this.serverService.response = data),
                (error) => {
                    console.log(error.error);
                    if (error.error.code === ErrorCode.HOLIDAY_UNAUTHORIZED) {
                        this.isAuthorized = false;
                    }
                },
                () => {
                    this.requests = this.serverService.response.data;
                    console.log('inside approve holiday');
                    console.log(this.serverService.response);
                    for (let data of this.serverService.response.data) {
                        console.log(data['name']);
                        console.log(data['requests']);
                    }
                }
            );


    }

    onSubmitBtn(i, j, id) {
        console.log(this.requests[i].requests[j].newStatus);
        this.approveHolidayResponse = new ApproveHoliday();
        this.approveHolidayResponse.status = this.requests[i].requests[j].newStatus;
        this.serverService.postServerRequest(
            this.approveHolidayResponse, '/api/v1/holidays/' + id + '/actions/approve')
            .subscribe((data: ServerData) => console.log(this.serverService.response = data),
                (error) => {
                    console.log('approve holiday request');
                    console.log(error.error);
                    this.alertService.error(error.error.message);
                    if (error.error.code === ErrorCode.HOLIDAY_NOT_ENOUGH_TO_APPROVE) {
                        this.requests[i].requests[j].newStatus = 'reject';
                        this.onSubmitBtn(i, j, id);
                    }

                },
                () => {
                    this.requests[i].requests.splice(j, 1);

                }
            );
    }

    // getServerApproveHolidayResponse() {
    //     this.serverService.getServerResponse(APPROVE_HOLIDAY_URL).pipe(first())
    //     // clone the data object, using its known Config shape
    //         .subscribe((data: ServerData) => {
    //                 console.log((this.response = {...data}));
    //                 // if (this.response.status === 1) {
    //                 //     this.serverService.accessToken = this.response.data['access_token'];
    //                 //     console.log('access token now: ' + this.serverService.accessToken);
    //                 //     console.log(this.response.message);
    //                 //     this.router.navigate(['user-home']);
    //                 // }
    //             }
    //             // ,
    //             // (err) => {
    //             //         console.log('');
    //             // }
    //         );
    //
    // }
}
