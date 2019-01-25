import { Injectable } from "@angular/core";

import { APIService, HttpResponseType, RestCallType } from './../api-service/api-service';
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { SecureMessageInfo, SecureMessageGroupInfo, SecureMessageSendBody } from "../../models/secure-messaging/secure-message-info";
import { Observable } from "rxjs/Observable";



@Injectable()
export class SecureMessagingService {


    private serviceUrlSecureMessage: string = '/secureMessages';
    private serviceUrlSecureMessageGroup: string = '/messageGroups';

    private static jwt: string;

    constructor(
        private apiService: APIService
    ) {
    }

    public setJWT(newJWT: string){
        SecureMessagingService.jwt = newJWT;
    }


    public getSecureMessages(ma_type: string, ma_id_field: string, ma_id_value: string): Observable<SecureMessageInfo[]> {

        return Observable.create((observer: any) => {

            this.apiService.authenticatedHTTPCall(
                RestCallType.get,
                this.serviceUrlSecureMessage + "?ma_type=" + ma_type + "&ma_id_field=" + ma_id_field + "&ma_id_value=" + ma_id_value,
                HttpResponseType.json,
                undefined,
                undefined,
                this.getHttpHeaders())
                .subscribe(
                    data => {
                        observer.next(data);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                    },
                    () => {
                        /// complete
                    }
                );

        });

    }


    public getSecureMessagesGroups(inst_id: string): Observable<SecureMessageGroupInfo[]> {

        return Observable.create((observer: any) => {
            this.apiService.authenticatedHTTPCall(
                RestCallType.get,
                this.serviceUrlSecureMessageGroup + "?inst_id=" + inst_id + "&with_members=0",
                HttpResponseType.json,
                undefined,
                undefined,
                this.getHttpHeaders())
                .subscribe(
                    data => {
                        observer.next(data);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                    },
                    () => {

                    }
                );
        });
    }

    public postSecureMessage(messageInfo: SecureMessageSendBody): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrlSecureMessage,
            HttpResponseType.json,
            messageInfo,
            undefined,
            this.getHttpHeaders());

    }

    public replyToSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrlSecureMessage, /// does this need a msgId in the URL???
            HttpResponseType.json,
            messageInfo,
            undefined,
            this.getHttpHeaders());

    }

    public deleteSecureMessage(messageID: string): Observable<any> {

        return this.apiService.authenticatedHTTPCall(
            RestCallType.post,
            this.serviceUrlSecureMessage + "/" + messageID,
            HttpResponseType.json,
            undefined,
            undefined,
            this.getHttpHeaders());

    }

    private getHttpHeaders(): HttpHeaders {
        return new HttpHeaders().set("Authorization", SecureMessagingService.jwt);
    }

}