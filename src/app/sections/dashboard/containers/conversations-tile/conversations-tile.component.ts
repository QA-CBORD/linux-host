import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SecureMessagingService } from './services/secure-messaging.service';
import { SecureMessageConversation, SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { take, finalize } from 'rxjs/operators';
import { generateColorHslFromText } from '@core/utils/colors-helper';
import { buildConversationsFromMessages, getConversationGroupInitial } from '@core/utils/conversations-helper';

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

  getAvatarBackgroundColor = generateColorHslFromText;
  getConversationGroupInitial = getConversationGroupInitial;

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
        this.lastTwoMessagesArray = buildConversationsFromMessages(smMessageArray, smGroupArray, SecureMessagingService.GetSecureMessagesAuthInfo())
          .map(conversation => ({ ...conversation, messages: [conversation.messages.pop()] }))
          .slice(0, 2);
      });
  }
}
