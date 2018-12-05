import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/zip";

import { SecureMessagingService } from "../../services/secure-messaging-service/secure-messaging-service";

import { SecureMessageInfo, SecureMessageGroupInfo, SecureMessageSendBody } from "../../models/secure-messaging/secure-message-info";


@Injectable()
export class SecureMessagingProvider {

    constructor(
        private secureMessageService: SecureMessagingService
    ) {
    }


    public getInitialData(ma_type: string, ma_id_field: string, ma_id_value: string): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
        return Observable.zip(
            this.getSecureMessagesGroups(null),
            this.getSecureMessages(ma_type, ma_id_field, ma_id_value)
        );
    }

    public getInitialData0(ma_type: string, ma_id_field: string, ma_id_value: string, success: (groups: SecureMessageGroupInfo[], messages: SecureMessageInfo[]) => void, error: (error: any) => void) {
        Observable.zip(
            this.getSecureMessagesGroups(null),
            this.getSecureMessages(ma_type, ma_id_field, ma_id_value)
        ).subscribe(([smGroupArray, smMessageArray]) => {
            success(smGroupArray, smMessageArray);
        },
            error => {
                error(error);
            },
            () => {

            });
    }


    public sendSecureMessage(messageInfo: SecureMessageSendBody): Observable<any> {

        return this.secureMessageService.postSecureMessage(messageInfo);

    }

    public getSecureMessages(ma_type: string, ma_id_field: string, ma_id_value: string): Observable<SecureMessageInfo[]> {

        return this.secureMessageService.getSecureMessages(ma_type, ma_id_field, ma_id_value);

    }

    public getSecureMessagesGroups(inst_id: string): Observable<SecureMessageGroupInfo[]> {
        return this.secureMessageService.getSecureMessagesGroups(inst_id);
    }


    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}