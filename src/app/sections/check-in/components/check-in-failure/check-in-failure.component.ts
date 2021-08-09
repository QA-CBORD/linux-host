import { Component, Input, OnInit } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { ModalController } from '@ionic/angular';
import { CheckingContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { CheckInSuccessComponent } from '../check-in-success/check-in-success.component';

@Component({
  selector: 'st-check-in-failure',
  templateUrl: './check-in-failure.component.html',
  styleUrls: ['./check-in-failure.component.scss'],
})
export class CheckInFailureComponent implements OnInit {
  @Input() contentStrings = <any>{};
  @Input() total: number;
  @Input() merchantId: string;
  @Input() dueTime: string;
  @Input() checkNumber: number;
  @Input() orderId: string;
  @Input() errorMessage: string;
  displayPlayMessage;

  data: {
    pickupTime: { dueTime: string };
    storeAddress: AddressInfo;
    orderTypes: MerchantOrderTypesInfo;
  } = <any>{};

  constructor(
    private readonly modalController: ModalController,
    private readonly checkInService: CheckingServiceFacade
  ) {}

  ngOnInit() {
    this.displayPlayMessage = this.contentStrings.get_closer;
    if (this.errorMessage && this.errorMessage.includes('early')) {
      this.displayPlayMessage = this.contentStrings.too_early;
    }
  }

  async onBack() {
    // just close this modal.
    await this.onClosed();
  }

  async onScanCode() {
    // this will open scanCode component.
    console.log('onScanCode');
    const barcocdeResult = await this.checkInService.scanBarcode(this.orderId);
    if (barcocdeResult) {
      const modal = await this.modalController.create({
        component: CheckInSuccessComponent,
        componentProps: { orderId: this.orderId, total: this.total, dueTime: this.dueTime, data: this.data },
      });
      modal.present();
    }
  }

  async onClosed() {
    await this.modalController.dismiss();
  }
}
