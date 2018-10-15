import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';

import { SessionService } from '../../services/session-service/session-service';
import { MobileAccessService } from '../../services/mobile-access-service/mobile-access-service';
import { ActivateMobileLocationResult, MobileLocationInfo } from './../../models/open-my-door/open-my-door.interface';
import { Observable } from "rxjs/Observable";
import { GeoCoordinates } from "../../models/geolocation/geocoordinates.interface";






@Injectable()
export class MobileAccessProvider {

    public static readonly DATA_MOBILELOCATIONINFO_UPDATED = "data:getMobileLocations:updated";

    constructor(
        public events: Events,
        public sessionService: SessionService,
        public mobileAccessService: MobileAccessService,
    ) {

    }  

    /**
     * Retrieve mobile location data for Mobile Access
     * 
     * @param geoData   Geolocation data for device
     */
    getMobileLocationData(geoData: GeoCoordinates): Observable<MobileLocationInfo[]> {

        geoData.coords.latitude = geoData == null || geoData.coords == null || geoData.coords.latitude == null ? null : geoData.coords.latitude;
        geoData.coords.longitude = geoData == null || geoData.coords == null || geoData.coords.longitude == null ? null : geoData.coords.longitude;
        geoData.coords.accuracy = geoData == null || geoData.coords == null || geoData.coords.accuracy == null ? null : geoData.coords.accuracy;

        return this.mobileAccessService.getMobileLocations(geoData);
    }


    /**
     * Activate a mobile location in Mobile Access
     * 
     * @param geoData       Geolocation data for user
     * @param locationId    Id of Mobile Location to activate
     * @param sourceInfo    I don't remember what this is for and it's always null... sry :/
     */
    activateMobileLocation(geoData: any, locationId: string, sourceInfo: string): Observable<ActivateMobileLocationResult> {

        return this.mobileAccessService.activateMobileLocation(locationId, geoData, sourceInfo);
    }

}