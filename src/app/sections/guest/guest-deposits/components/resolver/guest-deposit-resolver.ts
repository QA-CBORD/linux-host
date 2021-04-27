import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuestDepositResolver implements Resolve<Observable<any>> {
  constructor(private readonly loadingService: LoadingService, private readonly commonService: CommonService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    this.loadingService.showSpinner();
    return this.commonService
      .loadContentString(ContentStringCategory.identifyRecipient)
      .pipe(finalize(() => this.loadingService.closeSpinner()));
  }
}
