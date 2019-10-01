import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Application, PatronApplication } from './applications.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsStateService {
  private readonly _applicationsState: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);

  private readonly _patronApplicationsState: BehaviorSubject<PatronApplication[]> = new BehaviorSubject<
    PatronApplication[]
  >([]);

  applications$: Observable<Application[]> = this._applicationsState.asObservable();

  patronApplications$: Observable<PatronApplication[]> = this._patronApplicationsState.asObservable();

  setApplications(applications: Application[]): void {
    this._applicationsState.next(applications);
  }

  setPatronApplications(applications: PatronApplication[]): void {
    this._patronApplicationsState.next(applications);
  }

  getApplicationsValue(): Application[] {
    return this._applicationsState.getValue();
  }

  getPatronApplicationsValue(): PatronApplication[] {
    return this._patronApplicationsState.getValue();
  }

  getApplicationById(applicationId: number): Observable<PatronApplication> {
    return this.patronApplications$.pipe(
      map((applications: PatronApplication[]) =>
        applications.find((application: PatronApplication) => application.applicationDefinitionId === applicationId)
      )
    );
  }
}
