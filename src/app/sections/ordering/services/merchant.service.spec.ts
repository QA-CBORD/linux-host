import { TestBed } from "@angular/core/testing";
import { OrderInfo } from "../shared/models";
import { MenuInfo } from "../shared/models";
import { MenuItemInfo } from "../shared/models";
import { MerchantSettingInfo } from "../shared/models";
import { OrderingApiService } from "./ordering.api.service";
import { AddressInfo } from "@core/model/address/address-info";
import { CommerceApiService } from "@core/service/commerce/commerce-api.service";
import { UserFacadeService } from "@core/facades/user/user.facade.service";
import { SettingsFacadeService } from "@core/facades/settings/settings-facade.service";
import { AuthFacadeService } from "@core/facades/auth/auth.facade.service";
import { InstitutionFacadeService } from "@core/facades/institution/institution.facade.service";
import { ExistingOrderInfo } from "../shared/models/pending-order-info.model";
import { DateUtilObject } from "@sections/accounts/shared/ui-components/filter/date-util";
import { MerchantService } from "./merchant.service";

describe("MerchantService", () => {
  let service: MerchantService;

  beforeEach(() => {
    const orderingApiServiceStub = () => ({
      getMenuMerchants: searchOptions => ({ pipe: () => ({}) }),
      getFavoriteMerchants: () => ({}),
      validateOrder: order => ({}),
      validateOrderItems: order => ({}),
      validatePendingOrder: (order, accountId) => ({}),
      addItemsToOrder: (order, accountId) => ({}),
      cancelOrder: id => ({}),
      getSuccessfulOrdersList: (id, institutionId) => ({}),
      getSuccessfulOrdersListQuery: object => ({}),
      getMerchantOrderSchedule: (merchantId, orderType) => ({
        pipe: () => ({})
      }),
      retrievePickupLocations: () => ({}),
      addFavoriteMerchant: merchantId => ({}),
      removeFavoriteMerchant: merchantId => ({}),
      retrieveBuildings: () => ({}),
      updateUserAddress: updateUserAddress => ({}),
      getMerchantPaymentAccounts: merchantId => ({ pipe: () => ({}) }),
      isOutsideMerchantDeliveryArea: (merchantId, latitude, longitude) => ({}),
      getSettingByConfig: config => ({}),
      getDisplayMenu: (merchantId, dateTime, orderType) => ({}),
      removeAddress: addressId => ({})
    });
    const commerceApiServiceStub = () => ({
      getUserAccounts: () => ({ pipe: () => ({}) })
    });
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ pipe: () => ({}) }),
      getUserAddresses$: () => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getUserSetting: dEFAULT_ADDRESS => ({}),
      getSetting: aDDRESS_RESTRICTION => ({})
    });
    const authFacadeServiceStub = () => ({
      isGuestUser: () => ({ pipe: () => ({}) })
    });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    TestBed.configureTestingModule({
      providers: [
        MerchantService,
        { provide: OrderingApiService, useFactory: orderingApiServiceStub },
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(MerchantService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("validateOrder", () => {
    it("makes expected calls", () => {
      const orderInfoStub: OrderInfo = <any>{};
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      spyOn(orderingApiServiceStub, "validateOrder").and.callThrough();
      service.validateOrder(orderInfoStub);
      expect(orderingApiServiceStub.validateOrder).toHaveBeenCalled();
    });
  });

  describe("validateOrderItems", () => {
    it("makes expected calls", () => {
      const orderInfoStub: OrderInfo = <any>{};
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      spyOn(orderingApiServiceStub, "validateOrderItems").and.callThrough();
      service.validateOrderItems(orderInfoStub);
      expect(orderingApiServiceStub.validateOrderItems).toHaveBeenCalled();
    });
  });

  describe("retrievePickupLocations", () => {
    it("makes expected calls", () => {
      const merchantSettingInfoStub: MerchantSettingInfo = <any>{};
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      const addressInfoStub: AddressInfo = <any>{};
      spyOn(
        orderingApiServiceStub,
        "retrievePickupLocations"
      ).and.callThrough();
      service.retrievePickupLocations(addressInfoStub, merchantSettingInfoStub);
      expect(orderingApiServiceStub.retrievePickupLocations).toHaveBeenCalled();
    });
  });

  describe("getMenuMerchants", () => {
    it("makes expected calls", () => {
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      spyOn(orderingApiServiceStub, "getMenuMerchants").and.callThrough();
      service.getMenuMerchants();
      expect(orderingApiServiceStub.getMenuMerchants).toHaveBeenCalled();
    });
  });

  describe("getMerchantsWithFavoriteInfo", () => {
    it("makes expected calls", () => {
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      spyOn(orderingApiServiceStub, "getFavoriteMerchants").and.callThrough();
      spyOn(orderingApiServiceStub, "getMenuMerchants").and.callThrough();
      service.getMerchantsWithFavoriteInfo();
      expect(orderingApiServiceStub.getFavoriteMerchants).toHaveBeenCalled();
      expect(orderingApiServiceStub.getMenuMerchants).toHaveBeenCalled();
    });
  });

  describe("getRecentOrders", () => {
    it("makes expected calls", () => {
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      spyOn(component, "getMenuMerchants").and.callThrough();
      spyOn(
        orderingApiServiceStub,
        "getSuccessfulOrdersList"
      ).and.callThrough();
      spyOn(userFacadeServiceStub, "getUserData$").and.callThrough();
      service.getRecentOrders();
      expect(service.getMenuMerchants).toHaveBeenCalled();
      expect(orderingApiServiceStub.getSuccessfulOrdersList).toHaveBeenCalled();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
    });
  });

  describe("retrieveUserAddressList", () => {
    it("makes expected calls", () => {
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      spyOn(userFacadeServiceStub, "getUserAddresses$").and.callThrough();
      service.retrieveUserAddressList();
      expect(userFacadeServiceStub.getUserAddresses$).toHaveBeenCalled();
    });
  });

  describe("retrieveBuildings", () => {
    it("makes expected calls", () => {
      const orderingApiServiceStub: OrderingApiService = TestBed.inject(
        OrderingApiService
      );
      spyOn(orderingApiServiceStub, "retrieveBuildings").and.callThrough();
      service.retrieveBuildings();
      expect(orderingApiServiceStub.retrieveBuildings).toHaveBeenCalled();
    });
  });

  describe("getUserAccounts", () => {
    it("makes expected calls", () => {
      const commerceApiServiceStub: CommerceApiService = TestBed.inject(
        CommerceApiService
      );
      spyOn(commerceApiServiceStub, "getUserAccounts").and.callThrough();
      service.getUserAccounts();
      expect(commerceApiServiceStub.getUserAccounts).toHaveBeenCalled();
    });
  });

  describe("getDefaultAddress", () => {
    it("makes expected calls", () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(settingsFacadeServiceStub, "getUserSetting").and.callThrough();
      service.getDefaultAddress();
      expect(settingsFacadeServiceStub.getUserSetting).toHaveBeenCalled();
    });
  });
});
