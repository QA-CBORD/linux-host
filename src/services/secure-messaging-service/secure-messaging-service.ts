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

    public replyToSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrl, /// does this need a msgId in the URL???
            HttpResponseType.json,
            messageInfo,
            undefined,
            new HttpHeaders());

    }

    public deleteSecureMessage(messageID: string): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrl + "/" + messageID,
            HttpResponseType.json,
            undefined,
            undefined,
            new HttpHeaders());

    }

}