import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Events, PopoverController } from '@ionic/angular';

import * as Globals from 'src/app/app.global';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit, OnDestroy {
  // private readonly sourceSubscription: Subscription = new Subscription();
  @Input() data: any;
  // @Input() geoData: MGeoCoordinates;
  //
  constructor(
    private events: Events,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  // /**
  //  * Close the Activate Mobile Location Modal
  //  */
  async closeModal() {
    await this.popoverCtrl.dismiss();
  }

  ngOnDestroy() {
    // this.sourceSubscription.unsubscribe();
  }
}
