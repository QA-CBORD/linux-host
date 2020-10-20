import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { APIService } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable } from 'rxjs';
import { GOOGLE } from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';

const major_version = 1,
  minor_version = 0;
const resourceUrls = {
  credentialUrl: `/mf2go/cbord/${major_version}/${minor_version}/credential`,
  ping: `/mf2go/testing/${major_version}/${minor_version}/ping`,
};

@Injectable()
export class GooglePayCredentialDataService extends AndroidCredentialDataService {
  constructor(
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly contentStringFacade: ContentStringsFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly apiService: APIService
  ) {
    super(
      resourceUrls,
      storageStateService,
      authFacadeService,
      contentStringFacade,
      institutionFacadeService,
      apiService
    );
  }

  androidCredential$(reqBody: {
    referenceIdentifier: string;
    googlePayNonce: string;
    otherOptions?: object;
  }): Observable<GOOGLE> {
    return super.androidCredential$(reqBody);
  }


  

}
