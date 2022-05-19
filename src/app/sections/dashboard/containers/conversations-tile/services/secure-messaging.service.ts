import { Injectable } from '@angular/core';

import { Observable, timer, zip } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import {
  SecureMessagingAuthInfo,
  SecureMessageGroupInfo,
  SecureMessageInfo,
  SecureMessageSendBody,
} from '@sections/secure-messaging/models';
import { SecureMessagingApiService } from '@sections/secure-messaging/service';
import { X_Y_REGEXP } from '@core/utils/regexp-patterns';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';

@Injectable()
export class SecureMessagingService {
  private static smAuthInfo: SecureMessagingAuthInfo;
  private readonly ma_type = 'patron';
  private readonly refreshTime = 100000;

  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly secureMessagingService: SecureMessagingApiService
  ) {}
  // TODO: Switch from static method to another implementation
  static GetSecureMessagesAuthInfo(): SecureMessagingAuthInfo {
    return SecureMessagingService.smAuthInfo;
  }

  getInitialData(): any {
    return this.authFacadeService.getExternalAuthenticationToken$().pipe(
      switchMap((response: string) => {
        SecureMessagingApiService.setJWT(response);
        SecureMessagingService.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
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
      SecureMessagingService.smAuthInfo.id_field,
      SecureMessagingService.smAuthInfo.id_value
    );
  }

  pollForData(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return timer(0, this.refreshTime).pipe(
      switchMap(() => zip(this.getSecureMessagesGroups(), this.getSecureMessages()))
    );
  }

  getSecureMessagesGroups(): Observable<SecureMessageGroupInfo[]> {
    return this.secureMessagingService.getSecureMessagesGroups(SecureMessagingService.smAuthInfo.institution_id);
  }

  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(X_Y_REGEXP, function(c) {
      // eslint-disable-next-line no-bitwise
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
