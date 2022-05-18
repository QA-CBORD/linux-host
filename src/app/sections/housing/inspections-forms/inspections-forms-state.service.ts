import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inspection, FormDefinition, Inspections, InspectionsData } from './inspections-forms.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionsStateService  {

  private readonly _defaultInspectionsListState = new Inspections ({
    residentInspectionKey: null,
    staffInspectionKey: null,
    contractKey: null,
    isSubmitted: null,
    checkIn: null,
    scheduleDate: null,
    dueDate: null,
    inspectionDate: null,
    facilityLocation: null,
    formTitle: null,
    totalItems: null,
    remainingItems: null,
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
  private inspectionList: BehaviorSubject<Inspections[]> = new BehaviorSubject<Inspections[]>([]);
  private inspectionForm: BehaviorSubject<Inspection> = new BehaviorSubject<Inspection>(null);
  public workOrderImage: BehaviorSubject<ImageData> = new BehaviorSubject<ImageData>(null)
  constructor() {
   
  }

  setInspectionForm(value: Inspection) {
    this.inspectionForm.next(value);
  }

  setInspectionList(value: Inspections[]){
    this.inspectionList.next(value);
  }

  get inspectionForm$() : BehaviorSubject<Inspection> {
    return this.inspectionForm;
  }

  getInspectionDetailsForm(): Observable<Inspection>{
    return this.inspectionForm.asObservable();
  }


  setInspectImage(imageData: ImageData){
    this.workOrderImage.next(imageData);
  }

  get workOrderImage$(){
    return this.workOrderImage;
  }

  get inspectionList$(): BehaviorSubject<Inspections[]>{
    return this.inspectionList;
  }
}
