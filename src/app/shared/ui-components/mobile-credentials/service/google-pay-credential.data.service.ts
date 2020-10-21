import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { APIService } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable } from 'rxjs';
import { GOOGLE, GoogleCredential } from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { HttpClient } from '@angular/common/http';

const major_version = 1,
  minor_version = 0;
const resourceUrls = {
  credentialUrl: `/mf2go/cbord/${major_version}/${minor_version}/credential`,
  ping: `/mf2go/testing/${major_version}/${minor_version}/ping`,
};

@Injectable({
  providedIn: 'root'
})
export class GooglePayCredentialDataService extends AndroidCredentialDataService {
  constructor(
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly apiService: APIService,
    protected readonly http: HttpClient
  ) {
    super(
      resourceUrls,
      storageStateService,
      authFacadeService,
      contentStringFacade,
      institutionFacadeService,
      apiService,
      http
    );
  }

  androidCredential$(reqBody: {
    referenceIdentifier: string;
    googlePayNonce: string;
    otherOptions?: object;
  }): Observable<GOOGLE> {
    return super.androidCredential$(reqBody);
  }


  updateCredential$(mCredential: GoogleCredential):Observable<any>{
    let requestBody = {
      referenceIdentifier: mCredential.getCredentialState().referenceIdentifier,
      status: mCredential.getCredentialState().credStatus,
      credentialID: mCredential.getCredentialData<any>().id,
    };
   return super.updateCredential$(requestBody)
  }

}
