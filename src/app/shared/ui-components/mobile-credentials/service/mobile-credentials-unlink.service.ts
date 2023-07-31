import { Injectable, inject } from '@angular/core';
import { MobileCredentialFacade } from './mobile-credential-facade.service';
import { firstValueFrom, map } from 'rxjs';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialsUnlinkService {
  private readonly mobileCredentialFacade: MobileCredentialFacade = inject(MobileCredentialFacade);
  private readonly mobileCredentialDataService: MobileCredentialDataService = inject(MobileCredentialDataService);

  get displayUnlinkButton$() {
    return this.mobileCredentialFacade
      .mobileCredentialEnabled$()
      .pipe(
        map(enabled => enabled && !!this.mobileCredentialFacade.credentialController?.getCredential()?.isProvisioned())
      );
  }

  unlinkCredentials() {
    return firstValueFrom(this.mobileCredentialDataService.unlinkCredentials$());
  }
}
