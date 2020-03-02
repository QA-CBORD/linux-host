import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { STORAGE_KEY } from '../housing.config';

import {
  ObservableStorage,
  ObservableStorageService,
} from '@shared/services/observable-storage/observable-storage.service';

import { ApplicationStatus, PatronApplication } from '../applications/applications.model';
import { ObservableSessionStorageService } from '@shared/services/observable-session-storage/observable-session-storage.service';

export interface QuestionsEntries {
  [key: string]: any;
}

export interface StoredApplication {
  questions: QuestionsEntries;
  status: ApplicationStatus;
  createdDateTime: string;
  submittedDateTime?: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = `${STORAGE_KEY}-applications`;

  private _observableStorage: ObservableStorage;

  constructor(
    private _platform: Platform,
    private _observableStorageService: ObservableStorageService,
    private _observableSessionStorageService: ObservableSessionStorageService
  ) {
    this._observableStorage = this._platform.is('desktop')
      ? this._observableSessionStorageService
      : this._observableStorageService;
  }

  getApplication(applicationKey: number): Observable<StoredApplication> {
    return this._observableStorage.get(`${this._key}-${applicationKey}`);
  }

  getApplicationStatus(applicationKey: number): Observable<ApplicationStatus> {
    return this.getApplication(applicationKey).pipe(
      map((storedApplication: StoredApplication) => (storedApplication ? storedApplication.status : null))
    );
  }

  removeApplication(applicationKey: number): Observable<any> {
    return this._observableStorage.remove(`${this._key}-${applicationKey}`);
  }

  getQuestions(applicationKey: number): Observable<QuestionsEntries> {
    return this.getApplication(applicationKey).pipe(
      map((application: StoredApplication) => (application ? application.questions : null))
    );
  }

  updateCreatedDateTime(applicationKey: number, patronApplication: PatronApplication): Observable<string> {
    return this.getApplication(applicationKey).pipe(
      switchMap((storedApplication: StoredApplication) => {
        let createdDateTime: string = new Date().toISOString();

        if (patronApplication && patronApplication.createdDateTime) {
          createdDateTime = patronApplication.createdDateTime;
        } else if (storedApplication && storedApplication.createdDateTime) {
          createdDateTime = storedApplication.createdDateTime;
        }

        return this._observableStorage
          .set(`${this._key}-${applicationKey}`, {
            ...storedApplication,
            createdDateTime,
          })
          .pipe(map(() => createdDateTime));
      })
    );
  }

  updateSubmittedDateTime(applicationKey: number): Observable<string> {
    const submittedDateTime: string = new Date().toISOString();

    return this.getApplication(applicationKey).pipe(
      switchMap((storedApplication: StoredApplication) =>
        this._observableStorage.set(`${this._key}-${applicationKey}`, {
          ...storedApplication,
          submittedDateTime,
        })
      ),
      map(() => submittedDateTime)
    );
  }

  updateQuestions(applicationKey: number, formValue: any, status: ApplicationStatus): Observable<any> {
    return this.getApplication(applicationKey).pipe(
      switchMap((storedApplication: StoredApplication) => {
        let questions: QuestionsEntries =
          storedApplication && storedApplication.questions ? storedApplication.questions : {};

        Object.keys(formValue).forEach(
          (formControlName: any) => (questions[formControlName] = formValue[formControlName])
        );

        return this._observableStorage.set(`${this._key}-${applicationKey}`, {
          ...storedApplication,
          status,
          questions,
        });
      })
    );
  }
}
