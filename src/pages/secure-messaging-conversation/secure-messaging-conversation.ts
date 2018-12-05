import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Content, ToastController } from 'ionic-angular';

import { SecureMessagingProvider } from './../../providers/secure-messaging-provider/secure-messaging-provider';

import * as Globals from '../../app/app.global';
import { SecureMessageConversation, SecureMessageInfo, SecureMessageSendBody } from '../../models/secure-messaging/secure-message-info';

@IonicPage()
@Component({
  selector: 'page-secure-messaging-conversation',
  templateUrl: 'secure-messaging-conversation.html',
})
export class SecureMessagingConversationPage {

  @ViewChild(Content) content: Content;


  pageTitle: string = "Entity Name";

  bShowStartConversationMessage: boolean = false;
  bShowLoadingContent: boolean = false;
  bShowUnableToLoadMessages: boolean = false;

  bIsSending: boolean = false;

  conversation: SecureMessageConversation;

  newMessageText: string;

  apiMessageBody: SecureMessageSendBody;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private events: Events,
    private toast: ToastController,
    private secureMessagingProvider: SecureMessagingProvider
  ) {
    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
      this.conversation = this.navParams.get('data');
      this.pageTitle = this.conversation.groupName;
    });
  }

  ionViewDidLoad() {

    this.scrollToBottom();
  }


  onSendMessageClick() {
    if (this.newMessageText && this.newMessageText.length > 0) {
      this.bIsSending = true;
      this.scrollToBottom();
      this.sendTestMessage();
    }
  }

  sendTestMessage() {

    this.apiMessageBody = {
      institution_id: this.conversation.institutionId,
      sender: {
        type: "patron",
        id_field: "IDNumber",
        id_value: "Patron01",
        name: "test user"
      },
      recipient: {
        type: "group",
        id_value: this.conversation.groupIdValue,
        name: this.conversation.groupName
      },
      description: "GET Patron UI Test",
      body: this.newMessageText,
      importance: null,
    };

    this.secureMessagingProvider.sendSecureMessage(this.apiMessageBody)
      .subscribe(
        data => {
          console.log("Send Message data:");
          console.log(data);
          this.addLocalDataToConversation();
        },
        error => {
          console.log("Send Message error:");
          console.log(error);
          this.toast.create({
            message: "Error sending the message",
            duration: 3000,
            position: 'bottom'
          }).present();
        },
        () => {

        }
      );
  }

  addLocalDataToConversation() {
    let message: SecureMessageInfo = {
      body: this.newMessageText,
      created_date: new Date().toLocaleString(),
      description: "GET Patron UI Test",
      id: null,
      importance: null,
      institution_id: "29db894b-aecd-4cef-b515-15b0405614d7",
      read_date: null,
      recipient: { created_date: "2018-11-29T14:32:29.475889", id: "4af3cfd3-8efb-4383-ab20-509df4bb4023", type: "group", id_field: null, id_value: "a8676ef6-ab15-4d12-9346-32bf57e0ccd5", name: "TEST_Msg_Group_A", aux_user_id: null, version: 1 },
      replied_message_id: "None",
      requires_read_receipt: null,
      sender: { created_date: "2018-11-29T14:32:29.475889", id: "045b5348-64c8-40a0-a7f4-c08501217418", type: "patron", id_field: "IDNumber", id_value: "Patron01", name: "test user", aux_user_id: null, version: 1 },
      sent_date: new Date().toLocaleString(),
      state: null,
      ttl: null,
      version: 1
    }

    this.newMessageText = null;
    this.conversation.messages.push(message);
    this.scrollToBottom();
  }


  showStartConversations(): boolean {
    return this.conversation && this.conversation.messages.length == 0;
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(500);
    }, 500);
  }

}
