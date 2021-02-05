import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Institution } from '@core/model/institution/institution.model';
import { InstitutionApiService } from '@core/service/institution-api/institution-api.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { InstitutionPhotoInfo } from '@core/model/institution/institution-photo-info.model';
import { SettingsFacadeService } from '../settings/settings-facade.service';
import { Settings } from 'src/app/app.global';
import { AuthFacadeService } from '../auth/auth.facade.service';

@Injectable({
  providedIn: 'root',
})
export class InstitutionFacadeService extends ServiceStateFacade {
  private institutionKey = 'get_institution';
  private institutionPhotoKey = 'get_institutionPhotoKey';

  constructor(
    private readonly storageStateService: StorageStateService,
    private readonly institutionApiService: InstitutionApiService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly authFacadeService: AuthFacadeService
  ) {
    super();
  }

  getInstitutionInfo$(institutionId: string, sessionId?: string, useSessionId?: boolean): Observable<Institution> {
    return this.storageStateService.getStateEntityByKey$<Institution>(this.institutionKey).pipe(
      switchMap(data =>
        data !== null ? of(data.value) : this.getInstitutionDataById$(institutionId, sessionId, useSessionId)
      ),
      take(1)
    );
  }

  get cachedInstitutionInfo$(): Observable<Institution | null> {
    return this.storageStateService
      .getStateEntityByKey$<Institution>(this.institutionKey)
      .pipe(map(data => (data !== null ? data.value : null)));
  }

  get cachedInstitutionPhoto$(): Observable<InstitutionPhotoInfo | null> {
    return this.storageStateService
      .getStateEntityByKey$<InstitutionPhotoInfo>(this.institutionPhotoKey)
      .pipe(map(data => (data !== null ? data.value : null)));
  }

  guestRegistrationEnabled(institutionId): Promise<boolean> {
    const sessionId$ = this.authFacadeService.getAuthSessionToken$().pipe(take(1));
    return sessionId$
      .pipe(
        switchMap(sessionId => {
          return this.settingsFacadeService.getIsGuestRegAllowed(sessionId, institutionId).pipe(
            take(1),
            map(({ value }) => true),
            catchError(err => {
              return of(true);
            })
          );
        })
      )
      .toPromise();
  }

  getInstitutionPhoto$(
    institutionId: string,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<InstitutionPhotoInfo> {
    return this.storageStateService.getStateEntityByKey$<InstitutionPhotoInfo>(this.institutionPhotoKey).pipe(
      switchMap(data =>
        data !== null ? of(data.value) : this.getInstitutionPhotoById$(institutionId, sessionId, useSessionId)
      ),
      take(1)
    );
  }

  fetchInstitutionData(): Observable<Institution> {
    return this.institutionApiService
      .getInstitutionData()
      .pipe(
        tap(res => this.storageStateService.updateStateEntity(this.institutionKey, res, { highPriorityKey: true }))
      );
  }

  getInstitutionDataById$(institutionId: string, sessionId?: string, useSessionId?: boolean): Observable<Institution> {
    return this.institutionApiService
      .getInstitutionDataById(institutionId, sessionId, useSessionId)
      .pipe(
        tap(res => this.storageStateService.updateStateEntity(this.institutionKey, res, { highPriorityKey: true }))
      );
  }

  getInstitutionPhotoById$(
    institutionId: string,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<InstitutionPhotoInfo> {
    return this.institutionApiService.getInstitutionPhotoById(institutionId, sessionId, useSessionId).pipe(
      tap(photoInfo => {
        this.storageStateService.updateStateEntity(this.institutionPhotoKey, photoInfo, { highPriorityKey: true });
      })
    );
  }

  retrieveLookupList$(systemSessionId): Observable<any> {
    return this.institutionApiService.retrieveLookupList(systemSessionId);
  }

  getlastChangedTerms$(): Observable<Date> {
    return this.cachedInstitutionInfo$.pipe(
      map(({ lastChangedTerms }) => lastChangedTerms),
      take(1)
    );
  }
}
