import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SecureMessageGroupInfo } from '../../models/secure-messaging/secure-message-info';

@IonicPage()
@Component({
  selector: 'page-secure-messaging-group-modal',
  templateUrl: 'secure-messaging-group-modal.html',
})
export class SecureMessagingGroupModalPage {

  readonly LOADING: number = 0;
  readonly NO_GROUPS: number = 1;
  readonly SHOW_GROUPS: number = 2;
  readonly ERROR_CONNECTING: number = 3;
  readonly OFFLINE: number = 4;

  pageState: number = this.LOADING;

  groups: SecureMessageGroupInfo[];

  selectedGroup: SecureMessageGroupInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    /// get our data passed to the modal, if there is any
    this.loadInitialData();
  }

  private loadInitialData() {
    this.pageState = this.LOADING;

    this.groups = this.navParams.get('data').groups || null;
 
    if(!this.groups || this.groups.length <= 0){
      this.pageState = this.NO_GROUPS;
    } else {
      this.pageState = this.SHOW_GROUPS;
    }

  }

  onGroupClick(selectedGroup: SecureMessageGroupInfo){
    this.selectedGroup = selectedGroup;
    console.log(selectedGroup);
    
    this.closeModal();
  }

  onNoGroupsFoundClick(){
    console.log("onNoGroupsFoundClick");
    /// refresh?
  }

  onConnectionErrorClick() {
    console.log("onConnectionErrorClick");
    /// refresh
  }

  onOfflineClick() {
    console.log("onOfflineClick");
    /// refresh
  }

  closeModal() {
    const returnData = {
      selectedGroup: this.selectedGroup
    };
    this.viewCtrl.dismiss(returnData);
  }

}
