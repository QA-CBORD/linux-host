import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Modal, ModalController, ModalOptions } from 'ionic-angular';

import * as Globals from '../../app/app.global'

import { SecureMessageInfo, SecureMessageGroupInfo } from '../../models/secure-messaging/secure-message-info';
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

  readonly LOADING: number = 0;
  readonly START_CONVO: number = 1;
  readonly SHOW_CONVOS: number = 2;
  readonly ERROR_CONNECTING: number = 3;
  readonly OFFLINE: number = 4;

  pageState: number = this.LOADING;

  groups: SecureMessageGroupInfo[] = new Array();
  messages: SecureMessageInfo[] = new Array();

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
    this.loadInitialData();
  }


  /// USE THIS AS MY PATRON
  // id: "045b5348-64c8-40a0-a7f4-c08501217418",
  // type: "patron",
  // id_field: "IDNumber",
  // id_value: "Patron01",
  // aux_user_id: null,
  // name: "test user",
  // created_date: null,
  // version: 1


  private loadInitialData() {
    this.pageState = this.LOADING;

    /// for testing only
    // setTimeout(() => {
    //   this.setTestData();

    // }, 1000)

    /// 

    this.secureMessageProvider.getInitialData("patron", "IDNumber", "Patron01")
      .subscribe(
        ([smGroupArray, smMessageArray]) => {
          this.groups = smGroupArray;
          this.messages = smMessageArray;
        },
        error => {
          console.log("GetInitialData Error");
          console.log(error);
        },
        () => {

        }
      );


  }


  onConversationClick(message: SecureMessageInfo) {
    console.log("onConversationClick")
    console.log(message);

    this.navCtrl.push('SecureMessagingConversationPage');

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


  onConnectionErrorClick() {
    console.log("onConnectionErrorClick");
  }

  onOfflineClick() {
    console.log("onOfflineClick");
  }


}
