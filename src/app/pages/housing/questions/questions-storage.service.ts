import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class QuestionsStorageService {
  private readonly _key: string = 'housing-questions';

  constructor(private _storage: Storage) {}
}
