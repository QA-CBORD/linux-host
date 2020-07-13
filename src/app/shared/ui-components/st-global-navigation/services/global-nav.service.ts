import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalNavService {
  private readonly _isNavBarShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  get isNavBarShown$(): Observable<boolean> {
    return this._isNavBarShown$.asObservable();
  }

  hideNavBar(): void {
    this._isNavBarShown$.next(false);
  }

  showNavBar(): void {
    this._isNavBarShown$.next(true);
  }
}
