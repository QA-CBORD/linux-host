import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { flat } from '@sections/housing/utils';

import { HousingProxyService } from '../housing-proxy.service';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { QuestionsEntries, QuestionsStorageService } from '@sections/housing/questions/questions-storage.service';
import { ContractsStateService } from '@sections/housing/contracts/contracts-state.service';

import { ResponseStatus } from '../housing.model';
import { ContractDetails, ContractRequest } from './contracts.model';
import {
  QuestionBase,
  QuestionChargeSchedule,
  QuestionChargeScheduleBase
} from '@sections/housing/questions/types';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';
import { ChargeSchedulesService } from '@sections/housing/charge-schedules/charge-schedules.service';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private readonly _patronContractsUrl: string = `${
        this._environmentFacadeService.getEnvironmentObject().housing_aws_url
  }/patron-applications/v.1.0/patron-contracts`;

  private _isSigned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isSigned$: Observable<boolean> = this._isSigned.asObservable();

  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _contractsStateService: ContractsStateService,
    private _chargeSchedulesService: ChargeSchedulesService
  ) {}

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this._questionsStorageService.getApplication(key).pipe(
      withLatestFrom(this._contractsStateService.contractDetails$),
      map(([storedQuestions, contractDetails]: [QuestionsEntries, ContractDetails]) => {
        const pages: QuestionBase[][] = this._getQuestionsPages(contractDetails);

        return this._getPages(pages, storedQuestions, contractDetails);
      })
    );
  }

  submitContract(contractElementKey: number, formKey: number): Observable<ResponseStatus> {
    const dateSigned: string = new Date().toISOString();
    const body: ContractRequest = new ContractRequest({
      contractElementKey,
      dateSigned,
      formKey
    });

    return this._housingProxyService.put(this._patronContractsUrl, body);
  }

  sign(isSigned: boolean): void {
    this._isSigned.next(isSigned);
  }


  private _getQuestionsPages(contractDetails: ContractDetails): QuestionBase[][] {
    const questions: QuestionBase[][] = this._questionsService
      .getQuestions(contractDetails.formJson)
      .map((question: QuestionBase) => {
        const mappedQuestion = this._toChargeSchedulesGroup(question, contractDetails)
        return this._questionsService.mapToAddressTypeGroup(mappedQuestion);
      });

    return this._questionsService.splitByPages(flat(questions));
  }

  private _getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    contractDetails: ContractDetails
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, storedQuestions, contractDetails),
      questions: page,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    contractDetails: ContractDetails
  ): FormGroup {
    return this._questionsService.toFormGroupControl(
      questions,
      storedQuestions,
      contractDetails
    );
  }

  private _toChargeSchedulesGroup(question: QuestionBase, contractDetails: ContractDetails): QuestionBase {
    if (!(question instanceof QuestionChargeScheduleBase)) {
      return question;
    }

    const chargeSchedulesGroup: ChargeScheduleValue[][] = this._chargeSchedulesService.getChargeSchedules(
      contractDetails.chargeSchedules,
      question.values
    );

    question = new QuestionChargeSchedule({ ...question, chargeSchedulesGroup });
    return question;
  }
}


