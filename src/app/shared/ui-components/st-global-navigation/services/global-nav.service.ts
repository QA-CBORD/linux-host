import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalNavService {
  private readonly _isNavBarShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly _isNavBarMenuExpanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  get isNavBarMenuExpanded$(): Observable<boolean> {
    return this._isNavBarMenuExpanded$
      .asObservable()
      .pipe(mergeMap(isExpanded => this.isNavBarShown$.pipe(map(isNavBarShown => isExpanded && isNavBarShown))));
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

  expandNavBarMenu() {
    this._isNavBarMenuExpanded$.next(true);
  }

  collapseNavBarMenu() {
    this._isNavBarMenuExpanded$.next(false);
  }
}
