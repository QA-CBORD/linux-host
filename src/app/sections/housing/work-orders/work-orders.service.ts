import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { QuestionsPage } from '../questions/questions.model';
import { QuestionsStorageService, QuestionsEntries, StoredApplication } from '../questions/questions-storage.service';
import { QuestionBase } from '../questions/types/question-base';
import { QuestionsService } from '../questions/questions.service';
import { flat } from '../utils/flat';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionFormControl } from '../questions/types/question-form-control';
import { isDefined } from "../utils";
import { QuestionDropdown} from '../questions/types/question-dropdown';
import { QuestionTextbox } from '../questions/types/question-textbox';
import { HttpParams } from "@angular/common/http";
import { QuestionWaitingListRequest } from "../questions/types/question-waiting-list-request";
import { WorkOrder } from './work-orders.model';
import { generateWorkOrders } from './work-orders.mock';
import { WaitingListStateService } from '../waiting-lists/waiting-list-state.service';
import { WaitingListDetails, WaitingListDetailsRequest } from '../waiting-lists/waiting-lists.model';
import { WorkOrderStateService } from './work-order-state.service';

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private workOrderListUrl = `${this._environment.getHousingAPIURL()
    }/patron-applications/v.1.0/patron-waiting-lists`;
  private index = 1;
  workOrders: WorkOrder = generateWorkOrders(5);

  constructor(
    private _proxy: HousingProxyService,
    private _environment: EnvironmentFacadeService,
    private _waitingListState: WaitingListStateService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _housingProxyService: HousingProxyService,
    private _workOrderStateService: WorkOrderStateService) { }

  getWorkOrders(): Observable<WorkOrder> {
    return of(this.workOrders);
  }

  removeFromWaitingList(patronWaitingListKey: number): Observable<boolean> {
    let urlRemove = this.workOrderListUrl + `/patron`;
    const queryParams = new HttpParams().set('patronWaitingListKey', `${patronWaitingListKey}`);
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
        group[questionName] = this._toFormControl(storedValue, question, waitingListsDetails);
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
    if(!(question instanceof QuestionWaitingListRequest)) {
      return question;
    }

    let values = [];
    if (question.facilitySelection || question.attributeSelection) {
      if (waitingListDetails.facilities != null)  {
        values = waitingListDetails.facilities.map((facility) => {
          return {
            label: facility.name,
            value: facility.facilityKey
          }
        });
      } else {
        values = waitingListDetails.attributes.map((attribute) => {
          return {
            label: attribute.value,
            value: attribute.value
          }
        });
      }
      
    }else {
      return new QuestionTextbox({
        name: `attribute-selection-${this.index++}`,
        type: 'text',
        label: 'Attribute value',
        subtype: 'text',
        dataType: 'String',
        readonly: false,
        required: true
      });
    }

    return new QuestionDropdown({
      label: question.label,
      name: `${waitingListDetails.attributes != null ? 'attribute' : 'facility'}-selection-${this.index++}`,
      values: values,
      required: true,
      readonly: false,
      type: 'select',
      dataType: 'String',
    });
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    waitingListDetails: WaitingListDetails
  ): FormControl {
    let value: any = storedValue;
    let disabled: boolean = false;

    if (!isDefined(value)) {
      if (question.consumerKey) {
        value = this._questionsService.getAttributeValue(waitingListDetails.patronAttributes, question) || '';
        disabled = true;
      } else if (waitingListDetails.patronWaitingList != null) {
        value = this._getSelectedWaitingListValue(waitingListDetails);
        disabled = true;
      }
    }

    return new FormControl({ value, disabled });
  }

  private _getSelectedWaitingListValue(waitingList: WaitingListDetails): string {
    let value: string = '';
    
    if (waitingList.facilities != null) {
      const item = waitingList.facilities
        .find(facility => 
            facility.facilityKey === Number(waitingList.patronWaitingList.selectedValue));

      value = item ? item.name : '';
    } else if (waitingList.attributes != null) {
      const item = waitingList.attributes
        .find(attribute => attribute.value === waitingList.patronWaitingList.selectedValue);
      
      value = item ? item.value : '';
    }
    
    return value;
  }

  next(formValue: any): Observable<any> {
    if (Object.keys(formValue).find(value => value.includes('attribute-selection')) ||
        Object.keys(formValue).find(value => value.includes('facility-selection'))) {
        this._waitingListState.setFormSelection(formValue);
    }
    
    return of(true);
  }
  
  submitWorkOrder(
    waitListKey: number,
    form: any): Observable<boolean> {
      let formQuestions;
      
      if (Object.keys(form).find(value => value.includes('attribute-selection')) ||
          Object.keys(form).find(value => value.includes('facility-selection'))) {
        formQuestions = Object.entries(form);
      } else {
        this._waitingListState.formSelection$
          .subscribe(d => formQuestions = Object.entries(d));
      }

      const selectedValue = formQuestions.find(([key, _]) => key.includes('attribute-selection'));
      const selectedFacility = formQuestions.find(([key, _]) => key.includes('facility-selection'));

      const attributeValue: string = selectedValue ? String(selectedValue[1]) : null;
      const facilityKey: number = selectedFacility ? Number(selectedFacility[1]) : null;

      const body = new WaitingListDetailsRequest({
        waitListKey,
        attributeValue,
        facilityKey
      });

      return this._housingProxyService.post<Response>(this.workOrderListUrl+'/patron', body).pipe(
        map((response: Response) => {
            if (isSuccessful(response.status)) {
              return true;
            } else {
              throw new Error(response.status.message);
            }
          }
        ),
        catchError(_ => of(false))
      );
  }
}