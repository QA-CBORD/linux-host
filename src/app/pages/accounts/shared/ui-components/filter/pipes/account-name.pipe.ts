import { Pipe, PipeTransform } from '@angular/core';
import { ALL_ACCOUNTS } from '../../../accounts.config';
import { AccountsService } from '../../../services/accounts.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'accountName',
})
export class AccountNamePipe implements PipeTransform {
  constructor(private readonly accountsService: AccountsService) {}

  transform(value: string): Observable<string> {
    return value === ALL_ACCOUNTS
      ? of('All Accounts')
      : this.accountsService.getAccountById(value).pipe(map(account => account.accountDisplayName));
  }
}
