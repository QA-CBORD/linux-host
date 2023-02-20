import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '@sections/check-in/check-in-config';
import { Router } from '@angular/router';
import { BarcodeScanner, CheckPermissionResult, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';
const renderingDelay = 1000;

export enum Barcode {
  QRCode = 'QR_CODE',
}
@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanCodeComponent implements OnInit {
  @Input() formats: [SupportedFormat];
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
      BarcodeScanner.prepare();
      this.hardwareBackButton();
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

  ionViewWillLeave() {
    this.location.back();
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
  }

  closeScanCode(code: string = null) {
    this.goBack(code);
  }

  private async startScanning(targetedFormats: [SupportedFormat]) {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan({ targetedFormats });
    if (result.hasContent) {
      this.closeScanCode(result.content);
    } else {
      this.closeScanCode();
    }
  }

  private handleScanner(status: CheckPermissionResult) {
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
