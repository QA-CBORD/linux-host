import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import {
  QuestionsEntries,
  QuestionsStorageService
} from '@sections/housing/questions/questions-storage.service';
import {
  QuestionBase,
  QuestionChargeSchedule,
  QuestionChargeScheduleBase,
  QuestionCheckboxGroup,
  QuestionFormControl,
  QuestionNonAssignmentDetails
} from '@sections/housing/questions/types';
import { isDefined } from '@sections/housing/utils';
import { ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';
import { ChargeSchedulesService } from '@sections/housing/charge-schedules/charge-schedules.service';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { QuestionFacilityAttributes } from '@sections/housing/questions/types/question-facility-attributes';
import { HousingProxyService } from '../housing-proxy.service';

import { NonAssignmentsStateService } from './non-assignments-state.service';
import { NonAssignmentDetails, NonAssignmentInfo, NON_ASSIGNMENT_DETAIL_FIELDS } from './non-assignments.model';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NonAssignmentsService {
  private readonly _patronNonAssignmentsUrl: string = `${
    this._environmentFacadeService.getEnvironmentObject().housing_aws_url
  }/patron-applications/v.1.0/patron-non-assignments`;

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

  private _getQuestionsPages(nonAssignmentDetails: NonAssignmentDetails): QuestionBase[][] {
    const questions: QuestionBase[] = this._questionsService
      .getQuestions(nonAssignmentDetails.formJson)
      .map((question: QuestionBase) =>
        this._toChargeSchedulesGroup(question, nonAssignmentDetails));

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

  private _toChargeSchedulesGroup(question: QuestionBase, nonAssignmentDetails: NonAssignmentDetails): QuestionBase {
    if (!(question instanceof QuestionChargeScheduleBase)) {
      return question;
    }

    const chargeSchedulesGroup: ChargeScheduleValue[][] = this._chargeSchedulesService.getChargeSchedules(
      nonAssignmentDetails.chargeSchedules,
      question.values
    );

    return new QuestionChargeSchedule({
      ...question,
      chargeSchedulesGroup
    });
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
        if (question instanceof QuestionCheckboxGroup) {
          group[questionName] = this._questionsService.toQuestionCheckboxControl(storedValue, question);
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
      if (question instanceof QuestionNonAssignmentDetails) {
        value = this._getNonAssignmentDetailValue(question, nonAssignmentDetails.nonAssignmentInfo);
      //} else if (question instanceof QuestionAssetTypeRequirements) {
        //value = this._questionsService.getAttributeValue(nonAssignmentDetails.facilityAttributes, question);
      } else {
        value = this._questionsService.getAttributeValue(nonAssignmentDetails.patronAttributes, question) || '';
      }
    }

    return new FormControl({ value, disabled: true });
  }

  private _getNonAssignmentDetailValue(question: QuestionNonAssignmentDetails, nonAssignmentInfo: NonAssignmentInfo): string {
    const nonAssignmentKey: string = NON_ASSIGNMENT_DETAIL_FIELDS[question.assetTypeId];

    return nonAssignmentInfo[nonAssignmentKey] || '';
  }
}
