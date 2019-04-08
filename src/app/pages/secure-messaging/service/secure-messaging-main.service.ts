import { Injectable } from '@angular/core';

import { Observable, zip, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/service/auth-service/auth.service';
import { SecureMessagingService } from './secure-messaging.service';

import {
    MSecureMessagingAuthInfo,
    MSecureMessageGroupInfo,
    MSecureMessageInfo,
    MSecureMessageSendBody
} from '../model';

@Injectable()
export class SecureMessagingMainService {

    private static smAuthInfo: MSecureMessagingAuthInfo;
    private readonly ma_type = 'patron';
    private readonly refreshTime = 10000;

    constructor(
        private authService: AuthService,
        private secureMessagingService: SecureMessagingService
    ) {
    }

    static GetSecureMessagesAuthInfo(): MSecureMessagingAuthInfo {
        return SecureMessagingMainService.smAuthInfo;
    }

    getInitialData(): Observable<[MSecureMessageGroupInfo[], MSecureMessageInfo[]]> {
        return this.authService.getExternalAuthenticationToken()
            .pipe(
                switchMap((response: string) => {
                    SecureMessagingService.setJWT(response);
                    SecureMessagingMainService.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
                    return zip(
                        this.getSecureMessagesGroups(),
                        this.getSecureMessages()
                    );
                }));
    }


    sendSecureMessage(messageInfo: MSecureMessageSendBody): Observable<any> {
        return this.secureMessagingService.postSecureMessage(messageInfo);
    }

    getSecureMessages(): Observable<MSecureMessageInfo[]> {
        return this.secureMessagingService.getSecureMessages(
            this.ma_type,
            SecureMessagingMainService.smAuthInfo.id_field,
            SecureMessagingMainService.smAuthInfo.id_value
        );
    }

    pollForData(): Observable<[MSecureMessageGroupInfo[], MSecureMessageInfo[]]> {
        return timer(this.refreshTime, this.refreshTime).pipe(
            switchMap(() => zip(
                this.getSecureMessagesGroups(),
                this.getSecureMessages()
            )));
    }

    getSecureMessagesGroups(): Observable<MSecureMessageGroupInfo[]> {
        return this.secureMessagingService.getSecureMessagesGroups(SecureMessagingMainService.smAuthInfo.institution_id);
    }


    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
