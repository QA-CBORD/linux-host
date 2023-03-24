import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import {
  QuestionsEntries,
  QuestionsStorageService,
  StoredApplication,
} from '@sections/housing/questions/questions-storage.service';
import {
  QuestionAssetTypeDetails,
  QuestionAssetTypeDetailsBase,
  QuestionBase,
  QuestionFormControl,
} from '@sections/housing/questions/types';
import { flat, isDefined, parseJsonToArray } from '@sections/housing/utils';
import { QuestionsPage, QUESTIONS_SOURCES } from '@sections/housing/questions/questions.model';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { HousingProxyService } from '../housing-proxy.service';

import { NonAssignmentsStateService } from './non-assignments-state.service';
import {
  AssetType,
  AssetTypeDetailValue,
  ContractRequest,
  NonAssignmentContractRequest,
  NonAssignmentDetails,
} from './non-assignments.model';
import { Response } from '@sections/housing/housing.model';
import { isSuccessful } from '../utils/is-successful';
import { PatronAddress } from '../addresses/address.model';
import { PatronAttribute } from '../applications/applications.model';
import { PatronAttributesService } from '../patron-attributes/patron-attributes.service';
import { PatronAddressService } from '../addresses/address.service';

@Injectable({
  providedIn: 'root',
})
export class NonAssignmentsService {
  private readonly _patronNonAssignmentsUrl: string = `${
    this._environmentFacadeService.getEnvironmentObject().housing_aws_url
  }/patron-applications/v.1.0/patron-contracts/contracts/self`;

  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _nonAssignmentsStateService: NonAssignmentsStateService,
    private _patronAttributesService: PatronAttributesService,
    private _patronAddressService: PatronAddressService
  ) {}

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getApplication(key).pipe(
      withLatestFrom(this._nonAssignmentsStateService.nonAssignmentDetails$),
      map(([storedQuestions, nonAssignmentDetails]: [QuestionsEntries, NonAssignmentDetails]) => {
        const pages: QuestionBase[][] = this._getQuestionsPages(nonAssignmentDetails);

        return this._getPages(pages, storedQuestions, nonAssignmentDetails);
      })
    );
  }

  getSelectedAssetType(): Observable<AssetTypeDetailValue[]> {
    return this._nonAssignmentsStateService.selectedAssetType$;
  }

  submitContract(
    nonAssignmentKey: number,
    nonAssignment: NonAssignmentDetails,
    assetTypeKey: number,
    termKey: number,
    form
  ): Observable<boolean> {
    return this._questionsStorageService.updateQuestions(nonAssignmentKey, form, 3).pipe(
      switchMap((storedApplication: StoredApplication) => {
        const parsedJson = parseJsonToArray(nonAssignment.formJson);
        const questions = storedApplication.questions;

        const patronAttributes: PatronAttribute[] = this._patronAttributesService.getAttributes(
          nonAssignment.patronAttributes,
          parsedJson,
          questions
        );

        const patronAddresses: PatronAddress[] = this._patronAddressService.getAddresses(
          nonAssignment.patronAddresses,
          parsedJson,
          questions
        );

        const patronContract: ContractRequest = new ContractRequest({
          assetKey: assetTypeKey,
          isAsset: true,
          isFacility: false,
          termKey,
        });

        const body = new NonAssignmentContractRequest({
          nonAssignmentKey,
          patronContract,
          patronAttributes,
          patronAddresses,
        });

        return this._housingProxyService.post<Response>(this._patronNonAssignmentsUrl, body);
      }),
      map((response: Response) => {
        if (isSuccessful(response.status)) {
          return true;
        } else {
          throw new Error(response.status.message);
        }
      }),
      catchError(() => of(false))
    );
  }

  next(nonAssignmentKey: number, formValue) {
    return this._questionsStorageService.updateQuestions(nonAssignmentKey, formValue, 1);
  }

  private _getQuestionsPages(nonAssignmentDetails: NonAssignmentDetails): QuestionBase[][] {
    const questions: QuestionBase[][] = this._questionsService
      .getQuestions(nonAssignmentDetails.formJson)
      .map((question: QuestionBase) => {
        const mappedQuestion = this._mapToAssetTypeDetailsGroup(question, nonAssignmentDetails);
        return this._questionsService.mapToAddressTypeGroup(mappedQuestion);
      });

    return this._questionsService.splitByPages(flat(questions));
  }

  private _getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    nonAssignmentDetails: NonAssignmentDetails
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, storedQuestions, nonAssignmentDetails),
      questions: page,
    }));
  }

  private _mapToAssetTypeDetailsGroup(
    question: QuestionBase,
    nonAssignmentDetails: NonAssignmentDetails
  ): QuestionBase {
    if (!(question instanceof QuestionAssetTypeDetailsBase)) {
      return question;
    }

    const assetTypes = this._toAssetTypeDetails(question, nonAssignmentDetails.assetTypes);

    return new QuestionAssetTypeDetails({
      ...question,
      assetTypes,
    });
  }
  getName(quetionField: string, p: AssetTypeDetailValue) {
    return isDefined(quetionField) && quetionField !== 'undefined' ? quetionField : p.label;
  }
  private _toAssetTypeDetails(
    question: QuestionAssetTypeDetailsBase,
    assetTypes: AssetType[]
  ): AssetTypeDetailValue[][] {
    if (!isDefined(assetTypes) || assetTypes.length === 0) {
      return [];
    }

    const selectedValues = question.values.filter(p => p.selected);
    let nameLabel = '';
    let mealsLabel = '';
    let diningDollarsLabel = '';
    let costLabel = '';

    selectedValues.forEach(p => {
      nameLabel = this.getName(question.customName, p);
      mealsLabel = this.getName(question.customMeals, p);
      diningDollarsLabel = this.getName(question.customDining, p);
      costLabel = this.getName(question.customCost, p);
      return {
        '0': nameLabel,
        '1': mealsLabel,
        '2': diningDollarsLabel,
        '3': costLabel,
      }[p.value];
    });

    const availableAssetTypes = assetTypes.map((assetType: AssetType) =>
      selectedValues.map(e => {
        let assetTypeValue: AssetTypeDetailValue;
        let label: string;
        let value: string;
        let selected: boolean;
        let isCurrency: boolean;

        switch (e.value) {
          case '0':
            // Name
            label = nameLabel;
            value = assetType.name;
            selected = false;
            isCurrency = false;
            break;
          case '1':
            // Number of Meals
            label = mealsLabel;
            value = `${assetType.numberOfUnits}`;
            selected = true;
            isCurrency = false;
            break;
          case '2':
            // Dining Dollars
            label = diningDollarsLabel;
            value = `${assetType.diningDollars}`;
            selected = true;
            isCurrency = true;
            break;
          case '3':
            // Cost
            label = costLabel;
            value = `${assetType.cost}`;
            selected = true;
            isCurrency = true;
            break;
          default:
            break;
        }
        // eslint-disable-next-line prefer-const
        assetTypeValue = new AssetTypeDetailValue({
          assetTypeKey: assetType.assetTypeKey,
          label,
          value,
          selected,
          isCurrency,
        });

        return assetTypeValue;
      })
    );

    return availableAssetTypes;
  }

  private _toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    nonAssignmentDetails: NonAssignmentDetails
  ): FormGroup {
    return this._questionsService.toFormGroup(
      questions,
      storedQuestions,
      (group, question: QuestionFormControl, questionName: string, storedValue: string) => {
        if (question instanceof QuestionAssetTypeDetails) {
          group[questionName] = this._questionsService.toQuestionAssetTypeDetailsGroup(storedValue, question);
        } else {
          group[questionName] = this._toFormControl(storedValue, question, nonAssignmentDetails);
        }
      }
    );
  }

  private _toFormControl(
    storedValue: string,
    question: QuestionFormControl,
    nonAssignmentDetails: NonAssignmentDetails
  ): FormControl {
    let value = storedValue;

    if (!isDefined(value)) {
      if (question.source === QUESTIONS_SOURCES.ADDRESS_TYPES) {
        value = this._questionsService.getAddressValue(nonAssignmentDetails.patronAddresses, question) || '';
      } else {
        value = this._questionsService.getAttributeValue(question, nonAssignmentDetails.patronAttributes) || '';
      }
    }

    return new FormControl(
      { value, disabled: question.readonly },
      this._questionsService.getRequiredValidator(question)
    );
  }
}
