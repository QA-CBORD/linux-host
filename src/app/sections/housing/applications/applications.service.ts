import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, switchMap, mergeMap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { HousingAuthService } from '../housing-auth/housing-auth.service';
import { ApplicationsStateService } from './applications-state.service';
import { QuestionGroups, QuestionsStorageService, QuestionsGroup } from '../questions/questions-storage.service';

import { Response, ResponseStatus } from '../housing.model';
import { Application, ApplicationRequest, ApplicationStatus } from './applications.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(
    private _http: HttpClient,
    private _authService: HousingAuthService,
    private _applicationsStateService: ApplicationsStateService,
    private _questionsStorageService: QuestionsStorageService
  ) {}

  private readonly _patronsUrl: string = 'api/patrons/v.1.0';

  private readonly _patronApplicationsUrl: string = `${this._patronsUrl}/patron-applications/self`;

  private readonly _termId: number = 67;

  private readonly _termStartDateTime: string = '2019-08-04 00:00:00.000';

  private readonly _termEndDateTime: string = '2019-12-27 23:59:59.000';

  getApplications(): Observable<Application[]> {
    const applications: Application[] = this._applicationsStateService.applications;

    if (applications.length > 0) {
      return this._applicationsStateService.applications$.pipe(
        mergeMap((applications: Application[]) => this.getStoredApplications(applications))
      );
    }

    return this._authService.authorize().pipe(
      switchMap((token: string) => this._requestApplications(token)),
      switchMap(() => this._applicationsStateService.applications$),
      mergeMap((applications: Application[]) => this.getStoredApplications(applications)),
      catchError(() => of([]))
    );
  }

  saveApplication(applicationId: number): Observable<ResponseStatus> {
    const body: ApplicationRequest = {
      patronApplicationKey: applicationId,
      submittedDateTime: new Date().toISOString(),
    };

    return this._updateApplication(body);
  }

  submitApplication(applicationId: number): Observable<ResponseStatus> {
    const body: ApplicationRequest = {
      patronApplicationKey: applicationId,
      submittedDateTime: new Date().toISOString(),
    };

    return this._updateApplication(body);
  }

  getApplicationById(applicationId: number): Observable<Application> {
    return this._applicationsStateService.getApplicationById(applicationId);
  }

  reloadApplications(): void {
    this._applicationsStateService.reloadApplications();
  }

  async clearApplication(applicationId: number): Promise<void> {
    await this._questionsStorageService.removeQuestionsGroup(applicationId);

    this.reloadApplications();
  }

  async getStoredApplications(applications: Application[]): Promise<Application[]> {
    const groups: QuestionGroups = await this._questionsStorageService.getQuestionGroups();

    if (!groups) {
      return applications;
    }

    return applications.map((application: Application) => {
      const group: QuestionsGroup = groups[application.applicationDefinitionId];

      if (group) {
        if (group.status === ApplicationStatus.Submitted) {
          return {
            ...application,
            isApplicationSubmitted: true,
            submittedDateTime: group.submittedDateTime.toString(),
            createdDateTime: group.creationDateTime.toString(),
          };
        } else if (group.status === ApplicationStatus.Pending) {
          return {
            ...application,
            isApplicationAccepted: true,
          };
        }
      }

      return application;
    });
  }

  private _updateApplication(body: any): Observable<ResponseStatus> {
    const apiUrl: string = `${BASE_URL}/${this._patronApplicationsUrl}`;

    return this._authService.authorize().pipe(
      switchMap((token: string) =>
        this._http.put<ResponseStatus>(apiUrl, body, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        })
      ),
      tap(() => this.reloadApplications())
    );
  }

  private _requestApplications(token: string): Observable<Application[]> {
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
        map((applications: any[]) => applications.map(this._toApplication)),
        tap((applications: Application[]) => {
          this._applicationsStateService.setApplications(applications);
        })
      );
  }

  private _toApplication(application: any): Application {
    return new Application(
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
