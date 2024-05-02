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
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '@core/service/loading/loading.service';
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
  private backButtonPressed?: boolean;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly toastService: ToastService,
    private readonly nativeProvider: NativeProvider,
    private readonly translateService: TranslateService,
    private readonly loadingService: LoadingService,
    private readonly platform: Platform,
    private readonly location: Location,
  ) { }

  async ngOnInit() {
    this.showBlankBackground();
    this.hardwareBackButton();
    this.nativeProvider.setKeepTopModal = true;
    try {
      const status = await BarcodeScanner.requestPermissions();
      this.handleScanner(status);
    } catch {
      this.closeScanCode();
    }
    setTimeout(() => {
      this.nativeProvider.setKeepTopModal = false;
    }, renderingDelay);
  }

  async ionViewWillLeave() {
    if (!this.backButtonPressed) {
      this.location.back();
    }
    await BarcodeScanner?.stopScan();
    await BarcodeScanner?.removeAllListeners();
  }

  closeScanCode(code: string = null) {
    this.goBack(code);
  }

  async manualEntry() {
    await this.modalController.dismiss({ manualEntry: true });
  }

  private async startScanning(formats: [BarcodeFormat]) {
    this.setBackgroundTransparency(true);
    await BarcodeScanner.addListener(
      'barcodeScanned',
      async (result: BarcodeScannedEvent) => {
        if (result?.barcode?.rawValue) {
          this.closeScanCode(result.barcode.rawValue);
        } else {
          this.closeScanCode();
        }
      },
    );
    await BarcodeScanner.startScan({ formats });
  }

  private handleScanner(status: PermissionStatus) {
    if (status.camera === 'granted' || status.camera === 'limited') {
      this.startScanning(this.formats);
    } else {
      this.closeScanCode();
      this.toastService.showToast({ message: this.translateService.instant("patron-ui.checkin.no_permissions") });
    }
  }

  private hardwareBackButton() {
    this.platform.backButton.pipe(first()).subscribe(() => {
      this.backButtonPressed = true;
      this.closeScanCode();
    });
  }

  private async goBack(code: string) {
    await this.modalController.dismiss({ scanCodeResult: code });
  }

  private async showBlankBackground() {
    this.loadingService.showSpinner();
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCodeBackground]);
    this.loadingService.closeSpinner();
  }

  private setBackgroundTransparency(transparent?: boolean) {
    const screen = document.querySelector('body')?.classList;
    if (transparent) {
      screen.add('barcode-scanner-active');
    } else {
      screen.remove('barcode-scanner-active');
    }
  }
}
