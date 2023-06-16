import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { OrderInfo } from '../shared';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantSearchOptions } from '@sections/ordering';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MerchantFacadeService } from '@core/facades/merchant/merchant-facade.service';
import { ExistingOrderInfo } from '../shared/models/pending-order-info.model';
import { QueryOrderDateRange } from '@core/model/orders/order-query-date-range.mode';
import { OrderingApiService } from './ordering.api.service';

describe('OrderingApiService', () => {
  let service: OrderingApiService;

  beforeEach(() => {
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ pipe: () => ({}) })
    });
    const merchantFacadeServiceStub = () => ({
      fetchMenuMerchants: searchOptions => ({}),
      fetchFavoriteMerchants: () => ({}),
      addFavoriteMerchant: merchantId => ({}),
      removeFavoriteMerchant: merchantId => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderingApiService,
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: MerchantFacadeService,
          useFactory: merchantFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(OrderingApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getMenuMerchants', () => {
    it('makes expected calls', () => {
      const merchantSearchOptionsStub: MerchantSearchOptions = <any>{};
      const merchantFacadeServiceStub: MerchantFacadeService = TestBed.inject(
        MerchantFacadeService
      );
     jest.spyOn(merchantFacadeServiceStub, 'fetchMenuMerchants');
      service.getMenuMerchants(merchantSearchOptionsStub);
      expect(merchantFacadeServiceStub.fetchMenuMerchants).toHaveBeenCalled();
    });
  });

  describe('getSuccessfulOrdersListQuery', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const queryOrderDateRangeStub: QueryOrderDateRange = <any>{};
      service
        .getSuccessfulOrdersListQuery(queryOrderDateRangeStub)
        .subscribe(res => {
          expect(res).toEqual(queryOrderDateRangeStub);
        });
      const req = httpTestingController.expectOne('/json/ordering');
      expect(req.request.method).toEqual('POST');
      req.flush(queryOrderDateRangeStub);
      httpTestingController.verify();
    });
  });

  describe('validateOrder', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const orderInfoStub: OrderInfo = <any>{};
      service.validateOrder(orderInfoStub).subscribe(res => {
        expect(res).toEqual(orderInfoStub);
      });
      const req = httpTestingController.expectOne('/json/ordering');
      expect(req.request.method).toEqual('POST');
      req.flush(orderInfoStub);
      httpTestingController.verify();
    });
  });

  describe('validateOrderItems', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const orderInfoStub: OrderInfo = <any>{};
      service.validateOrderItems(orderInfoStub).subscribe(res => {
        expect(res).toEqual(orderInfoStub);
      });
      const req = httpTestingController.expectOne('/json/ordering');
      expect(req.request.method).toEqual('POST');
      req.flush(orderInfoStub);
      httpTestingController.verify();
    });
  });

  describe('addressToGeocode', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const addressInfoStub: AddressInfo = <any>{};
      service.addressToGeocode(addressInfoStub).subscribe(res => {
        expect(res).toEqual(addressInfoStub);
      });
      const req = httpTestingController.expectOne('/json/ordering');
      expect(req.request.method).toEqual('POST');
      req.flush(addressInfoStub);
      httpTestingController.verify();
    });
  });

  describe('getFavoriteMerchants', () => {
    it('makes expected calls', () => {
      const merchantFacadeServiceStub: MerchantFacadeService = TestBed.inject(
        MerchantFacadeService
      );
     jest.spyOn(
        merchantFacadeServiceStub,
        'fetchFavoriteMerchants'
      );
      service.getFavoriteMerchants();
      expect(
        merchantFacadeServiceStub.fetchFavoriteMerchants
      ).toHaveBeenCalled();
    });
  });

  describe('retrieveBuildings', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.retrieveBuildings().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('/json/ordering');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('retrievePickupLocations', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.retrievePickupLocations().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('/json/ordering');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
