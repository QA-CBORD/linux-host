import { Injectable } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { Recipient } from '@sections/guest/model/recipient.model';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable, zip } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuestDepositResolver {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly commonService: CommonService,
    private readonly guestDepositsService: GuestDepositsService
  ) {}
  resolve(): Observable<{ recipients: Recipient[] }> {
    this.loadingService.showSpinner();
    const contentString$ = this.commonService.loadContentString(ContentStringCategory.identifyRecipient);
    const recipientList = this.guestDepositsService.getRecipientList().pipe(take(1));

    return zip(contentString$, recipientList).pipe(
      map(([, recipients]) => ({ recipients })),
      finalize(() => this.loadingService.closeSpinner())
    );
  }
}
