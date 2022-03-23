import { Injectable } from '@angular/core';

import { Observable, timer, zip, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

// import { AuthService } from '@core/service/auth-service/auth-api.service';
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
        this.createConversationsFromResponse();
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
          this.createConversationsFromResponse();
        }
      })
    );
  }

  getSecureMessagesGroups(): Observable<SecureMessageGroupInfo[]> {
    return this.secureMessagingService.getSecureMessagesGroups(SecureMessagingService.smAuthInfo.institution_id);
  }

  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(X_Y_REGEXP, function(c) {
      // tslint:disable-next-line:no-bitwise
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
   * @param bIsPollingData Is this update from polled data
   */
  private createConversationsFromResponse() {
    const tempConversations: SecureMessageConversation[] = [];

    this.sortGroups();

    /// create 'conversations' out of message array
    for (const message of this.messagesArray) {
      message.sent_date = new Date(message.sent_date).toString();

      let bNewConversation = true;

      /// add to existing conversation if it exists
      for (const convo of tempConversations) {
        if (!bNewConversation) {
          break;
        }

        if (
          convo.groupIdValue &&
          convo.groupIdValue.length &&
          (convo.groupIdValue === message.sender.id_value || convo.groupIdValue === message.recipient.id_value)
        ) {
          convo.messages.push(message);
          bNewConversation = false;
        }
      }

      /// create new conversation
      if (bNewConversation) {
        let newGroupName = '';
        let newGroupId = '';
        let newGroupDescription = '';

        if (message.sender.type === 'group') {
          newGroupName = message.sender.name;
          newGroupId = message.sender.id_value;
        } else {
          newGroupName = message.recipient.name;
          newGroupId = message.recipient.id_value;
        }

        newGroupDescription = message.description;

        /// try to get proper group info
        for (const group of this._groupsArray) {
          if (group.id === newGroupId) {
            newGroupName = group.name;
            newGroupDescription = group.description;
          }
        }

        const conversation: SecureMessageConversation = {
          institutionId: SecureMessagingService.GetSecureMessagesAuthInfo().institution_id,
          groupName: newGroupName,
          groupIdValue: newGroupId,
          groupDescription: newGroupDescription,
          myIdValue: SecureMessagingService.GetSecureMessagesAuthInfo().id_value,
          messages: [],
          selected: false,
        };

        conversation.messages.push(message);
        tempConversations.push(conversation);
      }
    }
    tempConversations.sort(this.sortConversations);
    this.conversationsArray = tempConversations;
    this.conversationsArraySubject.next(this.conversationsArray);
  }

  startConversation({ id, name, description }: SecureMessageGroupInfo) {
    /// check if a conversation with this group already exists
    let conversation: SecureMessageConversation = null;
    for (const convo of this.conversationsArray) {
      if (convo.groupIdValue === id) {
        conversation = convo;
        break;
      }
    }

    if (conversation === null) {
      conversation = {
        institutionId: SecureMessagingService.GetSecureMessagesAuthInfo().institution_id,
        groupName: name,
        groupIdValue: id,
        groupDescription: description,
        myIdValue: SecureMessagingService.GetSecureMessagesAuthInfo().id_value,
        messages: [],
        selected: true,
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
    for (const convo of this.conversationsArray) {
      convo.selected = false;
    }
    this._selectedConversation.selected = true;
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
    for (const convo of this.conversationsArray) {
      convo.selected = false;
    }
  }

  /**
   * Sort conversations by most current for display
   */
  sortConversations = (a, b) => {
    if (a.messages === null) {
      return 1;
    }
    if (b.messages === null) {
      return -1;
    }
    if (a.messages.length === 0) {
      return 1;
    }
    if (b.messages.length === 0) {
      return -1;
    }

    if (
      new Date(a.messages[a.messages.length - 1].sent_date).getTime() <
      new Date(b.messages[b.messages.length - 1].sent_date).getTime()
    ) {
      return 1;
    }

    if (
      new Date(a.messages[a.messages.length - 1].sent_date).getTime() >
      new Date(b.messages[b.messages.length - 1].sent_date).getTime()
    ) {
      return -1;
    }

    return 0;
  };
}
