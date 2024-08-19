import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, retry, switchMap, take, tap } from 'rxjs/operators';

import { MActivateMobileLocationResult, MMobileLocationInfo, MMobileLocationParams } from '../model';
import { CONTENT_STRINGS, GenericContentStringsParams, MobileAccessContentStringsParams } from '../mobile-acces.config';
import { Settings, User } from '../../../app.global';
import { CoordsService } from '@core/service/coords/coords.service';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { MessageResponse, ServiceParameters } from '@core/model/service/message-response.model';
import { Position } from '@capacitor/geolocation';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';

@Injectable()
export class MobileAccessService {
  private readonly serviceUrl = '/json/commerce';
  private readonly favouritesLocationSettingsName = 'mobileaccess_favorites';
  private readonly locations$: BehaviorSubject<MMobileLocationInfo[]> = new BehaviorSubject<MMobileLocationInfo[]>([]);
  private locationsInfo: MMobileLocationInfo[] = [];
  private favourites: string[];
  private content;
  private toastDuration = 6000;

  constructor(
    private readonly http: HttpClient,
    private readonly coords: CoordsService,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly toastService: ToastService,
    private readonly settingsFacadeService: SettingsFacadeService,
  ) {}

  get locations(): Observable<MMobileLocationInfo[]> {
    return this.locations$.asObservable();
  }

  private set _locations(locations: MMobileLocationInfo[]) {
    this.locationsInfo = [...locations];
    this.locations$.next([...this.locationsInfo]);
  }

  getInstitutionColor(): Observable<string> {
    return this.settingsFacadeService.getSetting(Settings.Setting.MOBILE_HEADER_COLOR).pipe(
      map(({ value }) => value)
    );
  }

  initContentStringsList(): Observable<ContentStringInfo[]> {
    return combineLatest(
      this.contentStringFacadeService.retrieveContentStringListByRequest(MobileAccessContentStringsParams),
      this.contentStringFacadeService.retrieveContentStringListByRequest(GenericContentStringsParams)
    ).pipe(
      map(([mobileCS, genericCS]) => {
        const finalArray = [...mobileCS, ...genericCS];
        this.content = finalArray.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
        return finalArray;
      }),
      take(1)
    );
  }

  initContentStringsListgfas(): Observable<ContentStringInfo[]> {
    return this.contentStringFacadeService
      .retrieveContentStringListByRequest(GenericContentStringsParams)
      .pipe(tap(res => (this.content = res.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {}))));
  }

  getContentValueByName(name: string): string {
    return this.content[name] || '';
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
      })
    );
  }

  getLocationById(locationId: string): Observable<MMobileLocationInfo | undefined> {
    return this.locations.pipe(
      map((locations: MMobileLocationInfo[]) => locations.filter(location => location.locationId === locationId)[0])
    );
  }

  updateFavouritesList(locationId: string): Observable<MMobileLocationInfo> {
    this.favourites = this.handleFavouriteById(locationId, this.favourites);
    this._locations = this.getLocationsMultiSorted(this.locationsInfo, this.favourites);

    return this.saveFavourites(this.favourites).pipe(
      map((success) => {
        if (success) {
          return success;
        } else {
          throw new Error('');
        }
      }),
      retry(1),
      switchMap(() => this.getLocationById(locationId)),
      tap(
        ({ name, isFavourite }: MMobileLocationInfo) => {
          const onAddMessage = this.getContentValueByName(CONTENT_STRINGS.addFavToast);
          const onRemoveMessage = this.getContentValueByName(CONTENT_STRINGS.removeFavToast);
          const message = `${name} ${isFavourite ? onAddMessage : onRemoveMessage}`;
          this.presentToast(message);
        },
        () => {
          const onErrorMessage = this.getContentValueByName(CONTENT_STRINGS.addFavErrorToast);
          this.errorSavingFavourites(onErrorMessage);
        }
      )
    );
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
      take(1),
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

  private saveFavourites(favourites: string[]): Observable<boolean> {
    const favouritesAsString = JSON.stringify(favourites);

    return this.settingsFacadeService
      .saveUserSetting(User.Settings.MOBILE_ACCESS_FAVORITES, favouritesAsString)
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

  private async presentToast(message: string): Promise<void> {
    await this.toastService.showToast( { message, duration: this.toastDuration } );
  }

  private async errorSavingFavourites(message: string): Promise<void> {
    await this.toastService.showError(message, { duration: this.toastDuration });
  }
}
