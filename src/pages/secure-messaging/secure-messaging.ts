import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Modal, ModalController, ModalOptions } from 'ionic-angular';

import * as Globals from '../../app/app.global'

import { SecureMessageInfo } from '../../models/secure-messaging/secure-message-info';
import { SecureMessagingProvider } from '../../providers/secure-messaging-provider/secure-messaging-provider';


@IonicPage({
  name: 'secure-messaging',
})
@Component({
  selector: 'page-secure-messaging',
  templateUrl: 'secure-messaging.html',
})
export class SecureMessagingPage {

  pageTitle: string = "Conversations";

  bShowStartConversation: boolean = false;
  bShowLoadingContent: boolean = true;
  bShowConversationList: boolean = true;
  bShowFAB: boolean = true;
  bShowErrorConnecting: boolean = false;
  bShowOffline: boolean = false;


  messages: SecureMessageInfo[] = new Array();
  selectedMessage: SecureMessageInfo = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private platform: Platform,
    private events: Events,
    private secureMessageProvider: SecureMessagingProvider
  ) {

    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
    });

  }

  ionViewDidLoad() {
    // this.secureMessageProvider.getSecureMessagesGroup()
    // .subscribe(
    //   data => {
    //     console.log("GET SM GROUP DATA:")
    //     console.log(data);

    //   },
    //   error => {
    //     console.log("GET SM GROUP ERROR:")
    //     console.log(error);
    //   }
    // );

    // this.setTestData();


    // this.secureMessageProvider.getSecureMessages()
    // .subscribe(
    //   data => {
    //     console.log("Data:");

    //     console.log(data);

    //   },
    //   error => {
    //     console.log("Error:");


    //     console.log(error);
    //   },
    //   () => {


    //   }
    // );
  }

  messageSelected(message: SecureMessageInfo) {
    this.selectedMessage = message;
  }

  private setTestData() {
    let tMessage: SecureMessageInfo = {
      id: '32-43214324-4321432',
      originalMessageId: '1',
      repliedMessagId: null,
      recipient: 'No clue what this object will be',
      recipientName: 'Recipient Name',
      institutionId: '34kj32-432kj423-k32l4k',
      sender: 'No clue what this object will be',
      senderName: 'Sender Name',
      sentDate: new Date(),
      ttl: 10000,
      description: 'Description testing',
      body: 'Body testing with some text here to be a placeholder and take up more space and what not.  Swoosh.',
      state: 'No clue what this will be',
      requiresReadReceipt: false,
      importance: "No clue what this will be",
      readDate: null
    };
    for (let i = 0; i < 10; i++) {
      this.messages.push(tMessage);
    }
  }

  onAddConversationFABClick() {
    console.log("onAddConversationFABClick")
    this.openChooseContactModal();
  }

  onStartConversationButtonClick() {
    console.log("onConversationButtonClick");

  }

  openChooseContactModal() {

    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const modalData = {
      someData: 'someValue'
    };

    const chooseContactModal: Modal = this.modalCtrl.create('SecureMessagingGroupModalPage', { data: modalData }, modalOptions);

    chooseContactModal.present();

    chooseContactModal.onWillDismiss((data) => {
      console.log("Choose Contact Modal WILL DISMISS");
      console.log(data);

    });

    chooseContactModal.onDidDismiss((data) => {
      console.log("Choose Contact Modal DID DISMISS");
      console.log(data);
    });

  }


}
