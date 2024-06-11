import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MerchantInfo, MerchantSearchOptions, MerchantSettingInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MerchantSearchOptionName, MerchantSettings } from '@sections/ordering/ordering.config';
import { MessageListResponse, MessageResponse, ServiceParameters } from '@core/model/service/message-response.model';
import { CoordsService } from '@core/service/coords/coords.service';
import { Position } from '@capacitor/geolocation';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';

@Injectable({
  providedIn: 'root',
})
export class MerchantApiService {
  private readonly serviceUrlMerchant: string = '/json/merchant';

  constructor(private readonly http: HttpClient, private readonly coords: CoordsService) {}

  getMerchants(searchOptions: MerchantSearchOptions): Observable<MerchantInfo[]> {
    return this.coords.getCoords().pipe(
      switchMap(({ coords }: Position) => {
        if (coords && coords.latitude !== null && coords.longitude !== null) {
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LATITUDE, value: coords.latitude });
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LONGITUDE, value: coords.longitude });
        }
        const queryConfig = new RPCQueryConfig('getMerchants', { searchOptions }, true, true);

        return this.http.post(this.serviceUrlMerchant, queryConfig);
      }),
      map(({ response: { list } }: MessageResponse<MessageListResponse<MerchantInfo>>) => list)
    );
  }

  getMenuMerchants(searchOptions: MerchantSearchOptions): Observable<MerchantInfo[]> {
    return this.coords.getCoords().pipe(
      switchMap((geoData: Position) => {
        if (geoData && geoData.coords && geoData.coords.latitude !== null && geoData.coords.longitude !== null) {
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LATITUDE, value: geoData.coords.latitude });
          searchOptions.addSearchOption({ key: MerchantSearchOptionName.LONGITUDE, value: geoData.coords.longitude });
        }
        const queryConfig = new RPCQueryConfig('getMenuMerchants', { searchOptions }, true, true);
        return this.http
          .post(this.serviceUrlMerchant, queryConfig)
          .pipe(map(({ response }: MessageResponse<MessageListResponse<MerchantInfo>>) => response.list));
      })
    );
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

  getFavoriteMerchants(): Observable<MerchantInfo[]> {
    const postParams: ServiceParameters = { excludeNonOrdering: false };
    const queryConfig = new RPCQueryConfig('getFavoriteMerchants', postParams, true);

    return this.http
      .post(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response: { list } }: MessageResponse<MessageListResponse<MerchantInfo>>) => list));
  }
  getMerchantSettings(merchantId: string) {
    const postParams: ServiceParameters = { merchantId, domain: null, category: null, name: null };
    const queryConfig = new RPCQueryConfig('getMerchantSettings', postParams, true);
    return this.http
      .post<MessageResponse<MerchantSettingType>>(this.serviceUrlMerchant, queryConfig)
      .pipe(map(({ response }) => response));
  }
}

export type MerchantSettingType = { list: MerchantSettingInfo[]; map: Map<string, MerchantSettingInfo> | Object };
