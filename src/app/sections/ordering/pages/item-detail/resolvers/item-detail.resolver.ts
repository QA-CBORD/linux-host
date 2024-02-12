import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { take, map, filter, switchMap } from 'rxjs/operators';
import { CartService } from '@sections/ordering/services';
import { MenuCategoryItemInfo } from '@sections/ordering/shared/models';
import { ToastService } from '@core/service/toast/toast.service';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

@Injectable()
export class ItemDetailResolver {
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translateFacadeService: TranslateFacadeService = inject(TranslateFacadeService);

  constructor(private readonly cartService: CartService) {}
  resolve(snapshot: ActivatedRouteSnapshot): Observable<{
    menuItem: MenuCategoryItemInfo;
    queryParams: QueryParamsModel;
  }> {
    const {
      queryParams: { menuItemId, orderItemId, isItemExistsInCart = false, isScannedItem = false },
    } = snapshot;

    return this.cartService.menuInfo$.pipe(
      filter(menu => menu !== null),
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
      switchMap(result => {
        if (result) {
          return of(result);
        }

        this.toastService.showToast({
          message: this.translateFacadeService.instant('get_mobile.error.menu_item_not_found'),
          position: 'bottom'
        });
        return EMPTY;
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
