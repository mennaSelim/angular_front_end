import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserHomeComponent} from './home/user-home/user-home.component';
import {UserStatusComponent} from './home/user-status/user-status.component';
import {HolidayRequestComponent} from './home/holiday-request/holiday-request.component';
import {ApproveHolidayRequestComponent} from './home/approve-holiday-request/approve-holiday-request.component';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { MainComponent } from './main/main.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './_services/authentication.service';
import { AlertComponent } from './Extra/alert/alert.component';
import { LoginComponent } from './login/login.component';
import { ServerDownComponent } from './Extra/server-down/server-down.component';
import { NotFoundComponent } from './Extra/not-found/not-found.component';
import { EditHolidayComponent } from './home/edit-holiday/edit-holiday.component';
import {HolidayService} from './_services/holiday.service';

@NgModule({
    declarations: [
        AppComponent,
        UserHomeComponent,
        UserStatusComponent,
        HolidayRequestComponent,
        ApproveHolidayRequestComponent,
        MainComponent,
        LogoutComponent,
        AlertComponent,
        LoginComponent,
        ServerDownComponent,
        NotFoundComponent,
        EditHolidayComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        AuthGuard,
        AuthenticationService,
        HolidayService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
