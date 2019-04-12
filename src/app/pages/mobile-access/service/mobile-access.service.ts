import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';
import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MMobileLocationInfo, MActivateMobileLocationResult } from '../model/mobile-access.interface';
import { tap } from 'rxjs/internal/operators/tap';
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
    sourceInfo: string
  ): Observable<MActivateMobileLocationResult> {
    const postParams = this.createMobileLocationParams(locationId, geoData, sourceInfo);

    return this.httpRequest<any>(this.serviceUrl, 'activateMobileLocation', true, postParams).pipe(
      map(data => {
        if (data != null && data.response != null) {
          return data.response;
        }

        if (data != null && data.exception != null) {
          return data.exception;
        }
        throw new Error('An unexpected error occurred.');
      })
    );
  }

  /**
   * configure Mobile Location Params
   *
   * @param locationId
   * @param geoData
   * @param sourceInfo
   */
  private createMobileLocationParams(locationId: string, geoData: any, sourceInfo: string) {
    const isGeoDataNull = geoData == null || geoData.coords == null;
    const latitude = isGeoDataNull || geoData.coords.latitude == null ? null : geoData.coords.latitude;
    const longitude = isGeoDataNull || geoData.coords.longitude == null ? null : geoData.coords.longitude;
    const accuracy = isGeoDataNull || geoData.coords.accuracy == null ? null : geoData.coords.accuracy;
    const altitude = isGeoDataNull || geoData.coords.altitude == null ? null : geoData.coords.altitude;
    const altitudeAccuracy =
      isGeoDataNull || geoData.coords.altitudeAccuracy == null ? null : geoData.coords.altitudeAccuracy;
    const heading = isGeoDataNull || geoData.coords.heading == null ? null : geoData.coords.heading;
    const speed = isGeoDataNull || geoData.coords.speed == null ? null : geoData.coords.speed;

    return {
      locationId: locationId,
      tranDate: new Date().toISOString(),
      latitude: latitude,
      longitude: longitude,
      accuracy: accuracy,
      altitude: altitude,
      altAccuracy: altitudeAccuracy,
      speed: speed,
      heading: heading,
      sourceInfo: sourceInfo,
    };
  }
}
