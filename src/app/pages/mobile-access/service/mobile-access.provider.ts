import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import {
  MMobileLocationInfo,
  MActivateMobileLocationResult,
} from '../model/mobile-access.interface';
import { MobileAccessService } from './mobile-access.service';

@Injectable({
  providedIn: 'root',
})
export class MobileAccessProvider {
  constructor(private mobileAccessService: MobileAccessService) {}

  /**
   * Retrieve mobile location data for Mobile Access
   *
   * @param geoData   Geolocation data for device
   */
  getMobileLocationData(
    geoData: MGeoCoordinates
  ): Observable<MMobileLocationInfo[]> {
    const pGeoData: MGeoCoordinates = {
      coords: {
        latitude: null,
        longitude: null,
        accuracy: null,
      },
    };

    if (geoData && geoData.coords) {
      if (geoData.coords.latitude) {
        pGeoData.coords.latitude = geoData.coords.latitude;
      }
      if (geoData.coords.longitude) {
        pGeoData.coords.longitude = geoData.coords.longitude;
      }
      if (geoData.coords.accuracy) {
        pGeoData.coords.accuracy = geoData.coords.accuracy;
      }
    }

    return this.mobileAccessService.getMobileLocations(geoData);
  }

  /**
   * Activate a mobile location in Mobile Access
   *
   * @param geoData       Geolocation data for user
   * @param locationId    Id of Mobile Location to activate
   * @param sourceInfo    I don't remember what this is for and it's always null... sry :/
   */
  activateMobileLocation(
    geoData: any,
    locationId: string,
    sourceInfo: string
  ): Observable<MActivateMobileLocationResult> {
    return this.mobileAccessService.activateMobileLocation(
      locationId,
      geoData,
      sourceInfo
    );
  }
}
