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

  mobileLocationInfo: MobileLocationInfo[];

  currentSelectedLocation: any;
  refresher: any;

  latitude: string = null;
  longitude: string = null;
  accuracy: string = null;

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

    this.platform.ready().then(() => {
      this.latitude = navParams.get('latitude');
      this.longitude = navParams.get('longitude');
      this.accuracy = navParams.get('accuracy');

      this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Retrieving locations..." });
      this.events.subscribe(OpenMyDoorDataManager.DATA_MOBILELOCATIONINFO_UPDATED, (updatedMobileLocaitonInfo) => {
        this.mobileLocationInfo = updatedMobileLocaitonInfo;
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        this.onCompleteRefresh();
      });
      this.getLocationData();
    }).catch((error) => {
      console.log(error);

    });
  }

  ionViewWillUnload() {
    console.log("Ion View Will Unload Called");

  }

  private getLocationData() {
    console.log("Get Location Data");

    // check if data was passed from native app via url, otherwise do normal checking
    if(this.latitude != null && this.longitude != null && this.accuracy != null){
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
                  this.onCompleteRefresh();
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
                    this.onCompleteRefresh();
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
    this.onCompleteRefresh();
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

  onSwipeRefresh(refresher: any) {
    this.refresher = refresher;
    this.getLocationData();
  }

  onCompleteRefresh() {
    if (this.refresher) {
      this.refresher.complete();
    }
  }

}
