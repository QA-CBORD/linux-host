import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';

@Component({
  selector: 'st-check-in-failure',
  templateUrl: './check-in-failure.component.html',
  styleUrls: ['./check-in-failure.component.scss'],
})
export class CheckInFailureComponent implements OnInit {
  @Input() contentStrings: CheckingContentCsModel = {} as any;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  async onBack() {
    // just close this modal.
    await this.onClosed();
  }

  onScanCode() {
    // this will open scanCode component.
    console.log('onScanCode');
  }

  async onClosed() {
    await this.modalController.dismiss();
  }
}
