import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Modal, ModalController, ModalOptions, ToastController, Content, Scroll } from 'ionic-angular';

import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscription } from "rxjs/Subscription";

import * as Globals from '../../app/app.global'

import { SecureMessageInfo, SecureMessageGroupInfo, SecureMessageConversation, SecureMessageSendBody } from '../../models/secure-messaging/secure-message-info';
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


  @ViewChild('chatScroll') chatScroll: any;
  resizeSubscription: Subscription;
  bIsLargeScreen: boolean = false;
  selectedConversation: SecureMessageConversation;
  newMessageText: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private platform: Platform,
    private events: Events,
    private toast: ToastController,
    private secureMessageProvider: SecureMessagingProvider
  ) {

    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
      this.bIsLargeScreen = this.platform.width() > 768;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.resizeSubscription != null) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ionViewDidLoad() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .subscribe(event => {
        let bWasPreviouslyLargeScreen = this.bIsLargeScreen;
        this.bIsLargeScreen = window.innerWidth >= 768;
        if (!bWasPreviouslyLargeScreen && this.bIsLargeScreen) {
          this.scrollToBottom();
        }
      });
    this.loadInitialData();
  }

  ionViewWillEnter() {

    if (this.bIsLargeScreen) {
      return;
    }

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
          this.toast.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          }).present();
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

      if (this.conversations.length > 0) {
        this.selectedConversation = this.conversations[0];
      }

    }

    console.log("CONVOS:");

    console.log(this.conversations);





    if (this.conversations.length > 0) {      
      if (this.bIsLargeScreen) {        
        this.scrollToBottom();
      }
      this.pageState = this.SHOW_CONVOS;
    } else {
      this.pageState = this.START_CONVO;
    }


  }

  public scrollToBottom() {
    setTimeout(() => {
      let scroll = this.chatScroll._scrollContent.nativeElement;
      scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
    }, 100);
  }

  onConversationClick(conversation: SecureMessageConversation) {
    if (this.bIsLargeScreen) {
      this.selectedConversation = conversation;
      this.scrollToBottom();
      return;
    }

    this.openConversationPage(conversation);

  }

  onSendMessageClick(){
    let apiMessageBody : SecureMessageSendBody = {
      institution_id: this.selectedConversation.institutionId,
      sender: {
        type: "patron",
        id_field: "IDNumber",
        id_value: "Patron01",
        name: "test user"
      },
      recipient: {
        type: "group",
        id_value: this.selectedConversation.groupIdValue,
        name: this.selectedConversation.groupName
      },
      description: "GET Patron UI Test",
      body: this.newMessageText,
      importance: null,
    };

    this.secureMessageProvider.sendSecureMessage(apiMessageBody)
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
    this.selectedConversation.messages.push(message);
    this.scrollToBottom();
  }

  onAddConversationFABClick() {
    this.openChooseContactModal();
  }

  onStartConversationButtonClick() {
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
      if (data.selectedGroup) {

        let newConversation: SecureMessageConversation;

        for (let convo of this.conversations) {
          if (data.selectedGroup.id == convo.groupIdValue) {
            newConversation = convo;
            break;
          }
        }

        if (!newConversation) {
          newConversation = {
            institutionId: SecureMessagingPage.TEST_INST_ID,
            groupName: data.selectedGroup.name,
            groupIdValue: data.selectedGroup.id,
            groupDescription: data.selectedGroup.description,
            myIdValue: SecureMessagingPage.TEST_PATRON_ID_VALUE,
            messages: new Array()
          };
        }

        if (!this.bIsLargeScreen) {
          this.openConversationPage(newConversation);
        } else {
          this.selectedConversation = newConversation;
        }

      }
    });

  }

  openConversationPage(conversation: SecureMessageConversation) {
    this.navCtrl.push('SecureMessagingConversationPage', { data: conversation });
  }


  onConnectionErrorClick() {
    console.log("onConnectionErrorClick");
  }

  onOfflineClick() {
    console.log("onOfflineClick");
  }


}
