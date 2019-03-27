import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Platform, Events } from '@ionic/angular';

import { Subscription, fromEvent } from 'rxjs';

import { SecureMessagingProvider } from 'src/app/provider/secure-messaging/secure-messaging.provider';
import { ExceptionProvider } from 'src/app/provider/exception-provider/exception.provider';

import * as Globals from '../../../app.global';
import { DataCache } from './../../../utils/data-cache';

import { MSecureMessageConversation, MSecureMessageGroupInfo, MSecureMessageInfo, MSecureMessageSendBody } from 'src/app/models/secure-messaging/secure-message-info';


@Component({
  selector: 'app-secure-message',
  templateUrl: './secure-message.page.html',
  styleUrls: ['./secure-message.page.scss'],
})
export class SecureMessagePage implements OnInit {

  private largeScreenPixelMin = 576;
  private resizeSubscription: Subscription;
  @ViewChild('chatScroll') chatScroll: any;
  @ViewChild('chatInput') chatInput: any;
  bIsLargeScreen = false;

  private pollSubscription: Subscription;
  bCreateNewConversation = false;
  conversationsArray: MSecureMessageConversation[] = new Array();
  groupsArray: MSecureMessageGroupInfo[] = new Array();
  private messagesArray: MSecureMessageInfo[] = new Array();
  selectedConversation: MSecureMessageConversation = null;

  newMessageText = '';

  constructor(
    private platform: Platform,
    private events: Events,
    private datePipe: DatePipe,
    private smProvider: SecureMessagingProvider
  ) {
    this.platform.ready().then(() => {
      /// set subscription to check screen size change
      /// used to adjust ui layout
      this.bIsLargeScreen = this.platform.width() > this.largeScreenPixelMin;
      this.resizeSubscription = fromEvent(window, 'resize')
        .subscribe(event => {
          const bWasPreviouslyLargeScreen = this.bIsLargeScreen;
          this.bIsLargeScreen = window.innerWidth >= this.largeScreenPixelMin;
          if (!bWasPreviouslyLargeScreen && this.bIsLargeScreen) {
            /// do nothing for now
          }
        });
      this.initializePage();
    });
  }

  ngOnInit() {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    /// remove subscriptions

    if (this.resizeSubscription != null) {
      this.resizeSubscription.unsubscribe();
    }
    if (this.pollSubscription != null) {
      this.pollSubscription.unsubscribe();
    }
  }

  /**
   * Initial data gathering for messages and groups
   */
  private initializePage() {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: 'Retrieving conversations...' });
    this.smProvider.getInitialData().subscribe(
      ([smGroupArray, smMessageArray]) => {
        this.groupsArray = smGroupArray;
        this.messagesArray = smMessageArray;
        this.createConversationsFromResponse(false);
        this.pollForData();
      },
      error => {
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: Globals.Exception.Strings.TITLE,
            message: error,
            positiveButtonTitle: 'RETRY',
            positiveButtonHandler: () => {
              this.initializePage();
            },
            negativeButtonTitle: 'CLOSE',
            negativeButtonHandler: () => {
              // TODO: this.platform.exitApp();
            }
          }
        });
      }
    );
  }

  /**
   * Poll for updated messages and groups
   */
  private pollForData() {
    this.pollSubscription = this.smProvider.pollForData().subscribe(
      ([smGroupArray, smMessageArray]) => {
        /// if there are new groups, update the list
        if (this.groupsArray.length !== smGroupArray.length) {
          this.groupsArray = smGroupArray;
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
  }

  /**
   * Handle messages and groups response and make conversations to display
   * @param bIsPollingData Is this update from polled data
   */
  private createConversationsFromResponse(bIsPollingData: boolean) {

    /// sort groups alphabetically
    this.groupsArray.sort((a, b) => {
      if (a.name == null) { return -1; }
      if (b.name == null) { return 1; }
      if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    });

    const tempConversations: MSecureMessageConversation[] = new Array();

    /// create 'conversations' out of message array
    for (const message of this.messagesArray) {
      message.sent_date = new Date(message.sent_date).toLocaleString();

      let bNewConversation = true;

      /// add to existing conversation if it exists
      for (const convo of tempConversations) {
        if (convo.groupIdValue && convo.groupIdValue.length > 0 && (convo.groupIdValue === message.sender.id_value || convo.groupIdValue === message.recipient.id_value)) {
          convo.messages.push(message);
          bNewConversation = false;
        }

        if (!bNewConversation) {
          break;
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

        const conversation: MSecureMessageConversation = {
          institutionId: SecureMessagingProvider.GetSMAuthInfo().institution_id,
          groupName: newGroupName,
          groupIdValue: newGroupId,
          groupDescription: newGroupDescription,
          myIdValue: SecureMessagingProvider.GetSMAuthInfo().id_value,
          messages: new Array(),
          selected: false
        };

        conversation.messages.push(message);
        tempConversations.push(conversation);
      }

    }

    this.conversationsArray = tempConversations;

    this.sortConversations();

    if (bIsPollingData === false) {
      /// select first conversation by default
      if (this.conversationsArray.length > 0 && this.bIsLargeScreen) {
        this.conversationsArray[0].selected = true;
        this.selectedConversation = this.conversationsArray[0];
      }

      this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

    }
  }

  trackConversationsByFn(index: number, item: MSecureMessageConversation) {
    return item.groupIdValue;
  }

  trackMessagesByFn(index: number, item: MSecureMessageInfo) {
    return item.id;
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
   * Show grid column with current conversations
   */
  public showConversationsColumn(): boolean {
    if (this.bIsLargeScreen === true || (this.selectedConversation == null && !this.bCreateNewConversation)) {
      return true;
    }
    return false;
  }

  /**
   * Show grid column with messages from current selected conversation
   */
  public showSelectedConversationContentColumn(): boolean {
    if (this.selectedConversation != null && !this.bCreateNewConversation) {
      return true;
    }
    return false;
  }

  /**
   * Show grid column with groups available to start a conversation
   */
  public showCreateNewConversationColumn(): boolean {
    return this.bCreateNewConversation;
  }

  /**
   * click listner for Start Conversation
   */
  public onClickStartConversation() {
    this.bCreateNewConversation = true;
  }

  /**
   * click listner for group in 'new conversation' column
   */
  public onClickMakeNewConversation(group: MSecureMessageGroupInfo) {

    /// check if a conversation with this group already exists
    let newConversation: MSecureMessageConversation = null;
    for (const convo of this.conversationsArray) {
      if (convo.groupIdValue === group.id) {
        newConversation = convo;
        break;
      }
    }

    if (newConversation === null) {
      newConversation = {
        institutionId: SecureMessagingProvider.GetSMAuthInfo().institution_id,
        groupName: group.name,
        groupIdValue: group.id,
        groupDescription: group.description,
        myIdValue: SecureMessagingProvider.GetSMAuthInfo().id_value,
        messages: new Array(),
        selected: true
      };
    }

    this.setSelectedConversation(newConversation);
    this.bCreateNewConversation = false;
  }

  /**
   * click listner to selected current conversation to display
   */
  public onClickConversation(conversation: MSecureMessageConversation) {
    this.bCreateNewConversation = false;
    if (this.selectedConversation != null && this.selectedConversation.groupIdValue === conversation.groupIdValue) {
      return;
    }
    this.setSelectedConversation(conversation);
    this.scrollToBottom();
  }

  /**
   * click listner to send message
   */
  public onClickSendButton() {
    if (this.newMessageText != null && this.newMessageText.length > 0) {
      this.sendMessage(this.createNewMessageSendBody(this.newMessageText));
    }
  }

  /**
   * click listner for backing out of conversation (small UI only)
   */
  public onClickBackConversation() {
    this.clearSelectedConversation();
  }

  /**
   * click listner for backing out of create conversation (small UI only)
   */
  public onClickBackNewConversation() {
    this.bCreateNewConversation = false;
  }

  /**
   * Create message body object for sending a new message to a group
   * @param messageBody body of new message
   */
  private createNewMessageSendBody(messageBody: string): MSecureMessageSendBody {
    return {
      institution_id: SecureMessagingProvider.GetSMAuthInfo().institution_id,
      sender: {
        type: 'patron',
        id_field: SecureMessagingProvider.GetSMAuthInfo().id_field,
        id_value: SecureMessagingProvider.GetSMAuthInfo().id_value,
        name: DataCache.getUserInfo().firstName + ' ' + DataCache.getUserInfo().lastName
      },
      recipient: {
        type: 'group',
        id_value: this.selectedConversation.groupIdValue,
        name: this.selectedConversation.groupName
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
  private sendMessage(message: MSecureMessageSendBody) {
    this.smProvider.sendSecureMessage(message).subscribe(
      response => {
        this.addMessageToLocalConversation();
        try {
          this.chatInput.blur();
        } catch (e) { }
      },
      error => {
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: Globals.Exception.Strings.TITLE,
            message: 'Unable to verify your user information',
            positiveButtonTitle: 'RETRY',
            positiveButtonHandler: () => {
              this.sendMessage(message);
            },
            negativeButtonTitle: 'CLOSE',
            negativeButtonHandler: () => {
              // TODO: this.platform.exitApp();
            }
          }
        });
      }
    );
  }

  /**
   * Add sent message to local conversation
   */
  private addMessageToLocalConversation() {
    const message: MSecureMessageInfo = {
      body: this.newMessageText,
      created_date: new Date().toLocaleString(),
      description: '',
      id: null,
      importance: null,
      institution_id: SecureMessagingProvider.GetSMAuthInfo().institution_id,
      read_date: null,
      recipient: { created_date: new Date().toISOString(), id: '', type: 'group', id_field: null, id_value: this.selectedConversation.groupIdValue, name: this.selectedConversation.groupName, aux_user_id: null, version: 1 },
      replied_message_id: 'None',
      requires_read_receipt: null,
      sender: { created_date: new Date().toISOString(), id: '', type: 'patron', id_field: SecureMessagingProvider.GetSMAuthInfo().id_field, id_value: SecureMessagingProvider.GetSMAuthInfo().id_value, name: DataCache.getUserInfo().firstName + ' ' + DataCache.getUserInfo().lastName, aux_user_id: null, version: 1 },
      sent_date: new Date().toLocaleString(),
      state: null,
      ttl: null,
      version: 1
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
      if (a.messages === null) { return 1; }
      if (b.messages === null) { return -1; }
      if (a.messages.length === 0) { return 1; }
      if (b.messages.length === 0) { return -1; }

      if (new Date(a.messages[a.messages.length - 1].sent_date).getTime() < new Date(b.messages[b.messages.length - 1].sent_date).getTime()) { return 1; }

      if (new Date(a.messages[a.messages.length - 1].sent_date).getTime() > new Date(b.messages[b.messages.length - 1].sent_date).getTime()) { return -1; }

      return 0;
    });
  }

  /**
   * Heler method to set selected conversation
   * @param conversation conversation to set as selected
   */
  private setSelectedConversation(conversation: MSecureMessageConversation) {
    this.selectedConversation = conversation;
    for (const convo of this.conversationsArray) {
      convo.selected = false;
    }
    this.selectedConversation.selected = true;

    for (const m of conversation.messages) {
      console.log(`${this.getMessageDateShortString(m)} - ${new Date(m.sent_date).getTime()}`);

    }
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
  public getConversationGroupInitial(conversation: MSecureMessageConversation): string {
    return conversation.groupName[0] || 'C';
  }

  /**
   * UI helper method to set group name
   * @param conversation conversation to get data for ui
   */
  public getConversationGroupName(conversation: MSecureMessageConversation): string {
    return conversation.groupName || 'Conversation';
  }

  /**
   * UI helper method to set description text for conversation
   * (this gets the most recently sent message)
   * @param conversation conversation to get data for ui
   */
  public getConversationDescription(conversation: MSecureMessageConversation): string {
    const frontText = conversation.messages[conversation.messages.length - 1].sender.type === 'patron' ? 'You: ' : '';
    return frontText + conversation.messages[conversation.messages.length - 1].body;
  }

  /**
   * UI helper method to set group initial for chat
   * @param group group to get data for ui
   */
  public getGroupInitial(group: MSecureMessageGroupInfo): string {
    return group.name == null ? 'U' : group.name[0] || 'U';
  }

  /**
   * UI helper method to set group name
   * @param group conversation to get data for ui
   */
  public getGroupName(group: MSecureMessageGroupInfo): string {
    return group.name == null ? 'Name Unknown' : group.name;
  }

  /**
   * UI helper method to set group description
   * @param group group to get data for ui
   */
  public getGroupDescription(group: MSecureMessageGroupInfo): string {
    return group.description == null ? '' : group.description;
  }

  /**
   * Get date to place in conversation list item for most recent message in conversation
   * @param conversation Conversation from list
   */
  public getConversationDate(conversation: MSecureMessageConversation): string {
    /// get latest message and get the date string for it
    return this.getMessageDateShortString(conversation.messages[conversation.messages.length - 1]);
  }

  /**
   * Get short formatted date string for display
   * @param message Message from conversation
   */
  public getMessageDateShortString(message: MSecureMessageInfo): string {
    const today: Date = new Date();
    const sentDate: Date = new Date(message.sent_date);

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return this.datePipe.transform(sentDate, 'y');
    }

    /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() > 5) {
      return this.datePipe.transform(sentDate, 'MMM d');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 1) {
      return this.datePipe.transform(sentDate, 'E');
    }

    /// > 30 minutes (xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() > 1800000) {
      return this.datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (today.getTime() - sentDate.getTime() > 60000) {
      const minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
      return minutesAgo.toString() + ' min';
    }

    /// < 1 minute (Now)
    return 'Now';

  }

  /**
   * UI Helper method to determine if the group avatar should be shown
   * (used to group messages visually)
   * @param conversation conversation data
   * @param messageIndex index of current message
   */
  public messageShowGroupAvatar(conversation: MSecureMessageConversation, messageIndex: number): boolean {

    /// first message
    if (messageIndex === 0) {
      /// more than one message
      if (conversation.messages.length > 1) {
        /// next message from group as well
        if (conversation.messages[messageIndex + 1].sender.type === 'group') {
          return false;
        }
      }
      return true;
    } else { /// not first message
      /// more messages
      if (conversation.messages.length - 1 > messageIndex + 1) {
        /// next message from group as well
        if (conversation.messages[messageIndex + 1].sender.type === 'group') {
          return false;
        }
      }
      return true;
    }
  }

  /**
   * UI Helper method to determine if the sent date should be shown
   * (used to group messages visually)
   * @param conversation conversation data
   * @param messageIndex index of current message
   * @param messageType type of message (group or patron)
   */
  public messageShowDate(conversation: MSecureMessageConversation, messageIndex: number, messageType: string): boolean {

    /// first message
    if (messageIndex === 0) {
      /// more than one message
      if (conversation.messages.length > 1) {
        /// next message from group as well
        if (conversation.messages[messageIndex + 1].sender.type === messageType) {
          /// was this message sent within 1 min of the next message
          if (new Date(conversation.messages[messageIndex + 1].sent_date).getTime() - new Date(conversation.messages[messageIndex].sent_date).getTime() < 60000) {
            return false;
          }
        }
      }
      return true;
    } else { /// not first message
      /// more messages
      if (conversation.messages.length - 1 > messageIndex + 1) {
        /// next message from group as well
        if (conversation.messages[messageIndex + 1].sender.type === messageType) {
          /// was this message sent within 1 min of the next message
          if (new Date(conversation.messages[messageIndex + 1].sent_date).getTime() - new Date(conversation.messages[messageIndex].sent_date).getTime() < 60000) {
            return false;
          }
        }
      }
      return true;
    }
  }

  /**
   * Get formatted date string for display in conversation message list items
   * @param message Message from conversation
   */
  public getMessageDate(message: MSecureMessageInfo): string {
    const today: Date = new Date();
    const sentDate: Date = new Date(message.sent_date);

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return this.datePipe.transform(sentDate, 'mediumDate');
    }

    /// > 5 days (<monthAbbv> <date>, xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() > 5) {
      return this.datePipe.transform(sentDate, 'MMM d, h:mm a');
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 2) {
      return this.datePipe.transform(sentDate, 'E, h:mm a');
    }

    /// > 1 day (Yesterday at xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 1) {
      // tslint:disable-next-line:quotemark
      return this.datePipe.transform(sentDate, "'Yesterday at ' h:mm a'");
    }

    /// > 5 minutes (xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() > 300000) {
      return this.datePipe.transform(sentDate, 'h:mm a');
    }

    /// > 1 minute (x minutes ago)
    if (today.getTime() - sentDate.getTime() > 60000) {
      const minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
      return minutesAgo.toString() + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
    }

    /// < 1 minute (Now)
    return 'Now';

  }


}
