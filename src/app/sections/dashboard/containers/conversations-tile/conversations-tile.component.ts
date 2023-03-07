import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { take, finalize } from 'rxjs/operators';
import { buildConversationsFromMessages } from '@core/utils/conversations-helper';
import { SecureMessageConversation } from '@core/model/secure-messaging/secure-messaging.model';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';

@Component({
  selector: 'st-conversations-tile',
  templateUrl: './conversations-tile.component.html',
  styleUrls: ['./conversations-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsTileComponent implements OnInit {
  lastTwoMessagesArray: SecureMessageConversation[] = [];
  conversationDisplayedAmount = 2;
  conversationSkeletonArray: number[] = new Array(this.conversationDisplayedAmount);
  isLoading = true;

  constructor(
    private readonly secureMessagingFacadeService: SecureMessagingFacadeService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializePage();
  }
  initializePage() {
    this.secureMessagingFacadeService
      .getInitialData$()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(([smGroupArray = [], smMessageArray = []]) => {
        this.lastTwoMessagesArray = buildConversationsFromMessages(
          smMessageArray,
          smGroupArray,
          SecureMessagingFacadeService.GetSecureMessagesAuthInfo()
        ).slice(0, 2);
      });
  }
}
