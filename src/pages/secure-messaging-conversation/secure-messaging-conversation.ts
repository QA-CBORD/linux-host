import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';

import * as Globals from '../../app/app.global';

@IonicPage()
@Component({
  selector: 'page-secure-messaging-conversation',
  templateUrl: 'secure-messaging-conversation.html',
})
export class SecureMessagingConversationPage {

  pageTitle: string = "Entity Name";

  bShowStartConversationMessage: boolean = false;
  bShowLoadingContent: boolean = false;
  bShowUnableToLoadMessages: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private events: Events
  ) {
    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
    });
  }

  ionViewDidLoad() {

  }

}
