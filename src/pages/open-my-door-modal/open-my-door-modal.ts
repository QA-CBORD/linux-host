import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-open-my-door-modal',
  templateUrl: 'open-my-door-modal.html',
})
export class OpenMyDoorModalPage {

  currentSelectedLocation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.currentSelectedLocation = navParams.get('selectedLocation');
  }

  activateSelected(){
    console.log("Activate Selected");
    
  }

  closeModal() {
    const data = {
      result: 'Success'
    };
    this.viewCtrl.dismiss(data);
  }

}
