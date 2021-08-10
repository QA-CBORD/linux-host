import { Component, Input, OnInit } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CheckingSuccessContentCsModel } from '@sections/check-in/contents-strings/checkin-content-string.model';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { take } from 'rxjs/operators';
import { CheckInSuccessComponent } from '../check-in-success/check-in-success.component';
import { ScanCodeComponent } from '../scan-code/scan-code.component';

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

  contentString: any;
  
  constructor(
    private readonly modalController: ModalController,
    private readonly checkInService: CheckingServiceFacade,
    private readonly commonService: CommonService,
    private readonly loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.displayPlayMessage = this.contentStrings.get_closer;
    if (this.errorMessage && this.errorMessage.includes('early')) {
      this.displayPlayMessage = this.contentStrings.too_early;
    }
    this.checkinSuccessCs();
  }

  async onBack() {
    // just close this modal.
    await this.onClosed();
  }

  async onScanCode() {
    this.loadingService.showSpinner();
    let modal = await this.modalController.create({
      component: ScanCodeComponent,
    });
    await modal.present();
    await modal.onDidDismiss();
    if (this.checkInService.barcodeScanResult == null) return;
    this.checkInService
      .checkInOrderByBarcode(this.orderId, this.checkInService.barcodeScanResult)
      .pipe(take(1))
      .toPromise()
      .then(async res => {
        if (res) {
          await this.handleResponse(res);
        }
      })
      .catch(err => this.onCheckInFailed(err))
      .finally(() => this.loadingService.closeSpinner());
  }
 
  private async showSuccessModal() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: CheckInSuccessComponent,
      componentProps: {
        orderId: this.orderId,
        total: this.total,
        checkNumber: this.checkNumber,
        data: this.data,
        contentString: this.contentString,
      },
    });
    await modal.present();
  }

  private async onCheckInFailed({ message: errorMessage }) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: CheckInFailureComponent,
      componentProps: {
        errorMessage,
        contentStrings: this.contentStrings,
        orderId: this.orderId,
        total: this.total,
        dueTime: this.dueTime,
        checkNumber: this.checkNumber,
        data: this.data,
      },
    });
    await modal.present();
  }

  private async handleResponse(res: any) {
    await this.showSuccessModal();
    if (res) {
    } else {
      this.onCheckInFailed(res);
    }
  }

  async onClosed() {
    await this.modalController.dismiss();
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
