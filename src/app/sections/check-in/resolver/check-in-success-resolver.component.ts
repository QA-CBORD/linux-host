import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { map, take, tap } from 'rxjs/operators';
import { CheckingSuccessContentCsModel } from '../contents-strings/check-in-content-string.model';

@Injectable()
export class CheckinSuccessResolver implements Resolve<Observable<any>> {
  constructor(private readonly commonService: CommonService, private readonly loadingService: LoadingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const checkinSuccess = this.commonService.loadContentString<CheckingSuccessContentCsModel>(
      ContentStringCategory.checkinSuccess
    );
    return forkJoin(checkinSuccess).pipe(
      take(1),
      tap(() => {
        this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner();
      }),
      map(([contentString]) => ({ contentString }))
    );
  }
}