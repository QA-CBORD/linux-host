import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from '../../../core/service/loading/loading.service';

import { SettingInfoList } from './../../../core/model/configuration/setting-info-list.model';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(private readonly dashboardService: DashboardService, private readonly loadingService: LoadingService) {}

  resolve(): Observable<SettingInfoList> {
    this.loadingService.showSpinner();

    return this.dashboardService
      .retrieveSettingsList()
      .pipe(tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()));
  }
}
