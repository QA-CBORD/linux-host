import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SecureMessagingService } from './services/secure-messaging.service';
import { take, finalize } from 'rxjs/operators';
import { generateColorHslFromText } from '@core/utils/colors-helper';
import {
  buildConversationListItemsFromMessages,
  buildConversationsFromMessages,
  getConversationGroupInitial,
} from '@core/utils/conversations-helper';
import { SecureMessageConversationListItem } from '@sections/secure-messaging';

@Component({
  selector: 'st-conversations-tile',
  templateUrl: './conversations-tile.component.html',
  styleUrls: ['./conversations-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsTileComponent implements OnInit, OnDestroy {
  lastTwoMessagesArray: SecureMessageConversationListItem[] = [];
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
        this.lastTwoMessagesArray = buildConversationListItemsFromMessages(
          smMessageArray,
          smGroupArray,
          SecureMessagingService.GetSecureMessagesAuthInfo()
        )
          .map(conversationItem => {
            const convo = { ...conversationItem };
            // Get the last message only
            convo.conversation.messages = [convo.conversation.messages.pop()];
            return convo;
          })
          .slice(0, 2);
      });
  }
}
