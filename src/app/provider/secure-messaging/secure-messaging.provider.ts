import { Injectable } from '@angular/core';

import { Observable, zip, timer } from 'rxjs';
import { flatMap, switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth-service/auth.service';
import { SecureMessagingService } from 'src/app/services/secure-messaging/secure-messaging.service';

import { MSecureMessagingAuthInfo } from 'src/app/models/authentication/secure-messaging-authinfo';
import { MSecureMessageGroupInfo, MSecureMessageInfo, MSecureMessageSendBody } from 'src/app/models/secure-messaging/secure-message-info';

@Injectable({
  providedIn: 'root'
})
export class SecureMessagingProvider {

  private static smAuthInfo: MSecureMessagingAuthInfo;
  private ma_type = 'patron';

  constructor(
    private authService: AuthService,
    private smService: SecureMessagingService
  ) { }

  public static GetSMAuthInfo() {
    return SecureMessagingProvider.smAuthInfo;
  }

  public getInitialData(): Observable<[MSecureMessageGroupInfo[], MSecureMessageInfo[]]> {
    return this.authService.getExternalAuthenticationToken()
      .pipe(flatMap((response: string) => {
        this.smService.setJWT(response);
        SecureMessagingProvider.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
        return zip(
          this.getSecureMessagesGroups(),
          this.getSecureMessages()
        );
      }));
  }


  public sendSecureMessage(messageInfo: MSecureMessageSendBody): Observable<any> {
    return this.smService.postSecureMessage(messageInfo);
  }

  public getSecureMessages(): Observable<MSecureMessageInfo[]> {
    return this.smService.getSecureMessages(this.ma_type, SecureMessagingProvider.smAuthInfo.id_field,
      SecureMessagingProvider.smAuthInfo.id_value);
  }

  public pollForData(): Observable<[MSecureMessageGroupInfo[], MSecureMessageInfo[]]> {
    return timer(10000, 10000).pipe(switchMap(val => zip(
      this.getSecureMessagesGroups(),
      this.getSecureMessages()
    )));
  }

  public getSecureMessagesGroups(): Observable<MSecureMessageGroupInfo[]> {
    return this.smService.getSecureMessagesGroups(SecureMessagingProvider.smAuthInfo.institution_id);
  }


  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
