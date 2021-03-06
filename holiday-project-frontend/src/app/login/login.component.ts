import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Alert} from '../_helpers/alert';
import {AuthenticationService} from '../_services/authentication.service';
import {User} from '../_models/user';
import {ErrorCode} from '../constants/error-code';
import {ServerData} from '../_models/server-data';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private user: User;
    returnUrl: string;
    private formErrors = {};

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private alertService: Alert) {
    }

    ngOnInit() {
        this.user = new User();
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        });

        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/user-home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-home';

    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.formErrors = {};
        this.user.email = this.f.email.value;
        this.user.password = this.f.password.value;

        this.getServerLoginResponse();
    }

    getServerLoginResponse() {
        this.authService.login(this.user)
            .pipe(first())
            .subscribe(
                (data: ServerData) => {
                    // login successful if there's a jwt token in the response
                    if (data && data.data['access_token']) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(data.data['access_token']));
                    }
                    console.log('return urlllllll');
                    console.log(this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    console.log('error in login component');
                    if (error.error.code === ErrorCode.VALIDATION_ERROR) {
                        let errorData = error.error.message;
                        for (let key in errorData) {
                            // if key has nested "errors", get and set the error message, else set null
                            errorData[key] ? this.formErrors[key] = errorData[key] : this.formErrors[key] = null;
                        }
                        console.log('validation form errors');
                        console.log(this.formErrors);
                    } else { /*invalid name or password*/
                        console.log('error msg');
                        console.log(error.error.message);
                        this.alertService.error(error.error.message);
                    }

                });


    }

}
