import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService, ServiceParameters } from 'src/app/core/service/base-service/base.service';

import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MMobileLocationInfo, MActivateMobileLocationResult } from '../model/mobile-access.interface';


@Injectable({
  providedIn: 'root'
})
export class MobileAccessService extends BaseService {

  private serviceUrl = '/json/commerce';

  /**
    * Retrieve Mobile Access locations for user
    *
    * @param geoData   Geolocation data for user. null if none exists
    */
  getMobileLocations(geoData: MGeoCoordinates): Observable<MMobileLocationInfo[]> {
      let geoDataParam: MGeoCoordinates = {
        coords: {
          latitude: null,
          longitude: null,
          accuracy: null
        }
      };

      if (!(geoData == null || geoData.coords == null || geoData.coords.latitude == null || geoData.coords.longitude == null)) {
        geoDataParam = geoData;
      }

      const postParams: ServiceParameters = {
        'latitude': geoDataParam.coords.latitude,
        'longitude': geoDataParam.coords.longitude,
        'accuracy': geoDataParam.coords.accuracy,
        'filters': ['Normal', 'TempCode', 'Attendance']
      };


    return this.httpRequest(this.serviceUrl, 'getMobileLocations', true, postParams)
        .pipe(
            map(res => {
              if (res === null) {
                throw new Error('No location information available.');
              }
              return res.response;
            })
        );
  }


  /**
   * Activate 'Mobile Location' location for user
   *
   * @param locationId    Id of location to activate
   * @param geoData       Geolocation data of user if avaialable, null otherwise
   * @param sourceInfo    I don't know but we always null this out
   */
  activateMobileLocation(locationId: string, geoData: any, sourceInfo: string): Observable<MActivateMobileLocationResult> {
      const postParams = this.createMobileLocationParams(locationId, geoData, sourceInfo);

      return this.httpRequest(this.serviceUrl, 'activateMobileLocation', true, postParams)
          .pipe(
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
        const altitudeAccuracy = isGeoDataNull ||
        geoData.coords.altitudeAccuracy == null ? null : geoData.coords.altitudeAccuracy;
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
            sourceInfo: sourceInfo
        }
    }
}
