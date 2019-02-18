import {Component, OnInit, Input} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ServerData} from '../_models/server-data';
import {Alert} from '../_helpers/alert';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    @Input() isSelected;

    constructor(private authService: AuthenticationService,
                private router: Router,
                private alertService: Alert) {
    }

    ngOnInit() {

    }

    logoutBtn() {
        console.log('in logout');
        this.authService.logout()
            .pipe(first()).subscribe(
            (data: ServerData) => {
                console.log(data);
                // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
                console.log('logged out');
                this.router.navigate(['main']);
            },
            (error) => {
                console.log('error in logout');
                this.alertService.error('something went wrong');
            }
        );

    }

}
