import { Injectable } from '@angular/core';

import { Observable, timer, zip, Subject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { SecureMessagingApiService } from './secure-messaging-api.service';

import {
  SecureMessageConversation,
  SecureMessageGroupInfo,
  SecureMessageInfo,
  SecureMessageSendBody,
  SecureMessagingAuthInfo,
} from '../models';
import { X_Y_REGEXP } from '@core/utils/regexp-patterns';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { tap } from 'rxjs/operators';
import { buildConversationsFromMessages } from '@core/utils/conversations-helper';
const REFRESH_TIME = 10000;
@Injectable()
export class SecureMessagingService {
  private static smAuthInfo: SecureMessagingAuthInfo;
  private readonly ma_type = 'patron';
  private messagesArray: SecureMessageInfo[] = [];
  private conversationsArraySubject: Subject<SecureMessageConversation[]> = new Subject();
  public conversationsArray$: Observable<SecureMessageConversation[]> = this.conversationsArraySubject.asObservable();
  private conversationsArray: SecureMessageConversation[] = [];
  private _groupsArray: SecureMessageGroupInfo[] = [];
  private _selectedConversation: SecureMessageConversation = null;

  get selectedConversation() {
    return this._selectedConversation;
  }

  get groupsArray() {
    return this._groupsArray;
  }

  constructor(private authService: AuthApiService, private secureMessagingService: SecureMessagingApiService) {}

  static GetSecureMessagesAuthInfo(): SecureMessagingAuthInfo {
    return SecureMessagingService.smAuthInfo;
  }

  getInitialData(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return this.authService.getExternalAuthenticationToken().pipe(
      switchMap((response: string) => {
        SecureMessagingApiService.setJWT(response);
        SecureMessagingService.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
        return zip(this.getSecureMessagesGroups(), this.getSecureMessages());
      }),
      tap(([smGroupArray, smMessageArray]) => {
        this._groupsArray = smGroupArray;
        this.messagesArray = smMessageArray;
        this.buildConversationsFromResponseAndNotify();
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  /**
   * Poll for updated messages and groups
   */
  pollForDataInterval(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return timer(REFRESH_TIME, REFRESH_TIME).pipe(
      switchMap(() => zip(this.getSecureMessagesGroups(), this.getSecureMessages())),
      tap(([smGroupArray, smMessageArray]) => {
        /// if there are new groups, update the list
        if (this._groupsArray.length !== smGroupArray.length) {
          this._groupsArray = smGroupArray;
        }
        /// if there are new messages, update the conversations
        if (this.messagesArray.length !== smMessageArray.length) {
          this.messagesArray = smMessageArray;
          this.buildConversationsFromResponseAndNotify();
        }
      })
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

  private sortGroups() {
    /// sort groups alphabetically
    this._groupsArray.sort((a, b) => {
      if (a.name === null) {
        return -1;
      }
      if (b.name === null) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Handle messages and groups response and make conversations to display
   */
  private buildConversationsFromResponseAndNotify() {
    this.sortGroups();
    this.conversationsArray = buildConversationsFromMessages(this.messagesArray, this.groupsArray, SecureMessagingService.GetSecureMessagesAuthInfo());
    // Update current conversation if got new messages
    if(this._selectedConversation){
      this._selectedConversation.messages = this.conversationsArray.find(convo => convo.groupIdValue === this._selectedConversation.groupIdValue)?.messages || [];
    }
    this.conversationsArraySubject.next(this.conversationsArray);
  }

  startConversation({ id, name, description }: SecureMessageGroupInfo) {
    /// check if a conversation with this group already exists
    let conversation: SecureMessageConversation = this.conversationsArray.find((convo) => convo.groupIdValue === id);

    if (conversation === null) {
      conversation = {
        institutionId: SecureMessagingService.GetSecureMessagesAuthInfo().institution_id,
        groupName: name,
        groupIdValue: id,
        groupDescription: description,
        myIdValue: SecureMessagingService.GetSecureMessagesAuthInfo().id_value,
        messages: [],
      };
    }

    this.setSelectedConversation(conversation);
  }

  /**
   * Heler method to set selected conversation
   * @param conversation conversation to set as selected
   */
  setSelectedConversation(conversation: SecureMessageConversation) {
    this._selectedConversation = conversation;
  }

  /**
   * Helper method to clear selected conversation
   */
  clearSelectedConversation() {
    if (this._selectedConversation?.messages === null || this._selectedConversation?.messages.length === 0) {
      for (const convo of this.conversationsArray) {
        if (convo.groupIdValue === this._selectedConversation.groupIdValue) {
          this.conversationsArray.splice(this.conversationsArray.indexOf(convo), 1);
        }
      }
    }
    this._selectedConversation = null;
  }
}
