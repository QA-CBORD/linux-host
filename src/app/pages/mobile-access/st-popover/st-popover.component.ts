import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Events, PopoverController } from '@ionic/angular';

import * as Globals from 'src/app/app.global';

@Component({
  selector: 'st-popover',
  templateUrl: './st-popover.component.html',
  styleUrls: ['./st-popover.component.scss'],
})
export class StPopoverComponent implements OnInit, OnDestroy {
  // private readonly sourceSubscription: Subscription = new Subscription();
  @Input() data: any;
  // @Input() geoData: MGeoCoordinates;
  //
  constructor(
    private events: Events,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
  }

  // /**
  //  * Close the Activate Mobile Location Modal
  //  */
  async closeModal(closeModal) {
    await this.popoverCtrl.dismiss(closeModal);
  }

  ngOnDestroy() {
    // this.sourceSubscription.unsubscribe();
  }
}
