import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Application } from './applications.model';

export interface ApplicationEntities {
  [key: number]: Application;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationsStateService {
  private readonly _defaultState: any = {};

  private readonly _applicationsState: BehaviorSubject<ApplicationEntities> = new BehaviorSubject<ApplicationEntities>(
    this._defaultState
  );

  readonly applicationEntities$: Observable<ApplicationEntities> = this._applicationsState.asObservable();

  readonly applications$: Observable<Application[]> = this.applicationEntities$.pipe(
    map((entities: ApplicationEntities) => this._toApplicationsArray(entities))
  );

  set applicationEntities(value: ApplicationEntities) {
    this._applicationsState.next(value);
  }

  get applicationEntities(): ApplicationEntities {
    return this._applicationsState.getValue();
  }

  get applications(): Application[] {
    return this._toApplicationsArray(this.applicationEntities);
  }

  setApplications(applications: Application[]): void {
    this.applicationEntities = this._toApplicationEntities(applications);
  }

  reloadApplications(): void {
    this.applicationEntities = { ...this.applicationEntities };
  }

  getApplicationById(applicationId: number): Observable<Application> {
    return this.applicationEntities$.pipe(map((entities: ApplicationEntities) => entities[applicationId]));
  }

  private _toApplicationEntities(applications: Application[]): ApplicationEntities {
    return applications.reduce((entities: ApplicationEntities, application: Application) => {
      return {
        ...entities,
        [application.applicationDefinitionId]: application,
      };
    }, {});
  }

  private _toApplicationsArray(entities: ApplicationEntities): Application[] {
    return Object.keys(entities).map((key: string) => entities[parseInt(key, 10)]);
  }
}
