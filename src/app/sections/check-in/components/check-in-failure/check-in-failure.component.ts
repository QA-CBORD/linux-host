import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';

const CHECKIN_ERROR_CODES = {
  OUTSIDE_OF_RANGE: '9018',
  INVALID_BARCODE: '9020',
  TOO_EARLY: '9019',
};

@Component({
  selector: 'st-check-in-failure',
  templateUrl: './check-in-failure.component.html',
  styleUrls: ['./check-in-failure.component.scss'],
})
export class CheckInFailureComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() contentStrings = <any>{};
  @Input() orderId: string;
  @Input() errorMessage: string;
  @Input() checkNumber: number;
  canScanCode: boolean;
  displayPlayMessage: string;

  constructor(private readonly modalController: ModalController, private readonly loadingService: LoadingService) {}

  ngOnInit() {
    this.displayErrorMessage();
  }

  ionViewDidEnter() {
    this.loadingService.closeSpinner();
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
        this.canScanCode = true;
      } else if (this.errorMessage.includes(CHECKIN_ERROR_CODES.INVALID_BARCODE)) {
        this.displayPlayMessage = this.contentStrings.invalid_scan_code;
        this.canScanCode = true;
      }
    }
  }
}
