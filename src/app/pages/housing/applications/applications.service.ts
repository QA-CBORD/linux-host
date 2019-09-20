import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { Application } from './applications.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private _http: HttpClient) {}

  applications: Application[] = [];

  getApplications(patronId: number, termId: number): Observable<Application[]> {
    // Call RC to get the list of application for this particular patron id
    const apiUrl = `${BASE_URL}/api/patrons/v.1.0/patron-applications/${patronId}/term/${termId}`;

    if (this.applications.length > 0) {
      return of(this.applications);
    }

    return this._http.get(apiUrl).pipe(
      map(response => [this._toModel(response)]),
      tap((applications: Application[]) => (this.applications = applications))
    );
  }

  getApplicationById(applicationId: number): Observable<Application> {
    const apiUrl = `${BASE_URL}/api/setup/v.1.0/applications/new/${applicationId}`;

    if (this.applications.length > 0) {
      // const result = this.retrievedApplications.filter(app => app.applicationDefinitionId == appId);
      // return result[0];
      const foundApplication: Application = this.applications.find(
        (application: Application) => application.applicationDefinitionId === applicationId
      );

      return of(foundApplication);
    }

    return this._http.get(apiUrl).pipe(map(response => this._toModel(response)));
  }

  private _toModel(appData: any): Application {
    const responseApplication: Application = appData.data[0];

    return new Application(
      responseApplication.applicationDefinitionId,
      responseApplication.createdDateTime,
      responseApplication.submittedDateTime,
      responseApplication.acceptedDateTime,
      responseApplication.cancelledDateTime,
      responseApplication.modifiedDate,
      responseApplication.patronId,
      responseApplication.isApplicationSubmitted,
      responseApplication.isApplicationAccepted,
      responseApplication.isApplicationCanceled,
      responseApplication.applicationTitle,
      responseApplication.applicationTerm
    );
  }
}
