import { Injectable } from '@angular/core';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { HousingProxyService } from '../housing-proxy.service';
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from 'rxjs';
import { catchError, map, withLatestFrom, switchMap, take } from 'rxjs/operators';
import { QuestionsPage, QUESTIONS_SOURCES } from '../questions/questions.model';
import { QuestionsStorageService, QuestionsEntries } from '../questions/questions-storage.service';
import { QuestionBase } from '../questions/types/question-base';
import { QuestionsService } from '../questions/questions.service';
import { flat } from '../utils/flat';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionFormControl, QuestionFormControlOptions } from '../questions/types/question-form-control';
import { WorkOrder, WorkOrderDetails, ImageData, WorkOrdersFields } from './work-orders.model';
import { generateWorkOrders } from './work-orders.mock';
import { WorkOrderStateService } from './work-order-state.service';
import { parseJsonToArray } from '@sections/housing/utils';
import { QuestionTextbox } from '../questions/types/question-textbox';
import ImageService from './image.service';
import { ToastService } from '@core/service/toast/toast.service';
const NOTIFY = {
  YES: 'Yes',
  NO: 'No',
};

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private workOrderListUrl: string;

  constructor(
    private environment: EnvironmentFacadeService,
    private questionsStorageService: QuestionsStorageService,
    private questionsService: QuestionsService,
    private housingProxyService: HousingProxyService,
    private workOrderStateService: WorkOrderStateService,
    private imageService: ImageService,
    private toastService: ToastService
  ) {
    this.workOrderListUrl = `${this.environment.getHousingAPIURL()}/patron-applications/v.1.0/work-orders`;
  }

  getWorkOrders(): Observable<WorkOrder> {
    const workOrders: WorkOrder = generateWorkOrders(5);
    return of(workOrders);
  }

  getQuestions(key: number): Observable<QuestionsPage[]> {
    return this.questionsStorageService.getQuestions(key).pipe(
      withLatestFrom(this.workOrderStateService.workOrderDetails),
      map(([storedQuestions, workOrderDetails]: [QuestionsEntries, WorkOrderDetails]) => {
        const pages: QuestionBase[][] = this.getQuestionsPages(workOrderDetails);
        return this.getPages(pages, storedQuestions, workOrderDetails);
      })
    );
  }

  private getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    workOrderDetails: WorkOrderDetails
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this.toFormGroup(page, storedQuestions, workOrderDetails),
      questions: page,
    }));
  }

  private toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    workOrderDetails: WorkOrderDetails
  ): FormGroup {
    return this.questionsService.toFormGroup(
      questions,
      storedQuestions,
      (group, question: QuestionFormControl, questionName: string, storedValue: string) => {
        group[questionName] = this.toFormControl(storedValue, question, workOrderDetails);
      }
    );
  }

  private getQuestionsPages(workOrderDetails: WorkOrderDetails): QuestionBase[][] {
    const questionJson = workOrderDetails.formDefinition.applicationFormJson.slice(0, -1) +
      `,{"name": "image","type": "IMAGE", "label": "Image", "attribute": null, "workOrderFieldKey" : "IMAGE", "required": false ,"source":"WORK_ORDER"}]`;
    const questions: QuestionBase[][] = parseJsonToArray(questionJson).map((question: QuestionBase) => {
      const mappedQuestion = this.toWorkOrderListCustomType(question, workOrderDetails);
      return [].concat(mappedQuestion);
    });
    return this.questionsService.splitByPages(flat(questions));
  }

  private toWorkOrderListCustomType(question: QuestionFormControlOptions, workOrderDetails: WorkOrderDetails) {
    let values = [];

    if (question.workOrderFieldKey === 'TYPE') {
      values = workOrderDetails.workOrderTypes.map(v => ({
        label: v.name,
        value: v.key,
      }));
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
    } else if (question.workOrderFieldKey === WorkOrdersFields.LOCATION) {
      return this.createFacilityTreeQuestion();
    } else {
      return question;
    }
  }

  private toFormControl(
    storedValue: string,
    question: QuestionFormControl,
    workOrderDetails: WorkOrderDetails
  ): FormControl {
    let value: string | number = storedValue;
    const disabled = false;

    const validators = this.questionsService.getRequiredValidator(question);

    if (question.workOrderFieldKey === 'DESCRIPTION') {
      validators.push(Validators.maxLength(250));
    }

    if (question instanceof QuestionTextbox) {
      this.questionsService.addDataTypeValidator(question, validators);
    }

    if (workOrderDetails.workOrderDetails) {
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
          value = workOrderDetails.workOrderDetails.notify ? NOTIFY.YES : NOTIFY.NO;
          break;
        case WorkOrdersFields.TYPE:
          value = workOrderDetails.workOrderDetails.typeKey;
          break;
        case WorkOrdersFields.IMAGE:
          this.workOrderStateService.setWorkOrderImage(workOrderDetails.workOrderDetails.attachment);
          break;
      }
      return new FormControl({ value, disabled: true }, validators);
    }

    return new FormControl({ value, disabled }, validators);
  }

  next(): Observable<boolean> {
    return of(true);
  }

  submitWorkOrder(form: WorkOrderDetails, formValue: FormControl): Observable<boolean> {
    const parsedJson: string[] = parseJsonToArray(form.formDefinition.applicationFormJson);
    const workOrdersControls: string[] = parsedJson.filter(
      (control: QuestionFormControl | string) =>
        control && (control as QuestionFormControl).source === QUESTIONS_SOURCES.WORK_ORDER && (control as QuestionFormControl).workOrderField
    );
    const { body, image } = this.buildWorkOrderList(workOrdersControls, formValue);
    return this.housingProxyService.post<Response>(this.workOrderListUrl, body).pipe(
      catchError(() => {
        this.toastService.showToast({
          message: 'Error submitting work order.'
        });
        return of(false);
      }),
      switchMap((response: Response) => {
        if (image) return this.imageService.sendWorkOrderImage(response.data, image);
        return of(true);
      })
    );
  }

  private createFacilityTreeQuestion(): QuestionBase[] {
    const facilityTreeString = `[{"name": "image","type": "FACILITY", "label": "Image", "attribute": null, "workOrderFieldKey" : "FACILITY", "required": false ,"source":"WORK_ORDER"}]`;
    return parseJsonToArray(facilityTreeString);
  }

  private buildWorkOrderList(workOrdersControls: QuestionFormControlOptions[] | string[], formValue: FormControl) {
    let image: ImageData;
    let location: number;
    const controls: { [key: string]: string } = {
      [WorkOrdersFields.PHONE_NUMBER]: '',
      [WorkOrdersFields.DESCRIPTION]: '',
      [WorkOrdersFields.EMAIL]: '',
      [WorkOrdersFields.NOTIFY_BY_EMAIL]: '',
      [WorkOrdersFields.TYPE]: null,
    };

    workOrdersControls.forEach(control => {
      const resultFormValue = formValue[control.name];
      const fieldType = control.workOrderFieldKey;
      controls[fieldType] = resultFormValue;
    });

    this.workOrderStateService.workOrderImage.subscribe((value: ImageData) => (image = value));
    this.workOrderStateService
      .getSelectedFacility$()
      .pipe(take(1))
      .subscribe(res => {
        if ((res && res.id) || res.facilityKey) {
          location = res.id ? res.id : res.facilityKey;
        } else {
          location = null;
        }
      });
    return {   
      body: {
        ...controls,
        typeKey: controls[WorkOrdersFields.TYPE],
        notify: controls[WorkOrdersFields.NOTIFY_BY_EMAIL] === NOTIFY.YES,
        facilityKey: location
      },
      image,
    };
  }


}
