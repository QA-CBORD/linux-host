import { Pipe, PipeTransform } from '@angular/core';
import { ACCOUNT_TYPES } from '@sections/accounts/accounts.config';

@Pipe({
  name: 'accountTypePipe',
  pure: false
})
export class AccountTypePipe implements PipeTransform {
  
  transform(value: string | number): string {

    if(typeof value === 'string'){
      value = Number(value);
    }

    return (value === ACCOUNT_TYPES.meals ? 'Meals' : 'Amount') + ' to Donate';
  }
}
