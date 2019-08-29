import { Injectable } from '@angular/core';
import { ContentStringRequest } from '../../../core/model/content/content-string-request.model';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { SettingInfo } from '../../../core/model/configuration/setting-info.model';
import { AccountsApiService } from './accounts.api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class SettingService {
  private settings: SettingInfo[] = [];
  private readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>(this.settings);

  constructor(private readonly apiService: AccountsApiService) {}

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _settings(settings: SettingInfo[]) {
    this.settings = [...this.settings, ...settings];
    this._settings$.next([...this.settings]);
  }

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.apiService.getSettingByConfig(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(setting => setting && setting.name === name);
  }
}
