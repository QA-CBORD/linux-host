import { Injectable } from "@angular/core";

import { APIService, HttpResponseType, RestCallType } from './../api-service/api-service';
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { SecureMessageInfo } from "../../models/secure-messaging/secure-message-info";
import { Observable } from "rxjs/Observable";



@Injectable()
export class SecureMessagingService {

    private serviceUrlSecureMessage: string = '/secureMessages';
    private serviceUrlSecureMessageGroup: string = '/messageGroups';

    constructor(
        private apiService: APIService
    ) {
    }


    public getSecureMessages(): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.get,
            this.serviceUrlSecureMessage,
            HttpResponseType.json,
            undefined,
            undefined,
            new HttpHeaders());

    }

/// https://dwptofebk7.execute-api.us-east-1.amazonaws.com/dev/messageGroups?inst_id=29db894b-aecd-4cef-b515-15b0405614d7&with_members=1

    public getSecureMessagesGroup(): Observable<any> {


        return this.apiService.authenticatedHTTPCall(
            RestCallType.get,
            this.serviceUrlSecureMessageGroup + "?inst_id=29db894b-aecd-4cef-b515-15b0405614d7&with_members=1",
            HttpResponseType.json,
            undefined,
            undefined,
            new HttpHeaders());

    }

    public postSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrlSecureMessage,
            HttpResponseType.json,
            messageInfo,
            undefined,
            new HttpHeaders());

    }

    public replyToSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrlSecureMessage, /// does this need a msgId in the URL???
            HttpResponseType.json,
            messageInfo,
            undefined,
            new HttpHeaders());

    }

    public deleteSecureMessage(messageID: string): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrlSecureMessage + "/" + messageID,
            HttpResponseType.json,
            undefined,
            undefined,
            new HttpHeaders());

    }

}