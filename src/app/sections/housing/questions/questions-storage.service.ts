/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { STORAGE_KEY } from '../housing.config';

import {
  ObservableStorage,
  ObservableStorageService,
} from '@shared/services/observable-storage/observable-storage.service';

import { ApplicationStatus } from '../applications/applications.model';
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

  getApplication(key: number): Observable<StoredApplication> {
    return this._observableStorage.get(`${this._key}-${key}`);
  }

  getApplicationStatus(key: number): Observable<ApplicationStatus> {
    return this.getApplication(key).pipe(
      map((storedForm: StoredApplication) => (storedForm ? storedForm.status : null))
    );
  }

  removeApplication(key: number): Observable<any> {
    return this._observableStorage.remove(`${this._key}-${key}`);
  }

  getQuestions(key: number): Observable<QuestionsEntries> {
    return this.getApplication(key).pipe(
      map((storedForm: StoredApplication) => (storedForm ? storedForm.questions : null))
    );
  }

  updateCreatedDateTime(key: number, createdDateTime: string = new Date().toISOString()): Observable<string> {
    return this.getApplication(key).pipe(
      switchMap((storedForm: StoredApplication) => {
        if (storedForm && storedForm.createdDateTime) {
          return of(storedForm.createdDateTime);
        }

        return this._observableStorage
          .set(`${this._key}-${key}`, {
            ...storedForm,
            createdDateTime,
          })
          .pipe(map(() => createdDateTime));
      })
    );
  }

  updateSubmittedDateTime(key: number): Observable<string> {
    const submittedDateTime: string = new Date().toISOString();

    return this.getApplication(key).pipe(
      switchMap((storedForm: StoredApplication) =>
        this._observableStorage.set(`${this._key}-${key}`, {
          ...storedForm,
          submittedDateTime,
        })
      ),
      map(() => submittedDateTime)
    );
  }

  updateQuestions(key: number, formValue: any, status: number): Observable<any> {
    return this.getApplication(key).pipe(
      switchMap((storedForm: StoredApplication) => {
        const questions: QuestionsEntries = storedForm && storedForm.questions ? storedForm.questions : {};

        Object.keys(formValue).forEach(
          (formControlName: any) => (questions[formControlName] = formValue[formControlName])
        );

        return this._observableStorage.set(`${this._key}-${key}`, {
          ...storedForm,
          status,
          questions,
        });
      })
    );
  }
}
