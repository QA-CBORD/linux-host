import { Pipe, PipeTransform } from '@angular/core';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';

@Pipe({
  name: 'mainNavItems',
  standalone: true,
})
export class MainNavItemsPipe implements PipeTransform {
  transform(barElements: NavigationBottomBarElement[], amount: number): NavigationBottomBarElement[] {
    if (!barElements) return [];
    return barElements.slice(0, barElements.length > amount ? amount - 1 : amount);
  }
}
