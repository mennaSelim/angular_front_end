import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log('logged in from auth guard');
            return true;
        }
        console.log('un authenticated from auth guard');
        // not logged in so redirect to login page with the return url
        // url tree : current navigation cancelled & new navigation created
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
