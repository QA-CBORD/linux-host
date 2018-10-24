import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';

import * as Globals from '../../app/app.global'

@IonicPage({
  name: 'secure-messaging',
})
@Component({
  selector: 'page-secure-messaging',
  templateUrl: 'secure-messaging.html',
})
export class SecureMessagingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public events: Events
  ) {

    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
    });

  }

  ionViewDidLoad() {

  }

}
