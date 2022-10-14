import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { APIService } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of } from 'rxjs';
import {
  EndpointState,
  GoogleCredential,
  GooglePayCredentialBundle,
} from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { Platform } from '@ionic/angular';

const major_version = 1,
  minor_version = 0;
const resourceUrls = {
  credentialUrl: `/mf2go/cbord/${major_version}/${minor_version}/credential`,
  ping: `/mf2go/testing/${major_version}/${minor_version}/ping`,
};

@Injectable({ providedIn: 'root' })
export class GooglePayCredentialDataService extends AndroidCredentialDataService {
  private mCredential_key = 'nxp_credential';
  constructor(
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly apiService: APIService,
    protected readonly http: HttpClient,
    protected readonly userFacade: UserFacadeService,
    protected readonly platform: Platform
  ) {
    super(
      resourceUrls,
      storageStateService,
      authFacadeService,
      contentStringFacade,
      institutionFacadeService,
      apiService,
      http,
      userFacade,
      platform
    );
  }

  androidCredentialBundle$(reqBody): Observable<GooglePayCredentialBundle> {
    return super.androidCredentialBundle$(reqBody).pipe(map(bundle => bundle as GooglePayCredentialBundle));
  }

  updateCredential$(mCredential: GoogleCredential): Observable<any> {
    return this.getUserId().pipe(
      switchMap(userId => {
        const { id } = mCredential.credentialBundle;
        const { credStatus } = mCredential.credentialState;
        const endpointState = new EndpointState(credStatus, id, userId);
        mCredential.setEndpointState(endpointState);
        return of(
          this.storageStateService.updateStateEntity(this.mCredential_key, endpointState, {
            highPriorityKey: true,
            keepOnLogout: true,
          })
        );
      })
    );
  }
}
