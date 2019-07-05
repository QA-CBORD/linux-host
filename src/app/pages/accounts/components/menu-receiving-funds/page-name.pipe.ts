import { Pipe, PipeTransform } from '@angular/core';
import { MENU_LIST_ITEMS } from '../../accounts.config';

@Pipe({
  name: 'pageName',
})
export class PageNamePipe implements PipeTransform {
  transform(name: string): string {
    return MENU_LIST_ITEMS.get(name);
  }
}
