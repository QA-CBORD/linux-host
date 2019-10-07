import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { SettingInfo } from 'src/app/core/model/configuration/setting-info.model';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardPageResolver implements Resolve<Observable<SettingInfo[]>> {
  constructor(private readonly dashboardService: DashboardService, private readonly loadingService: LoadingService) {}

  resolve(): Observable<SettingInfo[]> {   
       this.loadingService.showSpinner();
    return this.dashboardService.retrieveDashboardSettings().pipe(
      take(1),
      tap(null, null, this.loadingService.closeSpinner.bind(this.loadingService))
    );
  }
}
