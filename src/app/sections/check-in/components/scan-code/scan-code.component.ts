import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { Plugins } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
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
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly loadingService: LoadingService,
    private readonly checkingServiceFacade: CheckingServiceFacade,
    private location: Location
  ) {}

  async ngOnInit() {
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCode]);
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
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
 
  async ionViewWillLeave() {
    this.location.back();
  }

  async ionViewDidLeave() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
   }
}
