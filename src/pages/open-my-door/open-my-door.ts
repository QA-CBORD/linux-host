import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, FabContainer, ModalController } from 'ionic-angular';

import * as Globals from '../../app/app.global';
import { OpenMyDoorModalPage } from '../open-my-door-modal/open-my-door-modal';
import { OpenMyDoorDataManager } from './../../providers/open-my-door-data-manager/open-my-door-data-manager';


@IonicPage()
@Component({
  selector: 'page-open-my-door',
  templateUrl: 'open-my-door.html',
})
export class OpenMyDoorPage {

  testData: any[] = new Array();
  sortedTestData: any[] = new Array();
  testNames: string[] = ['Room 214', 'Room 215', 'Room 216', 'Washer 2', 'Washer 3'];

  currentSelectedLocation: any;

  bShowUnlockButton: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private modCtrl: ModalController,
    private omdDataManager: OpenMyDoorDataManager
  ) {


    // get open my door data

    this.populateTestData();
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
  }


  private populateTestData() {

    let index = 8;

    do {

      this.testData.push({
        name: this.testNames[this.randomIntFromInterval(0, 4)],
        description: 'This is a test description',
        distance: this.randomFloatFromInterval(0.1, 4, 1)
      });

    } while (--index > 0)

    this.sortedTestData = this.testData.sort((n1, n2) => n1.distance - n2.distance);

  }

  locationSelected(item: any) {
    console.log(item.name);
    this.currentSelectedLocation = item;
    this.presentUnlockModal();
  }

  presentUnlockModal() {
    if (this.currentSelectedLocation == null) {
      return;
    }

    let unlockModal = this.modCtrl.create(OpenMyDoorModalPage, { selectedLocation: this.currentSelectedLocation });
    unlockModal.onDidDismiss(data => {

      console.log(data);

      this.currentSelectedLocation = null;

    });

    unlockModal.present();

  }

  unlockDoorClick(fab: FabContainer) {
    fab.close();
    console.log("Get Location");
    this.omdDataManager.getMobileLocations();
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomFloatFromInterval(min, max, precision) {
    return (Math.random() * (max - min + 1) + min).toFixed(precision);
  }

}
