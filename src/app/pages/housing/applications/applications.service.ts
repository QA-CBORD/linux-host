import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';

import { HousingAuthService } from '../housing-auth/housing-auth.service';
import { ApplicationsStateService } from './applications-state.service';

import { Response } from '../housing.model';
import { Application, ApplicationStatus } from './applications.model';
import {
  ApplicationQuestions,
  QuestionsStorageService,
  ApplicationQuestion,
} from '../questions/questions-storage.service';

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

  private readonly _termId: number = 67;

  private readonly _termStartDateTime: string = '2019-08-04 00:00:00.000';

  private readonly _termEndDateTime: string = '2019-12-27 23:59:59.000';

  getApplications(): Observable<Application[]> {
    const applications: Application[] = this._applicationsStateService.applications;

    if (applications.length > 0) {
      return of(applications);
    }

    return this._authService.authorize().pipe(
      switchMap((token: string) => this._requestApplications(token)),
      catchError(() => of([]))
    );
  }

  submitApplication(applicationId: number): void {
    this._applicationsStateService.setApplicationSubmitted(applicationId);
  }

  getApplicationById(applicationId: number): Observable<Application> {
    return this._applicationsStateService.getApplicationById(applicationId);
  }

  async getStoredApplications(applications: Application[]): Promise<Application[]> {
    const applicationQuestions: ApplicationQuestions = await this._questionsStorageService.getAllApplicationQuestions();

    if (!applicationQuestions) {
      return applications;
    }

    return applications.map((application: Application) => {
      const applicationQuestion: ApplicationQuestion = applicationQuestions[application.applicationDefinitionId];

      if (applicationQuestion) {
        const isSubmitted: boolean = applicationQuestion.status === ApplicationStatus.Submitted;
        const isPending: boolean = applicationQuestion.status === ApplicationStatus.Pending;

        return {
          ...application,
          isApplicationSubmitted: isSubmitted || application.isApplicationSubmitted,
          isApplicationAccepted: isPending || application.isApplicationAccepted,
        };
      }

      return application;
    });
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
        map((applications: Application[]) => applications.map(this._toApplication)),
        tap(async (applications: Application[]) => {
          const storedApplications: Application[] = await this.getStoredApplications(applications);

          this._applicationsStateService.setApplications(storedApplications);
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
