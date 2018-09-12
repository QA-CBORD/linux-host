import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import * as Globals from '../../app/app.global';
import { OpenMyDoorModalPage } from '../open-my-door-modal/open-my-door-modal';
import { OpenMyDoorDataManager } from './../../providers/open-my-door-data-manager/open-my-door-data-manager';
import { ExceptionManager } from '../../providers/exception-manager/exception-manager';
import { MobileLocationInfo } from '../../models/open-my-door/open-my-door.interface';


@IonicPage()
@Component({
  selector: 'page-open-my-door',
  templateUrl: 'open-my-door.html',
})
export class OpenMyDoorPage {

  tempLcAr: MobileLocationInfo[];
  mobileLocationInfo: MobileLocationInfo[];

  currentSelectedLocation: any;
  refresher: any;

  latitude: number = null;
  longitude: number = null;
  accuracy: number = null;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private modCtrl: ModalController,
    private omdDataManager: OpenMyDoorDataManager,
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions
  ) {


    // get open my door data

    try {
      this.latitude = parseFloat(navParams.get('latitude'));
      this.longitude = parseFloat(navParams.get('longitude'));
      this.accuracy = parseFloat(navParams.get('accuracy'));
      console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}, Accuracy: ${this.accuracy}`);
    } catch (error) {
      console.log(error);
    }

    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Retrieving locations..." });
    this.events.subscribe(OpenMyDoorDataManager.DATA_MOBILELOCATIONINFO_UPDATED, (updatedMobileLocaitonInfo) => {

      if (updatedMobileLocaitonInfo.data == null) {
        let errorMessage = "An error occurred while trying to retrieve your information.";
        if (updatedMobileLocaitonInfo.error != null) {
          errorMessage = updatedMobileLocaitonInfo.error;
        }
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        ExceptionManager.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: "Something went wrong",
            message: errorMessage,
            positiveButtonTitle: "RETRY",
            positiveButtonHandler: () => {
              this.getLocationData();
            },
            negativeButtonTitle: "CLOSE",
            negativeButtonHandler: () => {
              this.platform.exitApp();
            }
          }
        });

      } else {
        this.tempLcAr = updatedMobileLocaitonInfo.data;
        for (let i = 0; i < this.tempLcAr.length; i++) {
          // this.tempLcAr[i].distance = Number(this.randomIntFromInterval(0.05, 5).toFixed(2));
          this.tempLcAr[i].distance > 99 ? this.tempLcAr[i].distance = NaN :
            this.tempLcAr[i].distance > 5 ? this.tempLcAr[i].distance = Number(this.tempLcAr[i].distance.toFixed(2)) : this.tempLcAr[i].distance = this.tempLcAr[i].distance;
        }
        this.mobileLocationInfo = this.tempLcAr;
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
      }
    });

    this.getLocationData();

  }

  randomIntFromInterval(min, max) {
    return Math.random() * ((max - min + 1) + min);
  }

  ionViewWillUnload() {
    console.log("Ion View Will Unload Called");

  }

  private getLocationData() {
    console.log("Get Location Data");

    // check if data was passed from native app via url, otherwise do normal checking
    if (this.latitude != null && this.longitude != null && this.accuracy != null) {
      let geoData = {
        coords: {
          latitude: this.latitude,
          longitude: this.longitude,
          accuracy: this.accuracy
        }
      }
      this.omdDataManager.getMobileLocationData(geoData);
    } else {
      this.checkPermissions();
    }
  }

  private checkPermissions() {
    // android API 6.0+ permissions check
    console.log("Android Permission check");

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
          ExceptionManager.showException(this.events,
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
                  this.omdDataManager.getMobileLocations(false);
                }
              }
            });
        }
      }).catch(error => {
        console.log(`Android Permission Error: `);
        console.log(error);
        this.omdDataManager.getMobileLocations(false);
      });
    } catch (error) {
      console.log("Permissions Error");
      console.log(error);


      this.omdDataManager.getMobileLocations(false);
    }
  }

  private checkLocationServices() {
    // check GPS enabled on device
    console.log("Check Location Service");
    try {
      this.diagnostic.isLocationEnabled()
        .then(enabled => {
          if (enabled) {
            console.log("GPS enabled");
            this.omdDataManager.getMobileLocations(true);
          } else {
            console.log("GPS disabled");
            ExceptionManager.showException(this.events,
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
                  negativeButtonHandler: () => { this.omdDataManager.getMobileLocations(false); }
                }
              });
          }
        })
        .catch(error => {
          console.log(`GPS Enabled check error:`);
          console.log(error);
          this.omdDataManager.getMobileLocations(false);
        });
    } catch (error) {
      console.log("Location error");

      console.log(error);

      this.omdDataManager.getMobileLocations(false);
    }
  }

  locationSelected(item: any) {
    console.log(item.name);
    this.currentSelectedLocation = item;
    this.presentUnlockModal();
  }

  presentUnlockModal() {
    if (this.currentSelectedLocation == null) {
      return;
    }

    let unlockModal = this.modCtrl.create(OpenMyDoorModalPage, { selectedLocation: this.currentSelectedLocation });
    unlockModal.onDidDismiss(data => {

      console.log(data);

      this.currentSelectedLocation = null;

    });

    unlockModal.present();

  }

}
