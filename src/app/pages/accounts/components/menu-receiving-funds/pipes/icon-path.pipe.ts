import { Pipe, PipeTransform } from '@angular/core';
import { MENU_LIST_ICONS } from '../local.config';

@Pipe({
  name: 'iconPath',
})
export class IconPathPipe implements PipeTransform {
  transform(name: string): string {
    return MENU_LIST_ICONS.get(name);
  }
}
