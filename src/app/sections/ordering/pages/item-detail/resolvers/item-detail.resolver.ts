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
    queryParams: QueryParamsModel;
  }>
  > {
  constructor(private readonly cartService: CartService) { }
  resolve({
    queryParams: { menuItemId, orderItemId },
  }: ActivatedRouteSnapshot): Observable<{
    menuItem: MenuCategoryItemInfo;
    queryParams: QueryParamsModel;
  }> {
    return this.cartService.menuInfo$.pipe(
      map(({ menuCategories }) => {
        const menuItems: any[] = menuCategories.map(({ menuCategoryItems }) =>
          menuCategoryItems.find(menuCategoryItem => menuCategoryItem.menuItem.id === menuItemId));

        const menuItem = menuItems.find(item => {
          if (item) {
            return item;
          }
        });

        if (menuItem) {
          return {
            menuItem,
            queryParams: { categoryId: menuItem.menuCategoryId, menuItemId: menuItem.id, orderItemId },
          };
        }
      }),
      take(1)
    );
  }
}

export interface QueryParamsModel {
  categoryId: string;
  menuItemId: string,
  orderItemId: string
}
