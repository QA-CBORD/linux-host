import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'login',
  segment: 'login/:sessionToken'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  sessionToken: string = null;
  localSessionId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    this.sessionToken = navParams.get('sessionToken');

    console.log(this.sessionToken);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }    
}