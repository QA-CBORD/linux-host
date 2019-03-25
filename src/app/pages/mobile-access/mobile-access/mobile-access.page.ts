import { Component, OnInit } from '@angular/core';
import { Platform, Events, PopoverController } from '@ionic/angular';

import * as Globals from '../../../app.global';

import { ExceptionProvider } from '../../../provider/exception-provider/exception.provider';
import { MobileAccessProvider } from 'src/app/provider/mobile-access/mobile-access.provider';

import { MGeoCoordinates } from 'src/app/models/geolocation/geocoordinates.interface';
import { MMobileLocationInfo } from 'src/app/models/open-my-door/open-my-door.interface';
import { LocationDetailPage } from '../location-detail/location-detail/location-detail.page';


@Component({
  selector: 'app-mobile-access',
  templateUrl: './mobile-access.page.html',
  styleUrls: ['./mobile-access.page.scss'],
})
export class MobileAccessPage implements OnInit {

  mobileLocationInfoFiltered: MMobileLocationInfo[] = new Array();
  mobileLocationInfo: MMobileLocationInfo[] = new Array();
  bShowNoLocationsAvailable = false;
  private selectedLocation: any;
  private locationFilterText = '';

  private geolocationWatchId = 0;
  private bIsUpdatingLocations = false;

  private geoData: MGeoCoordinates = {
    coords: {
      latitude: null,
      longitude: null,
      accuracy: null
    }
  };

  constructor(
    private platform: Platform,
    private events: Events,
    private popoverCtrl: PopoverController,
    private mobileAccessProvider: MobileAccessProvider
  ) {

    this.platform.ready().then(() => {

      this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: 'Retrieving locations...' });
      this.getUpdatedLocationData();

    });

  }

  /**
   * Required by component, even if empty
   */
  ngOnInit() { }

  /**
     * Clear Geolocation subscription when leaing the page
     */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this.geolocationWatchId);
    }
  }

  /**
   * Attempt to get geolocation data from browser, callback called when location value changes
   */
  private getUpdatedLocationData() {
    if (navigator.geolocation) {
      this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
        if (position != null && position.coords != null) {
          this.geoData.coords = position.coords;
        }
        if (this.bIsUpdatingLocations === false) {
          this.retrieveMobileLocationData(false);
        }

      });
    } else {
      this.retrieveMobileLocationData(false);
    }

  }

  /**
   * Make request to retrieve Mobile Location information and handle response
   */
  private retrieveMobileLocationData(bShowLoader: boolean) {
    this.bIsUpdatingLocations = true;
    if (bShowLoader) {
      this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: 'Retrieving locations...' });
    }
    this.mobileAccessProvider.getMobileLocationData(this.geoData).subscribe(
      mobileLocationData => {
        if (mobileLocationData && mobileLocationData.length > 0) {
          this.bShowNoLocationsAvailable = false;
          for (let i = 0; i < mobileLocationData.length; i++) {
            mobileLocationData[i].distance > 99 ? mobileLocationData[i].distance = NaN :
              mobileLocationData[i].distance > 5 ? mobileLocationData[i].distance =
                Number(mobileLocationData[i].distance.toFixed(2)) : mobileLocationData[i].distance = mobileLocationData[i].distance;
          }
          this.mobileLocationInfo = mobileLocationData;
          this.filterLocations();
          this.bIsUpdatingLocations = false;
        } else {
          this.bShowNoLocationsAvailable = true;
          ExceptionProvider.showException(this.events, {
            displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
            messageInfo: {
              title: Globals.Exception.Strings.TITLE,
              message: 'There are no locations to display',
              positiveButtonTitle: 'RETRY',
              positiveButtonHandler: () => {
                this.retrieveMobileLocationData(true);
              },
              negativeButtonTitle: 'CLOSE',
              negativeButtonHandler: () => {
                this.bIsUpdatingLocations = false;
                // this.platform.exitApp();
              }
            }
          });
        }
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });

      },
      ((error: Error) => {
        let errorMessage = 'An error occurred while trying to retrieve your information.';
        if (error != null && error.message) {
          errorMessage = error.message;
        }
        this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
        ExceptionProvider.showException(this.events, {
          displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
          messageInfo: {
            title: Globals.Exception.Strings.TITLE,
            message: errorMessage,
            positiveButtonTitle: 'RETRY',
            positiveButtonHandler: () => {
              this.retrieveMobileLocationData(true);
            },
            negativeButtonTitle: 'CLOSE',
            negativeButtonHandler: () => {
              this.bIsUpdatingLocations = false;
              // this.platform.exitApp();
            }
          }
        });
      })
    );
  }

  onSearchInput(event: any) {
    this.locationFilterText = event.detail.value;
    this.filterLocations();
  }

  private filterLocations() {
    if (this.locationFilterText.length <= 0) {
      console.log('Full list');

      this.mobileLocationInfoFiltered = Object.assign([], this.mobileLocationInfo);
    } else {
      console.log(`Filter by ${this.locationFilterText.toLocaleLowerCase()}`);
      this.mobileLocationInfoFiltered = this.mobileLocationInfoFiltered.sort((o1, o2) => {
        if (o1.locationId.includes(this.locationFilterText)) {
          return -1;
        } else if (o1.locationId.includes(this.locationFilterText)) {
          return 1;
        }

        if (o1.name.toLocaleLowerCase().includes(this.locationFilterText.toLowerCase())) {
          return -1;
        } else if (o2.name.toLocaleLowerCase().includes(this.locationFilterText.toLowerCase())) {
          return 1;
        }

        return 0;
      });
      // for (const item of this.mobileLocationInfo) {
      //   if (!item.name.toLowerCase().includes(this.locationFilterText.toLowerCase())) {
      //     this.mobileLocationInfoFiltered.indexOf(item);
      //   }
      // }
    }
  }

  /**
     * Handle the selection of a Mobile Location
     * @param item    MobileLocationInfo object of selection
     */
  locationSelected(item: any) {
    this.selectedLocation = item;
    this.presentUnlockModal();
  }

  /**
   * Display modal to allow user to activate the Mobile Location
   */
  private async presentUnlockModal() {
    if (this.selectedLocation == null) {
      return;
    }

    const detailPopover: HTMLIonPopoverElement = await this.popoverCtrl.create(
      {
        component: LocationDetailPage,
        componentProps: {
          selectedLocation: this.selectedLocation,
          geoData: this.geoData
        },
        animated: true,
        backdropDismiss: false
      }
    );

    detailPopover.onDidDismiss().then(data => {
      this.selectedLocation = null;
    });

    return await detailPopover.present();

  }

}
