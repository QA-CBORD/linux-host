import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SecureMessagingService } from './services/secure-messaging.service';
import { SecureMessageConversation, SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { take, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { getRandomColorExtendedPalette } from '@core/utils/general-helpers';

@Component({
  selector: 'st-conversations-tile',
  templateUrl: './conversations-tile.component.html',
  styleUrls: ['./conversations-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsTileComponent implements OnInit, OnDestroy {
  private messagesArray: SecureMessageInfo[] = [];
  private groupsArray: any;
  private readonly sourceSub: Subscription = new Subscription();

  lastTwoMessagesArray: SecureMessageInfo[] = [];
  showTextAvatar: boolean = true;
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

  ngOnDestroy() {
    this.sourceSub.unsubscribe();
  }

  getConversationGroupInitial(groupName: string): string {
    return groupName == null || groupName.length < 1 ? 'U' : groupName[0];
  }

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
        this.groupsArray = smGroupArray;
        this.messagesArray = smMessageArray;
        this.createConversations();
        this.pollForData();
      });
  }

  private pollForData() {
    this.secureMessagingService
      .pollForData()
      .pipe(take(1))
      .subscribe(([smGroupArray, smMessageArray]) => {
        /// if there are new groups, update the list
        if (this.messagesArray.length !== smGroupArray.length) {
          this.messagesArray = smMessageArray;
        }
      });
  }

  private createConversations() {
    const tempConversations: SecureMessageConversation[] = [];

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
    this.lastTwoMessagesArray = tempConversations.map(conversation => conversation.messages.pop()).slice(0, 2);
  }

  getAvatarBackgroundColor() {
    return getRandomColorExtendedPalette();
  }
}
