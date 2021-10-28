import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/check-in-content-string.model';

@Component({
  selector: 'st-pick-checkin-mode',
  templateUrl: './pick-checkin-mode.component.html',
  styleUrls: ['./pick-checkin-mode.component.scss'],
})
export class PickCheckinModeComponent implements OnInit {
  @Input() contentStrings: CheckingContentCsModel;
  @Input() locationPermissionDisabled: boolean;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  async onScanCode() {
    await this.modalController.dismiss({
      handler: 'onScanCode',
    });
  }

  async onLocationCheckinClicked() {
    this.modalController.dismiss({
      handler: 'onLocationCheckinClicked',
    });
  }
}
