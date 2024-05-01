import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController, Platform } from '@ionic/angular';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeFormat,
  PermissionStatus, BarcodeScannedEvent
} from '@capacitor-mlkit/barcode-scanning';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { take } from 'rxjs/operators';
const renderingDelay = 1000;

@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanCodeComponent implements OnInit {
  @Input() formats: [BarcodeFormat];
  @Input() title?: string;
  @Input() prompt?: string;
  @Input() textBtn?: string;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly toastService: ToastService,
    private readonly nativeProvider: NativeProvider,
    private platform: Platform,
    private location: Location
  ) {}

  async ngOnInit() {
    try {
      await this.clearBackground();
      this.hardwareBackButton();
      this.nativeProvider.setKeepTopModal = true;
      const status = await BarcodeScanner.requestPermissions();
      this.handleScanner(status);
      setTimeout(() => {
        this.nativeProvider.setKeepTopModal = false;
      }, renderingDelay);
    } catch {
      this.closeScanCode();
    }
  }

  ionViewWillLeave() {
    this.location.back();
    BarcodeScanner.stopScan();
    BarcodeScanner.removeAllListeners();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
  }

  closeScanCode(code: string = null) {
    this.goBack(code);
  }

  private async startScanning(formats: [BarcodeFormat]) {
    document.querySelector('body')?.classList.add('barcode-scanner-active');
    await BarcodeScanner.addListener(
      'barcodeScanned',
      async (result: BarcodeScannedEvent) => {
        if (result.barcode.rawValue) {
          this.closeScanCode(result.barcode.rawValue);
        } else {
          this.closeScanCode();
        }
      },
    );
    await BarcodeScanner.startScan({ formats });
  }

  private handleScanner(status: PermissionStatus) {
    if (status.camera == 'granted' || status.camera == 'limited') {
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

  private async goBack(code: string) {
    await this.modalController.dismiss({ scanCodeResult: code });
  }

  private async clearBackground() {
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCodeBackground]);
  }

  async manualEntry() {
    await this.modalController.dismiss({ manualEntry: true });
  }
}
