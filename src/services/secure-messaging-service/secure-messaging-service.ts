import { Injectable } from "@angular/core";

import { APIService, HttpResponseType, RestCallType } from './../api-service/api-service';
import { HttpHeaders } from "@angular/common/http";
import { SecureMessageInfo } from "../../models/secure-messaging/secure-message-info";
import { Observable } from "rxjs/Observable";



@Injectable()
export class SecureMessagingService {

    private serviceUrl: string = '/secureMessages';

    constructor(
        private apiService: APIService
    ) {
    }


    public getSecureMessages(): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.get,
            this.serviceUrl,
            HttpResponseType.json,
            undefined,
            undefined,
            new HttpHeaders());

    }

    public postSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrl,
            HttpResponseType.json,
            messageInfo,
            undefined,
            new HttpHeaders());

    }

}