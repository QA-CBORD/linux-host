import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { mergeMap, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalNavService {
  private readonly _isNavBarShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly _isNavBarMenuExpanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _isBackdropShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private modalStack: number = 0;

  constructor() {}

  get isNavBarMenuExpanded$(): Observable<boolean> {
    return this._isNavBarMenuExpanded$
      .asObservable()
      .pipe(mergeMap(isExpanded => this.isNavBarShown$.pipe(map(isNavBarShown => isExpanded && isNavBarShown))));
  }

  get isNavBarShown$(): Observable<boolean> {
    return this._isNavBarShown$.asObservable();
  }

  get isBackdropShown$(): Observable<boolean> {
    return combineLatest(this._isBackdropShown$, this.isNavBarMenuExpanded$).pipe(
      map(([isBackdropShown, isNavBarMenuExpanded]) => isBackdropShown || isNavBarMenuExpanded),
      distinctUntilChanged()
    );
  }

  /**
   * @description This method is only allowed to use within showhide-navbar-directive, section.page or guest-section.page.
   * please refer to the showhide-navbar directive in shared folder.
   */
  hideNavBar(): void {
    this._isNavBarShown$.next(false);
  }

  /**
   * @decrption This method is only allowed to use within showhide-navbar-directive, section.page or guest-section.page.
   * please refer to the showhide-navbar directive in shared folder.
   */
  showNavBar(): void {
    this._isNavBarShown$.next(true);
  }

  expandNavBarMenu() {
    this._isNavBarMenuExpanded$.next(true);
  }

  collapseNavBarMenu() {
    this._isNavBarMenuExpanded$.next(false);
  }

  notifyBackdropShown() {
    this.modalStack++;
    this.notifyBackdropState();
  }

  notifyBackdropHidden() {
    this.modalStack > 0 && this.modalStack--;
    this.notifyBackdropState();
  }

  private notifyBackdropState = () => this._isBackdropShown$.next(this.modalStack > 0);
}
