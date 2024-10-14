import { first, Observable, of } from 'rxjs';
import { AbstractAndroidCredentialManager } from '../abstract-android-credential.management';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController } from '@ionic/angular';
import { HidCredentialDataService } from '@shared/ui-components/mobile-credentials/service/hid-credential.data.service';
import { EndpointStatuses, MobileCredentialStatuses } from '../../shared/credential-state';
import { EndpointState } from '../android-credential.model';

export class HIDCredentialManager extends AbstractAndroidCredentialManager {
  constructor(
    protected readonly alertCtrl: AlertController,
    protected readonly loadingService: LoadingService,
    protected readonly credentialService: HidCredentialDataService
  ) {
    super(loadingService, credentialService, alertCtrl);
  }

  credentialEnabled$(): Observable<boolean> {
    return of(this.mCredential.isAvailable());
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onUiImageClicked(event?: any): void {
    throw new Error(`Method not implemented. ${event}`);
  }

  protected doCheckCredentialAvailability = async (): Promise<boolean> => {
    const credentialAvailable = await this.checkCredentialAvailability(false);
    if (credentialAvailable) {
      this.credentialService.deleteAllCachedEndpoint$();
    }
    return credentialAvailable;
  };

  protected setCredentialRevoked(): void {
    this.mCredential.setStatus(MobileCredentialStatuses.REVOKED);
    this.credentialService.updateCachedCredential$(EndpointStatuses.REVOKED);
  }

  protected async isEndpointRevoked(): Promise<boolean> {
    const savedEndpointState = await this.getLocalCachedEndpointState();
    const deviceEndpointStatus = await this.getDeviceEndpointState();
    return savedEndpointState.isRevoked() || (savedEndpointState.isProvisioned() && deviceEndpointStatus.isInactive());
  }

  protected updateCredentialOnServer$ = async (): Promise<boolean> => {
    return await this.credentialService.updateCredential$(this.mCredential).pipe(first()).toPromise();
  };

  protected async getLocalCachedEndpointState(anyUser?: boolean): Promise<EndpointState> {
    const endpointState = await this.credentialService.getEndpointStateFromLocalCache(anyUser);
    return endpointState || new EndpointState(EndpointStatuses.NOT_SETUP);
  }

  protected async getDeviceEndpointState(isGoogleWallet = false): Promise<EndpointState> {
    return new EndpointState(await this.hidSdkManager().endpointStatus(isGoogleWallet));
  }
}
