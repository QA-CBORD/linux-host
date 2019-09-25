import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { generateApplications } from './applications.mock';

import { Response } from '../housing.model';
import { Application } from './applications.model';

const headers: HttpHeaders = new HttpHeaders({
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0aXR1dGlvbl9pZCI6IjAiLCJ0b2tlbl92ZXJzaW9uIjoiMS4wIiwiaWRfdmFsdWUiOiI2NjY0NDQxOTgiLCJ0ZW1wX3BhdHJvbl9zayI6IjExNTYyIiwiaWRfZmllbGQiOiJob3VzaW5nX2lkIiwicm9sZSI6InBhdHJvbiIsIm5iZiI6MTU2OTI0OTkzNiwiZXhwIjoxNTY5MzM2MzM2LCJpYXQiOjE1NjkyNDk5MzZ9.Bcb_Myf8xvUvPggZI0OEDJMqSTY6w9dxbzm_BV6Up18',
});

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private _http: HttpClient) {}

  private readonly _setupUrl: string = 'api/setup/v.1.0';

  private readonly _patronsUrl: string = 'api/patrons/v.1.0';

  applications: Application[] = [];

  getApplications(): Observable<Application[]> {
    const apiUrl = `${BASE_URL}/${this._setupUrl}/applications/new`;

    if (this.applications.length > 0) {
      return of(this.applications);
    }

    return this._http
      .get(apiUrl, {
        headers,
      })
      .pipe(
        map((response: Response) => response.data),
        map((applications: Application[]) => applications.map(this._toModel)),
        tap((applications: Application[]) => (this.applications = applications)),
        catchError(() => {
          // TODO: Remove this catchError when backend is ready.
          const applications: Application[] = generateApplications();

          this.applications = applications

          return of(applications)
        }),
      );
  }

  getApplicationsByPatronId(patronId: number, termId: number): Observable<Application[]> {
    const apiUrl = `${BASE_URL}/${this._patronsUrl}/patron-applications/${patronId}/term/${termId}`;

    if (this.applications.length > 0) {
      return of(this.applications);
    }

    return this._http.get(apiUrl).pipe(
      map((response: Response) => response.data),
      map((applications: Application[]) => applications.map(this._toModel)),
      tap((applications: Application[]) => (this.applications = applications))
    );
  }

  getApplicationById(applicationId: number): Observable<Application> {
    const apiUrl = `${BASE_URL}/${this._setupUrl}/applications/new/${applicationId}`;

    if (this.applications.length > 0) {
      const foundApplication: Application = this.applications.find(
        (application: Application) => application.id === applicationId
      );

      return of(foundApplication);
    }

    return this._http.get(apiUrl).pipe(
      map((response: Response) => response.data),
      map((application: Application) => this._toModel(application)),
      catchError(() => {
        // TODO: Remove this catchError when backend is ready.
        const applications: Application[] = generateApplications();

        this.applications = applications

        return of(applications[0])
      }),
    );
  }

  private _toModel(application: any): Application {
    return new Application(
      application.applicationAttributes,
      application.applicationAvailableEndDateTime,
      application.applicationAvailableStartDateTime,
      application.applicationDescription,
      application.applicationFormJson,
      application.applicationTitle,
      application.applicationTypeId,
      application.cancellationDateTime,
      application.expirationDateTime,
      application.id,
      application.numberOfDaysToExpire,
      application.termId
    );
  }
}
