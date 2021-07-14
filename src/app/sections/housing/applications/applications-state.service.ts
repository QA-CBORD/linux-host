import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ApplicationDetails,
  RequestedRoommate,
  RoommateSearchOptions,
  RoommatePreferences,
  RoommatePreferencesOptions
} from './applications.model';

export interface ApplicationsState {
  entities: ApplicationEntities;
  applicationDetails: ApplicationDetails;
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
  };

  private roommateSearchOptions$: BehaviorSubject<RoommateSearchOptions> = new BehaviorSubject<RoommateSearchOptions>({}); 
  private roommatePreference$: BehaviorSubject<RoommatePreferencesOptions> = new BehaviorSubject<RoommatePreferencesOptions>({}); 
  private requestedRoommates$: BehaviorSubject<RequestedRoommate[]> = new BehaviorSubject<RequestedRoommate[]>([]);

  private readonly _applicationsStateSource: BehaviorSubject<ApplicationsState> = new BehaviorSubject<
    ApplicationsState
  >(this._defaultState);

  readonly applicationEntities$: Observable<ApplicationEntities> = this._applicationsStateSource.pipe(
    map(this._getEntities)
  );

  readonly applications$: Observable<ApplicationDetails[]> = this.applicationEntities$.pipe(
    map(this._getApplications.bind(this))
  );

  readonly applicationDetails$: Observable<ApplicationDetails> = this._applicationsStateSource.pipe(
    map(this._getApplicationDetails)
  );

  set applicationsState(value: ApplicationsState) {
    this._applicationsStateSource.next(value);
  }

  get applicationsState(): ApplicationsState {
    return this._applicationsStateSource.getValue();
  }

  get roommateSearchOptions(): Observable<RoommateSearchOptions> {
    return this.roommateSearchOptions$;
  }

  get requestedRoommates(): Observable<RequestedRoommate[]> {
    return this.requestedRoommates$;
  }
  
  get roommatePreferencesSelecteds(){
    return this.applicationsState.applicationDetails.roommatePreferences;
  }

  setApplications(applications: ApplicationDetails[]): void {
    this.applicationsState = { ...this.applicationsState, entities: this._toApplicationEntities(applications) };
  }

  setApplication(applicationKey: number, applicationDetails: ApplicationDetails) {
    const entites: ApplicationEntities = this.applicationsState.entities;

    this.applicationsState = {
      ...this.applicationsState,
      entities: { ...entites, [applicationKey]: applicationDetails },
      applicationDetails,
    };
  }

  setApplicationDetails(applicationDetails: ApplicationDetails): void {
    this.applicationsState = { ...this.applicationsState, applicationDetails };
  }

  setRoommateSearchOptions(options: RoommateSearchOptions): void {
    this.roommateSearchOptions$.next(options);
  }

  setRequestedRoommates(roommates: RequestedRoommate[]): void {
    this.requestedRoommates$.next(roommates);
  }
  
  setRoommatesPreferences(roommates: RoommatePreferences[]) {
    console.log('setRoommatesPreferences',roommates)
    this.applicationsState.applicationDetails.roommatePreferences= roommates
  }

  private _getEntities(state: ApplicationsState) {
    return state.entities;
  }

  private _getApplications(entities: ApplicationEntities) {
    return this._toApplicationsArray(entities);
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

  private _getApplicationDetails(state: ApplicationsState): ApplicationDetails {
    return state.applicationDetails;
  }
}
