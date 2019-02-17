import {Injectable} from '@angular/core';
import {Observable, observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ServerData} from '../_models/server-data';
import {ApiUrl} from '../constants/api-url';


@Injectable({
    providedIn: 'root'
})


export class ServerService {


    public response: ServerData;


    constructor(private http: HttpClient) {
    }

    getServerResponse(url) {
        return this.http.get<ServerData>(ApiUrl.SERVER_URL + url);
    }

    postServerRequest(data: Object, url): Observable<ServerData> {
        return this.http.post<ServerData>(ApiUrl.SERVER_URL + url, data);
    }

    deleteServerRequest(url): Observable<ServerData> {
        return this.http.delete<ServerData>(ApiUrl.SERVER_URL + url);
    }

    // showServerResponse(url) {
    //     this.getServerResponse(url)
    //     // clone the data object, using its known Config shape
    //         .subscribe((data: ServerData) => console.log('in show ' + (this.response = data)),
    //             err => console.log('error in show' + err),
    //             () => console.log('finished laravel: ' + this.response.data));
    // }
    //
    // postServerRequest(data: Object, url): Observable<ServerData> {
    //     return this.http.post<ServerData>(ApiUrl.SERVER_URL + url, data);
    //     // .pipe(
    //     //     catchError(this.handleError)
    //     // ); // -->here
    // }


}
