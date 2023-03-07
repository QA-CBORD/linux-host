import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, finalize, first } from 'rxjs/operators';
import { LoadingService } from '../../core/service/loading/loading.service';
import { BUTTON_TYPE } from '../../core/utils/buttons.config';
import { SecureMessagePopoverComponent } from './secure-message-popover';
import * as Globals from '../../app.global';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../app.global';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';
import { SecureMessageConversation } from '@core/model/secure-messaging/secure-messaging.model';

@Component({
  selector: 'st-secure-message',
  templateUrl: './secure-message.page.html',
  styleUrls: ['./secure-message.page.scss'],
})
export class SecureMessagePage implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();

  conversations$: Observable<SecureMessageConversation[]>;

  constructor(
    private readonly secureMessagingFacadeService: SecureMessagingFacadeService,
    private readonly loading: LoadingService,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router
  ) {
    this.conversations$ = this.secureMessagingFacadeService.conversationsArray$.pipe(distinctUntilChanged());
  }
  ngOnInit(): void {
    this.initializePage();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  /**
   * Initial data gathering for messages and groups
   */
  private initializePage() {
    this.loading.showSpinner({ message: 'Retrieving conversations...' });
    // Perform initialization, trigger first emission
    // and subscribe to fetch interval
    this.secureMessagingFacadeService
      .getInitialData$()
      .pipe(
        first(),
        finalize(() => this.loading.closeSpinner())
      )
      .subscribe(
        () => this.sourceSubscription.add(this.secureMessagingFacadeService.pollForDataInterval().subscribe()),
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
    this.secureMessagingFacadeService.setSelectedConversation(conversation);
    this.startConversation();
  }

  async modalHandler(res, callback) {
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
        callback();
      }
    });

    return await popover.present();
  }
}
