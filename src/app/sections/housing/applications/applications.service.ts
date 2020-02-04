import { Injectable } from '@angular/core';
import { Observable, from, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';
import { Environment } from '../../../environment';
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

  private readonly _patronApplicationsUrl: string = `${BASE_URL}/${
    Environment.currentEnvironment.housing_aws_prefix
  }/patron-applications/v.1.0/patron-applications`;

  private readonly _applicationDefinitionUrl: string = `${this._patronApplicationsUrl}/application-definition`;

  getApplications(termId: number): Observable<ApplicationDetails[]> {
    const apiUrl: string = `${this._patronApplicationsUrl}/term/${termId}/patron/self`;

    return this._housingProxyService.get<ApplicationDetails[]>(apiUrl).pipe(
      switchMap((applications: any[]) =>
        Array.isArray(applications)
          ? Promise.all(applications.map((application: any) => this._setStoredApplicationStatus(application)))
          : []
      ),
      tap((applications: ApplicationDetails[]) => this._applicationsStateService.setApplications(applications)),
      catchError(() => {
        this._applicationsStateService.setApplications([]);

        return of([]);
      })
    );
  }

  getApplicationDetails(applicationKey: number): Observable<ApplicationDetails> {
    const apiUrl: string = `${this._applicationDefinitionUrl}/${applicationKey}/patron/self`;

    return this._housingProxyService.get<ApplicationDetails>(apiUrl).pipe(
      map((application: any) => new ApplicationDetails(application)),
      tap((application: ApplicationDetails) => this._questionsService.setPages(application))
    );
  }

  submitApplication(applicationKey: number, application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    return forkJoin(
      this._questionsStorageService.updateCreatedDateTime(applicationKey, application.patronApplication),
      this._questionsStorageService.updateSubmittedDateTime(applicationKey)
    ).pipe(
      switchMap(([createdDateTime, submittedDateTime]: [string, string]) => {
        const applicationDetails: ApplicationDetails = this._createApplicationDetails(
          applicationKey,
          application,
          ApplicationStatus.Submitted,
          createdDateTime,
          submittedDateTime
        );

        return this._updateApplication(applicationDetails, form, ApplicationStatus.Submitted);
      })
    );
  }

  saveApplication(applicationKey: number, application: ApplicationDetails, form: any): Observable<ResponseStatus> {
    return from(
      this._questionsStorageService.updateCreatedDateTime(applicationKey, application.patronApplication)
    ).pipe(
      switchMap((createdDateTime: string) => {
        const applicationDetails: ApplicationDetails = this._createApplicationDetails(
          applicationKey,
          application,
          ApplicationStatus.Pending,
          createdDateTime
        );

        return this._updateApplication(applicationDetails, form, ApplicationStatus.Pending);
      })
    );
  }

  private _updateApplication(
    applicationDetails: ApplicationDetails,
    form: any,
    status: ApplicationStatus
  ): Observable<ResponseStatus> {
    const applicationDefinition: ApplicationDefinition = applicationDetails.applicationDefinition;
    const applicationKey: number = applicationDefinition.key;

    return from(this._questionsStorageService.updateQuestions(applicationKey, form, status)).pipe(
      switchMap((storedApplication: StoredApplication) => {
        const parsedJson: any[] = parseJsonToArray(applicationDefinition.applicationFormJson);
        const questions = storedApplication.questions;
        const patronAttributes: PatronAttribute[] = this._getAttributes(
          applicationDetails.patronAttributes,
          parsedJson,
          questions
        );
        const patronPreferences: PatronPreference[] = this._getPreferences(
          applicationDetails.patronPreferences,
          parsedJson,
          questions
        );
        const body: ApplicationRequest = new ApplicationRequest({
          patronApplication: applicationDetails.patronApplication,
          patronAttributes,
          patronPreferences,
        });

        return this._housingProxyService.put(this._patronApplicationsUrl, body);
      }),
      tap(() => {
        this._applicationsStateService.setApplication(applicationKey, applicationDetails);
      })
    );
  }

  private _createApplicationDetails(
    applicationKey: number,
    applicationDetails: ApplicationDetails,
    status: ApplicationStatus,
    createdDateTime: string,
    submittedDateTime?: string
  ): ApplicationDetails {
    const options: PatronApplication = {
      ...applicationDetails.patronApplication,
      applicationDefinitionKey: applicationKey,
      createdDateTime,
      status,
    };

    if (submittedDateTime) {
      options.submittedDateTime = submittedDateTime;
      options.isApplicationSubmitted = true;
    }

    const patronApplication: PatronApplication = new PatronApplication(options);

    return new ApplicationDetails({ ...applicationDetails, patronApplication });
  }

  private _getAttributes(
    patronAttributes: PatronAttribute[],
    parsedJson: any[],
    questionEntries: QuestionsEntries
  ): PatronAttribute[] {
    const facilityControls: QuestionFormControl[] = parsedJson.filter(
      (control: QuestionBase) => control && (control as QuestionFormControl).consumerKey
    );
    const questions: string[] = Object.keys(questionEntries);

    if (!facilityControls.length || !questions.length) {
      return [];
    }

    return questions
      .filter((questionName: string) =>
        facilityControls.find((control: QuestionFormControl) => control.name === questionName)
      )
      .map((questionName: string) => {
        const value: any = questionEntries[questionName];
        const foundFacility: QuestionFormControl = facilityControls.find(
          (control: QuestionFormControl) => control.name === questionName
        );
        const attributeConsumerKey: number = foundFacility.consumerKey;
        const foundAttribute: PatronAttribute = patronAttributes.find(
          (attribute: PatronAttribute) => attribute.attributeConsumerKey === attributeConsumerKey
        );

        if (foundAttribute) {
          const key: number = foundAttribute.key;
          const patronKey: number = foundAttribute.patronKey;
          const effectiveDate: string = foundAttribute.effectiveDate;
          const endDate: string = foundAttribute.endDate;

          return new PatronAttribute({
            attributeConsumerKey,
            value,
            key,
            patronKey,
            effectiveDate,
            endDate,
          });
        }

        return new PatronAttribute({ attributeConsumerKey, value });
      });
  }

  private _getPreferences(
    patronPreferences: PatronPreference[],
    parsedJson: any[],
    questions: QuestionsEntries
  ): PatronPreference[] {
    const facilityPicker: QuestionReorder = parsedJson.filter(
      (control: QuestionBase) => control && (control as QuestionReorder).facilityPicker
    )[0];

    if (!facilityPicker) {
      return patronPreferences.filter((preference: PatronPreference) => preference.facilityKey);
    }

    const facilities: QuestionReorderValue[] = facilityPicker.values
      ? facilityPicker.values.filter((facility: QuestionReorderValue) => facility.selected)
      : [];
    const foundQuestion: any = questions[facilityPicker.name];

    return patronPreferences
      .slice(0, facilityPicker.prefRank)
      .map((preference: PatronPreference) => {
        const rank: number = preference.rank - 1;
        const foundFacility: QuestionReorderValue = foundQuestion ? foundQuestion[rank] : facilities[rank];

        if (!foundFacility) {
          return preference;
        }

        const facilityKey: number = foundFacility.facilityKey;

        return new PatronPreference({ ...preference, facilityKey });
      })
      .filter((preference: PatronPreference) => preference.facilityKey);
  }

  private async _setStoredApplicationStatus(application: any): Promise<ApplicationDetails> {
    let applicationDetails: ApplicationDetails = new ApplicationDetails(application);
    let patronApplication: PatronApplication = applicationDetails.patronApplication;
    const status: ApplicationStatus = patronApplication && patronApplication.status;

    if (status && status !== ApplicationStatus.New) {
      return applicationDetails;
    }

    const storedApplication: StoredApplication = await this._questionsStorageService.getApplication(
      applicationDetails.applicationDefinition.key
    );

    if (storedApplication) {
      patronApplication = new PatronApplication({
        ...patronApplication,
        status: storedApplication.status,
      });

      applicationDetails = new ApplicationDetails({ ...applicationDetails, patronApplication });
    }

    return applicationDetails;
  }
}
