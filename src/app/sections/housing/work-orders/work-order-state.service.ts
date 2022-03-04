import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkOrder, WorkOrderDetails, FormDefinition, ImageData, NamedIdentity } from './work-orders.model';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderStateService  {
  private readonly _defaultState = new WorkOrder ({
  canSubmit: null,
  workOrders: [],
  });
  private readonly _defaultStateDetails = new WorkOrderDetails ({
    workOrderKey: 0,
    workOrderDetails: null,
    formDefinition: null,
    workOrderTypes: null,
    facilityTree: null
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
  public workOrderDetails: BehaviorSubject<WorkOrderDetails> = new BehaviorSubject<WorkOrderDetails>(this._defaultStateDetails);
  public workOrder: BehaviorSubject<WorkOrder> = new BehaviorSubject<WorkOrder>(this._defaultState);
  public workOrderFormDetails: BehaviorSubject<FormDefinition> = new BehaviorSubject<FormDefinition>(this._defaultStateFormDetails);
  public workOrderImage: BehaviorSubject<ImageData> = new BehaviorSubject<ImageData>(null);
  public selectedFacility$: BehaviorSubject<NamedIdentity> = new BehaviorSubject<NamedIdentity>(null);
  public workOrderImageBlob: BehaviorSubject<FormData> = new BehaviorSubject<FormData>(null);
  constructor() {
   
  }

  setWorkOrder(value: WorkOrder) {
    this.workOrder.next(value);
  }

  setWorkOrderDetails(workOrderDetails: WorkOrderDetails){
    this.workOrderDetails.next(workOrderDetails);
  }

  setWorkOrderFormDetails(workOrderFormDetails: FormDefinition){
    this.workOrderFormDetails.next(workOrderFormDetails);
  }

  setWorkOrderImage(imageData: ImageData){
    this.workOrderImage.next(imageData);
  }

  setSelectedFacilityTree(value: NamedIdentity) {
    this.selectedFacility$.next(value);
  }

  destroyWorkOrderImage(){
    this.workOrderImage.next(null);
  }

  get workOrderImage$(){
    return this.workOrderImage;
  }

  get workOrder$(){
    return this.workOrder
  }

  getSelectedFacility$(){
    return this.selectedFacility$;
  }

  clearSelectedFacility() {
    this.selectedFacility$.next(null)
  }

  setWorkOrderImageBlob(value: FormData){
    this.workOrderImageBlob.next(value)
  }

  destroyWorkOrderImageBlob(){
    this.workOrderImageBlob.next(null);
  }
  
  get WorkOrderImageBlob(){
    return this.workOrderImageBlob;
  }
}
