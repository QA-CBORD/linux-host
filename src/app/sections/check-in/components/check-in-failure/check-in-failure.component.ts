import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

const CHECKIN_ERROR_CODES = {
  OUTSIDE_OF_RANGE: '9018',
  INVALID_BARCODE: '9020'
};

@Component({
  selector: 'st-check-in-failure',
  templateUrl: './check-in-failure.component.html',
  styleUrls: ['./check-in-failure.component.scss'],
})
export class CheckInFailureComponent implements OnInit {

  @Input() contentStrings = <any>{};
  @Input() orderId: string;
  @Input() errorMessage: string;
  @Input() checkNumber: number;
  displayPlayMessage: any;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {
    this.displayErrorMessage();
  }

  async onBack() {
    await this.modalController.dismiss({ scancode: false });
  }

  async onScanCode() {
    await this.modalController.dismiss({ scancode: true });
  }

  private displayErrorMessage() {
    this.displayPlayMessage = this.contentStrings.too_early;
    if (this.errorMessage) {
      if (this.errorMessage.includes(CHECKIN_ERROR_CODES.OUTSIDE_OF_RANGE)) {
        this.displayPlayMessage = this.contentStrings.get_closer;
      } else if (this.errorMessage.includes(CHECKIN_ERROR_CODES.INVALID_BARCODE)) {
        this.displayPlayMessage = this.contentStrings.invalid_scan_code;
      }
    }
  }
}
