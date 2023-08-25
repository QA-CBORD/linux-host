import { Injectable, inject } from '@angular/core';
import { MobileCredentialFacade } from './mobile-credential-facade.service';
import { Subject, catchError, delay, firstValueFrom, map, of, switchMap, tap } from 'rxjs';
import { MobileCredentialDataService } from '../model/shared/mobile-credential-data.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from 'src/app/app.global';

const UNLINK_REFRESH_DELAY = 3000;

@Injectable({
  providedIn: 'root',
})
export class MobileCredentialsUnlinkService {
  private readonly mobileCredentialFacade: MobileCredentialFacade = inject(MobileCredentialFacade);
  private readonly mobileCredentialDataService: MobileCredentialDataService = inject(MobileCredentialDataService);
  private readonly settingsFacadeService: SettingsFacadeService = inject(SettingsFacadeService);

  private readonly unlinkCredentialsSubject = new Subject<boolean>();
  public readonly unlinkCredentialsRequested$ = this.unlinkCredentialsSubject.asObservable();

  get displayUnlinkButton$() {
    return this.mobileCredentialFacade
      .mobileCredentialEnabled$()
      .pipe(
        map(enabled => enabled && !!this.mobileCredentialFacade.credentialController?.getCredential()?.isProvisioned())
      );
  }

  unlinkCredentials(): Promise<boolean> {
    return firstValueFrom(
      this.settingsFacadeService.getSetting(Settings.Setting.CREDENTIALS_UNLINK_API_KEY).pipe(
        switchMap(({ value: apiKey }) => this.mobileCredentialDataService.unlinkCredentials$(apiKey)),
        tap(unlinked => {
          this.mobileCredentialFacade.refreshCredentials();
          this.unlinkCredentialsSubject.next(unlinked);
        }),
        // Give some time for the Cashless system async call to complete
        delay(UNLINK_REFRESH_DELAY),
        catchError(() => {
          this.unlinkCredentialsSubject.next(false);
          return of(false);
        })
      )
    );
  }
}
