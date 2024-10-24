import { Pipe, PipeTransform } from '@angular/core';
import { MenuItemInfo } from '@sections/ordering';

@Pipe({
  name: 'caloriesDisplay',
  standalone: true,
})
export class CaloriesDisplayPipe implements PipeTransform {
  transform(menuItem: MenuItemInfo): string {
    const { displayValue } = menuItem.nutritionInfo.find(({ name }) => name === 'calories') || {};
    return displayValue ? `${displayValue} cal` : '';
  }
}
