import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationDetails } from './applications.model';

export interface ApplicationsState {
  entities: ApplicationEntities;
  applicationDetails: ApplicationDetails;
  loading: boolean;
  loaded: boolean;
}

export interface ApplicationEntities {
  [key: number]: ApplicationDetails;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationsStateService {
  private readonly _defaultState: ApplicationsState = {
    entities: {},
    applicationDetails: null,
    loading: false,
    loaded: false,
  };

  private readonly _applicationsStateSource: BehaviorSubject<ApplicationsState> = new BehaviorSubject<
    ApplicationsState
  >(this._defaultState);

  readonly applicationsState$: Observable<ApplicationsState> = this._applicationsStateSource.asObservable();

  readonly applicationEntities$: Observable<ApplicationEntities> = this.applicationsState$.pipe(map(this._getEntities));

  readonly applications$: Observable<ApplicationDetails[]> = this.applicationEntities$.pipe(
    map(this._getApplications.bind(this))
  );

  readonly applicationDetails$: Observable<ApplicationDetails> = this.applicationsState$.pipe(
    map(this._getApplicationDetails)
  );

  readonly loading$: Observable<boolean> = this.applicationsState$.pipe(map(this._getLoading));

  readonly loaded$: Observable<boolean> = this.applicationsState$.pipe(map(this._getLoaded));

  set applicationsState(value: ApplicationsState) {
    this._applicationsStateSource.next(value);
  }

  get applicationState(): ApplicationsState {
    return this._applicationsStateSource.getValue();
  }

  setApplications(applications: ApplicationDetails[]): void {
    this.applicationsState = { ...this.applicationsState, entities: this._toApplicationEntities(applications) };
  }

  setApplicationDetails(applicationDetails: ApplicationDetails): void {
    this.applicationsState = { ...this.applicationsState, applicationDetails };
  }

  setLoading(loading: boolean): void {
    this.applicationsState = { ...this.applicationsState, loading };
  }

  setLoaded(loaded: boolean): void {
    this.applicationsState = { ...this.applicationsState, loaded };
  }

  private _getEntities(state: ApplicationsState) {
    return state.entities;
  }

  private _getApplications(entities: ApplicationEntities) {
    return this._toApplicationsArray(entities);
  }

  private _getApplicationDetails(state: ApplicationsState) {
    return state.applicationDetails;
  }

  private _getLoading(state: ApplicationsState): boolean {
    return state.loading;
  }

  private _getLoaded(state: ApplicationsState): boolean {
    return state.loaded;
  }

  private _toApplicationEntities(applications: ApplicationDetails[]): ApplicationEntities {
    return applications.reduce((entities: ApplicationEntities, application: ApplicationDetails) => {
      return {
        ...entities,
        [application.applicationDefinition.key]: application,
      };
    }, {});
  }

  private _toApplicationsArray(entities: ApplicationEntities): ApplicationDetails[] {
    return Object.keys(entities).map((key: string) => entities[parseInt(key, 10)]);
  }
}
