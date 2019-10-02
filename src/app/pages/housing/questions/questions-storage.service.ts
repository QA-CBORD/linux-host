import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface ApplicationsForms {
  [key: number]: any[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = 'housing-questions';

  constructor(private _storage: Storage) {}

  async addApplicationForm(applicationId: number, form: any): Promise<any> {
    const applicationForms: ApplicationsForms = await this._storage.get(this._key);
    const forms: any[] = applicationForms && applicationForms[applicationId] ? applicationForms[applicationId] : [];

    forms.push(form);

    return this._storage.set(this._key, {
      [applicationId]: forms,
    });
  }

  async updateApplicationForm(applicationId: number, index: number, form: any): Promise<any> {
    const applicationForms: ApplicationsForms = await this._storage.get(this._key);
    const forms: any[] = applicationForms && applicationForms[applicationId] ? applicationForms[applicationId] : [];

    if (forms && forms[index]) {
      forms[index] = form;
    } else {
      forms.push(form);
    }

    return this._storage.set(this._key, {
      [applicationId]: forms,
    });
  }

  async getApplicationForms(applicationId: number): Promise<any[]> {
    const applicationForms: ApplicationsForms = await this._storage.get(this._key);

    return applicationForms ? applicationForms[applicationId] : null;
  }
}
