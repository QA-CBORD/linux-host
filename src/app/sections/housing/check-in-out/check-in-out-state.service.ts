import { Injectable } from '@angular/core';
import { CheckInOut, CheckInOutSpot } from './check-in-out.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutStateService  {
  public checkInOuts: BehaviorSubject<CheckInOut[]> = new BehaviorSubject<CheckInOut[]>([]);
  private checkInOutSpots: Subject<CheckInOutSpot> = new Subject<CheckInOutSpot>();
  private _selectedCheckInOut: CheckInOut;

  setCheckInOuts(value: CheckInOut[]) {
    this.checkInOuts.next(value);
  }

  getSelectedCheckInOut(): CheckInOut {
    return this._selectedCheckInOut;
  }

  setActiveCheckInOutSlot(selectedSlot: CheckInOutSpot): void {
    this.checkInOutSpots.next(selectedSlot);
  }

  getSelectedCheckInOutSlot(): Observable<CheckInOutSpot> {
    return this.checkInOutSpots;
  }
}