import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-secure-messaging-group-modal',
  templateUrl: 'secure-messaging-group-modal.html',
})
export class SecureMessagingGroupModalPage {

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
    
    
  }





  closeModal(){
    const returnData = {
      thing0: 'value0',
      thing1: 'value1'
    };
    this.viewCtrl.dismiss(returnData);
  }

}
