import { Component, OnInit } from '@angular/core';

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
  // your Dashboard UI branch
  constructor() { }

  ngOnInit() {}

}
