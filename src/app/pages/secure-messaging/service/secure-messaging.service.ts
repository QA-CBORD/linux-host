import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { APIService, HttpResponseType, RestCallType } from 'src/app/core/service/api-service/api.service';

import { MSecureMessageInfo, MSecureMessageGroupInfo, MSecureMessageSendBody } from 'src/app/pages/secure-messaging/model/secure-message-info';



@Injectable({
  providedIn: 'root'
})
export class SecureMessagingService {

  private static jwt: string;

  private serviceUrlSecureMessage = '/secureMessages';
  private serviceUrlSecureMessageGroup = '/messageGroups';


  constructor(
    private apiService: APIService
  ) { }

  setJWT(newJWT: string) {
    SecureMessagingService.jwt = newJWT;
  }


  getSecureMessages(ma_type: string, ma_id_field: string, ma_id_value: string): Observable<MSecureMessageInfo[]> {

    return Observable.create((observer: any) => {

      this.apiService.authenticatedHTTPCall(
        RestCallType.get,
        this.serviceUrlSecureMessage + '?ma_type=' + ma_type + '&ma_id_field=' + ma_id_field + '&ma_id_value=' + ma_id_value,
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


  getSecureMessagesGroups(inst_id: string): Observable<MSecureMessageGroupInfo[]> {

    return Observable.create((observer: any) => {
      this.apiService.authenticatedHTTPCall(
        RestCallType.get,
        this.serviceUrlSecureMessageGroup + '?inst_id=' + inst_id + '&with_members=0',
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

  postSecureMessage(messageInfo: MSecureMessageSendBody): Observable<any> {

    return this.apiService.authenticatedHTTPCall(
      RestCallType.post,
      this.serviceUrlSecureMessage,
      HttpResponseType.json,
      messageInfo,
      undefined,
      this.getHttpHeaders());

  }

  replyToSecureMessage(messageInfo: MSecureMessageInfo): Observable<any> {

    return this.apiService.authenticatedHTTPCall(
      RestCallType.post,
      this.serviceUrlSecureMessage, /// does this need a msgId in the URL???
      HttpResponseType.json,
      messageInfo,
      undefined,
      this.getHttpHeaders());

  }

  deleteSecureMessage(messageID: string): Observable<any> {

    return this.apiService.authenticatedHTTPCall(
      RestCallType.post,
      this.serviceUrlSecureMessage + '/' + messageID,
      HttpResponseType.json,
      undefined,
      undefined,
      this.getHttpHeaders());

  }

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', SecureMessagingService.jwt);
  }

}
