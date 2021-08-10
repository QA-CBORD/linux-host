import { Component, Input, OnInit } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { ModalController } from '@ionic/angular';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-check-in-failure',
  templateUrl: './check-in-failure.component.html',
  styleUrls: ['./check-in-failure.component.scss'],
})
export class CheckInFailureComponent implements OnInit {
  @Input() contentStrings = <any>{};
  @Input() orderId: string;
  @Input() errorMessage: string;
  displayPlayMessage: any;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {
    this.displayPlayMessage = this.contentStrings.get_closer;
    if (this.errorMessage && this.errorMessage.includes('early')) {
      this.displayPlayMessage = this.contentStrings.too_early;
    }
  }

  async onBack() {
    await this.modalController.dismiss();
  }

  async onScanCode() {
    await this.modalController.dismiss({ scancode: true });
  }
}
