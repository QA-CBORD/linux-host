import { Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AndroidCredential, GoogleCredential } from '../model/android/android-credentials';
import { HidCredentialDataService } from './hid-credential-data.service';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
import { MobileCredentialManager } from '../model/shared/mobile-credential-manager';
import { GooglePayCredentialManager } from '../model/android/google-pay/google-pay-credential-manager';

@Injectable({
  providedIn: 'root',
})
export class AndroidCredentialManagerFactory {
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastController,
    protected readonly hidCredentialDataService: HidCredentialDataService
  ) {}

  getCredentialManager(): Observable<MobileCredentialManager> {
    return this.hidCredentialDataService.androidActivePassesFromServer().pipe(
      map((mobileCredential: AndroidCredential<any>) => {
        let androidCredentialManager = null;
        if (mobileCredential.isHID()) {
          androidCredentialManager = this.createHidCredentialManager();
          androidCredentialManager.setCredential(mobileCredential);
        } else if (mobileCredential.isGoogle()) {
          androidCredentialManager = this.createGoogleCredentialManager(); // google/nxp credential manager not implemented yet
          androidCredentialManager.setCredential(mobileCredential);
        }
        return androidCredentialManager;
      })
    );
  }

  private createHidCredentialManager(): HIDCredentialManager {
    return HIDCredentialManager.getInstance(
      this.modalCtrl,
      this.alertCtrl,
      this.popoverCtrl,
      this.toastService,
      this.loadingService,
      this.hidCredentialDataService
    );
  }

  private createGoogleCredentialManager(): GooglePayCredentialManager {
    return new GooglePayCredentialManager();
  }
}
