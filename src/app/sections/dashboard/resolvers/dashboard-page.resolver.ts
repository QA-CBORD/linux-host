import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { AccountsService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { DashboardService } from '../services';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfoList>> {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly accountsService: AccountsService,
    private readonly loadingService: LoadingService,
    private readonly tileConfigFacadeService: TileConfigFacadeService,
  ) {
  }

  resolve(): Observable<any> {
    this.loadingService.showSpinner();
    const accountContentStrings = this.accountsService.initContentStringsList();
    return zip(
      this.tileConfigFacadeService.updateTilesConfigBySystemSettings().pipe(first()),
      accountContentStrings,
    ).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner()),
    );
  }
}
