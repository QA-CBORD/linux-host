import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { PopoverController } from '@ionic/angular';
import { SecureMessagePopoverComponent } from '@sections/secure-messaging/secure-message-popover';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { UserInfo } from '@core/model/user';
import * as Globals from '../../../../app.global';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { generateColorHslFromText } from '@core/utils/colors-helper';
import {
  getConversationDescription,
  getConversationGroupInitial,
  getConversationGroupName,
} from '@core/utils/conversations-helper';
import { Subscription } from 'rxjs';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';
import {
  SecureMessageInfo,
  SecureMessageGroupInfo,
  SecureMessageTypes,
  SecureMessageConversation,
  MarkAsReadVal,
} from '@core/model/secure-messaging/secure-messaging.model';

@Component({
  selector: 'st-segure-message-chat.page',
  templateUrl: './segure-message-chat.page.component.html',
  styleUrls: ['./segure-message-chat.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegureMessageChatPageComponent implements OnInit, OnDestroy {
  @ViewChild('chatScroll', { read: ElementRef }) chatScroll: ElementRef;
  senderType = SecureMessageTypes;
  newMessageText = '';
  private readonly sourceSub: Subscription = new Subscription();

  // TODO: Implement from store
  get selectedConversation() {
    return this.secureMessagingFacadeService.selectedConversation;
  }

  get groupsArray() {
    return this.secureMessagingFacadeService.groupsArray;
  }
  get messagesFromRC() {
    return this.selectedConversation.messages.filter(
      msg => msg.sender.type === SecureMessageTypes.GROUP
    )
  }

  constructor(
    private readonly secureMessagingFacadeService: SecureMessagingFacadeService,
    private readonly popoverCtrl: PopoverController,
    private readonly globalNav: GlobalNavService,
    private readonly userService: UserFacadeService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // TODO: Implement from store
    this.sourceSub.add(
      this.secureMessagingFacadeService.conversationsArray$.subscribe(() => {
        this.changeDetectorRef.detectChanges();
        this.scrollToBottom();
      })
    );
  }

  ionViewDidEnter() {
    this.scrollToBottom();
  }
  ionViewWillLeave() {
    this.sourceSub.add(this.secureMessagingFacadeService.getInitialData$().pipe(first()).subscribe());
  }
  ngOnDestroy() {
    if (this.selectedConversation && this.messagesFromRC.length > 0) this.markAsRead(this.infoToMarkAsRead);
    this.secureMessagingFacadeService.clearSelectedConversation();
    this.sourceSub.unsubscribe();
  }

  trackMessagesByFn(index: number, { id }: SecureMessageInfo): string {
    return id;
  }

  /**
   * Helper method to scroll to bottom of chat
   */
  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatScroll == null) {
        return;
      }
      try {
        const scroll = this.chatScroll.nativeElement;
        scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
      } catch (error) {
        /// do nothing
      }
    }, 100);
  }

  /**
   * Show grid column with messages from current selected conversation
   */
  showSelectedConversationContentColumn(): boolean {
    return this.selectedConversation !== null;
  }
  /**
   * Show grid column with groups available to start a conversation
   */
  showCreateNewConversationColumn(): boolean {
    return !this.showSelectedConversationContentColumn();
  }
  /**
   * click listener for group in 'new conversation' column
   */
  onClickMakeNewConversation(group: SecureMessageGroupInfo) {
    this.secureMessagingFacadeService.startConversation(group);
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }
  /**
   * click listener to send message
   */
  onClickSendButton() {
    if (this.newMessageText && this.newMessageText.trim().length) {
      this.userService.getUserData$().subscribe(
        userInfo => {
          this.sendMessage(this.createNewMessageSendBody(this.newMessageText, userInfo));
        },
        () => {
          const error = { message: 'Unable to verify your user information', title: Globals.Exception.Strings.TITLE };
          this.modalHandler(error, this.sendMessage.bind(this, ''));
        }
      );
    }
  }

  /**
   * click listener for backing out of conversation (small UI only)
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // onClickBackConversation(): void {
  //   console.log('back clicked');

  // }

  /**
   * Create message body object for sending a new message to a group
   * @param messageBody body of new message
   */
  private createNewMessageSendBody(messageBody: string, userInfo: UserInfo): SecureMessageInfo {
    return {
      institution_id: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().institution_id,
      sender: {
        type: SecureMessageTypes.PATRON,
        id_field: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().id_field,
        id_value: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().id_value,
        name: userInfo.firstName + ' ' + userInfo.lastName,
      },
      recipient: {
        type: SecureMessageTypes.GROUP,
        id_value: this.selectedConversation.groupIdValue,
        name: this.selectedConversation.groupName,
      },
      description: '',
      body: messageBody,
      importance: null,
    };
  }

  /**
   * Send message body to group
   * @param message message body object to send for new message
   */
  private sendMessage(message: SecureMessageInfo) {
    this.newMessageText = null;
    //this.secureMessagingFacadeService
    this.secureMessagingFacadeService
      .sendSecureMessage(message)
      .pipe(first())
      .subscribe(
        () => this.addMessageToLocalConversation(message),
        () => {
          const error = { message: 'Unable to verify your user information', title: Globals.Exception.Strings.TITLE };
          this.modalHandler(error, this.sendMessage.bind(this, message));
        }
      );
  }

  /**
   * Add sent message to local conversation
   */
  private addMessageToLocalConversation({ body, sender }: SecureMessageInfo) {
    const message: SecureMessageInfo = {
      body,
      created_date: new Date().toLocaleString(),
      description: '',
      id: null,
      importance: null,
      institution_id: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().institution_id,
      read_date: null,
      recipient: {
        created_date: new Date().toISOString(),
        id: '',
        type: SecureMessageTypes.GROUP,
        id_field: null,
        id_value: this.selectedConversation.groupIdValue,
        name: this.selectedConversation.groupName,
        aux_user_id: null,
        version: 1,
      },
      replied_message_id: 'None',
      requires_read_receipt: null,
      sender: {
        created_date: new Date().toISOString(),
        id: '',
        type: 'patron',
        id_field: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().id_field,
        id_value: SecureMessagingFacadeService.GetSecureMessagesAuthInfo().id_value,
        name: sender.name,
        aux_user_id: null,
        version: 1,
      },
      sent_date: new Date().toLocaleString(),
      state: null,
      ttl: null,
      version: 1,
    };

    this.newMessageText = null;
    this.selectedConversation.messages.push(message);
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }

  // TODO: Build from store
  getConversationGroupInitial = getConversationGroupInitial;
  getConversationGroupName = getConversationGroupName;
  getConversationDescription = getConversationDescription;
  getAvatarBackgroundColor = generateColorHslFromText;

  /**
   * UI helper method to set group name
   * @param group conversation to get data for ui
   */
  getGroupName({ name }: SecureMessageGroupInfo): string {
    return name == null ? 'Name Unknown' : name;
  }

  /**
   * UI helper method to set group description
   * @param group group to get data for ui
   */
  getGroupDescription({ description }: SecureMessageGroupInfo): string {
    return description == null ? '' : description;
  }

  /**
   *
   * @param messages
   * @param messageIndex
   * @param messageType
   */
  messageShowAvatar({ messages }: SecureMessageConversation, messageIndex: number, messageType: string): boolean {
    const isNextMessageFromGroup = (): boolean => messages[messageIndex + 1].sender.type === messageType;
    const isMoreThanOneMinuteBetweenMessages = (): boolean =>
      new Date(messages[messageIndex + 1].sent_date).getTime() - new Date(messages[messageIndex].sent_date).getTime() <
      60000;

    /// first message
    if (messageIndex === 0) {
      /// more than one message && next message from group as well
      return !(messages.length > 1 && isNextMessageFromGroup() && isMoreThanOneMinuteBetweenMessages());
    }

    /// not last message && more messages && next message from group as well
    return !(
      messages.length - 1 > messageIndex + 1 &&
      isNextMessageFromGroup() &&
      isMoreThanOneMinuteBetweenMessages()
    );
  }

  /**
   * UI Helper method to determine if the sent date should be shown
   * (used to group messages visually)
   * @param conversation conversation data
   * @param messageIndex index of current message
   * @param messageType type of message (group or patron)
   */
  messageShowDate({ messages }: SecureMessageConversation, messageIndex: number, messageType: string): boolean {
    /// next message from group as well:
    const isNextMessageFromGroup = (): boolean => {
      //was this message sent within 1 min of the next message:
      const isMessageSentWithinMin: boolean =
        new Date(messages[messageIndex + 1].sent_date).getTime() -
        new Date(messages[messageIndex].sent_date).getTime() <
        60000;

      return messages[messageIndex + 1].sender.type === messageType && isMessageSentWithinMin;
    };
    /// first message
    if (messageIndex === 0) {
      /// more than one message
      return !(messages.length > 1 && isNextMessageFromGroup());
    } else {
      /// not first message
      /// more messages
      return !(messages.length - 1 > messageIndex + 1 && isNextMessageFromGroup());
    }
  }

  async modalHandler(res, cb) {
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: SecureMessagePopoverComponent,
      componentProps: {
        data: res,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.CLOSE) {
        //TODO: this.platform.exitApp();
      }

      if (role === BUTTON_TYPE.RETRY) {
        cb();
      }
    });

    return await popover.present();
  }
  markAsRead(body: MarkAsReadVal) {
    const lastMessage = this.messagesArr[this.messagesArr.length - 1];
    if (lastMessage.sender.type === SecureMessageTypes.GROUP && !lastMessage.read_date) {
      this.secureMessagingFacadeService
        .markAsRead(body)
        .pipe(
          first(),
          switchMap(() => this.secureMessagingFacadeService.requestForNewMessagesAndGroups$),
          tap(arg => this.secureMessagingFacadeService.mapToStorage(arg)),
          catchError(() => {
            const error = { message: 'Unable to verify your user information', title: Globals.Exception.Strings.TITLE };
            return this.modalHandler(error, null);
          })
        )
        .subscribe();
    }
  }
  get messagesArr() {
    return this.selectedConversation.messages;
  }
  private get infoToMarkAsRead(): MarkAsReadVal {

    const lastMessage = this.messagesFromRC.pop();
    return {
      institution_id: lastMessage.institution_id,
      sender_id: lastMessage.sender.id,
      sent_date: new Date().toISOString(),
    };
  }
}
