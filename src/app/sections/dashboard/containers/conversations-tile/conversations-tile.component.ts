import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SecureMessagingService } from './services/secure-messaging.service';
import { take, finalize } from 'rxjs/operators';
import { SecureMessageConversation } from '@sections/secure-messaging';
import { buildConversationsFromMessages } from '@core/utils/conversations-helper';

@Component({
  selector: 'st-conversations-tile',
  templateUrl: './conversations-tile.component.html',
  styleUrls: ['./conversations-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsTileComponent implements OnInit, OnDestroy {
  lastTwoMessagesArray: SecureMessageConversation[] = [];
  conversationDisplayedAmount: number = 2;
  conversationSkeletonArray: any[] = new Array(this.conversationDisplayedAmount);
  isLoading: boolean = true;

  constructor(
    private readonly secureMessagingService: SecureMessagingService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializePage();
  }

  ngOnDestroy() {}

  initializePage() {
    this.secureMessagingService
      .getInitialData()
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
          SecureMessagingService.GetSecureMessagesAuthInfo()
        ).slice(0, 2);
      });
  }
}
