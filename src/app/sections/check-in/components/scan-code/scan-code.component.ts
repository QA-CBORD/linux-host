import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
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
const { BarcodeScanner } = Plugins;

const renderingDelay = 1000;
@Component({
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanCodeComponent implements OnInit {
  buttonDisabled = false;
  @Input() formats = ['QR_CODE', 'EAN_13'];
  @Input() title = '';
  @Input() message?: string;
  @Input() buttonText?: string;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly checkingServiceFacade: CheckingServiceFacade,
    private readonly toastService: ToastService,
    private readonly nativeProvider: NativeProvider,
    private platform: Platform,
    private location: Location
  ) {}

  async ngOnInit() {
    try {
      this.hardwareBackButton();
      BarcodeScanner.prepare();
      this.nativeProvider.keepTopModal = true;
      await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.scanCodeBackground]);
      const status = await BarcodeScanner.checkPermission({ force: true });
      this.handleScanner(status);
      setTimeout(() => {
        this.nativeProvider.keepTopModal = false;
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

  private closeScanCode(code: string = null) {
    this.checkingServiceFacade.barcodeScanResult = code;
    this.goBack();
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

  private goBack() {
    this.buttonDisabled = true;
    this.modalController.dismiss();
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
      this.goBack();
    });
  }
}
