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
import { ToastController } from '@ionic/angular';
import ImageService from './image.service';

const NOTIFY = {
  YES: 'Yes',
  NO: 'No',
};

@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private workOrderListUrl = `${this._environment.getHousingAPIURL()}/patron-applications/v.1.0/work-orders`;
  workOrders: WorkOrder = generateWorkOrders(5);


  constructor(
    private _environment: EnvironmentFacadeService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _housingProxyService: HousingProxyService,
    private _workOrderStateService: WorkOrderStateService,
    private toastController: ToastController,
    private _imageService: ImageService
  ) { }

  getWorkOrders(): Observable<WorkOrder> {
    return of(this.workOrders);
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
    // eslint-disable-next-line no-useless-escape
    const questions: QuestionBase[][] = parseJsonToArray(
      workOrderDetails.formDefinition.applicationFormJson.slice(0, -1) +
      `,{"name": "image","type": "IMAGE", "label": "Image", "attribute": null, "workOrderFieldKey" : "IMAGE", "requiered": false ,"source":"WORK_ORDER"}]`
    ).map((question: QuestionBase) => {
      const mappedQuestion = this._toWorkOrderListCustomType(question, workOrderDetails);
      return [].concat(mappedQuestion);
    });
    return this._questionsService.splitByPages(flat(questions));
  }

  private _toWorkOrderListCustomType(question: QuestionFormControlOptions, workOrderDetails: WorkOrderDetails) {
    let values = [];

    if (question.workOrderFieldKey === 'TYPE') {
      values = workOrderDetails.workOrderTypes.map(v => {
        return {
          label: v.name,
          value: v.key,
        };
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
    } else if (question.workOrderFieldKey === WorkOrdersFields.LOCATION) {
      return this.createFacilityTreeQuestion();
    } else {
      return question;
    }
  }

  private _toFormControl(
    storedValue: string,
    question: QuestionFormControl,
    workOrderDetails: WorkOrderDetails
  ): FormControl {
    let value: string | number = storedValue;
    const disabled = false;

    const validators = this._questionsService.getRequiredValidator(question);

    if (question.workOrderFieldKey === 'DESCRIPTION') {
      validators.push(Validators.maxLength(250));
    }

    if (question instanceof QuestionTextbox) {
      this._questionsService.addDataTypeValidator(question, validators);
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
          this._workOrderStateService.setWorkOrderImage(workOrderDetails.workOrderDetails.attachment);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const workOrdersControls: string[] = parsedJson.filter(
      (control: QuestionFormControl | string) =>
        control && (<QuestionFormControl>control).source === QUESTIONS_SOURCES.WORK_ORDER && (<QuestionFormControl>control).workOrderField
    );
    const { body, image } = this.buildWorkOrderList(workOrdersControls, formValue);
    return this._housingProxyService.post<Response>(this.workOrderListUrl, body).pipe(
      catchError(() => {
        this.presentErrorToast();
        return of(false);
      }),
      switchMap((response: Response) => {
        if (image) return this._imageService.sendWorkOrderImage(response.data, image);
        return of(true);
      })
    );
  }



  private createFacilityTreeQuestion() {
    // eslint-disable-next-line no-useless-escape
    const facilityTreeString = `[{\"name\": \"image\",\"type\": \"FACILITY\", \"label\": \"Image\", \"attribute\": null, \"workOrderFieldKey\" : \"FACILITY\", \"requiered\": false ,\"source\":\"WORK_ORDER\"}]`;
    return parseJsonToArray(facilityTreeString);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildWorkOrderList(workOrdersControls: any[], formValue: FormControl) {
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

    this._workOrderStateService.workOrderImage$.pipe(take(1)).subscribe(res => {
      image = null;
      if (res && res.studentSubmitted) {
        image = res;
      }
    });

    this._workOrderStateService
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
        notificationPhone: controls[WorkOrdersFields.PHONE_NUMBER] ? controls[WorkOrdersFields.PHONE_NUMBER] : '',
        notificationEmail: controls[WorkOrdersFields.EMAIL] ? controls[WorkOrdersFields.EMAIL] : '',
        typeKey: controls[WorkOrdersFields.TYPE],
        description: controls[WorkOrdersFields.DESCRIPTION],
        notify: controls[WorkOrdersFields.NOTIFY_BY_EMAIL] === NOTIFY.YES,
        facilityKey: location,
        key: null,
        status: '',
        statusKey: 0,
        type: '',
        requestedDate: '',
      },
      image,
    };
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'There was a problem with this submission. Try again or contact the Housing office.',
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }
}
