import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Events, Platform, PopoverController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SecureMessagingService } from './service';
import { DataCache } from '../../core/utils/data-cache';
import { LoadingService } from '../../core/service/loading/loading.service';
import { BUTTON_TYPE } from '../../core/utils/buttons.config';
import { SecureMessagePopoverComponent } from './secure-message-popover';
import * as Globals from '../../app.global';
import { SecureMessageConversation, SecureMessageGroupInfo, SecureMessageInfo, SecureMessageSendBody } from './models';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-secure-message',
  templateUrl: './secure-message.page.html',
  styleUrls: ['./secure-message.page.scss'],
})
export class SecureMessagePage implements OnDestroy, OnInit {
  @ViewChild('chatScroll') chatScroll: any;
  @ViewChild('chatInput') chatInput: any;

  private readonly largeScreenPixelMin = 576;
  private readonly sourceSubscription: Subscription = new Subscription();
  private messagesArray: SecureMessageInfo[] = [];

  private bIsLargeScreen: boolean = false;
  private bCreateNewConversation: boolean = false;
  private conversationsArray: SecureMessageConversation[] = [];
  private groupsArray: SecureMessageGroupInfo[] = [];
  private selectedConversation: SecureMessageConversation = null;
  private newMessageText: string = '';

  constructor(
    private readonly platform: Platform,
    private readonly events: Events,
    private readonly secureMessagingService: SecureMessagingService,
    private readonly loading: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly nativeProvider: NativeProvider,
    private readonly globalNav: GlobalNavService
  ) {
    this.platform.ready().then(this.initComponent.bind(this));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  /**
   * Show grid column with current conversations
   */
  get isConversationsColumnAppear(): boolean {
    return this.bIsLargeScreen === true || (this.selectedConversation == null && !this.bCreateNewConversation);
  }

  private initComponent() {
    /// set subscription to check screen size onAddressChanged
    /// used to adjust ui layout
    this.bIsLargeScreen = this.platform.width() > this.largeScreenPixelMin;
    const subscription = fromEvent(window, 'resize').subscribe(this.onWindowResizeHandler.bind(this));
    this.sourceSubscription.add(subscription);
    this.initializePage();
  }

  private onWindowResizeHandler() {
    // const bWasPreviouslyLargeScreen = this.bIsLargeScreen;
    this.bIsLargeScreen = window.innerWidth >= this.largeScreenPixelMin;
    // if (!bWasPreviouslyLargeScreen && this.bIsLargeScreen) {
    //   /// do nothing for now
    // }
  }

  /**
   * Initial data gathering for messages and groups
   */
  private initializePage() {
    this.loading.showSpinner('Retrieving conversations...');
    const subscription = this.secureMessagingService
      .getInitialData()
      .pipe(finalize(() => this.loading.closeSpinner()))
      .subscribe(
        ([smGroupArray, smMessageArray]) => {
          this.groupsArray = smGroupArray;
          this.messagesArray = smMessageArray;
          this.createConversationsFromResponse(false);
          this.pollForData();
        },
        error => {
          this.modalHandler({ ...error, title: Globals.Exception.Strings.TITLE }, this.initializePage.bind(this));
        }
      );

    this.sourceSubscription.add(subscription);
  }

  /**
   * Poll for updated messages and groups
   */
  private pollForData() {
    const subscription = this.secureMessagingService.pollForData().subscribe(
      ([smGroupArray, smMessageArray]) => {
        /// if there are new groups, update the list
        if (this.messagesArray.length !== smGroupArray.length) {
          this.messagesArray = smMessageArray;
        }
        /// if there are new messages, update the conversations
        if (this.messagesArray.length !== smMessageArray.length) {
          this.messagesArray = smMessageArray;
          this.createConversationsFromResponse(true);
        }
      },
      error => {
        /// only deal with connection error ?
      }
    );

    this.sourceSubscription.add(subscription);
  }

  private sortGroups() {
    /// sort groups alphabetically
    this.groupsArray.sort((a, b) => {
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
  private createConversationsFromResponse(bIsPollingData: boolean) {
    const tempConversations: SecureMessageConversation[] = [];

    this.sortGroups();

    /// create 'conversations' out of message array
    for (const message of this.messagesArray) {
      message.sent_date = new Date(message.sent_date).toDateString();

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
        for (const group of this.groupsArray) {
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

    this.conversationsArray = tempConversations;

    this.sortConversations();

    if (bIsPollingData === false && (this.conversationsArray.length && this.bIsLargeScreen)) {
      /// select first conversation by default
      this.conversationsArray[0].selected = true;
      this.selectedConversation = this.conversationsArray[0];
    }
  }

  trackConversationsByFn(index: number, { groupIdValue }: SecureMessageConversation): string {
    return groupIdValue;
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
        const scroll = this.chatScroll._scrollContent.nativeElement;
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
    return this.selectedConversation !== null && !this.bCreateNewConversation;
  }

  /**
   * Show grid column with groups available to start a conversation
   */
  showCreateNewConversationColumn(): boolean {
    return this.bCreateNewConversation;
  }

  showToolbar(){
    return !this.nativeProvider.isWeb() && !this.showSelectedConversationContentColumn() && !this.showCreateNewConversationColumn();
  }

  /**
   * click listner for Start Conversation
   */
  onClickStartConversation() {
    this.bCreateNewConversation = true;
  }

  /**
   * click listner for group in 'new conversation' column
   */
  onClickMakeNewConversation({ id, name, description }: SecureMessageGroupInfo) {
    /// check if a conversation with this group already exists
    let newConversation: SecureMessageConversation = null;
    for (const convo of this.conversationsArray) {
      if (convo.groupIdValue === id) {
        newConversation = convo;
        break;
      }
    }

    if (newConversation === null) {
      newConversation = {
        institutionId: SecureMessagingService.GetSecureMessagesAuthInfo().institution_id,
        groupName: name,
        groupIdValue: id,
        groupDescription: description,
        myIdValue: SecureMessagingService.GetSecureMessagesAuthInfo().id_value,
        messages: [],
        selected: true,
      };
    }

    this.setSelectedConversation(newConversation);
    this.bCreateNewConversation = false;
  }

  /**
   * click listener to selected current conversation to display
   */
  onClickConversation(conversation: SecureMessageConversation) {
    this.bCreateNewConversation = false;
    if (this.selectedConversation != null && this.selectedConversation.groupIdValue === conversation.groupIdValue) {
      return;
    }
    this.setSelectedConversation(conversation);
    this.scrollToBottom();
  }

  /**
   * click listener to send message
   */
  onClickSendButton() {
    if (this.newMessageText && this.newMessageText.trim().length) {
      this.sendMessage(this.createNewMessageSendBody(this.newMessageText));
    }
  }

  /**
   * click listener for backing out of conversation (small UI only)
   */
  onClickBackConversation() {
    this.clearSelectedConversation();
  }

  /**
   * click listener for backing out of create conversation (small UI only)
   */
  onClickBackNewConversation() {
    this.bCreateNewConversation = false;
  }

  /**
   * Create message body object for sending a new message to a group
   * @param messageBody body of new message
   */
  private createNewMessageSendBody(messageBody: string): SecureMessageSendBody {
    return {
      institution_id: SecureMessagingService.GetSecureMessagesAuthInfo().institution_id,
      sender: {
        type: 'patron',
        id_field: SecureMessagingService.GetSecureMessagesAuthInfo().id_field,
        id_value: SecureMessagingService.GetSecureMessagesAuthInfo().id_value,
        name: DataCache.getUserInfo().firstName + ' ' + DataCache.getUserInfo().lastName,
      },
      recipient: {
        type: 'group',
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
  private sendMessage(message: SecureMessageSendBody) {
    this.newMessageText = null;

    const subscription = this.secureMessagingService.sendSecureMessage(message).subscribe(
      () => this.addMessageToLocalConversation(message),
      () => {
        const error = { message: 'Unable to verify your user information', title: Globals.Exception.Strings.TITLE };
        this.modalHandler(error, this.sendMessage.bind(this, message));
      }
    );

    this.sourceSubscription.add(subscription);
  }

  /**
   * Add sent message to local conversation
   */
  private addMessageToLocalConversation({ body }: SecureMessageSendBody) {
    const message: SecureMessageInfo = {
      body,
      created_date: new Date().toLocaleString(),
      description: '',
      id: null,
      importance: null,
      institution_id: SecureMessagingService.GetSecureMessagesAuthInfo().institution_id,
      read_date: null,
      recipient: {
        created_date: new Date().toISOString(),
        id: '',
        type: 'group',
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
        id_field: SecureMessagingService.GetSecureMessagesAuthInfo().id_field,
        id_value: SecureMessagingService.GetSecureMessagesAuthInfo().id_value,
        name: DataCache.getUserInfo().firstName + ' ' + DataCache.getUserInfo().lastName,
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
    if (this.conversationsArray.indexOf(this.selectedConversation) < 0) {
      this.conversationsArray.push(this.selectedConversation);
    }
    this.sortConversations();
  }

  /**
   * Sort conversations for display
   */
  private sortConversations() {
    /// sort conversations by most current
    this.conversationsArray.sort((a, b) => {
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
    });
  }

  /**
   * Heler method to set selected conversation
   * @param conversation conversation to set as selected
   */
  private setSelectedConversation(conversation: SecureMessageConversation) {
    this.selectedConversation = conversation;
    for (const convo of this.conversationsArray) {
      convo.selected = false;
    }
    this.selectedConversation.selected = true;
  }

  /**
   * Helper method to clear selected conversation
   */
  private clearSelectedConversation() {
    if (this.selectedConversation.messages === null || this.selectedConversation.messages.length === 0) {
      for (const convo of this.conversationsArray) {
        if (convo.groupIdValue === this.selectedConversation.groupIdValue) {
          this.conversationsArray.splice(this.conversationsArray.indexOf(convo), 1);
        }
      }
    }
    this.selectedConversation = null;
    for (const convo of this.conversationsArray) {
      convo.selected = false;
    }
  }

  /**
   * UI helper method to set group initial
   * @param conversation conversation to get data for ui
   */
  getConversationGroupInitial({ groupName }: SecureMessageConversation): string {
    return groupName == null || groupName.length < 1 ? 'U' : groupName[0];
  }

  /**
   * UI helper method to set group name
   * @param conversation conversation to get data for ui
   */
  getConversationGroupName({ groupName }: SecureMessageConversation): string {
    return groupName == null ? 'Conversation' : groupName;
  }

  /**
   * UI helper method to set description text for conversation
   * (this gets the most recently sent message)
   * @param conversation conversation to get data for ui
   */
  getConversationDescription({ messages }: SecureMessageConversation): string {
    const lastIMessage: SecureMessageInfo = messages[messages.length - 1];
    const frontText: string = lastIMessage.sender.type === 'patron' ? 'You: ' : '';

    return frontText + lastIMessage.body;
  }

  /**
   * UI helper method to set group initial for chat
   * @param group group to get data for ui
   */
  getGroupInitial({ name }: SecureMessageGroupInfo): string {
    return name == null || name.length < 1 ? 'U' : name[0];
  }

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

  checkIfOpen(): boolean {
    this.globalNav.hideNavBar();
    return true
  }

  isMainPage() {
    this.globalNav.showNavBar();
    return true
  }
}
