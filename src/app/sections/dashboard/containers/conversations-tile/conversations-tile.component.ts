import { Component, OnInit } from '@angular/core';
import { SecureMessagingService } from './services/secure-messaging.service';
import { SecureMessageConversation } from '@core/model/secure-messaging/secure-messaging.model';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-conversations-tile',
  templateUrl: './conversations-tile.component.html',
  styleUrls: ['./conversations-tile.component.scss'],
})
export class ConversationsTileComponent implements OnInit {
  conversationsList = [
    {
      name: 'Benjamin P.',
      recentMessage: 'Hey Andrew. Could you please merge your Dashboard UI branch',
      avatar: '/assets/images/order-item-template.jpg',
      messageInfo: { opened: true },
      time: 'Just Now',
    },
    {
      name: 'Oleh P.',
      recentMessage: 'Yo, did you install the webstorm?',
      avatar: '/assets/images/order-item-template.jpg',
      messageInfo: { opened: false },
      time: '1 minute ago',
    },
  ];

  groupsArray: any;
  messagesArray: any;
  conversationsArray;
  sourceSubscription: any;
  showSpiner: boolean = true;

  constructor(private readonly secureMessagingService: SecureMessagingService) {}

  ngOnInit() {
    this.initializePage();
  }

  initializePage() {
    this.secureMessagingService
      .getInitialData()
      .pipe(take(1))
      .subscribe(
        ([smGroupArray, smMessageArray]) => {
          this.groupsArray = smGroupArray;
          this.messagesArray = smMessageArray;
          this.createConversations(false);
          this.pollForData();
        },
        error => {
          console.log(error);
        }
      );
  }

  pollForData() {
    this.secureMessagingService
      .pollForData()
      .pipe(take(1))
      .subscribe(
        ([smGroupArray, smMessageArray]) => {
          /// if there are new groups, update the list
          if (this.messagesArray.length !== smGroupArray.length) {
            this.messagesArray = smMessageArray;
          }
          /// if there are new messages, update the conversations
          if (this.messagesArray.length !== smMessageArray.length) {
            this.messagesArray = smMessageArray;
            this.createConversations(true);
          }
        },
        error => {
          /// only deal with connection error ?
          console.log(error);
        }
      );
  }

  createConversations(bIsPollingData: boolean) {
    const tempConversations: SecureMessageConversation[] = [];

    /// create 'conversations' out of message array
    for (const message of this.messagesArray) {
      message.sent_date = new Date(message.sent_date).toLocaleString();

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

    this.conversationsArray = tempConversations.map(conversation => conversation.messages.pop()).slice(0, 2);
    this.showSpiner = false;

    console.log(this.conversationsArray);
   

    
  }
}
