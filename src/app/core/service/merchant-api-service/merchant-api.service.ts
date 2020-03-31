import { Injectable } from '@angular/core';
import { BaseService, ServiceParameters } from '@core/service/base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { MerchantInfo, MerchantSearchOptions } from '@sections/ordering';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GeoCoordinates } from '@core/model/geolocation/geocoordinates.model';
import { MerchantSearchOptionName } from '@sections/ordering/ordering.config';
import { MessageResponse } from '@core/model/service/message-response.model';
import { CoordsService } from '@core/service/coords/coords.service';
import { UserService } from '@core/service/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantApiService extends BaseService {
  private readonly serviceUrlMerchant: string = '/json/merchant';

  constructor(protected readonly http: HttpClient,
              private readonly coords: CoordsService,
              private readonly userService: UserService) {
    super(http);
  }

  getMerchants(searchOptions: MerchantSearchOptions): Observable<MerchantInfo[]> {
    const methodName = 'getMerchants';
    return this.coords.getCoords().pipe(
      switchMap((geoData: GeoCoordinates) => {
        if (geoData && geoData.latitude !== null && geoData.longitude !== null) {
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LATITUDE, value: geoData.latitude });
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LONGITUDE, value: geoData.longitude });
        }

        return this.userService.userData.pipe(
          switchMap(({ institutionId }) =>
            this.httpRequestFull(this.serviceUrlMerchant, methodName, true, institutionId, { searchOptions }),
          ),
          map(({ response }: MessageResponse<any>) => response.list),
        );
      }),
    );
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
            this.httpRequestFull(this.serviceUrlMerchant, methodName, true, institutionId, { searchOptions }),
          ),
          map(({ response }: MessageResponse<any>) => response.list),
        );
      }),
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

  getFavoriteMerchants(): Observable<MerchantInfo[]> {
    const methodName = 'getFavoriteMerchants';
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    return this.httpRequestFull(this.serviceUrlMerchant, methodName, true, null, postParams).pipe(
      map(({ response }: MessageResponse<any>) => response.list),
    );
  }
}
