import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AbstractAndroidCredentialDataService } from '../model/android/abstract-android-credential-data.service';
import { AndroidCredential } from '../model/android/android-credentials';
import { HIDCredentialManager } from '../model/android/hid/hid-credential-manager';
import { MobileCredential } from '../model/shared/mobile-credential';
import { CredentialStateChangeSubscription, MobileCredentialManager } from '../model/shared/mobile-credential-manager';



@Injectable({
  providedIn: 'root',
})
export class AndroidCredentialManager extends AbstractAndroidCredentialDataService
  implements MobileCredentialManager {
  private mCredentialManager: MobileCredentialManager;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly alertCtrl: AlertController,
    private readonly popoverCtrl: PopoverController,
    private readonly loadingService: LoadingService,
    protected partnerPaymentApi: PartnerPaymentApiService,
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly httpClient: HttpClient
  ) {
    super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService, httpClient);
  }

  setCredentialStateChangeSubscrption(credentialStateChangeSubscription: CredentialStateChangeSubscription): void {
    this.mCredentialManager.setCredentialStateChangeSubscrption(credentialStateChangeSubscription);
  }

  onUiIconClicked(): void {
    this.mCredentialManager.onUiIconClicked();
  }


  getCredential(): MobileCredential {
    return this.mCredentialManager.getCredential();
  }

  private initManager(): Observable<boolean> {
    return this.androidActivePassesFromServer().pipe(
      map(mCredential => {
        let androidCredential = <AndroidCredential<any>>mCredential;
        if (androidCredential.isHID()) {
            this.mCredentialManager = HIDCredentialManager.getInstance(
            this.modalCtrl,
            this.alertCtrl,
            this.popoverCtrl,
            this.loadingService,
            this.partnerPaymentApi,
            this.storageStateService,
            this.authFacadeService,
            this.institutionFacadeService,
            this.contentStringFacade,
            this.httpClient
          );
          this.mCredentialManager.setCredential(androidCredential);
          return true;
        } else if (androidCredential.isGOOGLE()) {
          this.mCredentialManager = null; // google/nxp credential manager not implemented yet
          this.mCredentialManager.setCredential(androidCredential);
          return true;
        }
        return false;
      })
    );
  }

setCredential(mobileCredential: MobileCredential): void {
    this.mCredentialManager.setCredential(mobileCredential);
}

  credentialEnabled$(): Observable<boolean> {
    return this.initManager().pipe(
        switchMap(userIsEntittled => {
          if(this.mCredentialManager && userIsEntittled) {
             return this.mCredentialManager.credentialEnabled$();
          }
          return of(false);
        })
      );
  }


  initialize(): Promise<any> {
    return this.mCredentialManager.initialize();
  }
  onUiImageClicked(event?: any): void {
    this.mCredentialManager.onUiImageClicked();
  }

  credentialAvailable$(): Observable<boolean> {
    return this.mCredentialManager ? this.mCredentialManager.credentialAvailable$(): of(false);
  }
}
