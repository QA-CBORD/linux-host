import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, mapTo, withLatestFrom } from 'rxjs/operators';

import { isDefined, parseJsonToArray } from '../utils';

import { HousingProxyService } from '../housing-proxy.service';
import { PatronAttributesService } from '../patron-attributes/patron-attributes.service';
import { PreferencesService } from '../preferences/preferences.service';
import { ApplicationsStateService } from './applications-state.service';
import { QuestionsEntries, QuestionsStorageService, StoredApplication } from '../questions/questions-storage.service';
import { QuestionsService } from '@sections/housing/questions/questions.service';

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
import {
  QuestionCheckboxGroup,
  QuestionFormControl,
  QuestionReorder,
  QuestionReorderValue,
  QuestionsPage,
  QuestionTextbox,
} from '@sections/housing/questions/questions.model';
import { QuestionBase } from '@sections/housing/questions/types';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private readonly _patronApplicationsUrl: string = `${
    this._environmentFacadeService.getEnvironmentObject().housing_aws_url
  }/patron-applications/v.1.0/patron-applications`;

  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _patronAttributesService: PatronAttributesService,
    private _preferencesService: PreferencesService,
    private _applicationsStateService: ApplicationsStateService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService
  ) {}

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getQuestions(key).pipe(
      withLatestFrom(this._applicationsStateService.applicationDetails$),
      map(([storedQuestions, applicationDetails]: [QuestionsEntries, ApplicationDetails]) => {
        const pages: QuestionBase[][] = this._questionsService.getQuestionsPages(
          applicationDetails.applicationDefinition.applicationFormJson
        );
        const patronApplication: PatronApplication = applicationDetails.patronApplication;
        const status: ApplicationStatus = patronApplication && patronApplication.status;
        const isSubmitted = status === ApplicationStatus.Submitted;

        return this._getPages(pages, storedQuestions, applicationDetails, isSubmitted);
      })
    );
  }

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

  private _getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    applicationDetails: ApplicationDetails,
    isSubmitted: boolean
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, storedQuestions, applicationDetails, isSubmitted),
      questions: page,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    applicationDetails: ApplicationDetails,
    isSubmitted: boolean
  ): FormGroup {
    return this._questionsService.toFormGroup(
      questions,
      storedQuestions,
      (group: any, question: QuestionFormControl, questionName: string, storedValue: string) => {
        if (question instanceof QuestionCheckboxGroup) {
          group[questionName] = this._questionsService.toQuestionCheckboxControl(storedValue, question);
        } else if (question instanceof QuestionReorder) {
          group[questionName] = this._toQuestionReorderControl(
            storedValue,
            question,
            applicationDetails.patronPreferences
          );
        } else {
          group[questionName] = this._toFormControl(
            storedValue,
            question,
            applicationDetails.patronAttributes,
            isSubmitted
          );
        }
      }
    );
  }

  private _toQuestionReorderControl(
    storedValue: any,
    question: QuestionReorder,
    preferences: PatronPreference[]
  ): FormArray {
    const values: QuestionReorderValue[] = storedValue || question.values;
    const selectedValues: QuestionReorderValue[] = values.filter((value: QuestionReorderValue) => value.selected);
    const controls: FormControl[] = selectedValues
      .sort((current: QuestionReorderValue, next: QuestionReorderValue) =>
        QuestionReorder.sort(preferences, current, next, selectedValues.length)
      )
      .map((value: QuestionReorderValue) => new FormControl(value));

    return new FormArray(controls);
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    attributes: PatronAttribute[],
    isSubmitted: boolean
  ): FormControl {
    let value: any = storedValue;

    if (!isDefined(value)) {
      value = this._questionsService.getAttributeValue(attributes, question);
    }

    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }

    if (question instanceof QuestionTextbox) {
      this._questionsService.addDataTypeValidator(question, validators);
    }

    return new FormControl({ value, disabled: isSubmitted }, validators);
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
        const patronAttributes: PatronAttribute[] = this._patronAttributesService.getAttributes(
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
