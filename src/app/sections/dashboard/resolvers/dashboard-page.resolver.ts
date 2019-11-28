import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from '../../../core/service/loading/loading.service';

import { SettingInfoList } from './../../../core/model/configuration/setting-info-list.model';
import { DashboardService } from '../services/dashboard.service';
import { AccountsService } from '@sections/accounts/services/accounts.service';


@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<any> {
    this.loadingService.showSpinner();

    const accountContentStrings = this.accountsService.initContentStringsList();
    const dashboardSettingsList = this.dashboardService.retrieveSettingsList();

    return zip(dashboardSettingsList, accountContentStrings).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}
