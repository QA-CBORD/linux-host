import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inspection, FormDefinition} from './inspections-forms.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionsStateService  {
  private readonly _defaultState = new Inspection ({
  form: null,
  contractElementKey: null,
  sections: null,
  staffInspectionKey: null,
  isSubmitted: null,
  residentInspectionKey:null,
  });

  private readonly _defaultStateFormDetails = new FormDefinition ({
    id: 0,
    applicationDescription: "",
    applicationFormJson: '',
    applicationTitle: '',
    applicationTypeId: 0,
    applicationAvailableEndDateTime: '',
    applicationAvailableStartDateTime: '',
    cancellationDateTime: '',
    expirationDateTime:'',
    expireWhenAssigned: 0,
    numberOfDaysToExpire: 0,
    termId: 0,
    });
  // public workOrderDetails: BehaviorSubject<WorkOrderDetails> = new BehaviorSubject<WorkOrderDetails>(this._defaultStateDetails);
  public inspectionList: BehaviorSubject<any> = new BehaviorSubject<any>(this._defaultState);
  public inspectionForm: BehaviorSubject<Inspection> = new BehaviorSubject<Inspection>(this._defaultState);
  // public workOrderFormDetails: BehaviorSubject<FormDefinition> = new BehaviorSubject<FormDefinition>(this._defaultStateFormDetails);
  public workOrderImage: BehaviorSubject<ImageData> = new BehaviorSubject<ImageData>(null)
  // public selectedFacility$: BehaviorSubject<NamedIdentity> = new BehaviorSubject<NamedIdentity>(null);
  constructor() {
   
  }

  setInspection(value: Inspection) {
    this.inspectionForm.next(value);
  }

  setInspectionList(value: any){

  }

  get inspectionForm$() {
    return this.inspectionForm;
  }


  setWorkOrderImage(imageData: ImageData){
    this.workOrderImage.next(imageData);
  }

  // setSelectedFacilityTree(value: NamedIdentity) {
  //   this.selectedFacility$.next(value);
  // }

  // destroyWorkOrderImage(){
  //   this.workOrderImage.next(null);
  // }

  get workOrderImage$(){
    return this.workOrderImage;
  }

  get inspectionForms$(){
    return this.inspectionForm;
  }
  get inspectionList$(){
    return this.inspectionList;
  }

  // getSelectedFacility$(){
  //   return this.selectedFacility$;
  // }

  // clearSelectedFacility() {
  //   this.selectedFacility$.next(null)
  // }
}
