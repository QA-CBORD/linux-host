import { Injectable } from '@angular/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { APIService } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of } from 'rxjs';
import { GOOGLE, GoogleCredential } from '../model/android/android-credential.model';
import { AndroidCredentialDataService } from '../model/shared/android-credential-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const major_version = 1,
  minor_version = 0;
const resourceUrls = {
  credentialUrl: `/mf2go/cbord/${major_version}/${minor_version}/credential`,
  ping: `/mf2go/testing/${major_version}/${minor_version}/ping`,
};

const extraHeaders = {
  'x-api-key': 'uIBXQVw9ATQlkn1t0hk91xUvulJo9xS5PjRsU6lh',
};

@Injectable()
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
    return super.androidCredential$(reqBody, extraHeaders);
  }

  protected getDefaultHeaders(): Observable<HttpHeaders> {
    return of(extraHeaders).pipe(
      map(headers => {
        return new HttpHeaders({
          ...headers,
        });
      })
    );
  }

  updateCredential$(mCredential: GoogleCredential): Observable<any> {
    let requestBody = {
      referenceIdentifier: mCredential.getReferenceIdentifier(),
      status: mCredential.getCredStatus(),
      credentialID: mCredential.getId(),
    };

    return super.updateCredential$(requestBody);
  }
}
