import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';
import { CartService } from '@sections/ordering/services';
import { MenuCategoryItemInfo } from '@sections/ordering/shared/models';

@Injectable()
export class ItemDetailResolver {
  constructor(private readonly cartService: CartService) {}
  resolve(
    snapshot: ActivatedRouteSnapshot
  ): Observable<{
    menuItem: MenuCategoryItemInfo;
    queryParams: QueryParamsModel;
  }> {
    const {
      queryParams: { menuItemId, orderItemId, isItemExistsInCart = false, isScannedItem = false },
    } = snapshot;

    return this.cartService.menuInfo$.pipe(
      filter((menu) => menu !== null),
      map(({ menuCategories }) => {

        const menuItems = menuCategories.map(({ menuCategoryItems }) =>
          menuCategoryItems.find(menuCategoryItem => menuCategoryItem.menuItem.id === menuItemId)
        );

        const menuItem = menuItems.find(item => {
          if (item) {
            return item;
          }
        });

        if (menuItem) {
          return {
            menuItem,
            queryParams: {
              categoryId: menuItem.menuCategoryId,
              menuItemId: menuItem.id,
              orderItemId,
              isItemExistsInCart,
              isScannedItem,
            },
          };
        }
      }),
      take(1)
    );
  }
}

export interface QueryParamsModel {
  categoryId: string;
  menuItemId: string;
  orderItemId: string;
}
