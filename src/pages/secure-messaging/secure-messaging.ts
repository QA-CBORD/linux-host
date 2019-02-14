import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, Modal, ModalController, ModalOptions, ToastController, Content, Scroll } from 'ionic-angular';

import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscription } from "rxjs/Subscription";


import { SecureMessagingProvider } from '../../providers/secure-messaging-provider/secure-messaging-provider';
import { BaseProvider } from '../../providers/BaseProvider';

import * as Globals from '../../app/app.global'
import { SecureMessageInfo, SecureMessageGroupInfo, SecureMessageConversation } from '../../models/secure-messaging/secure-message-info';

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
    private secureMessagingProvider: SecureMessagingProvider
  ) {

    platform.ready().then(() => {
      /// hide the split pane here becuase we don't need the navigation menu
      events.publish(Globals.Events.SIDEPANE_ENABLE, false);
      this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
      this.bIsLargeScreen = this.platform.width() > 768;
    });

  }

  ngOnDestroy() {
    /// remove subscription to check screen size
    if (this.resizeSubscription != null) {
      this.resizeSubscription.unsubscribe();
    }
  }

  ionViewDidLoad() {
    /// set subscription to check screen size change
    /// used to adjust ui layout
    this.resizeSubscription = fromEvent(window, 'resize')
      .subscribe(event => {
        let bWasPreviouslyLargeScreen = this.bIsLargeScreen;
        this.bIsLargeScreen = window.innerWidth >= 768;
        if (!bWasPreviouslyLargeScreen && this.bIsLargeScreen) {
          this.scrollToBottom();
        }
      });

      /// get the initial messaging data
    this.loadInitialData();
  }


  ionViewWillEnter() {

    /// large screen handles all this in real time, no need to update the page below
    if (this.bIsLargeScreen) {
      return;
    }

    /// gets conversation data from conversation modal and updates the convo here if it exiss
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

  /**
   * Get the initial data (message list and message groups)   * 
   */
  private loadInitialData() {
    this.pageState = this.LOADING;
    
    this.groups.length = 0;
    this.messages.length = 0;
    this.conversations.length = 0;
    this.selectedConversation = null;
    this.secureMessagingProvider.getInitialData()
      .subscribe(
        ([smGroupArray, smMessageArray]) => {
          this.groups = smGroupArray;
          this.messages = smMessageArray;
          this.handleInitialDataResponse();
        },
        error => {
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

  /**
   * Handle the response from get inital data (message array and groups)
   */
  private handleInitialDataResponse() {

    /// sort messages by date
    this.messages.sort((a, b) => a.created_date < b.created_date ? 1 : b.created_date > a.created_date ? -1 : 0);

    /// create 'conversations' out of message array
    for (let message of this.messages) {
      message.sent_date = new Date(message.sent_date).toLocaleString();

      let bNewConversation = true;

      /// add to existing conversation if it exists
      for (let convo of this.conversations) {
        if (convo.groupIdValue && convo.groupIdValue.length > 0 && (convo.groupIdValue == message.sender.id_value || convo.groupIdValue == message.recipient.id_value)) {
          convo.messages.push(message);
          bNewConversation = false;
        }

        if (!bNewConversation) {
          break;
        }

      }

      /// create new conversation
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

        /// try to get proper group info
        for (let group of this.groups) {
          if (group.id == newGroupId) {
            newGroupName = group.name;
            newGroupDescription = group.description;
          }
        }

        let conversation: SecureMessageConversation = {
          institutionId: SecureMessagingProvider.GetSMAuthInfo().institution_id,
          groupName: newGroupName,
          groupIdValue: newGroupId,
          groupDescription: newGroupDescription,
          myIdValue: SecureMessagingProvider.GetSMAuthInfo().id_value,
          messages: new Array(),
          selected: false
        };

        conversation.messages.push(message);
        this.conversations.push(conversation);
      }

      /// select first conversation by default
      if (this.conversations.length > 0) {
        this.conversations[0].selected = true;
        this.selectedConversation = this.conversations[0];
      }

    }

    /// show to user when finished loading
    if (this.conversations.length > 0) {
      if (this.bIsLargeScreen) {
        this.scrollToBottom();
      }
      this.pageState = this.SHOW_CONVOS;
    } else {
      this.pageState = this.START_CONVO;
    }
  }

  /**
   * On refresh button pressed
   */
  refreshMessages() {
    this.loadInitialData();
  }

  /**
   * Scroll to bottom of message conversation pane if possible
   */
  public scrollToBottom() {
    setTimeout(() => {
      if (this.chatScroll == null) {
        return;
      }
      let scroll = this.chatScroll._scrollContent.nativeElement;
      scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
    }, 100);
  }

  /**
   * Handle ui changes for conversation selection if large screen and then open conversation
   * 
   * @param conversation The conversation that was selected from the list
   */
  onConversationClick(conversation: SecureMessageConversation) {

    if (this.bIsLargeScreen) {
      for (let convo of this.conversations) {
        convo.selected = false;
      }
      this.selectedConversation = conversation;
      this.selectedConversation.selected = true;
      this.scrollToBottom();
      return;
    }

    this.openConversationPage(conversation);
  }

  /**
   * Send a message
   */
  onSendMessageClick() {
    if (this.newMessageText && this.newMessageText.length > 0) {
      this.scrollToBottom();
      this.sendMessage();
    }
  }

  /**
   * Logic for sending a message
   */
  sendMessage() {

    let NewMessage = {
      institution_id: SecureMessagingProvider.GetSMAuthInfo().institution_id,
      sender: {
        type: "patron",
        id_field: SecureMessagingProvider.GetSMAuthInfo().id_field,
        id_value: SecureMessagingProvider.GetSMAuthInfo().id_value,
        name: BaseProvider.getUserInfo().firstName + " " + BaseProvider.getUserInfo().lastName
      },
      recipient: {
        type: "group",
        id_value: this.selectedConversation.groupIdValue,
        name: this.selectedConversation.groupName
      },
      description: "",
      body: this.newMessageText,
      importance: null,
    };

    this.secureMessagingProvider.sendSecureMessage(NewMessage)
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

  /**
   * Add sent message to local conversation rather than making a call to get all messages for update
   */
  addLocalDataToConversation() {
    let message: SecureMessageInfo = {
      body: this.newMessageText,
      created_date: new Date().toLocaleString(),
      description: "",
      id: null,
      importance: null,
      institution_id: SecureMessagingProvider.GetSMAuthInfo().institution_id,
      read_date: null,
      recipient: { created_date: new Date().toISOString(), id: "", type: "group", id_field: null, id_value: this.selectedConversation.groupIdValue, name: this.selectedConversation.groupName, aux_user_id: null, version: 1 },
      replied_message_id: "None",
      requires_read_receipt: null,
      sender: { created_date: new Date().toISOString(), id: "", type: "patron", id_field: SecureMessagingProvider.GetSMAuthInfo().id_field, id_value: SecureMessagingProvider.GetSMAuthInfo().id_value, name: BaseProvider.getUserInfo().firstName + " " + BaseProvider.getUserInfo().lastName, aux_user_id: null, version: 1 },
      sent_date: new Date().toLocaleString(),
      state: null,
      ttl: null,
      version: 1
    }

    this.newMessageText = null;
    this.selectedConversation.messages.push(message);
    this.scrollToBottom();
  }

  /**
   * New Conversation FAB click
   */
  onAddConversationFABClick() {
    this.openChooseContactModal();
  }

  /**
   * New conversation 'Start Conversation' button
   */
  onStartConversationButtonClick() {
    this.openChooseContactModal();
  }

/**
 * Logic to open the groups list page
 * Select a group for new conversation
 */
  openChooseContactModal() {

    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const modalData = {
      groups: this.groups
    };

    const chooseContactModal: Modal = this.modalCtrl.create('SecureMessagingGroupModalPage', { data: modalData }, modalOptions);

    chooseContactModal.present();

    /// callback for modal closing
    chooseContactModal.onWillDismiss((data) => {

      /// check if a conversation with this group already exists, if so, just pull up that conversation
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
            institutionId: SecureMessagingProvider.GetSMAuthInfo().institution_id,
            groupName: data.selectedGroup.name,
            groupIdValue: data.selectedGroup.id,
            groupDescription: data.selectedGroup.description,
            myIdValue: SecureMessagingProvider.GetSMAuthInfo().id_value,
            messages: new Array(),
            selected: true
          };
          this.conversations.push(newConversation);
        }

        /// open the conversation page if we're not in large screen mode
        if (!this.bIsLargeScreen) {
          this.openConversationPage(newConversation);
        } else {
          for (let convo of this.conversations) {
            convo.selected = false;
          }
          this.selectedConversation = newConversation;
          this.selectedConversation.selected = true;
          this.pageState = this.SHOW_CONVOS;
        }

      }
    });

  }

  /**
   * Open the conversation modal if we're not in large screen mode
   * @param conversation Conversation to display
   */
  openConversationPage(conversation: SecureMessageConversation) {
    const modalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const conversationModal: Modal = this.modalCtrl.create('SecureMessagingConversationPage', { data: conversation }, modalOptions);

    conversationModal.present();

    /// conversation modal callback.  Adds new conversation data to the conversation list
    conversationModal.onWillDismiss((data) => {

      if (data.updatedConversation) {
        let bIsExisitingConversation: boolean = false;
        for (let convo of this.conversations) {
          if (data.updatedConversation.groupIdValue == convo.groupIdValue) {
            convo = data.updatedConversation
            bIsExisitingConversation = true;
            break;
          }
        }

        if (!bIsExisitingConversation) {
          if (data.updatedConversation.messages.length > 0) {
            this.conversations.push(data.updatedConversation);
          }
        }

      }
    });
  }

  /**
   * Used in html to get the name
   */
  getCurrentConversationName(): string {
    if (this.selectedConversation != null) {
      return this.selectedConversation.groupName;
    } else {
      return "";
    }

  }

}
