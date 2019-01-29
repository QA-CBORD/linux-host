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
      this.scrollToBottom();
      this.sendTestMessage();
    }
  }

  sendTestMessage() {

    this.apiMessageBody = {
      institution_id: this.conversation.institutionId,
      sender: {
        type: "patron",
        id_field: SecureMessagingProvider.GetSMAuthInfo().id_field,
        id_value: SecureMessagingProvider.GetSMAuthInfo().id_value,
        name: ""
      },
      recipient: {
        type: "group",
        id_value: this.conversation.groupIdValue,
        name: this.conversation.groupName
      },
      description: "",
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
      description: "",
      id: null,
      importance: null,
      institution_id: SecureMessagingProvider.GetSMAuthInfo().institution_id,
      read_date: null,
      recipient: { created_date: new Date().toISOString(), id: "", type: "group", id_field: null, id_value: this.conversation.groupIdValue, name: this.conversation.groupName, aux_user_id: null, version: 1 },
      replied_message_id: "None",
      requires_read_receipt: null,
      sender: { created_date: new Date().toISOString(), id: "", type: "patron", id_field: SecureMessagingProvider.GetSMAuthInfo().id_field, id_value: SecureMessagingProvider.GetSMAuthInfo().id_value, name: "", aux_user_id: null, version: 1 },
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
