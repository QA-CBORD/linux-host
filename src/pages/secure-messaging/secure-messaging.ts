import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Modal, ModalController, ModalOptions } from 'ionic-angular';

import * as Globals from '../../app/app.global'

import { SecureMessageInfo, SecureMessageGroupInfo, SecureMessageConversation } from '../../models/secure-messaging/secure-message-info';
import { SecureMessagingProvider } from '../../providers/secure-messaging-provider/secure-messaging-provider';


@IonicPage({
  name: 'secure-messaging',
})
@Component({
  selector: 'page-secure-messaging',
  templateUrl: 'secure-messaging.html',
})
export class SecureMessagingPage {

  public static readonly TEST_INST_ID = "29db894b-aecd-4cef-b515-15b0405614d7";
  public static readonly TEST_PATRON_ID_VALUE = "Patron01";


  pageTitle: string = "Conversations";

  readonly LOADING: number = 0;
  readonly START_CONVO: number = 1;
  readonly SHOW_CONVOS: number = 2;
  readonly ERROR_CONNECTING: number = 3;
  readonly OFFLINE: number = 4;

  pageState: number = this.LOADING;

  conversations: SecureMessageConversation[] = new Array();

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

  ionViewWillEnter() {
    let updatedConversation: SecureMessageConversation = this.navParams.get('updatedConversation') || null;

    if (updatedConversation) {
      for (let i = 0; i < this.conversations.length; i++) {
        if (updatedConversation.groupIdValue == this.conversations[i].groupIdValue) {
          this.conversations[i] = updatedConversation;
          break;
        }
      }
    }
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

    this.secureMessageProvider.getInitialData("patron", "IDNumber", "Patron01")
      .subscribe(
        ([smGroupArray, smMessageArray]) => {
          console.log("GetInitialData Response:");
          console.log(smGroupArray);
          console.log(smMessageArray);
          this.groups = smGroupArray;
          this.messages = smMessageArray;
          this.handleInitialDataResponse();
        },
        error => {
          console.log("GetInitialData Error");
          console.log(error);
        },
        () => {

        }
      );


  }



  private handleInitialDataResponse() {

    /// sort messages by date
    this.messages.sort((a, b) => a.created_date < b.created_date ? 1 : b.created_date > a.created_date ? -1 : 0);

    for (let message of this.messages) {
      message.sent_date = new Date(message.sent_date).toLocaleString();

      let bNewConversation = true;

      for (let convo of this.conversations) {
        if (convo.groupIdValue && convo.groupIdValue.length > 0 && (convo.groupIdValue == message.sender.id_value || convo.groupIdValue == message.recipient.id_value)) {
          convo.messages.push(message);
          bNewConversation = false;
        }

        if (!bNewConversation) {
          break;
        }

      }

      if (bNewConversation) {
        let newGroupName: string = "";
        let newGroupId: string = "";
        let newGroupDescription: string = "";


        if (message.sender.type == "group") {
          newGroupName = message.sender.name;
          newGroupId = message.sender.id_value;
        } else {
          newGroupName = message.recipient.name;
          newGroupId = message.recipient.id_value;
        }

        newGroupDescription = message.description;

        let conversation: SecureMessageConversation = {
          institutionId: SecureMessagingPage.TEST_INST_ID,
          groupName: newGroupName,
          groupIdValue: newGroupId,
          groupDescription: newGroupDescription,
          myIdValue: SecureMessagingPage.TEST_PATRON_ID_VALUE,
          messages: new Array()
        };

        conversation.messages.push(message);

        this.conversations.push(conversation);
      }

    }

    console.log("CONVOS:");

    console.log(this.conversations);

    if (this.conversations.length > 0) {
      this.pageState = this.SHOW_CONVOS;
    } else {
      this.pageState = this.START_CONVO;
    }



  }


  onConversationClick(conversation: SecureMessageConversation) {
    console.log("onConversationClick")

    this.openConversationPage(conversation);

  }

  onAddConversationFABClick() {
    console.log("onAddConversationFABClick")
    this.openChooseContactModal();
  }

  onStartConversationButtonClick() {
    console.log("onConversationButtonClick");
    this.openChooseContactModal();
  }


  openChooseContactModal() {

    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const modalData = {
      groups: this.groups
    };

    const chooseContactModal: Modal = this.modalCtrl.create('SecureMessagingGroupModalPage', { data: modalData }, modalOptions);

    chooseContactModal.present();

    chooseContactModal.onWillDismiss((data) => {
      console.log("Choose Contact Modal WILL DISMISS");

    });

    chooseContactModal.onDidDismiss((data) => {
      console.log("Choose Contact Modal DID DISMISS");
console.log(data);

      let newConversation: SecureMessageConversation = {
        institutionId: SecureMessagingPage.TEST_INST_ID,
        groupName: data.selectedGroup.name,
        groupIdValue: data.selectedGroup.id,
        groupDescription: data.selectedGroup.description,
        myIdValue: SecureMessagingPage.TEST_PATRON_ID_VALUE,
        messages: new Array()
      };

      this.openConversationPage(newConversation);

    });

  }

  openConversationPage(conversation: SecureMessageConversation){
    this.navCtrl.push('SecureMessagingConversationPage', { data: conversation });
  }


  onConnectionErrorClick() {
    console.log("onConnectionErrorClick");
  }

  onOfflineClick() {
    console.log("onOfflineClick");
  }


}
