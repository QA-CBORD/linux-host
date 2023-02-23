import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-pick-checkin-mode',
  templateUrl: './pick-checkin-mode.component.html',
  styleUrls: ['./pick-checkin-mode.component.scss'],
})
export class PickCheckinModeComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contentStrings: any;
  @Input() locationPermissionDisabled: boolean;

  constructor(protected readonly popoverCtrl: PopoverController,) {}

  async onScanCode() {
    await this.popoverCtrl.dismiss({
      handler: 'onScanCode',
    });
  }

  async onLocationCheckinClicked() {
    this.popoverCtrl.dismiss({
      handler: 'onLocationCheckinClicked',
    });
  }

  closeMe(){
     this.popoverCtrl.dismiss();
  }

}
