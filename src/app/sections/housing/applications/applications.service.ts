import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, withLatestFrom } from 'rxjs/operators';

import { flat, isDefined, parseJsonToArray } from '../utils';

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
  RoommateSearchOptions,
} from './applications.model';
import {
  QuestionCheckboxGroup,
  QuestionFormControl,
  QuestionReorder,
  QuestionReorderValue,
  QuestionsPage,
  QUESTIONS_SOURCES,
  QuestionTextbox,
} from '@sections/housing/questions/questions.model';
import { QuestionBase } from '@sections/housing/questions/types';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PatronAddress } from '../addresses/address.model';
import { PatronAddressService } from '../addresses/address.service';
import { QuestionActionButton, QuestionRoommatePreference } from '../questions/types/question-roommate-preference';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { RoommatePreferences } from './applications.model';
import { RoommateDetails } from '../roommate/roomate.model';
import { CurrentForm } from '../pages/form-payment/form-payment.component';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private readonly _patronApplicationsUrl: string = `${
    this._environmentFacadeService.getEnvironmentObject().housing_aws_url
  }/patron-applications/v.1.0/patron-applications`;
  selectedRoommate: any[] = [];
  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _patronAttributesService: PatronAttributesService,
    private _preferencesService: PreferencesService,
    private _patronAddressService: PatronAddressService,
    private _applicationsStateService: ApplicationsStateService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _router: Router
  ) {}

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getQuestions(key).pipe(
      withLatestFrom(this._applicationsStateService.applicationDetails$),
      map(([storedQuestions, applicationDetails]: [QuestionsEntries, ApplicationDetails]) => {
        const pages: QuestionBase[][] = this._getQuestionsPages(applicationDetails);

        const patronApplication: PatronApplication = applicationDetails.patronApplication;
        const status: ApplicationStatus = patronApplication && patronApplication.status;
        const isSubmitted = status === ApplicationStatus.Submitted;

        return this._getPages(pages, storedQuestions, applicationDetails, isSubmitted);
      })
    );
  }

  submitApplication(application: CurrentForm): Observable<ResponseStatus> {
    return forkJoin([
      this._updateCreatedDateTime(application.key, application.details.patronApplication),
      this._questionsStorageService.updateSubmittedDateTime(application.key),
    ]).pipe(
      switchMap(([createdDateTime, submittedDateTime]: [string, string]) => {
        const applicationDetails: ApplicationDetails = this._createApplicationDetails(
          application.key,
          application.details,
          ApplicationStatus.Submitted,
          createdDateTime,
          submittedDateTime
        );
        return this._updateApplication(applicationDetails, application.formValue, ApplicationStatus.Submitted);
      })
    );
  }

  saveApplication(application: CurrentForm, removeQuestions = true): Observable<ResponseStatus> {
    return this._updateCreatedDateTime(application.key, application.details.patronApplication).pipe(
      switchMap((createdDateTime: string) => {
        const applicationDetails: ApplicationDetails = this._createApplicationDetails(
          application.key,
          application.details,
          ApplicationStatus.Pending,
          createdDateTime
        );

        return this._updateApplication(
          applicationDetails,
          application.formValue,
          ApplicationStatus.Pending,
          removeQuestions
        );
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
        const selectedPreferences = this._applicationsStateService.applicationsState.applicationDetails
          .roommatePreferences;

        const updatedApplicationDetails: ApplicationDetails = new ApplicationDetails({
          ...applicationDetails,
          patronApplication: updatedPatronApplication,
          roommatePreferences: selectedPreferences,
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

  selectRoommate(roommateParam: RoommateDetails): Observable<boolean> {
    if (this._applicationsStateService.maximumSelectedRoommates >= 0) {
      let isSetRoommate = false;
      const requestedRoommates = this._applicationsStateService.getRoommateSearchOptions();
      this._applicationsStateService.setRoommatesPreferences(
        this._applicationsStateService.applicationsState.applicationDetails.roommatePreferences.filter(roommate => {
          requestedRoommates.preferences.forEach(requestedRommate => {
            if (
              roommate.patronKeyRoommate == 0 &&
              !isSetRoommate &&
              requestedRommate.selected &&
              requestedRommate.value == roommate.preferenceKey
            ) {
              roommate.patronKeyRoommate = roommateParam.patronKey;
              roommate.firstName = roommateParam.firstName;
              roommate.lastName = roommateParam.lastName;
              roommate.birthDate = roommateParam.birthDate;
              roommate.middleName = roommateParam.middleName;
              isSetRoommate = true;
              return roommate;
            }
            return roommate;
          });
        })
      );
      return of(true);
    }
    return of(false);
  }

  private _getQuestionsPages(applicationDetails: ApplicationDetails): QuestionBase[][] {
    const questions: QuestionBase[][] = this._questionsService
      .getQuestions(applicationDetails.applicationDefinition.applicationFormJson)
      .map((question: QuestionBase) => {
        const mappedQuestions = this._questionsService.mapToAddressTypeGroup(question);
        return this._mapQuestions(mappedQuestions);
      });

    return this._questionsService.splitByPages(flat(questions));
  }

  private _mapQuestions(questions: QuestionBase[]): QuestionBase[] {
    return questions.map((question: QuestionBase) => {
      if (!(question instanceof QuestionRoommatePreference)) {
        return question;
      }

      const options: RoommateSearchOptions = {
        searchOptions: question.searchOptions,
        showOptions: question.showOptions,
        preferences: question.values,
        prefRank: question.prefRank,
      };
      this._applicationsStateService.setRoommateSearchOptions(options);

      return new QuestionActionButton({
        label: 'Search for a roommate',
        buttonText: 'Search Roommate',
        metadata: options,
        action: () => {
          this._router.navigate([`${PATRON_NAVIGATION.housing}/roommates-search`], { skipLocationChange: true }).then(() => {
            this._applicationsStateService.setRoommateSearchOptions(options);
          });
        },
      });
    });
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
          group[questionName] = this._toFormControl(storedValue, question, applicationDetails, isSubmitted);
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
      .map((value: QuestionReorderValue) => new FormControl({ value, disabled: question.readonly }));

    return new FormArray(controls);
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    applicationDetails: ApplicationDetails,
    isSubmitted: boolean
  ): FormControl {
    let value: any = storedValue;

    if (!isDefined(value) || value == '') {
      if (question.source === QUESTIONS_SOURCES.ADDRESS_TYPES) {
        value = this._questionsService.getAddressValue(applicationDetails.patronAddresses, question) || '';
      } else {
        value = this._questionsService.getAttributeValue(applicationDetails.patronAttributes, question);
      }
    }

    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }

    if (question instanceof QuestionTextbox) {
      this._questionsService.addDataTypeValidator(question, validators);
    }

    return new FormControl({ value, disabled: isSubmitted || question.readonly }, validators);
  }

  private _updateCreatedDateTime(key: number, patronApplication: PatronApplication): Observable<string> {
    const createdDateTime: string = patronApplication && patronApplication.createdDateTime;

    return this._questionsStorageService.updateCreatedDateTime(key, createdDateTime);
  }

  private _updateApplication(
    applicationDetails: ApplicationDetails,
    form: any,
    status: ApplicationStatus,
    removeQuestions = true
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
        const patronPreferences: PatronPreference[] =
          applicationDetails.patronPreferences != null
            ? this._preferencesService.getPreferences(applicationDetails.patronPreferences, parsedJson, questions)
            : null;
        const patronAddresses: PatronAddress[] = this._patronAddressService.getAddresses(
          applicationDetails.patronAddresses,
          parsedJson,
          questions
        );

        const roommatePreferences: RoommatePreferences[] = applicationDetails.roommatePreferences.filter(
          preference => preference.patronKeyRoommate
        );

        const body: ApplicationRequest = new ApplicationRequest({
          patronApplication: applicationDetails.patronApplication,
          patronAttributes,
          patronPreferences,
          patronAddresses,
          roommatePreferences,
        });

        return this._housingProxyService.put(this._patronApplicationsUrl, body);
      }),
      tap(() => {
        this._applicationsStateService.setApplication(applicationKey, applicationDetails);
        if (removeQuestions) {
          this._questionsStorageService.removeApplication(applicationKey);
        }
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

    const roommatePreferences: RoommatePreferences[] = this._applicationsStateService.applicationsState
      .applicationDetails.roommatePreferences;

    return new ApplicationDetails({ ...applicationDetails, patronApplication, roommatePreferences });
  }

  private _patchApplicationByStoredStatus(applicationDetails: ApplicationDetails): Observable<ApplicationDetails> {
    const patronApplication: PatronApplication = applicationDetails.patronApplication;
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
