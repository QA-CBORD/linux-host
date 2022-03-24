import { Component, OnDestroy } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize, first, map, tap } from 'rxjs/operators';

import { SecureMessagingService } from './service';
import { LoadingService } from '../../core/service/loading/loading.service';
import { BUTTON_TYPE } from '../../core/utils/buttons.config';
import { SecureMessagePopoverComponent } from './secure-message-popover';
import * as Globals from '../../app.global';
import { SecureMessageConversation, SecureMessageConversationListItem } from './models';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../app.global';
import {
  buildConversationListItemsFromConversations,
  getConversationDescription,
  getConversationGroupInitial,
  getConversationGroupName,
} from '@core/utils/conversations-helper';
import { generateColorHslFromText } from '@core/utils/colors-helper';

@Component({
  selector: 'st-secure-message',
  templateUrl: './secure-message.page.html',
  styleUrls: ['./secure-message.page.scss'],
})
export class SecureMessagePage implements OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();

  conversations$: Observable<SecureMessageConversationListItem[]>;

  constructor(
    private readonly platform: Platform,
    private readonly secureMessagingService: SecureMessagingService,
    private readonly loading: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly globalNav: GlobalNavService,
    private readonly router: Router
  ) {
    this.platform.ready().then(this.initComponent.bind(this));
    this.conversations$ = this.secureMessagingService.conversationsArray$.pipe(
      distinctUntilChanged(),
      map(buildConversationListItemsFromConversations)
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

  /**
   * click listener for Start Conversation
   */
  startConversation() {
    this.router.navigate([PATRON_NAVIGATION.secureMessage, 'conversation']);
  }

  /**
   * click listener to selected current conversation to display
   */
  onClickConversation(conversation: SecureMessageConversation) {
    this.secureMessagingService.setSelectedConversation(conversation);
    this.startConversation();
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
