import { Injectable } from '@angular/core';
import { CheckInOut, CheckInOutSlot } from './check-in-out.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutStateService  {
  private checkInOuts: BehaviorSubject<CheckInOut[]> = new BehaviorSubject<CheckInOut[]>([]);
  private checkInOutSlots: BehaviorSubject<CheckInOutSlot[]> = new BehaviorSubject<CheckInOutSlot[]>([]);
  private _selectedCheckInOut: CheckInOut;


  constructor() { }

  setCheckInOuts(value: CheckInOut[]) {
    this.checkInOuts.next(value);
  }

  setCheckInOutSlots(value: CheckInOutSlot[]) {
    this.checkInOutSlots.next(value);
  }

  getSelectedCheckInOut(): CheckInOut {
    return this._selectedCheckInOut;
  }

  setActiveCheckInOut(checkInOutKey: number): void {
    console.log(`active check in out: ${checkInOutKey}`);
    // this.checkInOuts.subscribe(arr => {
    //   this._selectedCheckInOut = arr.find(checkInOut => checkInOut.key == checkInOutKey);
    // });
  }
}