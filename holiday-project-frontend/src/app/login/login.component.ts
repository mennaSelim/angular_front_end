import {Component, OnInit, Input} from '@angular/core';
import {ServerService} from '../_services/server.service';
import {FormGroup, NgForm} from '@angular/forms';
import {ServerData} from '../_models/server-data';
import {User} from '../_models/user';
import {catchError, first} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {pipe} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';


const LOGIN_URL = '/api/v1/users/actions/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    // private url = '/api/v1/users/actions/trial';
    private user: User;
    private response: ServerData;
    public errors = null;




    // email: string;
    // password: string;

    constructor(private serverService: ServerService, private router: Router,
                private authService: AuthenticationService, private alertService: AlertService) {
        this.user = new User();
    }

    ngOnInit() {
        // reset login status
        this.authService.logout();
    }

    onSelect(f: NgForm): void {
        // this.serverService.showServerResponse(this.url);
        this.user.email = f.value['email'];
        this.user.password = f.value['password'];
        console.log('email:', this.user.email);
        console.log('pass:', this.user.password);
        this.getServerLoginResponse();


    }

    getServerLoginResponse() {
        this.authService.login(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['user-home']);
                },
                (error: Error) => {
                    console.log('error in login component');
                    console.log(error);
                    this.alertService.error(error.message);
                });


    }


}
