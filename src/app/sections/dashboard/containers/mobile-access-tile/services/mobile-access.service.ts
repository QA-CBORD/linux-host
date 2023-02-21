import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MActivateMobileLocationResult, MMobileLocationInfo, MMobileLocationParams } from '@sections/mobile-access/model';
import { MessageResponse, ServiceParameters } from '@core/model/service/message-response.model';
import { Position } from '@capacitor/geolocation';
import { CoordsService } from '@core/service/coords/coords.service';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { User } from '../../../../../app.global';

@Injectable()
export class MobileAccessService {
  private readonly serviceUrl = '/json/commerce';
  private readonly locations$: BehaviorSubject<MMobileLocationInfo[]> = new BehaviorSubject<MMobileLocationInfo[]>([]);
  private locationsInfo: MMobileLocationInfo[] = [];
  private favourites: string[];

  constructor(
    protected readonly http: HttpClient,
    private readonly userFacadeService: UserFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly coords: CoordsService
  ) {}

  get locations(): Observable<MMobileLocationInfo[]> {
    return this.locations$.asObservable();
  }

  private set _locations(locations: MMobileLocationInfo[]) {
    this.locationsInfo = [...locations];
    this.locations$.next([...this.locationsInfo]);
  }

  getLocations(): Observable<MMobileLocationInfo[]> {
    return combineLatest(this.getMobileLocations(), this.getFavouritesLocations()).pipe(
      map(
        ([locations, favourites]: [MMobileLocationInfo[], string[]]) =>
          (this._locations = this.getLocationsMultiSorted(locations, favourites))
      )
    );
  }

  getMobileLocations(): Observable<MMobileLocationInfo[]> {
    const filters = ['Normal', 'TempCode', 'Attendance'];

    const postParams: ServiceParameters = { filters };
    return this.coords.getCoords().pipe(
      switchMap((geoData: Position) => {
        const geoParam = {
          latitude: geoData.coords.latitude,
          longitude: geoData.coords.longitude,
          accuracy: geoData.coords.accuracy,
        };
        const queryConfig = new RPCQueryConfig(
          'getMobileLocations',
          {
            ...postParams,
            ...geoParam,
          },
          true
        );

        return this.http.post<MessageResponse<MMobileLocationInfo[]>>(this.serviceUrl, queryConfig);
      }),
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response;
      }),
      catchError(() => of([]))
    );
  }

  getLocationById(locationId: string): Observable<MMobileLocationInfo | undefined> {
    return this.locations.pipe(
      map((locations: MMobileLocationInfo[]) => locations.filter(location => location.locationId === locationId)[0])
    );
  }

  getFavouritesLocations(): Observable<string[] | []> {
    return this.settingsFacadeService.getUserSetting(User.Settings.MOBILE_ACCESS_FAVORITES).pipe(
      map(({ value }) => (this.favourites = this.parseArrayFromString(value))),
      catchError(() => {
        this.favourites = [];
        return of([]);
      })
    );
  }

  activateMobileLocation(
    locationId: string,
    sourceInfo: string | null = null
  ): Observable<MActivateMobileLocationResult> {
    return this.coords.getCoords().pipe(
      map((geoData: Position) => this.createMobileLocationParams(locationId, geoData.coords, sourceInfo)),
      switchMap(postParams => {
        const queryConfig = new RPCQueryConfig('activateMobileLocation', postParams, true);

        return this.http.post<MessageResponse<MActivateMobileLocationResult>>(this.serviceUrl, queryConfig);
      }),
      map(({ response, exception }: MessageResponse<MActivateMobileLocationResult>) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response;
      })
    );
  }

  private addFavouriteFieldToLocations(locations: MMobileLocationInfo[], favourites: string[]): MMobileLocationInfo[] {
    return locations.map(location => ({
      ...location,
      isFavourite: this.isFavouriteLocation(location.locationId, favourites),
    }));
  }

  private getLocationsMultiSorted(locations: MMobileLocationInfo[], favourites: string[]): MMobileLocationInfo[] {
    const locationListWithFavourites = this.addFavouriteFieldToLocations(locations, favourites);
    const locationsSortedByScores = [...locationListWithFavourites].sort(this.sortByHighestScore);

    return locationsSortedByScores.sort(this.sortByFavourites);
  }

  private isFavouriteLocation(locationId: string, favourites: string[]): boolean {
    return favourites.indexOf(locationId) !== -1;
  }

  private sortByHighestScore({ score: a }: MMobileLocationInfo, { score: b }: MMobileLocationInfo) {
    return a && b ? b - a : 0;
  }

  private sortByFavourites({ isFavourite: a }: MMobileLocationInfo, { isFavourite: b }: MMobileLocationInfo) {
    return Number(b) - Number(a);
  }

  private parseArrayFromString(str: string): string[] | [] {
    const array = JSON.parse(str);
    return Array.isArray(array) ? array : [];
  }

  private createMobileLocationParams(locationId: string, geoData, sourceInfo: string): MMobileLocationParams {
    const latitude = !geoData.latitude ? null : geoData.latitude;
    const longitude = !geoData.longitude ? null : geoData.longitude;
    const accuracy = !geoData.accuracy ? null : geoData.accuracy;
    const altitude = !geoData.altitude ? null : geoData.altitude;
    const altitudeAccuracy = !geoData.altitudeAccuracy ? null : geoData.altitudeAccuracy;
    const heading = !geoData.heading ? null : geoData.heading;
    const speed = !geoData.speed ? null : geoData.speed;

    return {
      locationId,
      tranDate: new Date().toISOString(),
      latitude,
      longitude,
      accuracy,
      altitude,
      altitudeAccuracy,
      speed,
      heading,
      sourceInfo,
    };
  }
}
