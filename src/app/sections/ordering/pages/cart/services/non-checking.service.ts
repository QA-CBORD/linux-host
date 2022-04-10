import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NonCheckingSummary } from '../models/success-summary.model';

@Injectable({
  providedIn: 'root',
})
export class NonCheckingService {
  private summary: NonCheckingSummary = {};
  private readonly _summary$: BehaviorSubject<NonCheckingSummary> = new BehaviorSubject<NonCheckingSummary>(
    this.summary
  );

  setSummary(summary: NonCheckingSummary) {
    this.summary = { ...summary };
    this._summary$.next(this.summary);
  }

  get summary$(): Observable<NonCheckingSummary> {
    return this._summary$.asObservable();
  }
}
