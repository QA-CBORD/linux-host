import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { STORAGE_KEY } from '../housing.config';

import { ApplicationStatus } from '../applications/applications.model';

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

  async getCreatedDateTime(applicationKey: number): Promise<string> {
    return this.getApplication(applicationKey).then((application: StoredApplication) =>
      application ? application.createdDateTime : null
    );
  }

  async updateCreatedDateTime(applicationKey: number, createdDateTime: string): Promise<any> {
    return this.getApplication(applicationKey).then((application: StoredApplication) =>
      this._storage.set(`${this._key}-${applicationKey}`, {
        ...application,
        createdDateTime,
      })
    );
  }

  async getSubmittedDateTime(applicationKey: number): Promise<string> {
    return this.getApplication(applicationKey).then((application: StoredApplication) =>
      application ? application.submittedDateTime : null
    );
  }

  async updateSubmittedDateTime(applicationKey: number, submittedDateTime: string): Promise<void> {
    return this.getApplication(applicationKey).then((application: StoredApplication) =>
      this._storage.set(`${this._key}-${applicationKey}`, {
        ...application,
        submittedDateTime,
      })
    );
  }

  async updateQuestions(applicationKey: number, form: any, status: ApplicationStatus): Promise<any> {
    return this.getApplication(applicationKey).then((application: StoredApplication) => {
      let questions: QuestionsEntries = application && application.questions ? application.questions : {};

      Object.keys(form).forEach((formControlName: any) => (questions[formControlName] = form[formControlName]));

      return this._storage.set(`${this._key}-${applicationKey}`, {
        ...application,
        status,
        questions,
      });
    });
  }
}
