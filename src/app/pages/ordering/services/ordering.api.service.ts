import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { UserService } from 'src/app/core/service/user-service/user.service';
import { CoordsService } from 'src/app/core/service/coords/coords.service';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { MessageResponse } from 'src/app/core/model/service/message-response.model';
import { MerchantSearchOptions, MerchantInfo } from '..';
import { GeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.model';
import { MerchantSearchOptionName } from '../ordering.config';
import { OrderInfo } from '../shared';

@Injectable()
export class OrderingApiService extends BaseService {
  private readonly serviceUrlMerchant: string = '/json/merchant';
  private readonly serviceUrlOrdering: string = '/json/ordering';

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
    const postParams: ServiceParameters = { merchantId: merchantId, notes: '' };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams);
  }

  removeFavoriteMerchant(merchantId: string): Observable<boolean> {
    const methodName = 'removeFavoriteMerchant';
    const postParams: ServiceParameters = { merchantId: merchantId };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams);
  }

  getSuccessfulOrdersList(userId: string, institutionId: string): Observable<OrderInfo[]> {
    const methodName = 'retrieveSuccessfulOrdersList';
    const postParams: ServiceParameters = { userId: userId, merchantId: null, maxReturn: 30 };
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

  retrieveUserAddressList(userId: string): Observable<any> {
    const methodName = 'retrieveUserAddressList';
    const postParams: ServiceParameters = { userId, addressId: null };

    return this.httpRequestFull('/json/user', methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  getMerchantSettings(merchantId: string): Observable<any> {
    const methodName = 'getMerchantSettings';
    const postParams: ServiceParameters = { merchantId, domain: 'merchant', category: 'order', name: 'pickup_locations_enabled' };

    return this.httpRequestFull('/json/merchant', methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }

  retrievePickupLocations(institutionId: string): Observable<any> {
    const methodName = 'retrievePickupLocations';
    const postParams: ServiceParameters = { active: true };

    return this.httpRequestFull('/json/institution', methodName, true, institutionId, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response)
    );
  }
}
