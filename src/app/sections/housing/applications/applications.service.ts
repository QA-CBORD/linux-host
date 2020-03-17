import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, mapTo } from 'rxjs/operators';

import { Environment } from '../../../environment';
import { parseJsonToArray } from '../utils';

import { HousingProxyService } from '../housing-proxy.service';
import { AttributesService } from '../attributes/attributes.service';
import { PreferencesService } from '../preferences/preferences.service';
import { ApplicationsStateService } from './applications-state.service';
import { QuestionsStorageService, StoredApplication } from '../questions/questions-storage.service';

import { ResponseStatus } from '../housing.model';
import {
  ApplicationStatus,
  ApplicationDetails,
  PatronApplication,
  PatronAttribute,
  PatronPreference,
  ApplicationRequest,
  ApplicationDefinition,
} from './applications.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private readonly _patronApplicationsUrl: string = `${
    Environment.currentEnvironment.housing_aws_url
  }/patron-applications/v.1.0/patron-applications`;

  constructor(
    private _housingProxyService: HousingProxyService,
    private _attributesService: AttributesService,
    private _preferencesService: PreferencesService,
    private _applicationsStateService: ApplicationsStateService,
    private _questionsStorageService: QuestionsStorageService
  ) {}

  submitApplication(
    applicationKey: number,
    application: ApplicationDetails,
    form: any,
    isSubmitted: boolean
  ): Observable<ResponseStatus> {
    if (isSubmitted) {
      return this._updateApplication(application, form, ApplicationStatus.Submitted);
    }

    return forkJoin(
      this._updateCreatedDateTime(applicationKey, application.patronApplication),
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

  saveApplication(
    applicationKey: number,
    application: ApplicationDetails,
    form: any,
    isSubmitted: boolean
  ): Observable<ResponseStatus> {
    if (isSubmitted) {
      return this._updateApplication(application, form, ApplicationStatus.Pending);
    }

    return this._updateCreatedDateTime(applicationKey, application.patronApplication).pipe(
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

  next(applicationKey: number, applicationDetails: ApplicationDetails, formValue: any): Observable<any> {
    const patronApplication: PatronApplication = applicationDetails.patronApplication;
    const status: ApplicationStatus = patronApplication && patronApplication.status;

    return this._updateCreatedDateTime(applicationKey, patronApplication).pipe(
      switchMap((createdDateTime: string) => {
        const updatedStatus: ApplicationStatus = status || ApplicationStatus.Pending;
        const updatedPatronApplication: PatronApplication = new PatronApplication({
          ...patronApplication,
          applicationDefinitionKey: applicationKey,
          createdDateTime,
          status: updatedStatus,
        });
        const updatedApplicationDetails: ApplicationDetails = new ApplicationDetails({
          ...applicationDetails,
          patronApplication: updatedPatronApplication,
        });

        this._applicationsStateService.setApplication(applicationKey, updatedApplicationDetails);

        return this._questionsStorageService.updateQuestions(applicationKey, formValue, updatedStatus);
      })
    );
  }

  patchApplicationsByStoredStatus(applications: ApplicationDetails[]): Observable<ApplicationDetails[]> {
    return forkJoin(
      applications.map((application: ApplicationDetails) => this._patchApplicationByStoredStatus(application))
    );
  }

  private _updateCreatedDateTime(key: number, patronApplication: PatronApplication): Observable<string> {
    const createdDateTime: string = patronApplication && patronApplication.createdDateTime;

    return this._questionsStorageService.updateCreatedDateTime(key, createdDateTime);
  }

  private _updateApplication(
    applicationDetails: ApplicationDetails,
    form: any,
    status: ApplicationStatus
  ): Observable<ResponseStatus> {
    const applicationDefinition: ApplicationDefinition = applicationDetails.applicationDefinition;
    const applicationKey: number = applicationDefinition.key;

    return this._questionsStorageService.updateQuestions(applicationKey, form, status).pipe(
      switchMap((storedApplication: StoredApplication) => {
        const parsedJson: any[] = parseJsonToArray(applicationDefinition.applicationFormJson);
        const questions = storedApplication.questions;
        const patronAttributes: PatronAttribute[] = this._attributesService.getAttributes(
          applicationDetails.patronAttributes,
          parsedJson,
          questions
        );
        const patronPreferences: PatronPreference[] = this._preferencesService.getPreferences(
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
      tap(() => this._applicationsStateService.setApplication(applicationKey, applicationDetails)),
      switchMap((response: ResponseStatus) =>
        this._questionsStorageService.removeApplication(applicationKey).pipe(mapTo(response))
      )
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

  private _patchApplicationByStoredStatus(applicationDetails: ApplicationDetails): Observable<ApplicationDetails> {
    let patronApplication: PatronApplication = applicationDetails.patronApplication;
    const status: ApplicationStatus = patronApplication && patronApplication.status;

    if (status && status !== ApplicationStatus.New) {
      return of(applicationDetails);
    }

    return this._questionsStorageService.getApplicationStatus(applicationDetails.applicationDefinition.key).pipe(
      map((storedStatus: ApplicationStatus) => {
        if (!storedStatus) {
          return applicationDetails;
        }

        applicationDetails.patronApplication = new PatronApplication({
          ...patronApplication,
          status: storedStatus,
        });

        return applicationDetails;
      })
    );
  }
}
