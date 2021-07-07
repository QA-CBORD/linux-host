import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WaitingList, WaitingListDetails } from './waiting-lists.model';

@Injectable({
  providedIn: 'root',
})
export class WaitingListStateService  {
  private readonly _defaultState = new WaitingListDetails ({
    facilities: [],
    attributes: [],
    formDefinition: {},
    waitListKey: 0
  });
  private waitingList: BehaviorSubject<WaitingList[]> = new BehaviorSubject<WaitingList[]>([]);
  private waitingListDetails: BehaviorSubject<WaitingListDetails> = new BehaviorSubject<WaitingListDetails>(this._defaultState);

  constructor() { }

  setWaitingList(value: WaitingList[]) {
    this.waitingList.next(value);
  }

  setWaitingListDetails(selectedSlot: WaitingListDetails): void {
    this.waitingListDetails.next(selectedSlot);
  }

  get waitingList$(){
    return this.waitingList;
  }

  get waitingListDetails$(): Observable<WaitingListDetails>{
    return this.waitingListDetails;
  }

}