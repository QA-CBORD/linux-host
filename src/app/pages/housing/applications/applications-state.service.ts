import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PatronApplication } from './applications.model';

export interface PatronApplicationEntity {
  [key: number]: PatronApplication;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationsStateService {
  private readonly _defaultState: any = {};

  private readonly _patronApplicationsState: BehaviorSubject<PatronApplicationEntity> = new BehaviorSubject<
    PatronApplicationEntity
  >(this._defaultState);

  readonly patronApplicationEntities$: Observable<
    PatronApplicationEntity
  > = this._patronApplicationsState.asObservable();

  readonly patronApplications$: Observable<PatronApplication[]> = this.patronApplicationEntities$.pipe(
    map((entities: PatronApplicationEntity) => this._toPatronApplicationsArray(entities))
  );

  set patronApplicationEntities(value: PatronApplicationEntity) {
    this._patronApplicationsState.next(value);
  }

  get patronApplicationEntities(): PatronApplicationEntity {
    return this._patronApplicationsState.getValue();
  }

  get patronApplications(): PatronApplication[] {
    return this._toPatronApplicationsArray(this.patronApplicationEntities);
  }

  setPatronApplications(applications: PatronApplication[]): void {
    const applicationEntities: PatronApplicationEntity = this._toPatronApplicationsEntities(applications);

    this._patronApplicationsState.next(applicationEntities);
  }

  setPatronApplicationSubmitted(applicationId: number) {
    const foundApplication: PatronApplication = this.patronApplicationEntities[applicationId];

    if (foundApplication) {
      const currentDateTime: string = new Date().toISOString().slice(0, -1);

      this.patronApplicationEntities = {
        ...this.patronApplicationEntities,
        [applicationId]: {
          ...foundApplication,
          isApplicationSubmitted: true,
          submittedDateTime: currentDateTime,
          modifiedDate: currentDateTime,
        },
      };
    }
  }

  getPatronApplicationById(applicationId: number): Observable<PatronApplication> {
    return this.patronApplicationEntities$.pipe(map((entities: PatronApplicationEntity) => entities[applicationId]));
  }

  private _toPatronApplicationsEntities(applications: PatronApplication[]): PatronApplicationEntity {
    return applications.reduce((entities: PatronApplicationEntity, application: PatronApplication) => {
      return {
        ...entities,
        [application.applicationDefinitionId]: application,
      };
    }, {});
  }
  private _toPatronApplicationsArray(entities: PatronApplicationEntity): PatronApplication[] {
    return Object.keys(entities).map((key: string) => entities[parseInt(key, 10)]);
  }
}
