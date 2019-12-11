import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';
import { parseJsonToArray, hasValue } from '../utils';

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
import { QuestionReorder, QuestionFormControl, QuestionReorderValue } from '../questions/questions.model';
import { QuestionBase } from '../questions/types/question-base';

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

  private readonly _termId: number = 135;

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
        const patronApplication: PatronApplication = new PatronApplication({
          ...application.patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
          submittedDateTime,
          status: ApplicationStatus.Submitted,
        });
        const applicationDetails: ApplicationDetails = new ApplicationDetails({ ...application, patronApplication });

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
        const patronApplication: PatronApplication = new PatronApplication({
          ...application.patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
          status: ApplicationStatus.Pending,
        });
        const applicationDetails: ApplicationDetails = new ApplicationDetails({ ...application, patronApplication });

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
        const patronAttributes: PatronAttribute[] = this._getAttributes(
          application.patronAttributes,
          parsedJson,
          questions
        );
        const patronPreferences: PatronPreference[] = this._getPreferences(
          application.patronPreferences,
          parsedJson,
          questions
        );
        const patronApplication: PatronApplication = new PatronApplication({ ...application.patronApplication });
        const body: ApplicationRequest = new ApplicationRequest({
          patronApplication,
          patronAttributes,
          patronPreferences,
        });

        return this._housingProxyService.put(this._patronApplicationsUrl, body);
      })
    );
  }

  private _getAttributes(
    patronAttributes: PatronAttribute[],
    parsedJson: any[],
    questionEntries: QuestionsEntries
  ): PatronAttribute[] {
    const resultAttributes: PatronAttribute[] = patronAttributes ? [...patronAttributes] : [];
    const facilityControls: QuestionFormControl[] = parsedJson.filter(
      (control: QuestionBase) => control && (control as QuestionFormControl).consumerKey
    );

    if (!facilityControls.length) {
      return patronAttributes;
    }

    facilityControls.forEach((control: QuestionFormControl) => {
      const foundAttributeIndex: number = patronAttributes.findIndex(
        (attribute: PatronAttribute) => attribute.attributeConsumerKey === control.consumerKey
      );
      const attributeConsumerKey: number = control.consumerKey;
      const foundQuestion: any = questionEntries[control.name];
      const value: string = hasValue(foundQuestion) ? foundQuestion : '';

      if (foundAttributeIndex !== -1) {
        const foundAttribute: PatronAttribute = patronAttributes[foundAttributeIndex];
        const key: number = foundAttribute.key;

        const patronKey: number = foundAttribute.patronKey;
        const effectiveDate: string = foundAttribute.effectiveDate;
        const endDate: string = foundAttribute.endDate;

        resultAttributes[foundAttributeIndex] = new PatronAttribute({
          attributeConsumerKey,
          value,
          key,
          patronKey,
          effectiveDate,
          endDate,
        });
      } else {
        resultAttributes.push(new PatronAttribute({ attributeConsumerKey, value }));
      }
    });

    return resultAttributes;
  }

  private _getPreferences(
    patronPreferences: PatronPreference[],
    parsedJson: any[],
    questions: QuestionsEntries
  ): PatronPreference[] {
    if (!patronPreferences.length) {
      return patronPreferences;
    }

    const facilityControl: QuestionReorder = parsedJson.filter(
      (control: QuestionBase) => control && (control as QuestionReorder).facilityPicker
    )[0];
    const foundQuestion: any = questions[facilityControl.name];

    if (!foundQuestion) {
      return patronPreferences;
    }

    const facilities: QuestionReorderValue[] = foundQuestion.slice(0, facilityControl.prefRank);

    return patronPreferences.map((preference: PatronPreference) => {
      const foundFacility: QuestionReorderValue = facilities[preference.rank - 1];

      if (!foundFacility) {
        return preference;
      }

      const facilityKey: number = foundFacility.facilityKey;

      return new PatronPreference({ ...preference, facilityKey });
    });
  }
}
