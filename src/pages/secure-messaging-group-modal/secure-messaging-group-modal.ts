import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { SecureMessagingProvider } from '../../providers/secure-messaging-provider/secure-messaging-provider';

import { MSecureMessageAddressInfo, MSecureMessageGroupInfo } from './../../models/secure-messaging/secure-message-info';

@IonicPage()
@Component({
  selector: 'page-secure-messaging-group-modal',
  templateUrl: 'secure-messaging-group-modal.html',
})
export class SecureMessagingGroupModalPage {

  readonly LOADING: number = 0;
  readonly NO_GROUPS: number = 1;
  readonly SHOW_GROUPS: number = 2;

  pageState: number = this.LOADING;
  groups: MSecureMessageGroupInfo[];
  selectedGroup: MSecureMessageGroupInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private secureMessagingProvider: SecureMessagingProvider,
    private toast: ToastController
  ) {
  }

  ionViewDidLoad() {
    /// get our data passed to the modal, if there is any
    this.loadInitialData();
  }

  /**
   * Get the group data being passed into the modal
   */
  private loadInitialData() {
    this.pageState = this.LOADING;

    this.groups = this.navParams.get('data').groups || null;

    if (!this.groups || this.groups.length <= 0) {
      this.pageState = this.NO_GROUPS;
    } else {
      this.pageState = this.SHOW_GROUPS;
    }

  }

  /**
   * Handle the selected group from the ui
   */
  onGroupClick(selectedGroup: MSecureMessageGroupInfo) {
    this.selectedGroup = selectedGroup;
    this.closeModal();
  }

  /**
   * This would mean that the institution has no groups. Let's try to retrieve them again
   */
  onNoGroupsFoundClick() {
    this.pageState = this.LOADING;
    this.secureMessagingProvider.getSecureMessagesGroups().subscribe(
      (groupsArray: MSecureMessageGroupInfo[]) => {
        this.groups = groupsArray;
        if(this.groups.length > 0){
          if (!this.groups || this.groups.length <= 0) {
            this.pageState = this.NO_GROUPS;
          } else {
            this.pageState = this.SHOW_GROUPS;
          }
        }
      },
      (error: any) => {
        this.toast.create({
          message: error,
          duration: 5000,
          position: 'bottom'
        }).present();
      }
    )
  }

  /**
   * Close the modal and pass the data back
   */
  closeModal() {
    const returnData = {
      selectedGroup: this.selectedGroup
    };
    this.viewCtrl.dismiss(returnData);
  }

}
