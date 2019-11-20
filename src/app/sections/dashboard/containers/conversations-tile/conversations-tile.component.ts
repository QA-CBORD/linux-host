import { Component, OnInit } from '@angular/core';

import { take, tap } from 'rxjs/operators';
import { SecureMessagingService } from '@sections/secure-messaging';
import { Subscription } from 'rxjs';

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
  subscription: Subscription;
  
  constructor( private readonly secureMessagingService: SecureMessagingService) { }

  ngOnInit() {


    this.secureMessagingService.getInitialData().subscribe(([r0, r1]) => {
        console.log('SecureMessaging Groups and Messages:', r0, r1);
      });

   
  }

  
}
