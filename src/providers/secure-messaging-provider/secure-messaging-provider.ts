import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/zip";
import 'rxjs/add/operator/mergeMap';

import { AuthService } from "../../services/auth-service/auth-service";
import { SecureMessagingService } from "../../services/secure-messaging-service/secure-messaging-service";

import { MSecureMessageInfo, MSecureMessageGroupInfo, MSecureMessageSendBody } from "../../models/secure-messaging/secure-message-info";
import { SecureMessagingAuthInfo } from "../../models/authentication/secure-messaging-authinfo";



@Injectable()
export class SecureMessagingProvider {

    private static smAuthInfo: SecureMessagingAuthInfo;
    private ma_type: string = "patron";

    constructor(
        private authService: AuthService,
        private secureMessageService: SecureMessagingService
    ) {
    }

    public static GetSMAuthInfo() {
        return SecureMessagingProvider.smAuthInfo;
    }

    public getInitialData(): Observable<[MSecureMessageGroupInfo[], MSecureMessageInfo[]]> {

          
        return this.authService.getExternalAuthenticationToken()
            .flatMap((response: string) => {
                this.secureMessageService.setJWT(response);
                SecureMessagingProvider.smAuthInfo = JSON.parse(atob(response.split(".")[1]));
                return Observable.zip(
                    this.getSecureMessagesGroups(),
                    this.getSecureMessages()
                );
            });
    }


    public sendSecureMessage(messageInfo: MSecureMessageSendBody): Observable<any> {
        return this.secureMessageService.postSecureMessage(messageInfo);

    }

    public getSecureMessages(): Observable<MSecureMessageInfo[]> {

        return this.secureMessageService.getSecureMessages(this.ma_type, SecureMessagingProvider.smAuthInfo.id_field, SecureMessagingProvider.smAuthInfo.id_value);

    }

    public getSecureMessagesGroups(): Observable<MSecureMessageGroupInfo[]> {
        return this.secureMessageService.getSecureMessagesGroups(SecureMessagingProvider.smAuthInfo.institution_id);
    }


    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}