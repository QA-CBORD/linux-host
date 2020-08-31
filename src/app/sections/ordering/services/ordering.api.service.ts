import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CoordsService } from 'src/app/core/service/coords/coords.service';

import { MessageResponse, ServiceParameters } from 'src/app/core/model/service/message-response.model';
import { MerchantSearchOptionName } from '../ordering.config';
import { BuildingInfo, MerchantAccountInfoList, MerchantInfo, OrderInfo } from '../shared';
import { AddressInfo } from '@core/model/address/address-info';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { MerchantSearchOptions } from '@sections/ordering';
import { GeolocationPosition } from '@capacitor/core';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

/** This service should be global */
@Injectable()
export class OrderingApiService {
  private readonly serviceUrlMerchant: string = '/json/merchant';
  private readonly serviceUrlOrdering: string = '/json/ordering';
  private readonly serviceUrlUser: string = '/json/user';
  private readonly serviceUrlInstitution: string = '/json/institution';

  constructor(
    private readonly http: HttpClient,
    private readonly userFacadeService: UserFacadeService,
    private readonly coords: CoordsService
  ) {}

  getMenuMerchants(searchOptions: MerchantSearchOptions): Observable<MerchantInfo[]> {
    return this.coords.getCoords().pipe(
      switchMap((geoData: GeolocationPosition) => {
        if (geoData && geoData.coords && geoData.coords.latitude !== null && geoData.coords.longitude !== null) {
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LATITUDE, value: geoData.coords.latitude });
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LONGITUDE, value: geoData.coords.longitude });
        }

        const queryConfig = new RPCQueryConfig('getMenuMerchants', { searchOptions }, true, true);

        return this.http
          .post(this.serviceUrlMerchant, queryConfig)
          .pipe(map(({ response }: MessageResponse<any>) => response.list));
      })
    );
  }

  getFavoriteMerchants(): Observable<MerchantInfo[]> {
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    const queryConfig = new RPCQueryConfig('getFavoriteMerchants', postParams, true);

    return this.http
      .post(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response }: MessageResponse<any>) => response.list));
  }

  addFavoriteMerchant(merchantId: string): Observable<string> {
    const postParams: ServiceParameters = { merchantId, notes: '' };
    const queryConfig = new RPCQueryConfig('addFavoriteMerchant', postParams, true);

    return this.http
      .post<MessageResponse<string>>(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response }) => response));
  }

  removeFavoriteMerchant(merchantId: string): Observable<boolean> {
    const postParams: ServiceParameters = { merchantId };
    const queryConfig = new RPCQueryConfig('removeFavoriteMerchant', postParams, true);

    return this.http
      .post<MessageResponse<boolean>>(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response }) => response));
  }

  getSuccessfulOrdersList(userId: string, institutionId: string): Observable<OrderInfo[]> {
    const postParams: ServiceParameters = { userId, merchantId: null, maxReturn: 30 };
    const queryConfig = new RPCQueryConfig('retrieveSuccessfulOrdersList', postParams, true, true);

    return this.http
      .post(this.serviceUrlOrdering, queryConfig)
      .pipe(map(({ response }: MessageResponse<any>) => response.list));
  }

  getMerchantOrderSchedule(merchantId: string, orderType: number): Observable<any> {
    const postParams: ServiceParameters = { merchantId, orderType, startDate: null, endDate: null };
    const queryConfig = new RPCQueryConfig('getMerchantOrderSchedule', postParams, true);

    return this.http
      .post(this.serviceUrlOrdering, queryConfig)
      .pipe(map(({ response }: MessageResponse<any>) => response));
  }

  validateOrder(orderInfo: OrderInfo): Observable<OrderInfo> {
    const postParams: ServiceParameters = { order: this.adjustOrderIfRollUp(orderInfo) };
    const queryConfig = new RPCQueryConfig('validateOrder', postParams, true);

    return this.http
      .post(this.serviceUrlOrdering, queryConfig)
      .pipe(map(({ response }: MessageResponse<OrderInfo>) => response));
  }

  cancelOrder(orderId: string): Observable<boolean> {
    const postParams: ServiceParameters = { orderId };
    const queryConfig = new RPCQueryConfig('cancelOrder', postParams, true);

    return this.http
      .post(this.serviceUrlOrdering, queryConfig)
      .pipe(map(({ response }: MessageResponse<boolean>) => response));
  }

  retrieveBuildings(): Observable<BuildingInfo[]> {
    const postParams: ServiceParameters = { active: true };
    const queryConfig = new RPCQueryConfig('retrieveBuildings', postParams, true, true);

    return this.http
      .post(this.serviceUrlInstitution, queryConfig)
      .pipe(map(({ response: { list } }: MessageResponse<any>) => list));
  }

  updateUserAddress({
    address1 = null,
    address2 = null,
    campus = null,
    city = null,
    nickname = null,
    state = null,
    building = null,
    room = null,
    id = null,
    latitude = null,
    longitude = null,
  }): Observable<AddressInfo> {
    const campusValue = parseInt(campus);
    let addedAddress;
    const postParams: ServiceParameters = {
      address: {
        id: id ? id : null,
        department: null,
        objectRevision: null,
        company: null,
        address1,
        address2: address2 !== null && !address2.length ? null : address2,
        city,
        state,
        postalcode: null,
        country: null,
        latitude: campusValue ? latitude : null,
        longitude: campusValue ? longitude : null,
        notes: null,
        nickname: nickname === null || !nickname ? address1 : nickname,
        building: building ? building : null,
        floor: null,
        room,
        crossStreet: null,
        accessCode: null,
        phone: null,
        phoneExt: null,
        onCampus: campus,
      },
    };

    if (!campusValue) {
      addedAddress = this.addressToGeocode(postParams.address);
    } else {
      addedAddress = of(postParams.address);
    }

    return zip(addedAddress, this.userFacadeService.getUserData$()).pipe(
      switchMap(([address, user]) => {
        const queryConfig = new RPCQueryConfig('updateUserAddress', { ...postParams, address, userId: user.id }, true);

        return this.http.post(this.serviceUrlUser, queryConfig);
      }),
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  retrievePickupLocations(): Observable<any> {
    const postParams: ServiceParameters = { active: true };
    const queryConfig = new RPCQueryConfig('retrievePickupLocations', postParams, true, true);

    return this.http
      .post(this.serviceUrlInstitution, queryConfig)
      .pipe(map(({ response }: MessageResponse<any>) => response.list));
  }

  isOutsideMerchantDeliveryArea(merchantId: string, latitude: number, longitude: number): Observable<boolean> {
    const postParams: ServiceParameters = { merchantId, latitude, longitude };
    const queryConfig = new RPCQueryConfig('isOutsideMerchantDeliveryArea', postParams, true);

    return this.http
      .post(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response }: MessageResponse<boolean>) => response));
  }

  getMerchantPaymentAccounts(merchantId: string): Observable<MerchantAccountInfoList> {
    const methodName = 'getMerchantPaymentAccounts';
    const postParams: ServiceParameters = { merchantId };

    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id }) => {
        const queryConfig = new RPCQueryConfig('getMerchantPaymentAccounts', { ...postParams, userId: id }, true);

        return this.http.post(this.serviceUrlMerchant, queryConfig);
      }),
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  getSettingByConfig(config): Observable<SettingInfo> {
    const queryConfig = new RPCQueryConfig('retrieveSetting', config, true, true);

    return this.http
      .post('/json/configuration', queryConfig)
      .pipe(map(({ response }: MessageResponse<SettingInfo>) => response));
  }

  getDisplayMenu(
    merchantId: string,
    dateTime: string,
    orderType: number,
    locale: string = null,
    depth: number = 4
  ): Observable<any> {
    const postParams: ServiceParameters = { merchantId, dateTime, orderType, locale, depth };
    const queryConfig = new RPCQueryConfig('getDisplayMenu', postParams, true);

    return this.http
      .post(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response }: MessageResponse<any>) => response));
  }

  addressToGeocode(address: AddressInfo): Observable<any> {
    const postParams: ServiceParameters = { address };
    const queryConfig = new RPCQueryConfig('addressToGeocode', postParams, true);

    return this.http.post(this.serviceUrlUser, queryConfig).pipe(map(({ response }: MessageResponse<any>) => response));
  }

  submitOrder(orderInfo: OrderInfo, accountId: string, cvv: string): Observable<OrderInfo> {
    accountId = accountId === 'rollup' ? null : accountId;
    const postParams: ServiceParameters = { order: this.adjustOrderIfRollUp(orderInfo), accountId, cvv };
    const queryConfig = new RPCQueryConfig('submitOrder', postParams, true);

    return this.http
      .post(this.serviceUrlOrdering, queryConfig)
      .pipe(map(({ response }: MessageResponse<any>) => response));
  }

  removeAddress(addressId: string): Observable<any> {
    const postParams: ServiceParameters = { addressId };

    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ id }) => {
        const queryConfig = new RPCQueryConfig('deleteUserAddress', { ...postParams, userId: id }, true);

        return this.http.post('/json/user', queryConfig);
      }),
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  private adjustOrderIfRollUp(order: OrderInfo): OrderInfo {
    if (
      order &&
      order.orderPayment &&
      order.orderPayment.length > 0 &&
      order.orderPayment[0].accountId &&
      order.orderPayment[0].accountId === 'rollup'
    ) {
      order.orderPayment = [];
    }
    return order;
  }
}
