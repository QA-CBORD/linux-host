import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { CartService } from '@sections/ordering/services';
import { of, EMPTY, lastValueFrom } from 'rxjs';
import { ItemDetailResolver, QueryParamsModel } from './item-detail.resolver';

describe('ItemDetailResolver', () => {
  let resolver;
  let mockCartService;
  let mockToastService;
  let mockTranslateFacadeService;
  const storage = {
    clear: jest.fn(),
    ready: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(() => {
    mockCartService = {
      menuInfo$: of({
        menuCategories: [
          {
            menuCategoryItems: [
              { menuItem: { id: '123' } }, // Add a menu item with ID '123'
              { menuItem: { id: '456' } }, // Add a menu item with ID '456'
            ],
          },
        ],
      }),
    };

    mockToastService = {
      showToast: jest.fn(),
    };

    mockTranslateFacadeService = {
      instant: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ItemDetailResolver,
        { provide: CartService, useValue: mockCartService },
        { provide: ToastService, useValue: mockToastService },
        { provide: TranslateFacadeService, useValue: mockTranslateFacadeService },
        { provide: Storage, useValue: storage },
      ],
    });
    resolver = TestBed.inject(ItemDetailResolver);
  });

  it('should resolve menu item and query parameters', async () => {
    const menuItemId = '123';
    const orderItemId = '456';
    const queryParams: Partial<QueryParamsModel> = {
      menuItemId,
      orderItemId,
    };
    const menuCategoryItemInfo = {
      menuItem: { id: menuItemId },
      queryParams: {
        categoryId: 'categoryId',
        menuItemId,
        orderItemId,
        isItemExistsInCart: false,
        isScannedItem: false,
      },
    };

    const snapshot: Partial<ActivatedRouteSnapshot> = {
      queryParams: queryParams as any,
    };

    const result = lastValueFrom(await resolver.resolve(snapshot as ActivatedRouteSnapshot));

    result.then(res => {
      expect(res).toEqual(menuCategoryItemInfo);
      expect(mockToastService.showToast).not.toHaveBeenCalled();
    });
  });

  it('should show toast and return EMPTY if menu item not found', async () => {
    const menuItemId = '789'; // Non-existing menu item ID
    const orderItemId = '456';
    const queryParams: Partial<QueryParamsModel> = {
      menuItemId,
      orderItemId,
    };

    const snapshot: Partial<ActivatedRouteSnapshot> = {
      queryParams: queryParams as any,
    };

    mockCartService.menuInfo$ = of({
      menuCategories: [
        {
          menuCategoryItems: [],
        },
      ],
    });

    const result = lastValueFrom(await resolver.resolve(snapshot as ActivatedRouteSnapshot));

    result.then(res => {
      expect(res).toBe(EMPTY);
      expect(mockToastService.showToast).toHaveBeenCalled();
    });
  });
});
