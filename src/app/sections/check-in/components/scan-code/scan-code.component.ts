import { Component, Input, OnInit } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/checkin-service-facade';

@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
})

export class ScanCodeComponent implements OnInit {

  @Input() format = 'QR_CODE';
  @Input() prompt = 'Scan Code';

  private barcodeScanResult: BarcodeScanResult;
  constructor(private readonly barcode: BarcodeScanner, private readonly loadingService: LoadingService,  private readonly modalController: ModalController, private readonly checkingServiceFacade: CheckingServiceFacade) {}

  async ngOnInit() {
    this.loadingService.closeSpinner();
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
   
    this.barcodeScanResult = await this.barcode.scan(options);
    if (this.barcodeScanResult.cancelled) {
      this.checkingServiceFacade.barcodeScanResult = null;
    } else {
      this.checkingServiceFacade.barcodeScanResult =  this.barcodeScanResult.text;
    }
  }
}
