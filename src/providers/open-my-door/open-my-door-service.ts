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
          filters: null
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

  public activateMobileLocation(locationId: string, tranDate: Date, latitude: number, longitude: number, accuracy: number, altitude: number, altAccuracy: number, speed: number, heading: number, sourceInfo: string): Observable<ActivateMobileLocationResult> {

    return Observable.create((observer: any) => {

      if (GETService.getSessionId() == null) {
        // Need a session to make the call so return error
        let error = new Error("Invalid session");
        return Observable.throw(error);
      }

      let postParams = {
        method: 'activateMobileLocation',
        params: {
          sessionId: GETService.getSessionId(),
          locationId: locationId,
          tranDate: tranDate,
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy,
          altitude: altitude,
          altAccuracy: altAccuracy,
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


}