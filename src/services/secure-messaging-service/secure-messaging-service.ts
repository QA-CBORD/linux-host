import { Injectable } from "@angular/core";

import { APIService, HttpResponseType } from './../api-service/api-service';
import { HttpHeaders } from "@angular/common/http";



@Injectable()
export class SecureMessagingService {

    private serviceUrl: string = '/secureMessaging';

    constructor(
        private apiService: APIService) {
    }

    public testSecureMessaging() {

        this.apiService.authenticatedHTTPCall('put', this.serviceUrl, HttpResponseType.json, null, undefined, new HttpHeaders())
        .subscribe(
            response => {
                console.log("SecureMessaging - SUCCESS:");
                console.log(response);
            },
            error => {
                console.log("SecureMessaging - ERROR");
                console.log(error);
            }
        );

    }

}