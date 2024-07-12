import { TestBed } from '@angular/core/testing';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NavigationService, UuidGeneratorService } from '@shared/services';
import { CartService, CartState, MerchantService, OrderDetailOptions } from '.';
import { OrderingApiService } from './ordering.api.service';
import { first, firstValueFrom, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertController } from '@ionic/angular';
import { UserInfo } from '@core/model/user';
import { ORDER_TYPE } from '../ordering.config';
import { AddressInfo } from 'net';
import { OrderInfo } from '../shared';

describe('CartService', () => {
  let service: CartService;
  const userFacadeService = {
    getUserData$: jest.fn(() => of({} as UserInfo)),
  };
  const merchantService = {};
  const apiService = {};
  const uuidGeneratorService = {};
  const institutionFacade = {};
  const modalService = {
    dismiss: jest.fn(),
  };
  const storageStateService = {
    getStateEntityByKey$: jest.fn(() => of({} as CartState)),
    deleteStateEntityByKey: jest.fn(),
    updateStateEntity: jest.fn(),
  };
  const alertControllerMock = {
    create: jest.fn().mockReturnValue({
      present: jest.fn(),
      onDidDismiss: jest.fn().mockResolvedValue({}),
      dismiss: jest.fn(),
    }),
  };

  const translateServiceMock = {
    instant: jest.fn((key: string) => key),
  };
  let menuItems$: any;
  let merchant$: any;
  let routingServiceMock: any;
  let orderDetailsOptions$;
  beforeEach(() => {
    menuItems$ = of(0);
    merchant$ = of({ id: 'defaultMerchantId' });
    (orderDetailsOptions$ = of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as unknown as OrderDetailOptions)),
      (routingServiceMock = {
        navigate: jest.fn(),
      });

    TestBed.configureTestingModule({
      providers: [
        CartService,
        {
          provide: UserFacadeService,
          useValue: userFacadeService,
        },
        { provide: MerchantService, useValue: merchantService },
        { provide: OrderingApiService, useValue: apiService },
        { provide: UuidGeneratorService, useValue: uuidGeneratorService },
        { provide: InstitutionFacadeService, useValue: institutionFacade },
        { provide: ModalsService, useValue: modalService },
        { provide: StorageStateService, useValue: storageStateService },
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: NavigationService, useValue: routingServiceMock },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
    service['cart'].orderDetailsOptions = {
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    };

    service['cart'].order = {
      subTotal: 100,
      tax: 0,
      total: 100,
    };
  });

  it('can load service', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe to  storage service', () => {
    const spy = jest.spyOn(storageStateService, 'getStateEntityByKey$');
    expect(service).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should return true when isWithinLastSevenDays is passed a timestamp within the last seven days', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 6; // 6 days ago

    const result = service['isWithinLastSevenDays'](timestamp);

    expect(result).toBe(true);
  });

  it('should return false when isWithinLastSevenDays is passed a timestamp more than seven days ago', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 8; // 8 days ago

    const result = service['isWithinLastSevenDays'](timestamp);

    expect(result).toBe(false);
  });

  it('should call clearCart and deleteStateEntityByKey with CARTIDKEY when clearState is called', () => {
    const clearCartSpy = jest.spyOn(service, 'clearCart');
    const deleteStateEntityByKeySpy = jest.spyOn(storageStateService, 'deleteStateEntityByKey');

    service.clearState();

    expect(clearCartSpy).toHaveBeenCalled();
    expect(deleteStateEntityByKeySpy).toHaveBeenCalledWith(service['CARTIDKEY']);
  });

  describe('removeOrderItemFromOrderById', () => {
    it('should remove the item from the order and return it', async () => {
      const itemId = 'item1';

      service.orderIsAsap = true;
      service.updateOrderFromValidateResponse({ orderItems: [] } as OrderInfo);

      service.addOrderItems([{ id: itemId, name: 'Test Item', quantity: 10 }]);
      expect(firstValueFrom(service.orderItems$.pipe(first()))).resolves.toHaveLength(2);

      const removedItem = await service.removeOrderItemFromOrderById(itemId);
      // Expect that the item was removed from the order
      expect(firstValueFrom(service.orderItems$.pipe(first()))).resolves.toHaveLength(0);

      // Expect that the removed item is returned
      expect(removedItem).toEqual({ id: 'item1', name: 'Test Item', quantity: 10 });
    });
  });

  describe('calculateTotals', () => {
    it('should set tax and total', () => {
      const totalBefore = service['cart'].order.total;

      const taxAmount = 20;
      service.setTax(taxAmount);

      const tax = service['cart'].order.tax;
      const total = service['cart'].order.total;
      
      expect(tax).toBe(taxAmount);
      expect(total).toBe(totalBefore + taxAmount);
    });
  });
});
