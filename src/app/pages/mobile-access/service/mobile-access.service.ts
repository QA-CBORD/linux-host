import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { map, switchMap, take } from 'rxjs/operators';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MActivateMobileLocationResult, MMobileLocationInfo } from '../model/mobile-access.interface';
import { MessageResponse } from '../../../core/model/service/message-response.interface';
import { UserService } from '../../../core/service/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { CoordsService } from '../../../core/service/coords/coords.service';

@Injectable()
export class MobileAccessService extends BaseService {
  private readonly serviceUrl = '/json/commerce';
  private readonly favouritesLocationSettingsName = 'mobileaccess_favorites';
  private readonly locations$: BehaviorSubject<MMobileLocationInfo[]> = new BehaviorSubject<MMobileLocationInfo[]>([]);
  private locationsInfo: MMobileLocationInfo[] = [];

  constructor(protected http: HttpClient, private userService: UserService, private readonly coords: CoordsService) {
    super(http);
  }

  get locations(): Observable<MMobileLocationInfo[]> {
    return this.locations$.asObservable();
  }

  private set _locations(locations: MMobileLocationInfo[]) {
    this.locationsInfo = [...locations];
    this.locations$.next([...this.locationsInfo]);
  }

  getMobileLocations(incomeGeoData: MGeoCoordinates): Observable<MMobileLocationInfo[]> {
    const filters = ['Normal', 'TempCode', 'Attendance'];

    const postParams: ServiceParameters = { ...incomeGeoData, filters };
    return this.httpRequest(this.serviceUrl, 'getMobileLocations', true, postParams).pipe(
      map(({ response }) => response)
    );
  }

  getLocationById(locationId: string): Observable<MMobileLocationInfo> {
    return this.locations.pipe(
      map((locations: MMobileLocationInfo[]) => locations.filter(location => location.locationId === locationId)[0])
    );
  }

  updateFavouritesList(locationId: string): Observable<string[]> {
    return this.getFavouritesLocations().pipe(
      map((fav: string[]) => JSON.stringify(this.handleFavouriteById(locationId, fav))),
      switchMap((favouritesAsString: string) =>
        this.userService.saveUserSettingsBySettingName(this.favouritesLocationSettingsName, favouritesAsString)
      ),
      switchMap(() => this.getFavouritesLocations()),
      tap((fav: string[]) => (this._locations = this.getLocationsSorted(this.locationsInfo, fav))),
      take(1)
    );
  }

  getLocations(incomeGeoData: MGeoCoordinates): Observable<MMobileLocationInfo[]> {
    return combineLatest(this.getMobileLocations(incomeGeoData), this.getFavouritesLocations()).pipe(
      map(([locations, favourites]: [MMobileLocationInfo[], string[]]) =>
        this.getLocationsSorted(locations, favourites)
      ),
      tap((locations: MMobileLocationInfo[]) => (this._locations = locations))
    );
  }

  getFavouritesLocations(): Observable<string[]> {
    return this.userService
      .getUserSettingsBySettingName(this.favouritesLocationSettingsName)
      .pipe(map(({ response: { value } }) => this.parseArrayFromString(value)));
  }

  activateMobileLocation(
    locationId: string,
    geoData: any,
    sourceInfo: string | null = null
  ): Observable<MActivateMobileLocationResult> {
    const postParams = this.createMobileLocationParams(locationId, geoData, sourceInfo);

    return this.httpRequest<MessageResponse<MActivateMobileLocationResult> | Observable<never>>(
      this.serviceUrl,
      'activateMobileLocation',
      true,
      postParams
    ).pipe(map(({ response }: any) => response));
  }

  private handleFavouriteById(locationId: string, favourites: string[]): string[] | [] {
    const wasFavorite = this.isFavouriteLocation(locationId, favourites);
    let favList = favourites;

    if (wasFavorite) {
      favList = favList.filter(id => id !== locationId);
    } else {
      favList.push(locationId);
    }

    return favList;
  }

  private addFavouriteFieldToLocations(locations: MMobileLocationInfo[], favourites: string[]): MMobileLocationInfo[] {
    return locations.map(location => ({
      ...location,
      isFavourite: this.isFavouriteLocation(location.locationId, favourites),
    }));
  }

  private getLocationsSorted(locations: MMobileLocationInfo[], favourites: string[]): MMobileLocationInfo[] {
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
    if (a && b) return 0;
    if (a) return -1;
    return 1;
  }

  private parseArrayFromString(str: string): string[] | [] {
    const array = JSON.parse(str);

    return Array.isArray(array) ? array : [];
  }

  private createMobileLocationParams(locationId: string, geoData: any, sourceInfo: string) {
    const latitude = !geoData.latitude ? null : geoData.latitude;
    const longitude = !geoData.longitude ? null : geoData.longitude;
    const accuracy = !geoData.accuracy ? null : geoData.accuracy;
    const altitude = !geoData.altitude ? null : geoData.altitude;
    const altAccuracy = !geoData.altitudeAccuracy ? null : geoData.altitudeAccuracy;
    const heading = !geoData.heading ? null : geoData.heading;
    const speed = !geoData.speed ? null : geoData.speed;

    return {
      locationId,
      tranDate: new Date().toISOString(),
      latitude,
      longitude,
      accuracy,
      altitude,
      altAccuracy,
      speed,
      heading,
      sourceInfo,
    };
  }
}
