import { Injectable, SecurityContext } from '@angular/core';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { HousingProxyService } from '../housing-proxy.service';
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from 'rxjs';
import { catchError, map, withLatestFrom, switchMap, take } from 'rxjs/operators';
import { isSuccessful } from '@sections/housing/utils/is-successful';
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
import { Filesystem, Directory as FilesystemDirectory } from '@capacitor/filesystem';
import { DomSanitizer } from '@angular/platform-browser';

const NOTIFY = {
  YES: 'Yes',
  NO: 'No',
};

const IMAGE_DIR = 'stored-images';
@Injectable({
  providedIn: 'root',
})
export class WorkOrdersService {
  private workOrderListUrl = `${this._environment.getHousingAPIURL()}/patron-applications/v.1.0/work-orders`;
  workOrders: WorkOrder = generateWorkOrders(5);

  private readonly MAX_WIDTH = 320;
  private readonly MAX_HEIGHT = 180;
  private readonly MIME_TYPE = 'image/png';
  private readonly QUALITY = 0.7;

  constructor(
    private _proxy: HousingProxyService,
    private _environment: EnvironmentFacadeService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _housingProxyService: HousingProxyService,
    private _workOrderStateService: WorkOrderStateService,
    private sanitizer: DomSanitizer
  ) {}

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
      (control: any) =>
        control && (<QuestionFormControl>control).source === QUESTIONS_SOURCES.WORK_ORDER && control.workOrderField
    );
    const { body, image } = this.buildWorkOrderList(workOrdersControls, formValue);

    return this._housingProxyService.post<Response>(this.workOrderListUrl, body).pipe(
      catchError(() => of(false)),
      switchMap((response: Response) => {
        if (image) return this.sendWorkOrderImage(response.data, image);

        return of(true);
      })
    );
  }

  sendWorkOrderImage(workOrderId: number, imageData: ImageData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const workOrderImageURL = `${this.workOrderListUrl}/attachments`;

      const img = new Image();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      img.onerror = event => {
        reject('error load');
      };
      img.onload = async () => {
        const [newWidth, newHeight] = this.calculateSize(img, this.MAX_WIDTH, this.MAX_HEIGHT);
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          async blob => {
            const data = (await this.convertBlobToBase64(blob)) as string;

            const attachmentFile = data.replace(/^data:(.*,)?/, '');
            const body = new ImageData({
              filename: imageData.filename,
              comments: 'student submitted attachment',
              contents: attachmentFile,
              studentSubmitted: true,
              workOrderKey: workOrderId,
            });

            this._housingProxyService
              .post<Response>(workOrderImageURL, body)
              .pipe(take(1))
              .subscribe((response: Response) => {
                if (isSuccessful(response.status)) {
                  this._workOrderStateService.destroyWorkOrderImageBlob();
                  this.deleteImage();
                  resolve(true);
                  return true;
                } else {
                  throw new Error(response.status.message);
                }
              });
          },
          this.MIME_TYPE,
          this.QUALITY
        );

        resolve(true);
      };
      img.src = this.sanitizer.sanitize(SecurityContext.URL, imageData?.photoUrl);
    });
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private calculateSize(img: any, maxWidth: number, maxHeight: number): number[] {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }

  async deleteImage() {
    await Filesystem.rmdir({
      directory: FilesystemDirectory.Data,
      path: `${IMAGE_DIR}`,
      recursive: true,
    });
  }

  private createFacilityTreeQuestion() {
    // eslint-disable-next-line no-useless-escape
    const facilityTreeString = `[{"name": "image","type": "FACILITY", "label": "Image", "attribute": null, "workOrderFieldKey" : "FACILITY", "requiered": false ,"source":"WORK_ORDER"}]`;
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
}
