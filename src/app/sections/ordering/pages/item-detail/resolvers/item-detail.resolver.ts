import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { CartService } from '@sections/ordering/services';
import { MenuCategoryItemInfo } from '@sections/ordering/shared/models';

@Injectable()
export class ItemDetailResolver
  implements
    Resolve<
      Observable<{
        menuItem: MenuCategoryItemInfo;
        queryParams: { categoryId: string; menuItemId: string };
      }>
    > {
  constructor(private readonly cartService: CartService) {}
  resolve({
    queryParams,
  }: ActivatedRouteSnapshot): Observable<{
    menuItem: MenuCategoryItemInfo;
    queryParams: { categoryId: string; menuItemId: string };
  }> {
    return this.cartService.menuInfo$.pipe(
      map(data => {
        const menuItems: any[] = data.menuCategories.map(({ menuCategoryItems }) =>
          menuCategoryItems.find(menuCategoryItem => menuCategoryItem.menuItem.id === queryParams.menuItemId)
        );

        const menuItem = menuItems.find(item => {
          if (item) {
            return item;
          }
        });

        if (menuItem) {
          return {
            menuItem,
            queryParams: { categoryId: menuItem.menuCategoryId, menuItemId: menuItem.id },
          };
        }
      }),
      take(1)
    );
  }
}
