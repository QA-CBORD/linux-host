import { LoadingService } from '@core/service/loading/loading.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';
import { AndroidCredentialDataService } from '../shared/android-credential-data.service';
import { MobileCredential } from '../shared/mobile-credential';
import { CredentialStateChangeListener, MobileCredentialManager } from '../shared/mobile-credential-manager';
import { AndroidCredential } from './android-credential.model';

export abstract class AbstractAndroidCredentialManager implements MobileCredentialManager {

  protected customLoadingOptions = { message: 'Processing ... Please wait', duration: 150000 };
  protected mCredential: AndroidCredential<any>;
  protected credentialStateChangeListener: CredentialStateChangeListener;

  constructor(protected readonly loadingService: LoadingService, protected readonly credentialSrvc: AndroidCredentialDataService) {}

  async onWillLogout(): Promise<void> {}

  refresh(): void {
    // do nothing
  }

  setCredentialStateChangeListener(credentialStateChangeSubscription: CredentialStateChangeListener): void {
    this.credentialStateChangeListener = credentialStateChangeSubscription;
  }

  protected credentialUsageContentString$(): Promise<string> {
    let text =
      'This is a generic content string describing how to use android mobile credentials; This is a generic content string describing how to use android mobile credentials';
    return of(text).toPromise();
  }

  protected showLoading(): void {
    if (this.loadingService.notLoading()) {
      this.loadingService.showSpinner(this.customLoadingOptions);
    }
  }

  protected async checkCredentialAvailability(showLoading: boolean = true): Promise<AndroidCredential<any>> {
    if (showLoading) {
      this.showLoading();
    }
    return await this.credentialSrvc
      .activePasses$()
      .pipe(
        first(),
        catchError(() => of(this.mCredential)),
        finalize(() => {
          if (showLoading) {
            this.loadingService.closeSpinner();
          }
        })
      )
      .toPromise();
  }

  onUiIconClicked(): void {}

  getCredential(): MobileCredential {
    return this.mCredential;
  }

  credentialAvailable$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }

  setCredential(mobileCredential: AndroidCredential<any>): void {
    this.mCredential = mobileCredential;
  }

  abstract credentialEnabled$(): Observable<boolean>;

  abstract onUiImageClicked(event?: any): void;
}
