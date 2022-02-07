import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { QuestionsPage, QUESTIONS_SOURCES } from '../questions/questions.model';
import { QuestionsStorageService, QuestionsEntries } from '../questions/questions-storage.service';
import { QuestionBase } from '../questions/types/question-base';
import { QuestionsService } from '../questions/questions.service';
import { flat } from '../utils/flat';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { QuestionFormControl } from '../questions/types/question-form-control';
import { HttpParams } from "@angular/common/http";
import { WorkOrder, WorkOrderDetails, WorkOrdersDetailsList, ImageData, WorkOrdersFields } from './work-orders.model';
import { generateWorkOrders } from './work-orders.mock';
import { WaitingListStateService } from '../waiting-lists/waiting-list-state.service';
import { WorkOrderStateService } from './work-order-state.service';
import { parseJsonToArray } from '@sections/housing/utils';
import { QuestionTextbox } from '../questions/types/question-textbox';

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private workOrderListUrl = `${this._environment.getHousingAPIURL()
    }/patron-applications/v.1.0/work-orders`;
  workOrders: WorkOrder = generateWorkOrders(5);

  constructor(
    private _proxy: HousingProxyService,
    private _environment: EnvironmentFacadeService,
    private _waitingListState: WaitingListStateService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _housingProxyService: HousingProxyService,
    private _workOrderStateService: WorkOrderStateService,) { }

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

  private _getQuestionsPages(workOrderDetails: WorkOrderDetails): QuestionBase[][] {
    const questions: QuestionBase[][] = parseJsonToArray(workOrderDetails.formDefinition.applicationFormJson.slice(0, -1) + `,{\"name\": \"image\",\"type\": \"IMAGE\", \"label\": \"Image\", \"attribute\": null, \"workOrderFieldKey\" : \"IMAGE\", \"requiered\": false ,\"source\":\"WORK_ORDER\"},{\"name\": \"image\",\"type\": \"FACILITY\", \"label\": \"Image\", \"attribute\": null, \"workOrderFieldKey\" : \"FACILITY\", \"requiered\": false ,\"source\":\"WORK_ORDER\"}]`)
      .map((question: QuestionBase,i) => {
        const mappedQuestion = this._toWorkOrderListCustomType(question,workOrderDetails)
        return [].concat(mappedQuestion);
      });
    return this._questionsService.splitByPages(flat(questions));
  }

  private _toWorkOrderListCustomType(question: any, workOrderDetails: WorkOrderDetails){
    let values = [];

    if(question.workOrderFieldKey === 'TYPE'){
      values = workOrderDetails.workOrderTypes.map((v) => {
        return {
          label: v.name,
          value: v.key
        }
      });
      return {
        label: question.label,
        name: question.name,
        values: values,
        required: question.required,
        source: question.source,
        readonly: false,
        type: 'select',
        dataType: 'String',
        workOrderField: true,
        workOrderFieldKey: question.workOrderFieldKey,
      };
    }else {
      return question;
    }
    
  }

  private _toFormControl(
    storedValue: any,
    question: QuestionFormControl,
    workOrderDetails: WorkOrderDetails
  ): FormControl {
    let value: any = storedValue;
    let disabled: boolean = false;
    let image : ImageData | null;

    const validators: ValidatorFn[] = [];

    if (question.required && question.workOrderFieldKey != WorkOrdersFields.TYPE) {
      validators.push(Validators.required);
    }
    if(question.workOrderFieldKey === 'DESCRIPTION'){
      validators.push(Validators.maxLength(250))
    }

    if (question instanceof QuestionTextbox) {
      this._questionsService.addDataTypeValidator(question, validators);
    }

    if(workOrderDetails.workOrderDetails){
      switch (question.workOrderFieldKey) {
        case WorkOrdersFields.PHONE_NUMBER:
          value = workOrderDetails.workOrderDetails.notificationPhone;
          break;
        case WorkOrdersFields.DESCRIPTION:
          value = workOrderDetails.workOrderDetails.description;
          break;
        case WorkOrdersFields.EMAIL:
          value = workOrderDetails.workOrderDetails.notificationEmail;
          break;
        case WorkOrdersFields.LOCATION:
          value = workOrderDetails.workOrderDetails.facilityKey;
          break;
        case WorkOrdersFields.NOTIFY_BY_EMAIL:
          value = workOrderDetails.workOrderDetails.notify? 'Yes' : 'No';
          break;
        case WorkOrdersFields.TYPE:
          value = workOrderDetails.workOrderDetails.typeKey;
          break;
        case WorkOrdersFields.IMAGE:
          this._workOrderStateService.setWorkOrderImage(workOrderDetails.workOrderDetails.attachment)
          break;
      }
      return new FormControl({ value, disabled:true }, validators);
    }

    return new FormControl({ value, disabled }, validators);
  }


  next(formValue: any): Observable<any> {
    return of(true);
  }

  submitWorkOrder(
    form: any,
    formValue: any): Observable<boolean> {
    const parsedJson: any[] = parseJsonToArray(form.formDefinition.applicationFormJson);
    const workOrdersControls: any[] = parsedJson.filter((control: any) => control && (control as QuestionFormControl).source === QUESTIONS_SOURCES.WORK_ORDER && control.workOrderField);

    let phoneNumber, description, email = '';
    let notifyByEmail: boolean;
    let type,location = 0;
    let image : ImageData | null;
    workOrdersControls.forEach(x => {
        const resultFormValue = formValue[x.name];
        switch (x.workOrderFieldKey) {
          case WorkOrdersFields.PHONE_NUMBER:
            phoneNumber = resultFormValue;
            break;
          case WorkOrdersFields.DESCRIPTION:
            description = resultFormValue;
            break;
          case WorkOrdersFields.EMAIL:
            email = resultFormValue;
            break;
          case WorkOrdersFields.NOTIFY_BY_EMAIL:
            notifyByEmail = resultFormValue? true: false;
            break;
          case WorkOrdersFields.TYPE:
            type = resultFormValue;
            break;
        }
      

    })

    this._workOrderStateService.workOrderImage$.subscribe(res=> res && res.studentSubmitted ? image = res: image = null)
    this._workOrderStateService.getSelectedFacility$().subscribe(res=> res && res.facilityKey ? location = res.facilityKey: location = null)
    const body = new WorkOrdersDetailsList({
      key:null,
      notificationPhone: phoneNumber, 
      typeKey: type,
      description: description,
      notificationEmail: email,
      attachment: image,
      facilityKey:location,
      notify: notifyByEmail,
      status:'',
      statusKey:0,
      type: '',
      requestedDate:'',
    });

    return this._housingProxyService.post<Response>(this.workOrderListUrl, body).pipe(
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