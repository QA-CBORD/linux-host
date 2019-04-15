import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/operators';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MMobileLocationInfo, MActivateMobileLocationResult } from '../model/mobile-access.interface';
import { MessageResponse } from '../../../core/model/service/message-response.interface';

@Injectable()
export class MobileAccessService extends BaseService {
  private readonly serviceUrl = '/json/commerce';
  private readonly locations$: BehaviorSubject<MMobileLocationInfo[]> = new BehaviorSubject<MMobileLocationInfo[]>([]);
  private coords: MGeoCoordinates = {
    latitude: null,
    longitude: null,
    accuracy: null,
  };

  get locations(): Observable<MMobileLocationInfo[]> {
    return this.locations$.asObservable();
  }

  private set _locations(locations: MMobileLocationInfo[]) {
    this.locations$.next([...locations]);
  }

  /**
   * Retrieve Mobile Access locations for user
   *
   * @param incomeGeoData  Geolocation data for user. null if none exists
   */
  getMobileLocations(incomeGeoData: MGeoCoordinates): Observable<MMobileLocationInfo[]> {
    const filters = ['Normal', 'TempCode', 'Attendance'];

    const postParams: ServiceParameters = { ...incomeGeoData, filters };

    return this.httpRequest(this.serviceUrl, 'getMobileLocations', true, postParams).pipe(
      map(({ response }) => response.sort(this.sortByClosestDistance)),
      tap((locations: MMobileLocationInfo[]) => (this._locations = locations))
    );
  }

  private sortByClosestDistance({ distance: a }: MMobileLocationInfo, { distance: b }: MMobileLocationInfo) {
    return a && b ? a - b : 0;
  }

  addToFavourite(id: string) {}

  /**
   * Activate 'Mobile Location' location for user
   *
   * @param locationId    Id of location to activate
   * @param geoData       Geolocation data of user if available, null otherwise
   * @param sourceInfo    I don't know but we always null this out
   */
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

  /**
   * configure Mobile Location Params
   *
   * @param locationId
   * @param geoData
   * @param sourceInfo
   */
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
