import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { HousingAuthService } from '../housing-auth/housing-auth.service';
import { ApplicationsStateService } from './applications-state.service';

import { generatePatronApplications } from './applications.mock';

import { Response } from '../housing.model';
import { PatronApplication } from './applications.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(
    private _http: HttpClient,
    private _authService: HousingAuthService,
    private _applicationsStateService: ApplicationsStateService
  ) {}

  private readonly _setupUrl: string = 'api/setup/v.1.0';

  private readonly _patronsUrl: string = 'api/patrons/v.1.0';

  private readonly _termId: number = 102;

  private readonly _termStartDateTime: string = '2018-05-31 00:00:00.000';

  private readonly _termEndDateTime: string = '2018-08-01 23:59:59.000';

  getPatronApplications(): Observable<PatronApplication[]> {
    const patronApplications: PatronApplication[] = this._applicationsStateService.patronApplications;

    if (patronApplications.length > 0) {
      return of(patronApplications);
    }

    return this._authService.authorize().pipe(
      switchMap((token: string) => this._requestPatronApplications(token)),
      tap((applications: PatronApplication[]) => this._applicationsStateService.setPatronApplications(applications)),
      catchError(() => {
        // TODO: Remove this catchError when backend is ready.
        const applications: PatronApplication[] = generatePatronApplications();

        this._applicationsStateService.setPatronApplications(applications);

        return of(applications);
      })
    );
  }

  submitPatronApplication(applicationId: number): void {
    this._applicationsStateService.setPatronApplicationSubmitted(applicationId);
  }

  private _requestPatronApplications(token: string): Observable<PatronApplication[]> {
    const apiUrl: string = `${BASE_URL}/${this._patronsUrl}/patron-applications/self/term/${this._termId}`;
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const params: HttpParams = new HttpParams()
      .append('termStartDatetime', this._termStartDateTime)
      .append('termEndDateTime', this._termEndDateTime);

    return this._http
      .get(apiUrl, {
        headers,
        params,
      })
      .pipe(
        map((response: Response) => response.data),
        map((applications: PatronApplication[]) => applications.map(this._toPatronApplication)),
        tap((applications: PatronApplication[]) => this._applicationsStateService.setPatronApplications(applications))
      );
  }

  getPatronApplicationById(applicationId): Observable<PatronApplication> {
    return this._applicationsStateService.getPatronApplicationById(applicationId);
  }

  private _toPatronApplication(application: any): PatronApplication {
    return new PatronApplication(
      application.applicationDefinitionId,
      application.createdDateTime,
      application.submittedDateTime,
      application.acceptedDateTime,
      application.cancelledDateTime,
      application.modifiedDate,
      application.patronId,
      application.isApplicationSubmitted,
      application.isApplicationAccepted,
      application.isApplicationCanceled,
      application.applicationTitle,
      application.applicationTerm,
      application.applicationFormJson
    );
  }
}
