import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { ToastService } from '@core/service/toast/toast.service';
const { BarcodeScanner } = Plugins;

@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ScanCodeComponent {
  @Input() formats = ['QR_CODE', 'EAN_13'];
  @Input() title = '';
  @Input() message = '';
  @Input() buttonText = '';

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly checkingServiceFacade: CheckingServiceFacade,
    private readonly toastService: ToastService,
    private location: Location
  ) {}

  async ngOnInit() {
    try {
      BarcodeScanner.prepare();
      await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCodeBackground]);
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        BarcodeScanner.hideBackground();
        this.startScanning(this.formats);
      } else {
        this.toastService.showToast({ message: "Permissions were not granted."})
        this.closeScanCode();
      }
    } catch {
      this.closeScanCode();
    }
  }

  async ionViewWillLeave() {
    this.goBack();
  }

  private closeScanCode(code: string = null) {
    this.checkingServiceFacade.barcodeScanResult = code;
    this.dismiss();
  }

  private async startScanning(targetFormats: string[]) {
    const result = await BarcodeScanner.startScan({ targetFormats });
    if (result.hasContent) {
      this.closeScanCode(result.content);
    } else {
      this.closeScanCode();
    }
  }

  private async dismiss() {
    await this.modalController.dismiss();
  }

  private goBack() {
    this.location.back();
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
  }
}
