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
import { ImageData, WorkOrdersFields, Inspection } from './inspections-forms.model';
import { generateWorkOrders } from './inspections-forms.mock';
import { InspectionsStateService } from './inspections-forms-state.service';
import { parseJsonToArray } from '@sections/housing/utils';
import { QuestionTextbox } from '../questions/types/question-textbox';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private inspectiontUrl = `${this._environment.getHousingAPIURL()
    }/roomselectproxy/v.1.0/room-inspections-proxy`;

  constructor(
    private _proxy: HousingProxyService,
    private _environment: EnvironmentFacadeService,
    private _questionsStorageService: QuestionsStorageService,
    private _questionsService: QuestionsService,
    private _housingProxyService: HousingProxyService,
    private _inspectionStateService: InspectionsStateService,
    ) { }


  getFormDefinitionInspection(): Observable<any> {
    return this._inspectionStateService.getInspectionDetailsForm().pipe(
      map((res=>{
        const body =JSON.parse(res.formDefinition.applicationFormJson) 
        return body.filter(value => value.inventoryConditions)[0];
      }))
    )
  
  }

  private _getPages(
    pages: QuestionBase[][],
    storedQuestions: QuestionsEntries,
    inspectionDetails: Inspection
  ): QuestionsPage[] {
    return pages.map((page: QuestionBase[]) => ({
      form: this._toFormGroup(page, storedQuestions, inspectionDetails),
      questions: page,
    }));
  }

  private _toFormGroup(
    questions: QuestionBase[],
    storedQuestions: QuestionsEntries,
    inspectionDetails: Inspection
  ): FormGroup {
    return this._questionsService.toFormGroup(
      questions,
      storedQuestions,
      (group, question: QuestionFormControl, questionName: string, storedValue: string) => {
        group[questionName] = this._toFormControl(storedValue, question, inspectionDetails);
      }
    );
  }

  private _getQuestionsPages(inspectionDetails: Inspection): QuestionBase[][] {
    const questions: QuestionBase[][] = parseJsonToArray(inspectionDetails.formDefinition.applicationFormJson.slice(0, -1) + `,{\"name\": \"image\",\"type\": \"IMAGE\", \"label\": \"Image\", \"attribute\": null, \"workOrderFieldKey\" : \"IMAGE\", \"requiered\": false ,\"source\":\"WORK_ORDER\"},{\"name\": \"image\",\"type\": \"FACILITY\", \"label\": \"Image\", \"attribute\": null, \"workOrderFieldKey\" : \"FACILITY\", \"requiered\": false ,\"source\":\"WORK_ORDER\"}]`)
      .map((question: QuestionBase,i) => {
        console.log('questionnsss-->',question)
        const mappedQuestion = this._toWorkOrderListCustomType(question,inspectionDetails)
        return [].concat(mappedQuestion);
      });
    return this._questionsService.splitByPages(flat(questions));
  }

  private _toWorkOrderListCustomType(question: any, inspectionDetails: Inspection){
    let values = [];
    console.log(question)
    debugger;
    if(question.workOrderFieldKey === 'TYPE'){
      // values = inspectionDetails..map((v) => {
      //   return {
      //     label: v.name,
      //     value: v.key
      //   }
      // });
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
    workOrderDetails: Inspection
  ): FormControl {
    let value: any = storedValue;
    let disabled: boolean = false;
    let image : ImageData | null;

    const validators: ValidatorFn[] = [];

    if (question.required) {
      validators.push(Validators.required);
    }
    if(question.workOrderFieldKey === 'DESCRIPTION'){
      validators.push(Validators.maxLength(250))
    }

    if (question instanceof QuestionTextbox) {
      this._questionsService.addDataTypeValidator(question, validators);
    }

    // if(workOrderDetails.workOrderDetails){
    //   switch (question.workOrderFieldKey) {
    //     case WorkOrdersFields.PHONE_NUMBER:
    //       value = workOrderDetails.workOrderDetails.notificationPhone;
    //       break;
    //     case WorkOrdersFields.DESCRIPTION:
    //       value = workOrderDetails.workOrderDetails.description;
    //       break;
    //     case WorkOrdersFields.EMAIL:
    //       value = workOrderDetails.workOrderDetails.notificationEmail;
    //       break;
    //     case WorkOrdersFields.LOCATION:
    //       value = workOrderDetails.workOrderDetails.facilityKey;
    //       break;
    //     case WorkOrdersFields.NOTIFY_BY_EMAIL:
    //       value = workOrderDetails.workOrderDetails.notify? 'Yes' : 'No';
    //       break;
    //     case WorkOrdersFields.TYPE:
    //       value = workOrderDetails.workOrderDetails.typeKey;
    //       break;
    //     case WorkOrdersFields.IMAGE:
    //       // this._inspectionStateService.setWorkOrderImage(workOrderDetails.workOrderDetails.attachment)
    //       break;
    //   }
    //   return new FormControl({ value, disabled:true }, validators);
    // }

    return new FormControl({ value, disabled }, validators);
  }


  next(formValue: any): Observable<any> {
    return of(true);
  }

  submitInspection(inspectionData: Inspection): Observable<boolean> {
    // const parsedJson: any[] = parseJsonToArray(form.formDefinition.applicationFormJson);
    // const workOrdersControls: any[] = parsedJson.filter((control: any) => control && (control as QuestionFormControl).source === QUESTIONS_SOURCES.WORK_ORDER && control.workOrderField);


    return this._housingProxyService.post<Response>(this.inspectiontUrl, inspectionData).pipe(
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