import {Component, OnInit, Input} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    @Input() isSelected;

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
        // console.log('in logout');
        // this.authService.logout();
        // this.router.navigate(['main']);
    }

    logoutBtn() {
        console.log('in logout');
        this.authService.logout();
        this.router.navigate(['main']);
    }

}
