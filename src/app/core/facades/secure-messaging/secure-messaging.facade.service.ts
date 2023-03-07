import { Injectable } from '@angular/core';
import { StorageEntity } from '@core/classes/extendable-state-manager';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import {
  SecureMessagingAuthInfo,
  SecureMessageInfo,
  SecureMessageGroupInfo,
  SecureMessageConversation,
} from '@core/model/secure-messaging/secure-messaging.model';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { SecureMessagingApiService } from '@core/service/secure-messaging/secure-messaging-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { buildConversationsFromMessages } from '@core/utils/conversations-helper';
import { map, Observable, skipWhile, Subject, switchMap, take, tap, timer, zip } from 'rxjs';
const REFRESH_TIME = 10000;

@Injectable({
  providedIn: 'root',
})
export class SecureMessagingFacadeService extends ServiceStateFacade {
  private ttl = 600000; // 10min
  private static smAuthInfo: SecureMessagingAuthInfo;
  private readonly ma_type = 'patron';
  private messagesArray: SecureMessageInfo[] = [];
  private _groupsArray: SecureMessageGroupInfo[] = [];
  private _selectedConversation: SecureMessageConversation = null;
  private conversationsArraySubject: Subject<SecureMessageConversation[]> = new Subject();
  public conversationsArray$: Observable<SecureMessageConversation[]> = this.conversationsArraySubject.asObservable();
  private conversationsArray: SecureMessageConversation[] = [];
  get selectedConversation() {
    return this._selectedConversation;
  }

  get groupsArray() {
    return this._groupsArray;
  }
  get messages$() {
    return this.storageStateService.getStateEntityByKey$<[SecureMessageGroupInfo[], SecureMessageInfo[]]>(
      this.secureMessaginKey
    );
  }

  private secureMessaginKey = 'get_secure_message';
  constructor(
    private authService: AuthApiService,
    private secureMessagingService: SecureMessagingApiService,
    private readonly storageStateService: StorageStateService
  ) {
    super();
  }

  static GetSecureMessagesAuthInfo(): SecureMessagingAuthInfo {
    return SecureMessagingFacadeService.smAuthInfo;
  }
  getInitialData$(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return this.getInitialDataState$().pipe(
      tap(([groupsArray, messages]) => {
        this._groupsArray = groupsArray;
        this.messagesArray = messages;
        this.buildConversationsFromResponseAndNotify();
      })
    );
  }

  getInitialDataState$(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return this.authService.getExternalAuthenticationToken().pipe(
      switchMap((response: string) => {
        SecureMessagingApiService.setJWT(response);
        SecureMessagingFacadeService.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
        return this.messages$.pipe(
          switchMap(data => {
            if (data !== null && data.lastModified + data.timeToLive >= Date.now()) {
              return this.messages$.pipe(map(({ value }) => value));
            }
            return this.getInitialConvoData$();
          })
        );
      })
    );
  }

  getInitialConvoData$(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return zip(this.getSecureMessagesGroups(), this.getSecureMessages()).pipe(
      tap(response => {
        this.storageStateService.updateStateEntity(this.secureMessaginKey, response, {
          ttl: this.ttl,
          highPriorityKey: true,
        });
      })
    );
  }
  getSecureMessagesGroups(): Observable<SecureMessageGroupInfo[]> {
    return this.secureMessagingService.getSecureMessagesGroups(SecureMessagingFacadeService.smAuthInfo.institution_id);
  }
  getSecureMessages(): Observable<SecureMessageInfo[]> {
    return this.secureMessagingService.getSecureMessages(
      this.ma_type,
      SecureMessagingFacadeService.smAuthInfo.id_field,
      SecureMessagingFacadeService.smAuthInfo.id_value
    );
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
  private buildConversationsFromResponseAndNotify() {
    this.sortGroups();

    this.conversationsArray = buildConversationsFromMessages(
      this.messagesArray,
      this.groupsArray,
      SecureMessagingFacadeService.GetSecureMessagesAuthInfo()
    );
    // Update current conversation if got new messages
    if (this._selectedConversation) {
      this._selectedConversation.messages =
        this.conversationsArray.find(convo => convo.groupIdValue === this._selectedConversation.groupIdValue)
          ?.messages || [];
    }

    this.conversationsArraySubject.next(this.conversationsArray);
  }

  sendSecureMessage(messageInfo: SecureMessageInfo): Observable<SecureMessageInfo> {
    return this.secureMessagingService.postSecureMessage(messageInfo).pipe(
      tap(() => {
        this.messagesArray.push(messageInfo);
        this.storageStateService.updateStateEntity(this.secureMessaginKey, [this._groupsArray, this.messagesArray], {
          ttl: this.ttl,
          highPriorityKey: true,
        });
      })
    );
  }

  startConversation({ id, name, description }: SecureMessageGroupInfo) {
    /// check if a conversation with this group already exists
    let conversation: SecureMessageConversation = this.conversationsArray.find(convo => convo.groupIdValue === id);

    if (conversation === null) {
      conversation = {
        institutionId: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().institution_id,
        groupName: name,
        groupIdValue: id,
        groupDescription: description,
        myIdValue: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().id_value,
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
   * Poll for updated messages and groups
   */
  pollForDataInterval(): Observable<[SecureMessageGroupInfo[], SecureMessageInfo[]]> {
    return timer(REFRESH_TIME, REFRESH_TIME).pipe(
      switchMap(() => zip(this.getSecureMessagesGroups(), this.getSecureMessages())),
      skipWhile(
        ([smGroupArray, smMessageArray]) =>
          this.messagesArray.length === smMessageArray.length || this._groupsArray.length === smGroupArray.length
      ),
      tap(([smGroupArray, smMessageArray]) => {
        this.storageStateService.updateStateEntity(this.secureMessaginKey, [smGroupArray, smMessageArray], {
          ttl: this.ttl,
          highPriorityKey: true,
        });
        this.buildConversationsFromResponseAndNotify();
      })
    );
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
    this.buildConversationsFromResponseAndNotify();
  }
}
