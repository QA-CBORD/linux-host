import { Injectable } from "@angular/core";
import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { SessionService } from '../session-service/session-service';
import { OpenMyDoorService } from '../open-my-door/open-my-door-service';
import { MobileLocationInfo } from './../../models/open-my-door/open-my-door.interface';






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


    getMobileLocations() {
        
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
        .then(geoData => {
            this.getMobileLocationData(geoData);
        })
        .catch(error => {
            this.logError(error);
        });
    }



    private getMobileLocationData(geoData: any) {
        console.log(geoData);
        
        this.omdService.getMobileLocations(geoData.coords.latitude, geoData.coords.longitude, geoData.coords.accuracy)
            .subscribe(
                mobileLocationArray => {
                    this.getMobileLocationDataResponse(mobileLocationArray);
                },
                error => {
                    this.logError(error);
                },
                () => {
                    // complete
                    console.log("getMobileLocationData Complete");                    
                }
            )
    }

    private getMobileLocationDataResponse(mobileLocationArray: MobileLocationInfo[]){
        console.log(mobileLocationArray);
        
    }

    private logError(message: any) {
        console.error("Show Error:");
        console.error(message);
      }

}