import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Content, ToastController, ViewController } from 'ionic-angular';

import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscription } from 'rxjs/Subscription';
import { BaseProvider } from '../../providers/BaseProvider';
import { SecureMessagingProvider } from './../../providers/secure-messaging-provider/secure-messaging-provider';

import * as Globals from '../../app/app.global';
import { MSecureMessageConversation, MSecureMessageInfo, MSecureMessageSendBody } from '../../models/secure-messaging/secure-message-info';

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

  conversation: MSecureMessageConversation;

  newMessageText: string;

  apiMessageBody: MSecureMessageSendBody;

  resizeSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private platform: Platform,
    private events: Events,
    private toast: ToastController,
    private secureMessagingProvider: SecureMessagingProvider,
    private datePipe: DatePipe
  ) {
    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
      this.conversation = this.navParams.get('data');
      this.pageTitle = this.conversation.groupName;
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription != null) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ionViewDidLoad() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .subscribe(event => {
        if (window.innerWidth >= 768) {
        }
      });
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
      institution_id: SecureMessagingProvider.GetSMAuthInfo().institution_id,
      sender: {
        type: "patron",
        id_field: SecureMessagingProvider.GetSMAuthInfo().id_field,
        id_value: SecureMessagingProvider.GetSMAuthInfo().id_value,
        name: BaseProvider.getUserInfo().firstName + " " + BaseProvider.getUserInfo().lastName
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
          this.addLocalDataToConversation();
        },
        error => {
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
    let message: MSecureMessageInfo = {
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
      sender: { created_date: new Date().toISOString(), id: "", type: "patron", id_field: SecureMessagingProvider.GetSMAuthInfo().id_field, id_value: SecureMessagingProvider.GetSMAuthInfo().id_value, name: BaseProvider.getUserInfo().firstName + " " + BaseProvider.getUserInfo().lastName, aux_user_id: null, version: 1 },
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

  closeModal() {
    const returnData = {
      updatedConversation: this.conversation
    };
    this.viewCtrl.dismiss(returnData);
  }

 /**
   * Get formatted date string for message display
   * @param message 
   */
  public getMessageDate(message: MSecureMessageInfo): string {
    let today: Date = new Date();
    let sentDate: Date = new Date(message.sent_date);

    /// > 1 year (Full timestamp)
    if (today.getFullYear() > sentDate.getFullYear()) {
      return this.datePipe.transform(sentDate, "mediumDate");
    }

    /// > 6 days (<dayAbbv> xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() > 6) {
      return this.datePipe.transform(sentDate, "MMM d, h:mm a");
    }

    /// > 2 days (<dayAbbv> xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 2) {
      return this.datePipe.transform(sentDate, "E, h:mm a");
    }

    /// > 1 day (Yesterday at xx:xx AM/PM)
    if (today.getDate() - sentDate.getDate() >= 1) {
      return this.datePipe.transform(sentDate, "'Yesterday at ' h:mm a");
    }

    /// > 5 minutes (xx:xx AM/PM)
    if (today.getTime() - sentDate.getTime() > 300000) {
      return this.datePipe.transform(sentDate, "h:mm a");
    }

    /// > 1 minute (x minutes ago)
    if (today.getTime() - sentDate.getTime() > 60000) {
      let minutesAgo = Math.round((today.getTime() - sentDate.getTime()) / 60000);
      return minutesAgo.toString() + (minutesAgo === 1 ? " minute ago" : " minutes ago");
    }

    /// < 1 minute (Now)
    return "Now";
    
  }

}
