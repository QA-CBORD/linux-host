import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import {
  QuestionsEntries,
  QuestionsStorageService
} from '@sections/housing/questions/questions-storage.service';
import {
  QuestionAssetTypeDetails,
  QuestionAssetTypeDetailsBase,
  QuestionBase,
  QuestionFormControl
} from '@sections/housing/questions/types';
import { isDefined } from '@sections/housing/utils';
import { ChargeSchedulesService } from '@sections/housing/charge-schedules/charge-schedules.service';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { HousingProxyService } from '../housing-proxy.service';

import { NonAssignmentsStateService } from './non-assignments-state.service';
import {
  AssetType,
  AssetTypeDetailValue,
  ContractRequest,
  NonAssignmentDetails
} from './non-assignments.model';
import { ResponseStatus } from '../housing.model';

@Injectable({
  providedIn: 'root'
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
    private _chargeSchedulesService: ChargeSchedulesService
  ) { }

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getApplication(key).pipe(
      withLatestFrom(this._nonAssignmentsStateService.nonAssignmentDetails$),
      map(([storedQuestions, nonAssignmentDetails]: [QuestionsEntries, NonAssignmentDetails]) => {
        const pages: QuestionBase[][] = this._getQuestionsPages(nonAssignmentDetails);

        return this._getPages(pages, storedQuestions, nonAssignmentDetails);
      })
    );
  }

  getSelectedAssetType(): Observable<number> {
    return this._nonAssignmentsStateService.selectedAssetType$;
  }

  submitContract(assetTypeKey: number, termKey: number): Observable<ResponseStatus> {
    const body: ContractRequest = new ContractRequest({
      assetKey: assetTypeKey,
      isAsset: true,
      isFacility: false,
      termKey
    });

    return this._housingProxyService.post(this._patronNonAssignmentsUrl, body);
  }

  private _getQuestionsPages(nonAssignmentDetails: NonAssignmentDetails): QuestionBase[][] {
    const questions: QuestionBase[] = this._questionsService
      .getQuestions(nonAssignmentDetails.formJson)
      .map((question: QuestionBase) =>
        this._mapToAssetTypeDetailsGroup(question, nonAssignmentDetails));

    return this._questionsService.splitByPages(questions);
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

  private _mapToAssetTypeDetailsGroup(question: QuestionBase, nonAssignmentDetails: NonAssignmentDetails): QuestionBase {
    if (!(question instanceof QuestionAssetTypeDetailsBase)) {
      return question;
    }
  
    const assetTypes =
      this._toAssetTypeDetails(question, nonAssignmentDetails.assetTypes);
    
    return new QuestionAssetTypeDetails({
      ...question,
      assetTypes
    });
  }

  private _toAssetTypeDetails(question: QuestionAssetTypeDetailsBase, assetTypes: AssetType[]): AssetTypeDetailValue[][] {
   if (!isDefined(assetTypes) || assetTypes.length === 0) {
     return [];
   }

    var selectedValues = question.values.filter(p => p.selected);
    
    let nameLabel: string = '';
    let mealsLabel: string = '';
    let diningDollarsLabel: string = '';
    let costLabel: string = '';

    selectedValues.forEach(p => {
      switch (p.value) {
        case '0':
          nameLabel = isDefined(question.customName)
            ? question.customName
            : p.label;  
          break;
        case '1':
          mealsLabel = isDefined(question.customMeals)
            ? question.customMeals
            : p.label;
          break;
        case '2':
          diningDollarsLabel = isDefined(question.customDining)
            ? question.customDining
            : p.label;
          break;
        case '3':
          costLabel = isDefined(question.customCost)
            ? question.customCost
            : p.label;
          break;
      }
    });

    const availableAssetTypes = assetTypes.map((assetType: AssetType) => 
      selectedValues.map(e => {
        let assetTypeValue: AssetTypeDetailValue;
        let label: string;
        let value: string;
        let selected: boolean;

        switch (e.value) {
          case '0':
            // Name
            label = nameLabel;
            value = assetType.name;
            selected = false;
            break;
          case '1':
            // Number of Meals
            label = mealsLabel;
            value = `${assetType.numberOfUnits}`;
            selected = true;
            break;
          case '2':
            // Dining Dollars
            label = diningDollarsLabel;
            value = `${assetType.diningDollars}`;
            selected = true;
            break;
          case '3':
            // Cost
            label = costLabel;
            value = `${assetType.cost}`;
            selected = true;
            break;
          default:
            break;
        }
        assetTypeValue = new AssetTypeDetailValue({
          assetTypeKey: assetType.assetTypeKey,
          label,
          value,
          selected
        });

        return assetTypeValue;

      }));

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
    storedValue: any,
    question: QuestionFormControl,
    nonAssignmentDetails: NonAssignmentDetails
  ): FormControl {
    let value: any = storedValue;

    if (!isDefined(value)) {
        value = this._questionsService.getAttributeValue(nonAssignmentDetails.patronAttributes, question) || '';
    }

    return new FormControl({ value, disabled: true });
  }
}
