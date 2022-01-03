import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { QuestionsPage } from '../questions/questions.model';
import { QuestionsStorageService, QuestionsEntries, StoredApplication } from '../questions/questions-storage.service';
import { QuestionBase } from '../questions/types/question-base';
import { QuestionsService } from '../questions/questions.service';
import { flat } from '../utils/flat';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionFormControl } from '../questions/types/question-form-control';
import { HttpParams } from "@angular/common/http";
import { WorkOrder, WorkOrderDetails } from './work-orders.model';
import { generateWorkOrders } from './work-orders.mock';
import { WaitingListStateService } from '../waiting-lists/waiting-list-state.service';
import { WaitingListDetails, WaitingListDetailsRequest } from '../waiting-lists/waiting-lists.model';
import { WorkOrderStateService } from './work-order-state.service';

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private workOrderListUrl = `${this._environment.getHousingAPIURL()
    }/patron-applications/v.1.0/work-orders`;
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
    return this._questionsStorageService.getQuestions(key).pipe(
      withLatestFrom(this._workOrderStateService.workOrderDetails),
      map(([storedQuestions, workOrderDetails]: [QuestionsEntries, WorkOrderDetails]) => {
        const pages: QuestionBase[][] = this._getQuestionsPages(workOrderDetails);

        // const patronApplication: PatronApplication = workOrderDetails.patronApplication;
        // const status: ApplicationStatus = patronApplication && patronApplication.status;
        // const isSubmitted = status === ApplicationStatus.Submitted;

        return this._getPages(pages, storedQuestions, workOrderDetails);
      })
    );
  }

  private _getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    workOrderDetails: WorkOrderDetails
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, storedQuestions, workOrderDetails),
      questions: page,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    workOrderDetails: WorkOrderDetails
  ): FormGroup {
    return this._questionsService.toFormGroup(
      questions,
      storedQuestions,
      (group, question: QuestionFormControl, questionName: string, storedValue: string) => {
        group[questionName] = this._toFormControl(storedValue, question, workOrderDetails);
      }
    );
  }

  private _getQuestionsPages(workOrderListDetails: WorkOrderDetails): QuestionBase[][] {
    const questions: QuestionBase[][] = this._questionsService
      .getQuestions(workOrderListDetails.formDefinition.applicationFormJson)
      .map((question: QuestionBase) => {
        return [].concat(question);
      });
    //TODO: add question upload image
    
    questions[7].push({'type':'image-upload','label':'Image','attribute':''})
    console.log(questions)
    return this._questionsService.splitByPages(flat(questions));
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    waitingListDetails: WorkOrderDetails
  ): FormControl {
    let value: any = storedValue;
    let disabled: boolean = false;

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