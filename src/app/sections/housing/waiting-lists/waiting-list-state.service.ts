import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { WaitingList, WaitingListDetails } from './waiting-lists.model';

@Injectable({
  providedIn: 'root',
})
export class WaitingListStateService  {
  private readonly _defaultState = new WaitingListDetails ({
    facilities: [],
    attributes: [],
    formDefinition: {},
    patronAttributes: [],
    waitListKey: 0
  });
  private waitingList: BehaviorSubject<WaitingList[]> = new BehaviorSubject<WaitingList[]>([]);
  private waitingListDetails: BehaviorSubject<WaitingListDetails> = new BehaviorSubject<WaitingListDetails>(this._defaultState);
  private formSelection: BehaviorSubject<any> = new BehaviorSubject<any>({});

  setWaitingList(value: WaitingList[]) {
    this.waitingList.next(value);
  }

  setWaitingListDetails(selectedSlot: WaitingListDetails): void {
    this.waitingListDetails.next(selectedSlot);
  }

  setFormSelection(value: any) {
    this.formSelection.next(value);
  }

  get waitingList$(){
    return this.waitingList;
  }

  get waitingListDetails$(): Observable<WaitingListDetails>{
    return this.waitingListDetails;
  }

  get formSelection$(): Observable<any> {
    return this.formSelection;
  }

}