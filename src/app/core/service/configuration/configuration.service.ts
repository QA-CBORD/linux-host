import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly baseUrl = '/json/configuration';

  constructor() {}
}
