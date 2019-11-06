import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from 'src/app/sections/accounts/services/accounts.service';
import { ALL_ACCOUNTS, CONTENT_STRINGS } from 'src/app/sections/accounts/accounts.config';
import { TransactionService } from 'src/app/sections/accounts/services/transaction.service';

@Pipe({
  name: 'accountName',
})
export class AccountNamePipe implements PipeTransform {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionService
  ) {
    this.setContentStrings();
  }
  contentString: { [key: string]: string };

  transform(value: string): Observable<string> {
    return value === ALL_ACCOUNTS
      ? of(this.contentString[CONTENT_STRINGS.allAccountsLabel])
      : this.accountsService.getAccountById(value).pipe(map(({ accountDisplayName }) => accountDisplayName));
  }

  setContentStrings() {
    const transactionStringNames: string[] = [CONTENT_STRINGS.allAccountsLabel];

    this.contentString = this.transactionsService.getContentStrings(transactionStringNames);
  }
}
