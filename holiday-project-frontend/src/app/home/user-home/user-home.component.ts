import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServerData} from '../../_models/server-data';
import {HttpErrorResponse} from '@angular/common/http';
import {ServerService} from '../../_services/server.service';

const STATUS_URL = '/api/v1/holidays';


@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})


export class UserHomeComponent implements OnInit {


    constructor(private router: Router, private serverService: ServerService) {
    }

    ngOnInit() {
    }

    // getServerUserStatusResponse() {
    //     this.serverService.getServerResponse(STATUS_URL)
    //     // clone the data object, using its known Config shape
    //         .subscribe((data: ServerData) => console.log(this.serverService.response = {...data}),
    //             (err) => {
    //                 console.log(err);
    //                 // this.serverService.handleError(err);
    //
    //             },
    //             () => {
    //                 if (this.serverService.response.status === 1) {
    //
    //                     console.log(this.serverService.response.data);
    //                     this.router.navigate(['user-status']);
    //                 }
    //
    //             });
    //
    //
    // }

}
