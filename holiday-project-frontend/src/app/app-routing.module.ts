import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserHomeComponent} from './home/user-home/user-home.component';
import {ApproveHolidayRequestComponent} from './home/approve-holiday-request/approve-holiday-request.component';
import {UserStatusComponent} from './home/user-status/user-status.component';
import {HolidayRequestComponent} from './home/holiday-request/holiday-request.component';
import {MainComponent} from './main/main.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginNewComponent} from './login-new/login-new.component';
import {ServerDownComponent} from './Extra/server-down/server-down.component';
import {NotFoundComponent} from './Extra/not-found/not-found.component';
import {EditHolidayComponent} from './home/edit-holiday/edit-holiday.component';


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'login-new', component: LoginNewComponent},

    {path: 'server-down', component: ServerDownComponent},
    {path: 'not-found', component: NotFoundComponent},

    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    {path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard]},
    {path: 'create-holiday-request', component: HolidayRequestComponent, canActivate: [AuthGuard]},
    {path: 'user-status', component: UserStatusComponent, data: {data: []}, canActivate: [AuthGuard]},
    {path: 'approve-holiday-request', component: ApproveHolidayRequestComponent, canActivate: [AuthGuard]},
    {path: 'app-edit-holiday/:id', component: EditHolidayComponent, canActivate: [AuthGuard]},
];

@NgModule({
    // listen for browser location changes
    imports: [RouterModule.forRoot(routes)],
    // make it usable in all components that need it
    exports: [RouterModule]
})
export class AppRoutingModule {
}
