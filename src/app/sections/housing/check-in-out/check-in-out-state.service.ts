import { Injectable } from '@angular/core';
import { CheckInOut } from './check-in-out.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutStateService  {

  private checkInOuts: BehaviorSubject<CheckInOut[]> = new BehaviorSubject<CheckInOut[]>([]);

  constructor() {
   
  }

  setCheckInOuts(value: CheckInOut[]) {
    this.checkInOuts.next(value);
  }
}