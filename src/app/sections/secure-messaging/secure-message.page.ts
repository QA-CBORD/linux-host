import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize, first, map, tap } from 'rxjs/operators';

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
})
export class SecureMessagePage implements OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();

  conversations$: Observable<SecureMessageConversationItem[]>;

  constructor(
    private readonly platform: Platform,
    private readonly secureMessagingService: SecureMessagingService,
    private readonly loading: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly globalNav: GlobalNavService
  ) {
    this.platform.ready().then(this.initComponent.bind(this));
    this.conversations$ = this.secureMessagingService.conversationsArray$.pipe(
      distinctUntilChanged(),
      map(conversations =>
        conversations.map(conversation => ({
          avatarBackgroundColor: getRandomColorExtendedPalette(),
          groupInitial: this.getConversationGroupInitial(conversation),
          description: this.getConversationDescription(conversation),
          groupName: this.getConversationGroupName(conversation),
          conversation,
        }))
      )
    );
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
    // Perform initialization, trigger first emission
    // and subscribe to fetch interval
    this.secureMessagingService
      .getInitialData()
      .pipe(
        first(),
        finalize(() => this.loading.closeSpinner())
      )
      .subscribe(
        () => this.sourceSubscription.add(this.secureMessagingService.pollForDataInterval().subscribe()),
        error => {
          this.modalHandler({ ...error, title: Globals.Exception.Strings.TITLE }, this.initializePage.bind(this));
        }
      );
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
