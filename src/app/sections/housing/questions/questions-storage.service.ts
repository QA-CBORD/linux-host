import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ApplicationStatus } from '../applications/applications.model';

export interface QuestionsGroup {
  status: ApplicationStatus;
  statusChange: string;
  questions: any[];
}

export interface QuestionGroups {
  [key: number]: QuestionsGroup;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = 'housing-questions';

  constructor(private _storage: Storage) {}

  async getQuestionGroups(): Promise<QuestionGroups> {
    return this._storage.get(this._key);
  }

  async getQuestionsGroup(applicationId: number): Promise<QuestionsGroup> {
    const groups: QuestionGroups = await this.getQuestionGroups();

    return groups && groups[applicationId] ? groups[applicationId] : null;
  }

  async getQuestions(applicationId: number): Promise<any[]> {
    const group: QuestionsGroup = await this.getQuestionsGroup(applicationId);

    return group ? group.questions : null;
  }

  async updateQuestionsGroup(applicationId: number, form: any, index: number, status: ApplicationStatus): Promise<any> {
    const groups: QuestionGroups = await this.getQuestionGroups();
    const group: QuestionsGroup = groups && groups[applicationId] ? groups[applicationId] : null;
    let questions: any[] = group ? group.questions : [];

    if (questions && questions[index]) {
      questions[index] = form;
    } else {
      questions.push(form);
    }

    return this._storage.set(this._key, {
      ...groups,
      [applicationId]: {
        status,
        statusChange: Date.now(),
        questions,
      },
    });
  }

  async removeQuestionsGroup(applicationId: number): Promise<any> {
    const groups: QuestionGroups = await this.getQuestionGroups();

    if (groups && groups[applicationId]) {
      const questionKeys: string[] = Object.keys(groups);

      if (questionKeys.length > 1) {
        const questionEntities: { [key: number]: any } = questionKeys.reduce((accumulator: any, key: string) => {
          const numericKey: number = parseInt(key, 10);

          return numericKey !== applicationId ? { ...accumulator, [numericKey]: groups[numericKey] } : accumulator;
        }, {});

        return this._storage.set(this._key, questionEntities);
      } else {
        return this._storage.remove(this._key);
      }
    }
  }
}
