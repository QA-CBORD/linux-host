import { Injectable } from '@angular/core';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '@core/service/user-service/user.service';
import { BaseService } from '@core/service/base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from '@core/model/service/message-response.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends BaseService {
  private settings: SettingInfo[] = [];
  private readonly _settings$: BehaviorSubject<SettingInfo[]> = new BehaviorSubject<SettingInfo[]>(this.settings);
  private readonly configurationsUrl: string = '/json/configuration';

  constructor(private readonly userService: UserService,
              protected readonly http: HttpClient) {
    super(http);
  }

  get settings$(): Observable<SettingInfo[]> {
    return this._settings$.asObservable();
  }

  private set _settings(settings: SettingInfo[]) {
    this.settings = [...this.settings, ...settings];
    this._settings$.next([...this.settings]);
  }

  getUserSettings(settings: ContentStringRequest[]): Observable<SettingInfo[]> {
    const requestArray = settings.map(setting => this.getSettingByConfig(setting));

    return zip(...requestArray).pipe(tap(settings => (this._settings = settings)));
  }

  getSettingByName(settings: SettingInfo[], name: string): SettingInfo | undefined {
    return settings.find(setting => setting && setting.name === name);
  }

  private getSettingByConfig(config: ContentStringRequest): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull(this.configurationsUrl, methodName, true, institutionId, config)),
      map(({ response }: MessageResponse<SettingInfo>) => response),
    );
  }
}
