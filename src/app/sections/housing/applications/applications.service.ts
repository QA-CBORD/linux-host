import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';
import { parseJsonToArray } from '../utils';

import { HousingProxyService } from '../housing-proxy.service';
import { ApplicationsStateService } from './applications-state.service';
import { QuestionsService } from '../questions/questions.service';
import { QuestionsStorageService, StoredApplication, QuestionsEntries } from '../questions/questions-storage.service';

import { ResponseStatus } from '../housing.model';
import {
  ApplicationDetails,
  ApplicationRequest,
  PatronAttribute,
  PatronPreference,
  ApplicationStatus,
  PatronApplication,
  ApplicationDefinition,
} from './applications.model';
import { QuestionReorder, QuestionFormControl, QuestionReorderPreference } from '../questions/questions.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(
    private _housingProxyService: HousingProxyService,
    private _applicationsStateService: ApplicationsStateService,
    private _questionsService: QuestionsService,
    private _questionsStorageService: QuestionsStorageService
  ) {}

  private readonly _patronApplicationsUrl: string = `${BASE_URL}/api/patron-applications/v.1.0/patron-applications`;

  private readonly _applicationDefinitionUrl: string = `${this._patronApplicationsUrl}/application-definition`;

  private readonly _termId: number = 67;

  getApplications(): Observable<ApplicationDetails[]> {
    const apiUrl: string = `${this._patronApplicationsUrl}/term/${this._termId}/patron/self`;

    return this._housingProxyService.get<ApplicationDetails[]>(apiUrl).pipe(
      map((applications: any[]) => applications.map(this._toApplicationDetails.bind(this))),
      tap((applications: ApplicationDetails[]) => this._applicationsStateService.setApplications(applications))
    );
  }

  getApplicationDetails(applicationKey: number): Observable<ApplicationDetails> {
    const apiUrl: string = `${this._applicationDefinitionUrl}/${applicationKey}/patron/self`;

    return this._housingProxyService.get<ApplicationDetails>(apiUrl).pipe(
      map((application: any) => this._toApplicationDetails(application)),
      tap((application: ApplicationDetails) => {
        this._applicationsStateService.setApplicationDetails(application);
        this._questionsService.parsePages(application);
      })
    );
  }

  submitApplication(application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    const applicationKey: number = application.applicationDefinition.key;

    return from(this.getCreatedDateTime(applicationKey, application.patronApplication)).pipe(
      switchMap((createdDateTime: string) => {
        const submittedDateTime: string = new Date().toISOString();
        const patronApplication: PatronApplication = {
          ...application.patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
          submittedDateTime,
        };
        const applicationDetails: ApplicationDetails = { ...application, patronApplication };

        return forkJoin(
          this._questionsStorageService.updateCreatedDateTime(applicationKey, createdDateTime),
          this._questionsStorageService.updateSubmittedDateTime(applicationKey, submittedDateTime)
        ).pipe(
          switchMap(() => this._updateApplication(applicationDetails, form, ApplicationStatus.Submitted)),
          tap(() => {
            this._applicationsStateService.updateApplication(applicationKey, applicationDetails);
          })
        );
      })
    );
  }

  saveApplication(application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    const applicationKey: number = application.applicationDefinition.key;

    return from(this.getCreatedDateTime(applicationKey, application.patronApplication)).pipe(
      switchMap((createdDateTime: string) => {
        const patronApplication: PatronApplication = {
          ...application.patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
        };
        const applicationDetails: ApplicationDetails = { ...application, patronApplication };

        return from(this._questionsStorageService.updateCreatedDateTime(applicationKey, createdDateTime)).pipe(
          switchMap(() => this._updateApplication(applicationDetails, form, ApplicationStatus.Pending)),
          tap(() => {
            this._applicationsStateService.updateApplication(applicationKey, applicationDetails);
          })
        );
      })
    );
  }

  clearApplication(applicationKey: number): void {
    this._questionsStorageService.removeApplication(applicationKey);
  }

  async getCreatedDateTime(applicationKey: number, patronApplication: PatronApplication): Promise<string> {
    if (patronApplication && patronApplication.createdDateTime) {
      return Promise.resolve(patronApplication.createdDateTime);
    }

    return this._questionsStorageService.getCreatedDateTime(applicationKey).then((createdDateTime: string) => {
      if (createdDateTime) {
        return createdDateTime;
      }

      return new Date().toISOString();
    });
  }

  async updateCreatedDateTime(applicationKey: number, createdDateTime: string): Promise<any> {
    return this._questionsStorageService.updateCreatedDateTime(applicationKey, createdDateTime);
  }

  private _updateApplication(
    application: ApplicationDetails,
    form: any,
    status: ApplicationStatus
  ): Observable<ResponseStatus> {
    const apiUrl: string = `${this._patronApplicationsUrl}`;
    const applicationDefinition: ApplicationDefinition = application.applicationDefinition;
    const applicationKey: number = application.applicationDefinition.key;

    return from(this._questionsStorageService.updateQuestions(applicationKey, form, status)).pipe(
      switchMap((storedApplication: StoredApplication) => {
        const parsedJson: any[] = parseJsonToArray(applicationDefinition.applicationFormJson);
        const questions = storedApplication.questions;
        const attributes: PatronAttribute[] = this._getAttributes(application.patronAttributes, parsedJson, questions);
        const preferences: PatronPreference[] = this._getPreferences(
          application.patronPreferences,
          parsedJson,
          questions
        );
        const updatedPatronApplication: PatronApplication = { ...application.patronApplication, status };
        const body: ApplicationRequest = new ApplicationRequest(updatedPatronApplication, attributes, preferences);

        return this._housingProxyService.put(apiUrl, body);
      })
    );
  }

  private _getAttributes(
    patronAttributes: PatronAttribute[],
    parsedJson: any[],
    questions: QuestionsEntries
  ): PatronAttribute[] {
    const resultAttributes: PatronAttribute[] = patronAttributes ? [...patronAttributes] : [];

    parsedJson
      .filter((control: QuestionFormControl) => control && control.consumerKey)
      .forEach((control: QuestionFormControl) => {
        const foundAttributeIndex: number = patronAttributes.findIndex(
          (attribute: PatronAttribute) => attribute.attributeConsumerKey === control.consumerKey
        );

        if (foundAttributeIndex !== -1) {
          const foundAttribute: PatronAttribute = patronAttributes[foundAttributeIndex];
          const key: number = foundAttribute.key;
          const foundQuestion: any = questions[control.name];
          const value: any = foundQuestion || foundAttribute.value;

          resultAttributes[foundAttributeIndex] = new PatronAttribute(
            control.consumerKey,
            value,
            key,
            foundAttribute.patronKey,
            foundAttribute.effectiveDate,
            foundAttribute.endDate
          );
        } else {
          const foundQuestion: any = questions[control.name];
          const value: any = foundQuestion || null;

          resultAttributes.push(new PatronAttribute(control.consumerKey, value, null));
        }
      });

    return resultAttributes;
  }

  private _getPreferences(
    patronPreferences: PatronPreference[],
    parsedJson: any[],
    questions: QuestionsEntries
  ): PatronPreference[] {
    return parsedJson
      .filter((control: QuestionReorder) => control && control.facilityPicker)
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

  private _toPatronAttributes(attributes: any[]): PatronAttribute[] {
    return Array.isArray(attributes) ? attributes.map(this._toPatronAttribute) : [];
  }

  private _toPatronAttribute(attribute: PatronAttribute): PatronAttribute {
    return new PatronAttribute(
      attribute.attributeConsumerKey,
      attribute.value,
      attribute.key,
      attribute.patronKey,
      attribute.effectiveDate,
      attribute.endDate
    );
  }

  private _toPatronPreferences(preferences: any[]): PatronPreference[] {
    return Array.isArray(preferences) ? preferences.map(this._toPatronPreference) : [];
  }

  private _toPatronPreference(preference: any): PatronPreference {
    return new PatronPreference(preference.key, preference.preferenceKey, preference.rank, preference.facilityKey);
  }

  private _toApplicationDetails(application: ApplicationDetails): ApplicationDetails {
    const patronAttributes: PatronAttribute[] = this._toPatronAttributes(application.patronAttributes);
    const patronPreferences: PatronPreference[] = this._toPatronPreferences(application.patronPreferences);

    return new ApplicationDetails(
      application.applicationDefinition,
      application.patronApplication,
      patronAttributes,
      patronPreferences
    );
  }
}
