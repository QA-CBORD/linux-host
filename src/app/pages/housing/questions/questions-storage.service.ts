import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ApplicationStatus } from '../applications/applications.model';

export interface ApplicationQuestion {
  status: ApplicationStatus;
  statusChange: number;
  questions: any[];
}

export interface ApplicationQuestions {
  [key: number]: ApplicationQuestion;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = 'housing-questions';

  constructor(private _storage: Storage) {}

  async updateApplicationQuestions(
    form: any,
    applicationId: number,
    index: number,
    status: ApplicationStatus
  ): Promise<any> {
    const applicationQuestions: any[] = await this.getApplicationQuestions(applicationId);
    const questions: any[] = applicationQuestions || [];

    if (questions && questions[index]) {
      questions[index] = form;
    } else {
      questions.push(form);
    }

    return this._storage.set(this._key, {
      ...applicationQuestions,
      [applicationId]: {
        status,
        statusChange: Date.now(),
        questions,
      },
    });
  }

  async removeApplicationQuestions(applicationId: number): Promise<any> {
    const applicationQuestions: ApplicationQuestions = await this.getApplicationQuestions(applicationId);

    if (applicationQuestions) {
      const questionKeys: string[] = Object.keys(applicationQuestions);

      if (questionKeys.length > 1) {
        const questionEntities: { [key: number]: any } = questionKeys.reduce((accumulator: any, key: string) => {
          const numericKey: number = parseInt(key, 10);

          return numericKey !== applicationId
            ? { ...accumulator, [numericKey]: applicationQuestions[numericKey] }
            : accumulator;
        }, {});

        return this._storage.set(this._key, questionEntities);
      } else {
        return this._storage.remove(this._key);
      }
    }
  }

  async getAllApplicationQuestions(): Promise<ApplicationQuestions> {
    return await this._storage.get(this._key);
  }

  async getApplicationQuestions(applicationId: number): Promise<any[]> {
    const applicationQuestions: ApplicationQuestions = await this._storage.get(this._key);

    return applicationQuestions && applicationQuestions[applicationId]
      ? applicationQuestions[applicationId].questions
      : null;
  }
}
