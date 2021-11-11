import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';

@Component({
  selector: 'st-pick-checkin-mode',
  templateUrl: './pick-checkin-mode.component.html',
  styleUrls: ['./pick-checkin-mode.component.scss'],
})
export class PickCheckinModeComponent implements OnInit {
  @Input() contentStrings: CheckingContentCsModel;
  @Input() locationPermissionDisabled: boolean;

  constructor(protected readonly popoverCtrl: PopoverController,) {}

  ngOnInit() {}

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
