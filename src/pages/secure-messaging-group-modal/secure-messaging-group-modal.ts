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
  readonly START_CONVO: number = 1;
  readonly SHOW_CONVOS: number = 2;
  readonly ERROR_CONNECTING: number = 3;
  readonly OFFLINE: number = 4;

  pageState: number = this.LOADING;

  groups: SecureMessageGroupInfo[] = new Array();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    /// get our data passed to the modal, if there is any
    console.log("Choose Contact Modal Opened");
    console.log(this.navParams.get('data'));

    this.loadInitialData();
  }

  private loadInitialData() {
    this.pageState = this.LOADING;

    /// for testing only
    setTimeout(() => {
      this.setTestData();

    }, 1000)

    /// 


  }


  setTestData() {

    let tGroup: SecureMessageGroupInfo = {
      id: "3432143-43241234-3214324",
      name: "Group Name ",
      inter_name: "internal group name ",
      description: "description ",
      created_date: new Date().toDateString(),
      version: 1
    };


    for (let i = 0; i < 4; i++) {
      this.groups.push(tGroup);
    }

    this.pageState = this.SHOW_CONVOS;
  }



  closeModal() {
    const returnData = {
      thing0: 'value0',
      thing1: 'value1'
    };
    this.viewCtrl.dismiss(returnData);
  }

}
