import { Injectable, inject } from '@angular/core';
import { MobileCredentialFacade } from './mobile-credential-facade.service';
import { Subject, firstValueFrom, map, tap } from 'rxjs';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialsUnlinkService {
  private readonly mobileCredentialFacade: MobileCredentialFacade = inject(MobileCredentialFacade);
  private readonly mobileCredentialDataService: MobileCredentialDataService = inject(MobileCredentialDataService);

  private readonly unlinkCredentialsSubject = new Subject<boolean>();
  public readonly unlinkCredentialsRequested$ = this.unlinkCredentialsSubject.asObservable();

  get displayUnlinkButton$() {
    return this.mobileCredentialFacade
      .mobileCredentialEnabled$()
      .pipe(
        map(enabled => enabled && !!this.mobileCredentialFacade.credentialController?.getCredential()?.isProvisioned())
      );
  }

  unlinkCredentials() {
    return firstValueFrom(
      this.mobileCredentialDataService
        .unlinkCredentials$()
        .pipe(tap(unlinked => {
          this.mobileCredentialFacade.refreshCredentials();
          this.unlinkCredentialsSubject.next(unlinked);
        }))
    );
  }
}
