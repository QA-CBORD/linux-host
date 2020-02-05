import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { STORAGE_KEY } from '../housing.config';

import { ApplicationStatus, PatronApplication } from '../applications/applications.model';

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

  constructor(private _storage: Storage) {}

  async getApplication(applicationKey: number): Promise<StoredApplication> {
    return this._storage.get(`${this._key}-${applicationKey}`);
  }

  async removeApplication(applicationKey: number): Promise<any> {
    return this._storage.remove(`${this._key}-${applicationKey}`);
  }

  async getQuestions(applicationKey: number): Promise<QuestionsEntries> {
    return this.getApplication(applicationKey).then((application: StoredApplication) =>
      application ? application.questions : null
    );
  }

  async updateCreatedDateTime(applicationKey: number, patronApplication: PatronApplication): Promise<string> {
    return this.getApplication(applicationKey).then(async (storedApplication: StoredApplication) => {
      let createdDateTime: string = new Date().toISOString();

      if (patronApplication && patronApplication.createdDateTime) {
        createdDateTime = patronApplication.createdDateTime;
      } else if (storedApplication && storedApplication.createdDateTime) {
        createdDateTime = storedApplication.createdDateTime;
      }

      return this._storage
        .set(`${this._key}-${applicationKey}`, {
          ...storedApplication,
          createdDateTime,
        })
        .then(() => createdDateTime);
    });
  }

  async updateSubmittedDateTime(applicationKey: number): Promise<string> {
    const submittedDateTime: string = new Date().toISOString();

    return this.getApplication(applicationKey)
      .then((application: StoredApplication) =>
        this._storage.set(`${this._key}-${applicationKey}`, {
          ...application,
          submittedDateTime,
        })
      )
      .then(() => submittedDateTime);
  }

  async updateQuestions(applicationKey: number, formValue: any, status: ApplicationStatus): Promise<any> {
    return this.getApplication(applicationKey).then((application: StoredApplication) => {
      let questions: QuestionsEntries = application && application.questions ? application.questions : {};

      Object.keys(formValue).forEach(
        (formControlName: any) => (questions[formControlName] = formValue[formControlName])
      );

      return this._storage.set(`${this._key}-${applicationKey}`, {
        ...application,
        status,
        questions,
      });
    });
  }
}
