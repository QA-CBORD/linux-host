import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';

import { SessionService } from '../../services/session-service/session-service';
import { MobileAccessService } from '../../services/mobile-access-service/mobile-access-service';
import { MActivateMobileLocationResult, MMobileLocationInfo } from './../../models/open-my-door/open-my-door.interface';
import { Observable } from "rxjs/Observable";
import { MGeoCoordinates } from "../../models/geolocation/geocoordinates.interface";






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
    getMobileLocationData(geoData: MGeoCoordinates): Observable<MMobileLocationInfo[]> {
        let pGeoData: MGeoCoordinates = {
            coords: {
                latitude: null,
                longitude: null,
                accuracy: null
            }
        };

        if(geoData){
            if(geoData.coords){
                if(geoData.coords.latitude){
                    pGeoData.coords.latitude = geoData.coords.latitude;
                }
                if(geoData.coords.longitude){
                    pGeoData.coords.longitude = geoData.coords.longitude;
                }
                if(geoData.coords.accuracy){
                    pGeoData.coords.accuracy = geoData.coords.accuracy;
                }
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
    activateMobileLocation(geoData: any, locationId: string, sourceInfo: string): Observable<MActivateMobileLocationResult> {

        return this.mobileAccessService.activateMobileLocation(locationId, geoData, sourceInfo);
    }

}