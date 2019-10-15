import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface ApplicationQuestions {
  [key: number]: any[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = 'housing-questions';

  constructor(private _storage: Storage) {}

  async addApplicationQuestions(applicationId: number, form: any): Promise<any> {
    const applicationQuestions: ApplicationQuestions = await this._storage.get(this._key);
    const questions: any[] =
      applicationQuestions && applicationQuestions[applicationId] ? applicationQuestions[applicationId] : [];

    questions.push(form);

    return this._storage.set(this._key, {
      [applicationId]: questions,
    });
  }

  async updateApplicationQuestions(form: any, applicationId: number, index: number): Promise<any> {
    const applicationQuestions: ApplicationQuestions = await this._storage.get(this._key);
    const questions: any[] =
      applicationQuestions && applicationQuestions[applicationId] ? applicationQuestions[applicationId] : [];

    if (questions && questions[index]) {
      questions[index] = form;
    } else {
      questions.push(form);
    }

    return this._storage.set(this._key, {
      ...applicationQuestions,
      [applicationId]: questions,
    });
  }

  async resetApplicationQuestions(applicationId: number): Promise<any> {
    const applicationQuestions: ApplicationQuestions = await this._storage.get(this._key);

    if (applicationQuestions && applicationQuestions[applicationId]) {
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

  async getApplicationQuestions(applicationId: number): Promise<any[]> {
    const applicationQuestions: ApplicationQuestions = await this._storage.get(this._key);

    return applicationQuestions ? applicationQuestions[applicationId] : null;
  }
}
