import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { tap } from 'rxjs/operators';
import { Settings } from '../../../../../app.global';
import { AccountService } from '@sections/accounts/services/accounts.service';

@Injectable()
export class RequestFundsResolver implements Resolve<Observable<any>> {
  constructor(private readonly accountsService: AccountService, private readonly loadingService: LoadingService) {}

  resolve(): Observable<any> {
    const requiredSettings = [Settings.Setting.DEPOSIT_TENDERS];
    const accountsCall = this.accountsService.getUserAccounts();
    const settingsCall = this.accountsService.getUserSettings(requiredSettings);

    this.loadingService.showSpinner();

    return zip(settingsCall, accountsCall).pipe(
      tap(() => this.loadingService.closeSpinner(), () => this.loadingService.closeSpinner())
    );
  }
}
