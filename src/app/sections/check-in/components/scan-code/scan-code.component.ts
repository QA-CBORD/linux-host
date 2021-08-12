import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';

@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanCodeComponent implements OnInit {
  @Input() format = 'QR_CODE';
  @Input() prompt = '';

  private barcodeScanResult: BarcodeScanResult;
  constructor(
    private readonly barcode: BarcodeScanner,
    private readonly loadingService: LoadingService,
    private readonly checkingServiceFacade: CheckingServiceFacade,
    private readonly modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.loadingService.showSpinner();
    const options: BarcodeScannerOptions = {
      orientation: 'portrait',
      preferFrontCamera: false,
      prompt: this.prompt,
      showFlipCameraButton: false,
      showTorchButton: false,
      disableSuccessBeep: true,
      torchOn: false,
      formats: this.format,
      resultDisplayDuration: 0,
    };
    try {
      this.barcodeScanResult = await this.barcode.scan(options);
      if (this.barcodeScanResult.cancelled) {
        this.checkingServiceFacade.barcodeScanResult = null;
      } else {
        this.checkingServiceFacade.barcodeScanResult = this.barcodeScanResult.text;
      }
    } catch {
      this.checkingServiceFacade.barcodeScanResult = null;
    }
    this.modalController.dismiss();
  }

  async ionViewDidEnter() {
    await this.loadingService.closeSpinner();
  }
}
