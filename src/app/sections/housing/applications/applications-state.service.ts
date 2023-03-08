import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ApplicationDetails,
  RequestedRoommate,
  RoommatePreferences,
  RoommateSearchOptions,
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
  private requestedRoommates$: BehaviorSubject<RequestedRoommate[]> = new BehaviorSubject<RequestedRoommate[]>([]);
  private maximunSelectedRoommates: number;
  private roommatePreferences: RoommatePreferences[];
  private requestedroommate: RequestedRoommate[] = [];
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

  setRequestedRoommate(value: RequestedRoommate) {
    this.requestedroommate.push(value);
    this.setRequestedRoommates(this.requestedroommate)
  }

  emptyRequestedRoommate() {
    this.requestedroommate = [];
  }

  getRequestedRoommate(): RequestedRoommate[] {
    return this.requestedroommate;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get applicationsState(): ApplicationsState {
    return this._applicationsStateSource.getValue();
  }

  get roommateSearchOptions(): Observable<RoommateSearchOptions> {
    return this.roommateSearchOptions$;
  }

  get requestedRoommates(): Observable<RequestedRoommate[]> {
    return this.requestedRoommates$;
  }

  getRoommateSearchOptions(): RoommateSearchOptions {
    return this.roommateSearchOptions$.getValue();
  }

  get roommatePreferencesSelecteds() {
    return this.applicationsState.applicationDetails.roommatePreferences;
  }

  deleteRoommatePreferencesSelecteds() {
    if(this.applicationsState.applicationDetails != null){
      this.applicationsState.applicationDetails.roommatePreferences = [];
    }
  }

  get requestingRoommate(): RoommatePreferences[] {
    return this.applicationsState.applicationDetails.requestingRoommates;
  }

  deleteRequestingRoommate(patronKeyRoommate: number) {
    if(this.applicationsState.applicationDetails.requestingRoommates.find( value => value.patronKeyRoommate === patronKeyRoommate)){
      const index = this.applicationsState.applicationDetails.requestingRoommates.findIndex( value => value.patronKeyRoommate === patronKeyRoommate)
      this.applicationsState.applicationDetails.requestingRoommates.splice(index, 1)
    }
  }

  deleteLocalRequestedRoommate(preferenceKey: number, patronKeyRoommate: number){
    if(this.requestedroommate.find( value => value.preferenceKey === preferenceKey && value.patronRoommateKey !== patronKeyRoommate)){
      const index = this.requestedroommate.findIndex( value => value.preferenceKey === preferenceKey && value.patronRoommateKey !== patronKeyRoommate)
      this.requestedroommate.splice(index, 1)
    }
  }

  setRequestingRoommate(requestingRoommate: RoommatePreferences[]){
    this.applicationsState.applicationDetails.requestingRoommates = requestingRoommate;
  }

  deleteOverrideRequestingRoommate(preferenceKey: number, patronKeyRoommate: number) {
    if(this.applicationsState.applicationDetails.roommatePreferences.find(value => value.preferenceKey === preferenceKey && value.patronKeyRoommate != patronKeyRoommate)){
      const index = this.applicationsState.applicationDetails.roommatePreferences.findIndex(value => value.preferenceKey === preferenceKey && value.patronKeyRoommate != patronKeyRoommate)
      this.applicationsState.applicationDetails.roommatePreferences.splice(index, 1)
    }
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
    this.roommatePreferences = roommates;
  }

  addRoommatesPreferences(addedRoommate: RoommatePreferences, isOverride = false) {
    let roommatePreference;
    if (isOverride) {
      roommatePreference = this.applicationsState.applicationDetails.roommatePreferences.find(roommate =>
        roommate.preferenceKey === addedRoommate.preferenceKey);
    } else {
      roommatePreference = this.applicationsState.applicationDetails.roommatePreferences.find(roommate =>
        roommate.preferenceKey === addedRoommate.preferenceKey &&
        roommate.patronKeyRoommate !== addedRoommate.patronKeyRoommate)
    }
    if (roommatePreference) {
      roommatePreference.patronKeyRoommate = addedRoommate.patronKeyRoommate;
      roommatePreference.firstName = addedRoommate.firstName;
      roommatePreference.lastName = addedRoommate.lastName;
    }

    if (!this.requestedroommate.some(roommate => roommate.patronRoommateKey === addedRoommate.patronKeyRoommate && roommate.preferenceKey === addedRoommate.preferenceKey)) {
      const roommateRequested = new RequestedRoommate(
        {
          'firstName': addedRoommate.firstName,
          'lastName': addedRoommate.lastName,
          'preferenceKey': addedRoommate.preferenceKey,
          'patronRoommateKey': addedRoommate.patronKeyRoommate,
          'middleName': addedRoommate.middleName? addedRoommate.middleName: '' ,
          'birthDate': addedRoommate.birthDate,
          'preferredName': addedRoommate.preferredName? addedRoommate.preferredName: '' ,
          'confirmed': true,
        });
      this.setRequestedRoommate(roommateRequested);
    }

  }

  setMaximumSelectedRoommates(maxRoommates: number) {
    this.maximunSelectedRoommates = maxRoommates;
  }

  setSubtractSelectedRoommates() {
    if (this.maximunSelectedRoommates > 0) {
      this.maximunSelectedRoommates--;
    }
  }

  get maximumSelectedRoommates() {
    return this.maximunSelectedRoommates;
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

  isSubmitted(termKey: number) {
    let isSubmitted;
    this.applications$.subscribe(res => {
      isSubmitted = res.find((applicationDetails: ApplicationDetails) => {
        if (applicationDetails.applicationDefinition.key === termKey && applicationDetails.patronApplication) {
          return applicationDetails.patronApplication.isApplicationSubmitted;
        }
        return false;
      });
    });
    return isSubmitted;
  }
}
