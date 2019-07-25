import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from 'src/app/pages/accounts/services/accounts.service';
import { ALL_ACCOUNTS } from 'src/app/pages/accounts/accounts.config';

@Pipe({
  name: 'accountName',
})
export class AccountNamePipe implements PipeTransform {
  constructor(private readonly accountsService: AccountsService) {}

  transform(value: string): Observable<string> {
    return value === ALL_ACCOUNTS
      ? of('All Accounts')
      : this.accountsService.getAccountById(value).pipe(map(({accountDisplayName}) => accountDisplayName));
  }
}
