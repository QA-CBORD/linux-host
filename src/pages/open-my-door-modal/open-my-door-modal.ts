import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import * as Globals from '../../app/app.global';
import { OpenMyDoorDataManager } from '../../providers/open-my-door-data-manager/open-my-door-data-manager';
import { ActivateMobileLocationResult } from '../../models/open-my-door/open-my-door.interface';
import { ExceptionManager } from '../../providers/exception-manager/exception-manager';


@IonicPage()
@Component({
  selector: 'page-open-my-door-modal',
  templateUrl: 'open-my-door-modal.html',
})
export class OpenMyDoorModalPage {

  bShowSuccess: boolean = false;
  currentSelectedLocation: any;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private omdDataManager: OpenMyDoorDataManager,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation
  ) {
    this.currentSelectedLocation = navParams.get('selectedLocation');
  }

  activateSelected() {
    console.log("Activate Selected");
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: "Activating..." });
    this.checkPermissions();
  }

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

  private activateMobileLocation(bUseLocation: boolean) {
    if (bUseLocation) {
      this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
        .then(geoData => {
          this.omdDataManager.activateMobileLocation(geoData, this.currentSelectedLocation.locationId, null)
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

          this.omdDataManager.activateMobileLocation(null, this.currentSelectedLocation.locationId, null)
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
      this.omdDataManager.activateMobileLocation(null, this.currentSelectedLocation.locationId, null)
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

  private handleActivateMobileLocationResponse(response: ActivateMobileLocationResult) {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
    console.log(response);
    if (response.responseCode == "00") {
      if (response.showTempCode == 1) {
        if (response.showBarCode == 1) {
          // show response code as barcode?
        } else {
          // show temp code as text
        }
      } else {
        this.bShowSuccess = true;
        Observable.of(true).delay(3000).subscribe(
          data => { },
          error => { },
          () => {
            this.bShowSuccess = false;
            this.closeModal();
          }
        )
      }
    } else {
      // falure
      ExceptionManager.showException(this.events, {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: "There was an issue processing your request",
          message: "",
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

  private onActivateMobileLocationFailure(bUseLocation: boolean, errorMessage: string) {
    ExceptionManager.showException(this.events,
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

  closeModal() {
    const data = {
      result: 'Success'
    };
    this.viewCtrl.dismiss(data);
  }

}
