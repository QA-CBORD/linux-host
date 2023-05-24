import { Injectable } from '@angular/core';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { UserLogin } from '@core/model/user';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of, iif, from, zip } from 'rxjs';
import { Device } from '@capacitor/device';
import { BarcodeService } from '@core/service/barcode/barcode.service';
import { UserFacadeService } from '../user/user.facade.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService extends ServiceStateFacade {
  private sessionIdKey = 'get_sessionId';
  private isGuestUserKey = 'isGuestUser';

  private systemSessionId = null;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly storageStateService: StorageStateService,
    private readonly pingEncoderService: BarcodeService,
    private readonly userFacadeService: UserFacadeService
  ) {
    super();
  }

  getAuthSessionToken$(): Observable<string> {
    return iif(() => this.systemSessionId === null, this.authenticateSystem$(), of(this.systemSessionId));
  }

  get cachedAuthSessionToken$(): Observable<string | null> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.sessionIdKey)
      .pipe(map(data => (data ? data.value : null)));
  }

  setIsGuestUser(asGuest: boolean) {
    this.storageStateService.updateStateEntity(this.isGuestUserKey, asGuest, { highPriorityKey: true });
  }

  isGuestUser(): Observable<boolean> {
    return this.storageStateService.getStateEntityByKey$<boolean>(this.isGuestUserKey).pipe(
      map(data => (data && !!data.value) || false),
      catchError(() => of(false)),
      take(1)
    );
  }

  set cachedAuthSessionToken(sessionId: string) {
    this.storageStateService.updateStateEntity(this.sessionIdKey, sessionId, { highPriorityKey: true });
  }

  authenticateUser$(userCredentials: UserLogin): Observable<string> {
    return this.isGuestUser().pipe(
      switchMap(isGuestUser => {
        return this.authApiService.authenticateUser(userCredentials, isGuestUser).pipe(
          switchMap(sessionId => {
            // retrieve user and confirm is guest or patron.
            this.storageStateService.updateStateEntity(this.sessionIdKey, sessionId, { highPriorityKey: true });
            return this.userFacadeService.getUser$().pipe(
              take(1),
              map(({ guestUser }) => {
                this.setIsGuestUser(guestUser);
                return sessionId;
              })
            );
          })
        );
      })
    );
  }

  authenticatePinTotp$(pin: string): Observable<boolean> {
    return this.pingEncoderService.encodePin(pin).pipe(switchMap(encrytedPin => this.authenticatePin$(encrytedPin)));
  }

  authenticatePin$(rawPin: string): Observable<boolean> {
    return zip(from(Device.getId())).pipe(
      switchMap(([{ identifier }]) => this.authApiService.authenticatePin(rawPin, identifier)),
      tap(res => this.storageStateService.updateStateEntity(this.sessionIdKey, res, { highPriorityKey: true })),
      map(res => !!res)
    );
  }

  authenticateSessionToken$(sessionToken: string): Observable<string> {
    return this.authApiService.authenticateSessionToken(sessionToken);
  }

  authenticateSystem$(): Observable<string> {
    return this.authApiService.authenticateSystem().pipe(tap(res => (this.systemSessionId = res)));
  }

  getAuthenticationToken$(): Observable<string> {
    return this.authApiService.getAuthenticationToken();
  }

  getExternalAuthenticationToken$(externalSystem: string = null): Observable<string> {
    return this.authApiService.getExternalAuthenticationToken(externalSystem);
  }

  retrieveAuthorizationBlob(deviceModel: string, deviceOSVersion: string) {
    return this.authApiService.retrieveAuthorizationBlob(deviceModel, deviceOSVersion);
  }
}
