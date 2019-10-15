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

  async addApplicationForm(applicationId: number, form: any): Promise<any> {
    const applicationForms: ApplicationQuestions = await this._storage.get(this._key);
    const forms: any[] = applicationForms && applicationForms[applicationId] ? applicationForms[applicationId] : [];

    forms.push(form);

    return this._storage.set(this._key, {
      [applicationId]: forms,
    });
  }

  async updateApplicationForm(form: any, applicationId: number, index: number): Promise<any> {
    const applicationForms: ApplicationQuestions = await this._storage.get(this._key);
    const forms: any[] = applicationForms && applicationForms[applicationId] ? applicationForms[applicationId] : [];

    if (forms && forms[index]) {
      forms[index] = form;
    } else {
      forms.push(form);
    }

    return this._storage.set(this._key, {
      ...applicationForms,
      [applicationId]: forms,
    });
  }

  async resetApplicationForm(applicationId: number): Promise<any> {
    const applicationForms: ApplicationQuestions = await this._storage.get(this._key);

    if (applicationForms && applicationForms[applicationId]) {
      const formsKeys: string[] = Object.keys(applicationForms);

      if (formsKeys.length > 1) {
        const formEntities: { [key: number]: any } = formsKeys.reduce((accumulator: any, key: string) => {
          const numericKey: number = parseInt(key, 10);

          return numericKey !== applicationId
            ? { ...accumulator, [numericKey]: applicationForms[numericKey] }
            : accumulator;
        }, {});

        return this._storage.set(this._key, formEntities);
      } else {
        return this._storage.remove(this._key);
      }
    }
  }

  async getApplicationForms(applicationId: number): Promise<any[]> {
    const applicationForms: ApplicationQuestions = await this._storage.get(this._key);

    return applicationForms ? applicationForms[applicationId] : null;
  }
}
