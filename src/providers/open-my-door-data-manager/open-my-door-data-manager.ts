import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { SessionService } from '../session-service/session-service';
import { OpenMyDoorService } from '../open-my-door/open-my-door-service';
import { ActivateMobileLocationResult } from './../../models/open-my-door/open-my-door.interface';
import { Observable } from "rxjs/Observable";






@Injectable()
export class OpenMyDoorDataManager {

    public static readonly DATA_MOBILELOCATIONINFO_UPDATED = "data:getMobileLocations:updated";

    constructor(
        public events: Events,
        public sessionService: SessionService,
        public omdService: OpenMyDoorService,
        private geolocation: Geolocation
    ) {

    }


    getMobileLocations(useLocation: boolean) {
        if (useLocation) {
            this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
                .then(geoData => {
                    this.getMobileLocationData(geoData);
                })
                .catch(error => {
                    this.logError(error);
                });
        } else {
            this.getMobileLocationData(null);
        }
    }



    getMobileLocationData(geoData: any) {

        let latitude = geoData == null || geoData.coords == null || geoData.coords.latitude == null ? null : geoData.coords.latitude;
        let longitude = geoData == null || geoData.coords == null || geoData.coords.longitude == null ? null : geoData.coords.longitude;
        let accuracy = geoData == null || geoData.coords == null || geoData.coords.accuracy == null ? null : geoData.coords.accuracy;
        

        this.omdService.getMobileLocations(latitude, longitude, accuracy)
            .subscribe(
                mobileLocationArray => {
                    this.events.publish(OpenMyDoorDataManager.DATA_MOBILELOCATIONINFO_UPDATED, {data: mobileLocationArray, error: null});
                },
                error => {
                    this.events.publish(OpenMyDoorDataManager.DATA_MOBILELOCATIONINFO_UPDATED, {data: null, error: error.message});
                    this.logError(error);
                },
                () => {
                    // complete
                }
            )
    }

    activateMobileLocation(geoData: any, locationId: string, sourceInfo: string): Observable<ActivateMobileLocationResult>{
        
        return this.omdService.activateMobileLocation(locationId, geoData, sourceInfo);
        
    }
     

    private logError(message: any) {
        console.error("Show Error:");
        console.error(message);
    }

}