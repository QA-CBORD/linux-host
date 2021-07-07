import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { WaitingListStateService } from './waiting-list-state.service';
import { WaitingListDetails, WaitingListDetailsRequest } from './waiting-lists.model';
import { QuestionsPage } from '../questions/questions.model';
import { QuestionsStorageService, QuestionsEntries, StoredApplication } from '../questions/questions-storage.service';
import { QuestionBase } from '../questions/types/question-base';
import { QuestionsService } from '../questions/questions.service';
import { flat } from '../utils/flat';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionFormControl } from '../questions/types/question-form-control';
import { QuestionCheckboxGroup } from '../questions/types/question-checkbox-group';
import { isDefined } from "../utils";
import { QuestionDropdown} from '../questions/types/question-dropdown';
import { QuestionTextbox } from '../questions/types/question-textbox';


@Injectable({
  providedIn: 'root',
})
export class WaitingListsService {
  private WaitingListUrl = `${this._environment.getHousingAPIURL()
    }/patron-applications/v.1.0/patron-waiting-lists`;
  private index = 1;
  constructor(
    private _proxy: HousingProxyService,
    private _environment: EnvironmentFacadeService,
    private _waitingListState: WaitingListStateService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _housingProxyService: HousingProxyService) { }

  removeFromWaitingList(patronWaitingListKey: number): Observable<boolean> {
    let urlRemove = this.WaitingListUrl + `/patron`;
    const queryParams: string[] = [`patronWaitingListKey=${patronWaitingListKey}`];
    return this._proxy.delete(urlRemove, queryParams).pipe(map((response: Response) => {
      if (isSuccessful(response.status)) {
        return true;
      } else {
        throw new Error(response.status.message);
      }
    }),
      catchError(_ => of(false)))
  }

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this._waitingListState.waitingListDetails$.pipe(
      map((waitingListDetails: WaitingListDetails) => {
        const pages: QuestionBase[][] = this._getQuestionsPages(waitingListDetails);
        return this._getPages(pages, null, waitingListDetails);
      })
    )
  }

  private _getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    waitingListsDetails: WaitingListDetails
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, storedQuestions, waitingListsDetails),
      questions: page,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    waitingListsDetails: WaitingListDetails
  ): FormGroup {
    return this._questionsService.toFormGroup(
      questions,
      storedQuestions,
      (group, question: QuestionFormControl, questionName: string, storedValue: string) => {
        if (question instanceof QuestionCheckboxGroup) {
          group[questionName] = this._questionsService.toQuestionCheckboxControl(storedValue, question);
        } else {
          group[questionName] = this._toFormControl(storedValue, question, waitingListsDetails);
        }
      }
    );
  }

  private _getQuestionsPages(waitingListDetails: WaitingListDetails): QuestionBase[][] {
    const questions: QuestionBase[][] = this._questionsService
      .getQuestions(waitingListDetails.formDefinition.applicationFormJson)
      .map((question: QuestionBase) => {
        const mappedQuestion = this._toWaitingListCustomType(question, waitingListDetails)
        return [].concat(mappedQuestion);
      });

    return this._questionsService.splitByPages(flat(questions));
  }

  private _toWaitingListCustomType(question: QuestionBase, waitingListDetails: WaitingListDetails): QuestionBase {
    if (!(question.label === 'Facility Request' || question.label === 'Attribute Request')) {
      return question;
    }

    if (question.label === 'Facility Request' && waitingListDetails.facilities != null) {
      const facility = waitingListDetails.facilities.map((value) => { return { label: value.name, value: value.facilityKey } })
      return new QuestionDropdown({ name: `facility-selection-${this.index++}` ,values: facility });
    } else {
      return new QuestionTextbox({
        name: `attribute-value-${this.index++}`,
        type: 'text',
        label: 'Attribute value',
        subtype: 'text',
        dataType: 'String',

      });
    }
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    waitinglistDetails: WaitingListDetails
  ): FormControl {
    let value: any = storedValue;

    if (!isDefined(value) && waitinglistDetails.attributes) {
      value = this._questionsService.getAttributeValue(waitinglistDetails.attributes, question) || '';
    }

    return new FormControl({ value, disabled: false });
  }

  next(waitingListKey: number ,formValue: any): Observable<any> {
    return this._questionsStorageService.updateQuestions(waitingListKey, formValue, 1)
  }
  
  submitWaitingList(
    waitListKey: number,
    waitingList: WaitingListDetails,
    form: any): Observable<boolean> {  

    return this._questionsStorageService.updateQuestions(waitListKey, form, 3).pipe(
      switchMap((storedApplication: StoredApplication) => {
        const questions = storedApplication.questions;

        const attributeValue: string = questions[Object.keys(questions).find(value => value.includes('attribute-value'))] || null;

        const facilityKey: number =  parseInt(questions[Object.keys(questions).find(value => value.includes('facility-selection'))]) || null;

        const body = new WaitingListDetailsRequest({
          waitListKey,
          attributeValue,
          facilityKey
        });

        return this._housingProxyService.post<Response>(this.WaitingListUrl+'/patron', body);
      }),
      map((response: Response) => {
        if (isSuccessful(response.status)) {
          return true;
        } else {
          throw new Error(response.status.message);
        }
      }
      ),
      catchError(_ => of(false)));
  }
}