import { TestBed } from '@angular/core/testing';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { MerchantService } from './merchant.service';
import { MerchantInfo } from '../shared/models';
import { AddressInfo } from '@core/model/address/address-info';
import { OrderingApiService } from '@sections/ordering/services/ordering.api.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UuidGeneratorService } from '@shared/services/uuid-generator.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    const merchantServiceStub = () => ({
      validateOrder: order => ({}),
      validatePendingOrder: (object, accountId) => ({ pipe: () => ({}) }),
      validateOrderItems: order => ({}),
      addItemsToOrder: (object, accId) => ({}),
      getDisplayMenu: (id, timeInGMT, type) => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    const orderingApiServiceStub = () => ({
      submitOrder: (order, accId, cvv) => ({})
    });
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ pipe: () => ({ toPromise: () => ({}) }) })
    });
    const uuidGeneratorServiceStub = () => ({});
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({ toPromise: () => ({}) }) }
    });
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: OrderingApiService, useFactory: orderingApiServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: UuidGeneratorService, useFactory: uuidGeneratorServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`orderIsAsap has default value`, () => {
    expect(service.orderIsAsap).toEqual(false);
  });

  describe('validateOrder', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = TestBed.inject(
        MerchantService
      );
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      spyOn(component, 'getAddress').and.callThrough();
      spyOn(component, 'getDate').and.callThrough();
      spyOn(merchantServiceStub, 'validateOrder').and.callThrough();
      spyOn(merchantServiceStub, 'validatePendingOrder').and.callThrough();
      spyOn(userFacadeServiceStub, 'getUserData$').and.callThrough();
      service.validateOrder();
      expect(service.getAddress).toHaveBeenCalled();
      expect(service.getDate).toHaveBeenCalled();
      expect(merchantServiceStub.validateOrder).toHaveBeenCalled();
      expect(merchantServiceStub.validatePendingOrder).toHaveBeenCalled();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
    });
  });

  describe('validateReOrderItems', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = TestBed.inject(
        MerchantService
      );
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      spyOn(component, 'getAddress').and.callThrough();
      spyOn(component, 'getDate').and.callThrough();
      spyOn(merchantServiceStub, 'validateOrderItems').and.callThrough();
      spyOn(userFacadeServiceStub, 'getUserData$').and.callThrough();
      service.validateReOrderItems();
      expect(service.getAddress).toHaveBeenCalled();
      expect(service.getDate).toHaveBeenCalled();
      expect(merchantServiceStub.validateOrderItems).toHaveBeenCalled();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
    });
  });
});
