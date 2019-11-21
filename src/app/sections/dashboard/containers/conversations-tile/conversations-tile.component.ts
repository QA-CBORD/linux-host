import { Component, OnInit } from '@angular/core';
import { SecureMessagingService } from './services/secure-messaging.service';

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
      time: 'Just Now'
    },
    {
      name: 'Oleh P.',
      recentMessage: 'Yo, did you install the webstorm?',
      avatar: '/assets/images/order-item-template.jpg',
      messageInfo: { opened: false },
      time: '1 minute ago'
    },
  ];
  groupsArray: any;
  messagesArray: any;
  
  constructor( private readonly secureMessagingService: SecureMessagingService) { }

  ngOnInit() {


    this.secureMessagingService.getInitialData().subscribe((r) => {
        console.log('SecureMessaging Groups and Messages:', r);
      },

      err => { console.log(err);
      }
      );

   
  }

  
}
