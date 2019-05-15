import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { GeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.model';
import { MActivateMobileLocationResult, MMobileLocationInfo } from '../model';
import { MessageResponse } from '../../../core/model/service/message-response.model';
import { UserService } from '../../../core/service/user-service/user.service';
import { CoordsService } from '../../../core/service/coords/coords.service';
import { GeoLocationInfo } from '../../../core/model/geolocation/geoLocationInfo.model';
import { ContentStringInfo } from '../../../core/model/content/content-string-info.model';
import { ContentService } from '../../../core/service/content-service/content.service';
import { ContentStringsParams } from '../mobile-acces.config';

@Injectable()
export class MobileAccessService extends BaseService {
  private readonly serviceUrl = '/json/commerce';
  private readonly favouritesLocationSettingsName = 'mobileaccess_favorites';
  private readonly locations$: BehaviorSubject<MMobileLocationInfo[]> = new BehaviorSubject<MMobileLocationInfo[]>([]);
  private locationsInfo: MMobileLocationInfo[] = [];
  private favourites: string[];
  private content;

  constructor(
    protected readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly coords: CoordsService,
    private readonly contentService: ContentService
  ) {
    super(http);
  }

  get locations(): Observable<MMobileLocationInfo[]> {
    return this.locations$.asObservable();
  }

  private set _locations(locations: MMobileLocationInfo[]) {
    this.locationsInfo = [...locations];
    this.locations$.next([...this.locationsInfo]);
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return this.contentService.retrieveContentStringList(ContentStringsParams).pipe(
      tap(res => {
        this.content = res.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
      })
    );
  }

  getContentValueByName(name: string): string | undefined {
    return this.content[name];
  }

  getMobileLocations(): Observable<MMobileLocationInfo[]> {
    const filters = ['Normal', 'TempCode', 'Attendance'];
    const methodName = 'getMobileLocations';

    const postParams: ServiceParameters = { filters };
    return this.coords.getCoords().pipe(
      switchMap((incomeGeoData: GeoCoordinates) =>
        this.httpRequest<MessageResponse<MMobileLocationInfo[]>>(this.serviceUrl, methodName, true, {
          ...postParams,
          ...incomeGeoData,
        })
      ),
      map(({ response, exception }) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response;
      })
    );
  }

  getLocationById(locationId: string): Observable<MMobileLocationInfo | undefined> {
    return this.locations.pipe(
      map((locations: MMobileLocationInfo[]) => locations.filter(location => location.locationId === locationId)[0])
    );
  }

  updateFavouritesList(locationId: string): Observable<MessageResponse<boolean>> {
    this.favourites = this.handleFavouriteById(locationId, this.favourites);
    this._locations = this.getLocationsMultiSorted(this.locationsInfo, this.favourites);

    return this.saveFavourites(this.favourites);
  }

  trackCurrentPosition(): Observable<GeoCoordinates> {
    return this.coords.startWatchCoords();
  }

  getLocations(): Observable<MMobileLocationInfo[]> {
    return combineLatest(this.getMobileLocations(), this.getFavouritesLocations()).pipe(
      map(
        ([locations, favourites]: [MMobileLocationInfo[], string[]]) =>
          (this._locations = this.getLocationsMultiSorted(locations, favourites))
      )
    );
  }

  getFavouritesLocations(): Observable<string[] | []> {
    return this.userService.getUserSettingsBySettingName(this.favouritesLocationSettingsName).pipe(
      map(({ response: { value } }) => (this.favourites = this.parseArrayFromString(value))),
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
    const methodName = 'activateMobileLocation';
    return this.coords.getCoords().pipe(
      map((coords: Coordinates) => this.createMobileLocationParams(locationId, coords, sourceInfo)),
      switchMap(postParams =>
        this.httpRequest<MessageResponse<MActivateMobileLocationResult>>(this.serviceUrl, methodName, true, postParams)
      ),
      map(({ response, exception }: MessageResponse<MActivateMobileLocationResult>) => {
        if (exception !== null) {
          throw new Error(exception);
        }
        return response;
      })
    );
  }

  private saveFavourites(favourites: string[]): Observable<MessageResponse<boolean>> {
    const favouritesAsString = JSON.stringify(favourites);

    return this.userService
      .saveUserSettingsBySettingName(this.favouritesLocationSettingsName, favouritesAsString)
      .pipe(retry(1));
  }

  private handleFavouriteById(locationId: string, favourites: string[]): string[] | [] {
    const wasFavorite = this.isFavouriteLocation(locationId, favourites);

    if (wasFavorite) {
      return (favourites = favourites.filter(id => id !== locationId));
    }
    favourites.push(locationId);

    return favourites;
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

  private createMobileLocationParams(locationId: string, geoData: Coordinates, sourceInfo: string): GeoLocationInfo {
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
