import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
const { BarcodeScanner } = Plugins;
const renderingDelay = 1000;

export enum Barcode {
  QRCode = 'QR_CODE',
  EAN_13 = 'EAN_13',
}
@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanCodeComponent implements OnInit {
  buttonDisabled = false;
  @Input() formats = [Barcode.QRCode, Barcode.EAN_13];
  @Input() title? = '';
  @Input() message?: string;
  @Input() buttonText?: string;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly toastService: ToastService,
    private readonly nativeProvider: NativeProvider,
    private readonly globalNav: GlobalNavService,
    private platform: Platform,
    private location: Location
  ) {}

  async ngOnInit() {
    try {
      this.hardwareBackButton();
      BarcodeScanner.prepare();
      this.nativeProvider.setKeepTopModal = true;
      const status = await BarcodeScanner.checkPermission({ force: true });
      this.handleScanner(status);
      setTimeout(() => {
        this.nativeProvider.setKeepTopModal = false;
      }, renderingDelay);
    } catch {
      this.closeScanCode();
    }
  }

  async ionViewWillEnter() {
    await this.clearBackground();
  }

  ionViewWillLeave() {
    this.location.back();
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
  }

  private closeScanCode(code: string = null) {
    this.goBack(code);
  }

  private async startScanning(targetFormats: string[]) {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan({ targetFormats });
    if (result.hasContent) {
      this.closeScanCode(result.content);
    } else {
      this.closeScanCode();
    }
  }

  private handleScanner(status: any) {
    if (status.granted || status.neverAsked) {
      this.startScanning(this.formats);
    } else {
      this.closeScanCode();
      this.toastService.showToast({ message: 'Permissions were not granted.' });
    }
  }

  private hardwareBackButton() {
    this.platform.backButton.pipe(take(1)).subscribe(() => {
      this.closeScanCode();
    });
  }

  private goBack(code: string) {
    this.buttonDisabled = true;
    this.modalController.dismiss({ scanCodeResult: code });
  }

  private async clearBackground() {
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCodeBackground]);
  }

  manualEntry() {
    this.modalController.dismiss({ manualEntry: true });
  }
}
