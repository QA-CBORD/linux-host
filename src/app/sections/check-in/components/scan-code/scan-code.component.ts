import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { Plugins } from '@capacitor/core';
const { BarcodeScanner } = Plugins;

@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanCodeComponent implements OnInit {
  @Input() format = 'QR_CODE';
  @Input() prompt = '';

  constructor(
    private readonly loadingService: LoadingService,
    private readonly checkingServiceFacade: CheckingServiceFacade
  ) {}

  async ngOnInit() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        alert('permission granted');
        BarcodeScanner.prepare();
      }
    } catch {
      this.checkingServiceFacade.barcodeScanResult = null;
    }
  }

  async ionViewWillEnter() {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      alert(JSON.stringify(result.content));
    }
  }
}
