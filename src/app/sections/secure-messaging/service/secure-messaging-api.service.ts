import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { APIService, HttpResponseType, RestCallType } from 'src/app/core/service/api-service/api.service';
import { SecureMessageGroupInfo, SecureMessageInfo, SecureMessageSendBody } from '../models';

@Injectable()
export class SecureMessagingApiService {
  private static jwt: string;

  private serviceUrlSecureMessage = '/secureMessages';
  private serviceUrlSecureMessageGroup = '/messageGroups';

  constructor(private apiService: APIService) {}

  static setJWT(newJWT: string) {
    SecureMessagingApiService.jwt = newJWT;
  }

  getSecureMessages(ma_type: string, ma_id_field: string, ma_id_value: string): Observable<SecureMessageInfo[]> {
    const url = `${
      this.serviceUrlSecureMessage
    }?ma_type=${ma_type}&ma_id_field=${ma_id_field}&ma_id_value=${ma_id_value}`;

    return this.apiService.authenticatedHTTPCall(
      RestCallType.get,
      url,
      HttpResponseType.json,
      null,
      null,
      this.getHttpHeaders()
    );
  }

  getSecureMessagesGroups(inst_id: string): Observable<SecureMessageGroupInfo[]> {
    const url = `${this.serviceUrlSecureMessageGroup}?inst_id=${inst_id}&with_members=0`;

    return this.apiService.authenticatedHTTPCall(
      RestCallType.get,
      url,
      HttpResponseType.json,
      null,
      null,
      this.getHttpHeaders()
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postSecureMessage(messageInfo: SecureMessageSendBody): Observable<any> {
    return this.apiService.authenticatedHTTPCall(
      RestCallType.post,
      this.serviceUrlSecureMessage,
      HttpResponseType.json,
      messageInfo,
      null,
      this.getHttpHeaders()
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replyToSecureMessage(messageInfo: SecureMessageInfo): Observable<any> {
    return this.apiService.authenticatedHTTPCall(
      RestCallType.post,
      this.serviceUrlSecureMessage, /// does this need a msgId in the URL???
      HttpResponseType.json,
      messageInfo,
      null,
      this.getHttpHeaders()
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteSecureMessage(messageID: string): Observable<any> {
    return this.apiService.authenticatedHTTPCall(
      RestCallType.post,
      this.serviceUrlSecureMessage + '/' + messageID,
      HttpResponseType.json,
      undefined,
      undefined,
      this.getHttpHeaders()
    );
  }

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', SecureMessagingApiService.jwt);
  }
}
