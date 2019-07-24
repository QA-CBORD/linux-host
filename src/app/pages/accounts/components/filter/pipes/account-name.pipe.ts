import { Pipe, PipeTransform } from '@angular/core';
import { ALL_ACCOUNTS } from '../../../accounts.config';

@Pipe({
  name: 'accountName',
})
export class AccountNamePipe implements PipeTransform {
  transform(value: string): string {
    return value === ALL_ACCOUNTS ? 'All Accounts' : value;
  }
}
