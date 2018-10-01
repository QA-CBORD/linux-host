import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { GETService } from "../get-service/get-service";
import { MobileLocationInfo, ActivateMobileLocationResult } from '../../models/open-my-door/open-my-door.interface';


@Injectable()
export class OpenMyDoorService extends GETService {

  private serviceUrl: string = '/json/commerce';

  public getMobileLocations(latitude: number, longitude: number, accuracy: number): Observable<MobileLocationInfo[]> {

    return Observable.create((observer: any) => {

      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let postParams = {
        method: 'getMobileLocations',
        params: {
          sessionId: GETService.getSessionId(),
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy,
          filters: ["Normal", "TempCode", "Attendance"]
        }
      };

      console.log(JSON.stringify(postParams));

      this.httpPost(this.serviceUrl, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /// example 1 cleaner method
  public getMobileLocationskk(params: Map<string, any>): Observable<MobileLocationInfo[]> {

    return Observable.create((observer: any) => {

      console.log(JSON.stringify(params));

      this.httpPostNew(this.serviceUrl, 'getMobileLocations', true, params)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  /// example 2 cleaner method
  public getMobileLocationskk2(latitude: number, longitude: number, accuracy: number): Observable<MobileLocationInfo[]> {

    let params: any = {
      latitude: latitude,
      longitude: longitude,
      accuracy: accuracy,
      filters: ["Normal", "TempCode", "Attendance"]
    }

    return Observable.create((observer: any) => {

      console.log(JSON.stringify(params));

      this.httpPostNew(this.serviceUrl, 'getMobileLocations', true, params)
        .subscribe(
          data => {
            // validate data then throw error or send
            observer.next(data.response);
            observer.complete();
          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }

  public activateMobileLocation(locationId: string, geoData: any, sourceInfo: string): Observable<ActivateMobileLocationResult> {

    return Observable.create((observer: any) => {

      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let latitude = geoData == null || geoData.coords == null || geoData.coords.latitude == null ? null : geoData.coords.latitude;
      let longitude = geoData == null || geoData.coords == null || geoData.coords.longitude == null ? null : geoData.coords.longitude;
      let accuracy = geoData == null || geoData.coords == null || geoData.coords.accuracy == null ? null : geoData.coords.accuracy;
      let altitude = geoData == null || geoData.coords == null || geoData.coords.altitude == null ? null : geoData.coords.altitude;
      let altitudeAccuracy = geoData == null || geoData.coords == null || geoData.coords.altitudeAccuracy == null ? null : geoData.coords.altitudeAccuracy;
      let heading = geoData == null || geoData.coords == null || geoData.coords.heading == null ? null : geoData.coords.heading;
      let speed = geoData == null || geoData.coords == null || geoData.coords.speed == null ? null : geoData.coords.speed;


      let postParams = {
        method: 'activateMobileLocation',
        params: {
          sessionId: GETService.getSessionId(),
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
      };

      console.log(JSON.stringify(postParams));

      this.httpPost(this.serviceUrl, postParams)
        .subscribe(
          data => {
            // validate data then throw error or send
            if (data != null && data.response != null) {
              observer.next(data.response);
              observer.complete();
            } else {
              if (data != null && data.exception != null) {
                observer.error(data.exception);
              } else {
                observer.error("An unexpected error occurred");
              }

            }

          },
          error => {
            // do error stuff then push it to observer
            observer.error(error);
          }
        );
    });

  }


}