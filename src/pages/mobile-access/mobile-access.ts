import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';

import * as Globals from '../../app/app.global';
import { MobileAccessModalPage } from '../mobile-access-modal/mobile-access-modal';
import { MobileAccessProvider } from '../../providers/mobile-access-provider/mobile-access-provider';
import { ExceptionProvider } from '../../providers/exception-provider/exception-provider';
import { MobileLocationInfo } from '../../models/open-my-door/open-my-door.interface';
import { GeoCoordinates } from '../../models/geolocation/geocoordinates.interface';
import { NonNullAssert } from '@angular/compiler';


@IonicPage({
  name: 'mobile-access'
})
@Component({
  selector: 'page-mobile-access',
  templateUrl: 'mobile-access.html',
})
export class MobileAccessPage {

  mobileLocationInfo: MobileLocationInfo[] = new Array();
  bShowNoLocationsAvailable = false;

  currentSelectedLocation: any;
  refresher: any;
  bIsUpdatingLocations: boolean = false;

  geoData: GeoCoordinates = {
    coords: {
      latitude: null,
      longitude: null,
      accuracy: null
    }
  };

  geolocationWatchId: number = 0;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private modCtrl: ModalController,
    private mobileAccessProvider: MobileAccessProvider,
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation
  ) {

    this.platform.ready().then(() => {

      this.geoData = navParams.data || null;

      console.log("Plat ready");
      
      this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Retrieving locations..." });

      this.getUpdatedLocationData();

    });
  }

  
/**
 * Attempt to get geolocation data from browser, callback called when location value changes
 */
  private getUpdatedLocationData() {
    console.log("Get Updated Location Data");
    
    if (navigator.geolocation) {
      console.log("Geolocation Good");
      this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
        this.geoData.coords.latitude = position.coords.latitude || null;
        this.geoData.coords.longitude = position.coords.longitude || null;
        this.geoData.coords.accuracy = position.coords.accuracy || null;
        console.log(position);
        if (this.bIsUpdatingLocations == false) {          
          this.retrieveMobileLocationData();
        }

      });
    }
    
    this.retrieveMobileLocationData();
  }

  /**
   * Clear Geolocation subscription when leaing the page
   */
  ionViewDidLeave() {
    if (navigator.geolocation) {
      console.log("Clear Watch");
      navigator.geolocation.clearWatch(this.geolocationWatchId);
    }
  }


  /**
   * Make request to retrieve Mobile Location information and handle response
   */
  private retrieveMobileLocationData() {
    console.log("Retrieving Location Data");
    this.bIsUpdatingLocations = true;
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Retrieving locations..." });

    this.mobileAccessProvider.getMobileLocationData(this.geoData).subscribe(
      mobileLocationData => {
        if (mobileLocationData && mobileLocationData.length > 0) {
          this.bShowNoLocationsAvailable = false;
          for (let i = 0; i < mobileLocationData.length; i++) {
            mobileLocationData[i].distance > 99 ? mobileLocationData[i].distance = NaN : mobileLocationData[i].distance > 5 ? mobileLocationData[i].distance = Number(mobileLocationData[i].distance.toFixed(2)) : mobileLocationData[i].distance = mobileLocationData[i].distance;
          }
          this.mobileLocationInfo = mobileLocationData;
          this.bIsUpdatingLocations = false;
        } else {
          this.bShowNoLocationsAvailable = true;
          ExceptionProvider.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: "No locations available",
              message: "There are no locations to display",
              positiveButtonTitle: "RETRY",
              positiveButtonHandler: () => {
                this.retrieveMobileLocationData();
              },
              negativeButtonTitle: "CLOSE",
              negativeButtonHandler: () => {
                this.bIsUpdatingLocations = false;
                this.platform.exitApp();
              }
            }
          });
        }
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

      },
      ((error: Error) => {
        let errorMessage = "An error occurred while trying to retrieve your information.";
        if (error != null && error.message) {
          errorMessage = error.message;
        }
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "Oops!",
            message: errorMessage,
            positiveButtonTitle: "RETRY",
            positiveButtonHandler: () => {
              this.retrieveMobileLocationData();
            },
            negativeButtonTitle: "CLOSE",
            negativeButtonHandler: () => {
              this.bIsUpdatingLocations = false;
              this.platform.exitApp();
            }
          }
        });
      })
    );
  }

  /**
   * Request location permissions for Geolocation requests
   */
  private checkPermissions() {
    // android API 6.0+ permissions check

    try {
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
          this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
        ]
      ).then(result => {
        console.log(`Android permission check result: `);
        console.log(result);

        if (result.hasPermission) {
          this.checkLocationServices();
        } else {
          ExceptionProvider.showException(this.events,
            {
              displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
              messageInfo: {
                title: "Location Permission",
                message: "Please give us Location Permissions to determine nearby locations. Accuracy will suffer greatly if Location is not enabled.",
                positiveButtonTitle: "Settings",
                positiveButtonHandler: () => {
                  this.diagnostic.switchToSettings();
                  this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
                },
                negativeButtonTitle: "No Thanks",
                negativeButtonHandler: () => {
                  this.retrieveMobileLocationData();
                }
              }
            });
        }
      }).catch(error => {
        console.log(`Android Permission Error: `);
        console.log(error);
        this.retrieveMobileLocationData();
      });
    } catch (error) {
      console.log("Permissions Error");
      console.log(error);

      this.retrieveMobileLocationData();
    }
  }

  /**
   * Check if location services are enabled on the device 
   */
  private checkLocationServices() {
    // check GPS enabled on device
    console.log("Check Location Service");
    try {
      this.diagnostic.isLocationEnabled()
        .then(enabled => {
          if (enabled) {
            console.log("GPS enabled");
            this.getMobileLocations(enabled);
          } else {
            console.log("GPS disabled");
            ExceptionProvider.showException(this.events,
              {
                displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
                messageInfo: {
                  title: "GPS Disabled",
                  message: "Please turn on your device GPS so we can accurately determine nearby access locations. Accuracy will suffer greatly if GPS is not enabled.",
                  positiveButtonTitle: "Settings",
                  positiveButtonHandler: () => {
                    this.diagnostic.switchToSettings();
                    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
                  },
                  negativeButtonTitle: "No Thanks",
                  negativeButtonHandler: () => { this.getMobileLocations(false); }
                }
              });
          }
        })
        .catch(error => {
          console.log(`GPS Enabled check error:`);
          console.log(error);
          this.getMobileLocations(false);
        });
    } catch (error) {
      console.log("Location error");

      console.log(error);

      this.getMobileLocations(false);
    }
  }

  /**
  *  Get location info if requested using Ionic Geolocation Service
  * 
  * @param useLocation   Should we use Ionic Geolocation Service to get the location info
  */
  private getMobileLocations(useLocation: boolean) {
    if (useLocation) {
      this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
        .then(geoData => {
          this.geoData = geoData;
          this.retrieveMobileLocationData();
        })
        .catch(error => {
          this.retrieveMobileLocationData();
        });
    } else {
      this.retrieveMobileLocationData();
    }
  }

  /**
   * Handle the selection of a Mobile Location
   * @param item    MobileLocationInfo object of selection
   */
  locationSelected(item: any) {
    console.log(item.name);
    this.currentSelectedLocation = item;
    this.presentUnlockModal();
  }

  /**
   * Display modal to allow user to activate the Mobile Location
   */
  presentUnlockModal() {
    if (this.currentSelectedLocation == null) {
      return;
    }

    let unlockModal = this.modCtrl.create(MobileAccessModalPage,
      {
        selectedLocation: this.currentSelectedLocation,
        geoData: this.geoData
      }
    );
    unlockModal.onDidDismiss(data => {

      console.log(data);

      this.currentSelectedLocation = null;

    });

    unlockModal.present();

  }

}
