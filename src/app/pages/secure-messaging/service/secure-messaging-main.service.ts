import { Injectable } from '@angular/core';

import { Observable, timer, zip } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { AuthService } from 'src/app/core/service/auth-service/auth.service';
import { SecureMessagingService } from './secure-messaging.service';

import {
  SecureMessageGroupInfo,
  SecureMessageInfo,
  SecureMessageSendBody,
  SecureMessagingAuthInfo,
} from '../models';

@Injectable()
export class SecureMessagingMainService {
  private static smAuthInfo: SecureMessagingAuthInfo;
  private readonly ma_type = 'patron';
  private readonly refreshTime = 10000;

  constructor(
    private authService: AuthService,
    private secureMessagingService: SecureMessagingService
  ) {}

  static GetSecureMessagesAuthInfo(): SecureMessagingAuthInfo {
    return SecureMessagingMainService.smAuthInfo;
  }

  getInitialData(): Observable<
    [SecureMessageGroupInfo[], SecureMessageInfo[]]
  > {
    return this.authService.getExternalAuthenticationToken().pipe(
      switchMap((response: string) => {
        SecureMessagingService.setJWT(response);
        SecureMessagingMainService.smAuthInfo = JSON.parse(
          atob(response.split('.')[1])
        );
        return zip(this.getSecureMessagesGroups(), this.getSecureMessages());
      })
    );
  }

  sendSecureMessage(messageInfo: SecureMessageSendBody): Observable<any> {
    return this.secureMessagingService.postSecureMessage(messageInfo);
  }

  getSecureMessages(): Observable<SecureMessageInfo[]> {
    return this.secureMessagingService.getSecureMessages(
      this.ma_type,
      SecureMessagingMainService.smAuthInfo.id_field,
      SecureMessagingMainService.smAuthInfo.id_value
    );
  }

  pollForData(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return timer(this.refreshTime, this.refreshTime).pipe(
      switchMap(() =>
        zip(this.getSecureMessagesGroups(), this.getSecureMessages())
      )
    );
  }

  getSecureMessagesGroups(): Observable<SecureMessageGroupInfo[]> {
    return this.secureMessagingService.getSecureMessagesGroups(
      SecureMessagingMainService.smAuthInfo.institution_id
    );
  }

  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
