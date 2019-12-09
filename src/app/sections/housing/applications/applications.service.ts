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
      map((applications: any[]) =>
        Array.isArray(applications) ? applications.map((application: any) => new ApplicationDetails(application)) : []
      ),
      tap((applications: ApplicationDetails[]) => this._applicationsStateService.setApplications(applications))
    );
  }

  getApplicationDetails(applicationKey: number): Observable<ApplicationDetails> {
    const apiUrl: string = `${this._applicationDefinitionUrl}/${applicationKey}/patron/self`;

    return this._housingProxyService.get<ApplicationDetails>(apiUrl).pipe(
      map((application: any) => new ApplicationDetails(application)),
      tap((application: ApplicationDetails) => {
        this._questionsService.setPages(application);
      })
    );
  }

  submitApplication(applicationKey: number, application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    return forkJoin(
      this._questionsStorageService.updateCreatedDateTime(applicationKey, application.patronApplication),
      this._questionsStorageService.updateSubmittedDateTime(applicationKey)
    ).pipe(
      switchMap(([createdDateTime, submittedDateTime]: [string, string]) => {
        const patronApplication: PatronApplication = {
          ...application.patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
          submittedDateTime,
        };
        const applicationDetails: ApplicationDetails = { ...application, patronApplication };

        return this._updateApplication(applicationDetails, form, ApplicationStatus.Submitted).pipe(
          tap(() => {
            this._applicationsStateService.setApplication(applicationKey, applicationDetails);
          })
        );
      })
    );
  }

  saveApplication(applicationKey: number, application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    return from(
      this._questionsStorageService.updateCreatedDateTime(applicationKey, application.patronApplication)
    ).pipe(
      switchMap((createdDateTime: string) => {
        const patronApplication: PatronApplication = {
          ...application.patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
        };
        const applicationDetails: ApplicationDetails = { ...application, patronApplication };

        return this._updateApplication(applicationDetails, form, ApplicationStatus.Pending).pipe(
          tap(() => {
            this._applicationsStateService.setApplication(applicationKey, applicationDetails);
          })
        );
      })
    );
  }

  private _updateApplication(
    application: ApplicationDetails,
    form: any,
    status: ApplicationStatus
  ): Observable<ResponseStatus> {
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
        const body: ApplicationRequest = new ApplicationRequest({ updatedPatronApplication, attributes, preferences });

        return this._housingProxyService.put(this._patronApplicationsUrl, body);
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
        const consumerKey: number = control.consumerKey;

        if (foundAttributeIndex !== -1) {
          const foundAttribute: PatronAttribute = patronAttributes[foundAttributeIndex];
          const key: number = foundAttribute.key;
          const foundQuestion: any = questions[control.name];
          const value: any = foundQuestion || foundAttribute.value;
          const patronKey: number = foundAttribute.patronKey;
          const effectiveDate: string = foundAttribute.effectiveDate;
          const endDate: string = foundAttribute.endDate;

          resultAttributes[foundAttributeIndex] = new PatronAttribute({
            consumerKey,
            value,
            key,
            patronKey,
            effectiveDate,
            endDate,
          });
        } else {
          const foundQuestion: any = questions[control.name];
          const value: any = foundQuestion || null;

          resultAttributes.push(new PatronAttribute({ consumerKey, value }));
        }
      });

    return resultAttributes;
  }

  private _getPreferences(
    patronPreferences: PatronPreference[],
    parsedJson: any[],
    questions: QuestionsEntries
  ): PatronPreference[] {
    const facilityControls: QuestionReorder[] = parsedJson.filter(
      (control: QuestionReorder) => control && control.facilityPicker
    );

    if (!facilityControls.length) {
      return patronPreferences;
    }

    return facilityControls
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

          return new PatronPreference({ key, preferenceKey, rank, facilityKey: facility.facilityKey });
        });
      })
      .reduce((accumulator: any[], current: any) => accumulator.concat(current), []);
  }
}
