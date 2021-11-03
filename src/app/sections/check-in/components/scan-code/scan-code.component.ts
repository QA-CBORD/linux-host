import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { BarcodeScanner } = Plugins;

@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ScanCodeComponent {
  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly checkingServiceFacade: CheckingServiceFacade,
    private location: Location
  ) {}

  async ngOnInit() {
    try {
      BarcodeScanner.prepare();
      await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCode]);
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        BarcodeScanner.hideBackground();
      }
    } catch {
      this.checkingServiceFacade.barcodeScanResult = null;
      this.dismiss();
    }
  }

  async ionViewWillEnter() {
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      alert(JSON.stringify(result.content));
      this.checkingServiceFacade.barcodeScanResult = result.content;
      
    }
  }

  async ionViewWillLeave() {
   this.goBack();
  }
 
  private dismiss() {
    this.modalController.dismiss();
  }
  private goBack() {
    this.location.back();
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
  }
}
