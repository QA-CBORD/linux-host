import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { STORAGE_KEY } from '../housing.config';

import { ApplicationStatus } from '../applications/applications.model';

export interface QuestionsGroup {
  questions: any[];
  status: ApplicationStatus;
  createdDateTime: string;
  submittedDateTime?: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = `${STORAGE_KEY}-questions`;

  constructor(private _storage: Storage) {}

  async getQuestionsGroup(applicationId: number): Promise<QuestionsGroup> {
    return this._storage.get(`${this._key}-${applicationId}`);
  }

  async getQuestions(applicationId: number): Promise<any[]> {
    return this.getQuestionsGroup(applicationId).then((group: QuestionsGroup) => (group ? group.questions : null));
  }

  async getCreatedDateTime(applicationId: number): Promise<string> {
    return this.getQuestionsGroup(applicationId).then((group: QuestionsGroup) =>
      group ? group.createdDateTime : null
    );
  }

  async updateCreatedDateTime(applicationId: number, createdDateTime: string): Promise<any> {
    return this.getQuestionsGroup(applicationId).then((group: QuestionsGroup) =>
      this._storage.set(`${this._key}-${applicationId}`, {
        ...group,
        createdDateTime,
      })
    );
  }

  async getSubmittedDateTime(applicationId: number): Promise<string> {
    return this.getQuestionsGroup(applicationId).then((group: QuestionsGroup) =>
      group ? group.submittedDateTime : null
    );
  }

  async updateSubmittedDateTime(applicationId: number, submittedDateTime: string): Promise<void> {
    return this.getQuestionsGroup(applicationId).then((group: QuestionsGroup) =>
      this._storage.set(`${this._key}-${applicationId}`, {
        ...group,
        submittedDateTime,
      })
    );
  }

  async updateQuestionsGroup(applicationId: number, form: any, status: ApplicationStatus): Promise<any> {
    return this.getQuestionsGroup(applicationId).then((group: QuestionsGroup) => {
      let questions: { [key: string]: any } = group && group.questions ? group.questions : {};

      Object.keys(form).forEach((formControlName: any) => (questions[formControlName] = form[formControlName]));

      return this._storage.set(`${this._key}-${applicationId}`, {
        ...group,
        status,
        questions,
      });
    });
  }

  async removeQuestionsGroup(applicationId: number): Promise<any> {
    return this._storage.remove(`${this._key}-${applicationId}`);
  }
}
