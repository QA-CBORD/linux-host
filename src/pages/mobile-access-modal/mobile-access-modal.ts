import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import * as Globals from '../../app/app.global';
import { MobileAccessProvider } from '../../providers/mobile-access-provider/mobile-access-provider';
import { MActivateMobileLocationResult } from '../../models/open-my-door/open-my-door.interface';
import { ExceptionProvider } from '../../providers/exception-provider/exception-provider';
import { MGeoCoordinates } from '../../models/geolocation/geocoordinates.interface';


@IonicPage()
@Component({
  selector: 'page-mobile-access-modal',
  templateUrl: 'mobile-access-modal.html',
})
export class MobileAccessModalPage {

  currentSelectedLocation: any;
  geoData: MGeoCoordinates;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private mobileAccessProvider: MobileAccessProvider,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation
  ) {
    this.currentSelectedLocation = navParams.get('selectedLocation') || null;
    this.geoData = navParams.get('geoData') || null;
  }

  /**
   * Activate the selected Mobile Location
   */
  activateSelected() {
    console.log("Activate Selected");
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Activating..." });
    //this.checkPermissions();
    this.activateMobileLocation(false);
  }

  /**
   * Check Location Permissions
   */
  private checkPermissions() {
    // android API 6.0+ permissions check
    console.log("Android Permission check");

    this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
        this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
      ]
    ).then(result => {
      if (result.hasPermission) {
        this.checkLocationServices();
      } else {
        this.activateMobileLocation(false);
      }
    }).catch(error => {
      this.activateMobileLocation(false);
    });
  }

  /**
   * Check if location services are enabled on the device
   */
  private checkLocationServices() {
    // check GPS enabled on device
    console.log("Check Location Service");

    this.diagnostic.isLocationEnabled()
      .then(enabled => {
        this.activateMobileLocation(enabled);
      })
      .catch(error => {
        console.log("Check Location Service Error");
        console.log(error);
        this.activateMobileLocation(false);
      });
  }

  /**
   * Activate mobile location
   * 
   * @param bUseLocation    Whether or not to use location data
   */
  private activateMobileLocation(bUseLocation: boolean) {
    if (bUseLocation) {
      this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
        .then(geoData => {
          this.mobileAccessProvider.activateMobileLocation(geoData, this.currentSelectedLocation.locationId, null)
            .subscribe(
              data => {
                this.handleActivateMobileLocationResponse(data);
              },
              error => {
                console.log(error);
                this.onActivateMobileLocationFailure(bUseLocation, error);
              }
            );
        })
        .catch(error => {
          console.log(error);

          this.mobileAccessProvider.activateMobileLocation(null, this.currentSelectedLocation.locationId, null)
            .subscribe(
              data => {
                this.handleActivateMobileLocationResponse(data);
              },
              error => {
                console.log(error);
                this.onActivateMobileLocationFailure(bUseLocation, error);
              }
            );
        });
    } else {
      this.mobileAccessProvider.activateMobileLocation(this.geoData, this.currentSelectedLocation.locationId, null)
        .subscribe(
          data => {
            this.handleActivateMobileLocationResponse(data);
          },
          error => {
            console.log(error);
            this.onActivateMobileLocationFailure(bUseLocation, error);
          }
        );
    }
  }

  /**
   * Manage the success response returned when activating a mobile location
   * 
   * @param response Response returned from service call
   */
  private handleActivateMobileLocationResponse(response: MActivateMobileLocationResult) {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
         if (!response.responseCode || response.responseCode == "00") {
      // need fucntional PDF_417 generator

      if (response.showTempCode == 1) {
      //   if (response.showBarCode == 1) {
      //     // show response code as barcode?
      //   } else {
      //     // show temp code as text
      //   }

      let tCodeMessage = `Temporary Number: ${response.issuedCode}`;
      if(response.message && response.issuedCode && response.message.includes(response.issuedCode)){
          tCodeMessage = response.message;
      }

      ExceptionProvider.showException(this.events,
        {
          displayOptions: Globals.Exception.DisplayOptions.ONE_BUTTON,
          messageInfo: {
            title: "Success!",
            message: tCodeMessage,
            positiveButtonTitle: "OK",
            positiveButtonHandler: () => {
              this.closeModal();
            }              
          }
        });

      } else {

        ExceptionProvider.showException(this.events,
          {
            displayOptions: Globals.Exception.DisplayOptions.ONE_BUTTON,
            messageInfo: {
              title: "Success!",
              message: response.message,
              positiveButtonTitle: "OK",
              positiveButtonHandler: () => {
                this.closeModal();
              }              
            }
          });
      }
    } else {
      // falure
      console.log("Activation Failure");
      
      ExceptionProvider.showException(this.events, {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: "Failed",
          message: response.message,
          positiveButtonTitle: "RETRY",
          positiveButtonHandler: () => {
            this.activateSelected();
          },
          negativeButtonTitle: "CLOSE",
          negativeButtonHandler: () => {
            this.closeModal();
          }
        }
      });
    }
    // XXXXX  show success or failure

  }

  /**
   * Manage the failure response when activating a mobile location
   * 
   * @param bUseLocation    Whether location data should be used
   * @param errorMessage    Error message returned from failure
   */
  private onActivateMobileLocationFailure(bUseLocation: boolean, errorMessage: string) {
    ExceptionProvider.showException(this.events,
      {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: "Error activating location",
          message: errorMessage,
          positiveButtonTitle: "Retry",
          positiveButtonHandler: () => {
            this.activateMobileLocation(bUseLocation);
          },
          negativeButtonTitle: "Close",
          negativeButtonHandler: () => {
            this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
          }
        }
      });
  }

  /**
   * Close the Activate Mobile Location Modal
   */
  closeModal() {
    const data = {
      result: 'Success'
    };
    this.viewCtrl.dismiss(data);
  }

}
