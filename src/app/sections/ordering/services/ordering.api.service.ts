import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, zip } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { UserService } from 'src/app/core/service/user-service/user.service';
import { CoordsService } from 'src/app/core/service/coords/coords.service';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { MessageResponse } from 'src/app/core/model/service/message-response.model';
import { GeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.model';
import { MerchantSearchOptionName } from '../ordering.config';
import { OrderInfo, BuildingInfo, MerchantAccountInfoList, MerchantInfo } from '../shared';
import { AddressInfo } from '@core/model/address/address-info';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { MerchantSearchOptions } from '@sections/ordering';

@Injectable()
export class OrderingApiService extends BaseService {
  private readonly serviceUrlMerchant: string = '/json/merchant';
  private readonly serviceUrlOrdering: string = '/json/ordering';
  private readonly serviceUrlUser: string = '/json/user';
  private readonly serviceUrlInstitution: string = '/json/institution';

  constructor(
    protected readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly coords: CoordsService
  ) {
    super(http);
  }

  getMenuMerchants(searchOptions: MerchantSearchOptions): Observable<MerchantInfo[]> {
    const methodName = 'getMenuMerchants';
    return this.coords.getCoords().pipe(
      switchMap((geoData: GeoCoordinates) => {
        if (geoData && geoData.latitude !== null && geoData.longitude !== null) {
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LATITUDE, value: geoData.latitude });
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LONGITUDE, value: geoData.longitude });
        }
        return this.userService.userData.pipe(
          switchMap(({ institutionId }) =>
            this.httpRequestFull(this.serviceUrlMerchant, methodName, true, institutionId, { searchOptions })
          ),
          map(({ response }: MessageResponse<any>) => response.list)
        );
      })
    );
  }

  getFavoriteMerchants(): Observable<MerchantInfo[]> {
    const methodName = 'getFavoriteMerchants';
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response.list)
    );
  }

  addFavoriteMerchant(merchantId: string): Observable<string> {
    const methodName = 'addFavoriteMerchant';
    const postParams: ServiceParameters = { merchantId, notes: '' };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams);
  }

  removeFavoriteMerchant(merchantId: string): Observable<boolean> {
    const methodName = 'removeFavoriteMerchant';
    const postParams: ServiceParameters = { merchantId };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams);
  }

  getSuccessfulOrdersList(userId: string, institutionId: string): Observable<OrderInfo[]> {
    const methodName = 'retrieveSuccessfulOrdersList';
    const postParams: ServiceParameters = { userId, merchantId: null, maxReturn: 30 };
    return this.httpRequestFull(this.serviceUrlOrdering, methodName, true, institutionId, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response.list)
    );
  }

  getMerchantOrderSchedule(merchantId: string, orderType: number): Observable<any[]> {
    const methodName = 'getMerchantOrderSchedule';
    const postParams: ServiceParameters = { merchantId, orderType, startDate: null, endDate: null };

    return this.httpRequestFull(this.serviceUrlOrdering, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }
  validateOrder(order: OrderInfo) {
    const methodName = 'validateOrder';
    const postParams: ServiceParameters = { order };

    return this.httpRequestFull(this.serviceUrlOrdering, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  cancelOrder(orderId: string): Observable<boolean> {
    const methodName = 'cancelOrder';
    const postParams: ServiceParameters = { orderId };

    return this.httpRequestFull(this.serviceUrlOrdering, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<boolean>) => response)
    );
  }

  retrieveBuildings(): Observable<BuildingInfo[]> {
    const methodName = 'retrieveBuildings';
    const postParams: ServiceParameters = { active: true };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull(this.serviceUrlInstitution, methodName, true, institutionId, postParams)
      ),
      map(({ response }: MessageResponse<any>) => response.list)
    );
  }

  retrieveUserAddressList(userId: string): Observable<any> {
    const methodName = 'retrieveUserAddressList';
    const postParams: ServiceParameters = { userId, addressId: null };

    return this.httpRequestFull('/json/user', methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
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
  }): Observable<any> {
    const methodName = 'updateUserAddress';
    const campusValue = parseInt(campus);
    let addedAddress;
    const postParams: ServiceParameters = {
      address: {
        objectRevision: null,
        department: null,
        company: null,
        address1,
        address2: address2 !== null && !address2.length ? null : address2,
        city,
        state,
        postalcode: null,
        country: null,
        latitude: campusValue ? building.latitude : null,
        longitude: campusValue ? building.longitude : null,
        notes: null,
        nickname: nickname !== null && !nickname.length ? null : nickname,
        building: building ? building.building : null,
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
      addedAddress = of(postParams.address)
    }

    return zip(addedAddress, this.userService.userData)
      .pipe(
        switchMap(([address, user]) =>
          this.httpRequestFull(this.serviceUrlUser, methodName, true, null, { ...postParams, address, userId: user.id })),
        map(({ response }: MessageResponse<any>) => response)
      )
  }

  getMerchantSettings(merchantId: string): Observable<any> {
    const methodName = 'getMerchantSettings';
    const postParams: ServiceParameters = {
      merchantId,
      domain: 'merchant',
      category: 'order',
      name: 'pickup_locations_enabled',
    };

    return this.httpRequestFull('/json/merchant', methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  retrievePickupLocations(): Observable<any> {
    const methodName = 'retrievePickupLocations';
    const postParams: ServiceParameters = { active: true };

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull(this.serviceUrlInstitution, methodName, true, institutionId, postParams)
      ),
      map(({ response }: MessageResponse<any>) => response.list)
    );
  }

  isOutsideMerchantDeliveryArea(merchantId: string, latitude: number, longitude: number): Observable<boolean> {
    const methodName = 'isOutsideMerchantDeliveryArea';
    const postParams: ServiceParameters = { merchantId, latitude, longitude };

    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  getMerchantPaymentAccounts(merchantId: string): Observable<MerchantAccountInfoList> {
    const methodName = 'getMerchantPaymentAccounts';
    const postParams: ServiceParameters = { merchantId };

    return this.userService.userData.pipe(
      switchMap(({ id }) =>
        this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, { ...postParams, userId: id })
      ),
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  getSettingByConfig(config): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    return this.userService.userData.pipe(
      switchMap(({ institutionId }) =>
        this.httpRequestFull('/json/configuration', methodName, true, institutionId, config)
      ),
      map(({ response }: MessageResponse<SettingInfo>) => response)
    );
  }

  getDisplayMenu(
    merchantId: string,
    dateTime: string,
    orderType: number,
    locale: string = null,
    depth: number = 4
  ): Observable<any> {
    const methodName = 'getDisplayMenu';
    const postParams: ServiceParameters = { merchantId, dateTime, orderType, locale, depth };

    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  addressToGeocode(address: AddressInfo): Observable<any> {
    const methodName = 'addressToGeocode';
    const postParams: ServiceParameters = { address };

    return this.httpRequestFull(this.serviceUrlUser, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  submitOrder(orderInfo: OrderInfo, accountId: string, cvv: string): Observable<OrderInfo> {
    const methodName = 'submitOrder';
    const postParams: ServiceParameters = { orderInfo, accountId, cvv };

    return this.httpRequestFull(this.serviceUrlOrdering, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }
}
