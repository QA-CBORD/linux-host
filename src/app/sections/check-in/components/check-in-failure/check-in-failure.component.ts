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
  @Input() total: number;
  @Input() merchantId: string;
  @Input() dueTime: string;
  @Input() checkNumber: number;
  @Input() orderId: string;
  @Input() errorMessage: string;
  displayPlayMessage: any;

  data: {
    pickupTime: { dueTime: string };
    storeAddress: AddressInfo;
    orderTypes: MerchantOrderTypesInfo;
  } = <any>{};

  contentString: any;

  constructor(private readonly modalController: ModalController, private readonly commonService: CommonService) {}

  ngOnInit() {
    this.displayPlayMessage = this.contentStrings.get_closer;
    if (this.errorMessage && this.errorMessage.includes('early')) {
      this.displayPlayMessage = this.contentStrings.too_early;
    }
    this.checkinSuccessCs();
  }

  async onBack() {
    await this.modalController.dismiss();
  }

  async onScanCode() {
    this.modalController.dismiss({ scancode: true });
  }

  private checkinSuccessCs() {
    (async () => {
      this.contentString = await this.commonService
        .loadContentString<CheckingSuccessContentCsModel>(ContentStringCategory.checkinSuccess)
        .pipe(take(1))
        .toPromise();
    })();
  }
}
