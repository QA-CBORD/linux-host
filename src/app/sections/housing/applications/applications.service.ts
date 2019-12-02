import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';
import { parseJsonToArray } from '../utils';

import { HousingAuthService } from '../housing-auth/housing-auth.service';
import { ApplicationsStateService } from './applications-state.service';
import { QuestionsService } from '../questions/questions.service';
import { QuestionsStorageService, QuestionsGroup } from '../questions/questions-storage.service';

import { Response, ResponseStatus } from '../housing.model';
import {
  ApplicationDetails,
  ApplicationRequest,
  PatronAttribute,
  PatronPreference,
  ApplicationStatus,
  PatronApplication,
} from './applications.model';
import { QuestionReorder, QuestionFormControl, QuestionReorderPreference } from '../questions/questions.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(
    private _http: HttpClient,
    private _authService: HousingAuthService,
    private _applicationsStateService: ApplicationsStateService,
    private _questionsService: QuestionsService,
    private _questionsStorageService: QuestionsStorageService
  ) {}

  private readonly _patronApplicationsUrl: string = `${BASE_URL}/api/patron-applications/v.1.0/patron-applications`;

  private readonly _applicationDefinitionUrl: string = `${this._patronApplicationsUrl}/application-definition`;

  private readonly _termId: number = 67;

  getApplications(): Observable<ApplicationDetails[]> {
    const apiUrl: string = `${this._patronApplicationsUrl}/term/${this._termId}/patron/self`;

    return this._getRequest<ApplicationDetails[]>(apiUrl).pipe(
      map((applications: any[]) => applications.map(this._toApplicationDetails)),
      tap((applications: ApplicationDetails[]) => this._applicationsStateService.setApplications(applications))
    );
  }

  getApplicationDetails(applicationId: number): Observable<ApplicationDetails> {
    const apiUrl: string = `${this._applicationDefinitionUrl}/${applicationId}/patron/self`;

    return this._getRequest<ApplicationDetails>(apiUrl).pipe(
      map((application: any) => this._toApplicationDetails(application)),
      tap((application: ApplicationDetails) => this._applicationsStateService.setApplicationDetails(application)),
      tap((application: ApplicationDetails) => this._questionsService.parsePages(application))
    );
  }

  submitApplication(application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    const nowDateTime: string = new Date().toISOString();

    return forkJoin(
      this._questionsStorageService.updateSubmittedDateTime(application.applicationDefinition.key, nowDateTime),
      this.updateCreatedDateTime(application.applicationDefinition.key, application.patronApplication)
    ).pipe(switchMap(() => this._updateApplication(application, form, ApplicationStatus.Submitted)));
  }

  saveApplication(application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    const applicationId: number = application.applicationDefinition.key;
    const patronApplication: PatronApplication = application.patronApplication;

    return from(this.updateCreatedDateTime(applicationId, patronApplication)).pipe(
      switchMap(() => this._updateApplication(application, form, ApplicationStatus.Pending))
    );
  }

  clearApplication(applicationId: number): void {
    this._questionsStorageService.removeQuestionsGroup(applicationId);
  }

  async updateCreatedDateTime(applicationId: number, patronApplication: PatronApplication): Promise<any> {
    return this._questionsStorageService.getCreatedDateTime(applicationId).then((createdDateTime: string) => {
      let dateTime: string;

      if (patronApplication && patronApplication.key && patronApplication.createdDateTime) {
        dateTime = patronApplication.createdDateTime;
      } else if (createdDateTime) {
        dateTime = createdDateTime;
      } else {
        dateTime = new Date().toISOString();
      }

      return this._questionsStorageService.updateCreatedDateTime(applicationId, dateTime);
    });
  }

  private _request<T>(
    apiUrl: string,
    callback: (headers: HttpHeaders, apiUrl: string) => Observable<T>
  ): Observable<T> {
    return this._authService.authorize().pipe(
      switchMap((token: string) => {
        const headers: HttpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return callback(headers, apiUrl);
      })
    );
  }

  private _getRequest<T>(apiUrl: string): Observable<T> {
    return this._request<T>(apiUrl, (headers, apiUrl) =>
      this._http
        .get(apiUrl, {
          headers,
        })
        .pipe(map((response: Response) => response.data))
    );
  }

  private _putRequest(apiUrl: string, body: any): Observable<ResponseStatus> {
    return this._request<ResponseStatus>(apiUrl, (headers, apiUrl) =>
      this._http.put<ResponseStatus>(apiUrl, body, {
        headers,
      })
    );
  }

  private _updateApplication(
    application: ApplicationDetails,
    form: any,
    status: ApplicationStatus
  ): Observable<ResponseStatus> {
    const apiUrl: string = `${this._patronApplicationsUrl}`;

    return from(
      this._questionsStorageService.updateQuestionsGroup(application.applicationDefinition.key, form, status)
    ).pipe(
      switchMap((group: QuestionsGroup) => {
        const json: string = application.applicationDefinition.applicationFormJson;
        const attributes: PatronAttribute[] = this._getAttributes(application.patronAttributes, json, group.questions);
        const preferences: PatronPreference[] = this._getPreferences(
          application.patronPreferences,
          json,
          group.questions
        );
        const patronApplication: PatronApplication = new PatronApplication(
          application.applicationDefinition.key,
          status
        );
        const patronAttributes: PatronAttribute[] = attributes && attributes.length > 0 ? attributes : null;
        const patronPreferences: PatronPreference[] = preferences && preferences.length > 0 ? preferences : null;
        const body: ApplicationRequest = new ApplicationRequest(patronApplication, patronAttributes, patronPreferences);

        return this._putRequest(apiUrl, body);
      })
    );
  }

  private _getAttributes(patronAttributes: PatronAttribute[], json: string, questions: any[]): PatronAttribute[] {
    return parseJsonToArray(json)
      .filter((control: QuestionFormControl) => control.consumerKey)
      .map((control: QuestionFormControl) => {
        const foundAttribute: PatronAttribute = patronAttributes
          ? patronAttributes.find(
              (attribute: PatronAttribute) => attribute.attributeConsumerKey === control.consumerKey
            )
          : null;
        const key: number = foundAttribute ? foundAttribute.key : null;
        const foundQuestion: any = questions[control.name];
        const value: any = foundQuestion || null;

        return new PatronAttribute(control.consumerKey, value, key);
      });
  }

  private _getPreferences(patronPreferences: PatronPreference[], json: string, questions: any[]): PatronPreference[] {
    return parseJsonToArray(json)
      .filter((control: QuestionReorder) => control.facilityPicker)
      .map((control: QuestionReorder) => {
        const foundQuestion: any = questions[control.name];
        const facilities: any[] = foundQuestion ? foundQuestion.slice(0, control.prefRank) : [];

        return facilities.map((facility: any, index: number) => {
          const rank: number = index + 1;
          const foundFacilityPreference: QuestionReorderPreference = control.PrefKeys.find(
            (preference: QuestionReorderPreference) => preference.defaultRank === rank
          );
          const preferenceKey: number = foundFacilityPreference ? foundFacilityPreference.preferenceKey : null;
          const foundPreference: PatronPreference = patronPreferences.find(
            (preference: PatronPreference) => preference.preferenceKey === preferenceKey
          );
          const key: number = foundPreference ? foundPreference.key : null;

          return new PatronPreference(key, preferenceKey, rank, facility.facilityKey);
        });
      })
      .reduce((accumulator: any[], current: any) => accumulator.concat(current), []);
  }

  private _toPatronAttribute(attribute: any): PatronAttribute {
    return new PatronAttribute(attribute.attributeConsumerKey, attribute.value, attribute.key);
  }

  private _toPatronPreference(preference: any): PatronPreference {
    return new PatronPreference(preference.key, preference.preferenceKey, preference.rank, preference.facilityKey);
  }

  private _toApplicationDetails(application: any): ApplicationDetails {
    const patronAttributes: PatronAttribute[] = Array.isArray(application.patronAttributes)
      ? application.patronAttributes.map(this._toPatronAttribute)
      : [];
    const patronPreferences: PatronPreference[] = Array.isArray(application.patronPreferences)
      ? application.patronPreferences.map(this._toPatronPreference)
      : [];

    return new ApplicationDetails(
      application.applicationDefinition,
      application.patronApplication,
      patronAttributes,
      patronPreferences
    );
  }
}
