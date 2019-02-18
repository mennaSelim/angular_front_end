import {Component, OnInit} from '@angular/core';
import {ServerData} from '../../_models/server-data';
import {ApproveHoliday} from '../../_models/approve-holiday';
import {Alert} from '../../_helpers/alert';
import {ErrorCode} from '../../constants/error-code';
import {HolidayService} from '../../_services/holiday.service';
import {HolidayConstant} from '../../constants/holiday-constant';


@Component({
    selector: 'app-approve-holiday-request',
    templateUrl: './approve-holiday-request.component.html',
    styleUrls: ['./approve-holiday-request.component.css']
})
export class ApproveHolidayRequestComponent implements OnInit {
    private response: ServerData;
    private requests;
    private status;
    private approveHolidayData: ApproveHoliday;
    private isAuthorized = true;
    private holidayStatusMap;
    private holidayTypeMap;

    constructor(private alertService: Alert,
                private holidayService: HolidayService) {
        this.holidayStatusMap = new Map();
        this.holidayStatusMap.set(HolidayConstant.PENDING_STATUS, 'pending');
        this.holidayStatusMap.set(HolidayConstant.APPROVE_STATUS, 'approved');
        this.holidayStatusMap.set(HolidayConstant.REJECT_STATUS, 'rejected');

        this.holidayTypeMap = new Map();
        this.holidayTypeMap.set(HolidayConstant.PLANNED, 'planned');
        this.holidayTypeMap.set(HolidayConstant.CASUAL, 'casual');

    }

    ngOnInit() {

        this.holidayService.getHolidaysToApprove()
            .subscribe((data: ServerData) => console.log(this.response = data),
                (error) => {
                    console.log(error.error);
                    if (error.error.code === ErrorCode.HOLIDAY_UNAUTHORIZED) {
                        this.isAuthorized = false;
                    }

                },
                () => {
                    this.requests = this.response.data;

                    for (let data of this.response.data) {
                        console.log('name');
                        console.log(data['name']);
                        console.log('requesttttt');
                        console.log(data['requests']);
                    }
                }
            );


    }

    onSubmitBtn(i, j, id) {
        console.log(this.requests[i].requests[j].newStatus);
        this.approveHolidayData = new ApproveHoliday();
        this.approveHolidayData.status = this.requests[i].requests[j].newStatus;
        this.holidayService.approveHoliday(this.approveHolidayData, id)
            .subscribe((data: ServerData) => console.log(this.response = data),
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


}
