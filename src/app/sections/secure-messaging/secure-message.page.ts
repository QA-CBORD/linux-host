import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SecureMessagingService } from './service';
import { LoadingService } from '../../core/service/loading/loading.service';
import { BUTTON_TYPE } from '../../core/utils/buttons.config';
import { SecureMessagePopoverComponent } from './secure-message-popover';
import * as Globals from '../../app.global';
import { SecureMessageConversation, SecureMessageGroupInfo, SecureMessageInfo, SecureMessageSendBody } from './models';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { getRandomColorExtendedPalette } from '@core/utils/general-helpers';

interface SecureMessageConversationItem {
  conversation: SecureMessageConversation;
  avatarBackgroundColor: string;
  groupInitial: string;
  groupName: string;
  description: string;
}

@Component({
  selector: 'st-secure-message',
  templateUrl: './secure-message.page.html',
  styleUrls: ['./secure-message.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecureMessagePage implements OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  private messagesArray: SecureMessageInfo[] = [];
  private groupsArray: SecureMessageGroupInfo[] = [];

  conversationsArray: SecureMessageConversationItem[] = [];

  constructor(
    private readonly platform: Platform,
    private readonly secureMessagingService: SecureMessagingService,
    private readonly loading: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly globalNav: GlobalNavService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.platform.ready().then(this.initComponent.bind(this));
  }

  ionViewWillEnter() {
    this.globalNav.showNavBar();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  private initComponent() {
    /// set subscription to check screen size onAddressChanged
    /// used to adjust ui layout
    this.initializePage();
  }

  /**
   * Initial data gathering for messages and groups
   */
  private initializePage() {
    this.loading.showSpinner({ message: 'Retrieving conversations...' });
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

    this.conversationsArray = tempConversations.map(
      (conversation): SecureMessageConversationItem => ({
        avatarBackgroundColor: getRandomColorExtendedPalette(),
        groupInitial: this.getConversationGroupInitial(conversation),
        description: this.getConversationDescription(conversation),
        groupName: this.getConversationGroupName(conversation),
        conversation,
      })
    );

    this.sortConversations();
    this.changeDetectorRef.detectChanges();
  }

  trackConversationsByFn(index: number, { groupIdValue }: SecureMessageConversation): string {
    return groupIdValue;
  }

  trackMessagesByFn(index: number, { id }: SecureMessageInfo): string {
    return id;
  }
  /**
   * click listner for Start Conversation
   */
  onClickStartConversation() {}

  /**
   * click listener to selected current conversation to display
   */
  onClickConversation(conversation: SecureMessageConversation) {}

  /**
   * Sort conversations for display
   */
  private sortConversations() {
    /// sort conversations by most current
    this.conversationsArray.sort(({ conversation: a }, { conversation: b }) => {
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
}
