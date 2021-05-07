import { Injectable } from '@angular/core';
import { CheckInOut, CheckInOutSlot, CheckInOutSlot2 } from './check-in-out.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutStateService  {
  private checkInOuts: BehaviorSubject<CheckInOut[]> = new BehaviorSubject<CheckInOut[]>([]);
  private checkInOutSpots: Subject<CheckInOutSlot2> = new Subject<CheckInOutSlot2>();
  private _selectedCheckInOut: CheckInOut;
  private _selectedCheckInOutSlot: CheckInOutSlot2;

  constructor() { }

  setCheckInOuts(value: CheckInOut[]) {
    this.checkInOuts.next(value);
  }

  getSelectedCheckInOut(): CheckInOut {
    return this._selectedCheckInOut;
  }

  setActiveCheckInOutSlot(selectedSlot: CheckInOutSlot2): void {
    console.log('showing available spots', selectedSlot);
    this.checkInOutSpots.next(selectedSlot);
  }

  getSelectedCheckInOutSlot(): Observable<CheckInOutSlot2> {
    return this.checkInOutSpots;
  }
}