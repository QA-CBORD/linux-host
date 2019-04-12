import {Component, OnDestroy, OnInit} from '@angular/core';
import { Platform, Events, PopoverController } from '@ionic/angular';

import { Keyboard } from '@ionic-native/keyboard/ngx';

import * as Globals from '../../app.global';

import { ExceptionProvider } from 'src/app/core/provider/exception-provider/exception.provider';
import { MobileAccessProvider } from 'src/app/pages/mobile-access/service/mobile-access.provider';

import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MMobileLocationInfo } from './model/mobile-access.interface';
import { LocationDetailPage } from './location-detail/location-detail.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-access',
  templateUrl: './mobile-access.page.html',
  styleUrls: ['./mobile-access.page.scss'],
})
export class MobileAccessPage implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  mobileLocationInfoFiltered: MMobileLocationInfo[] = [];
  mobileLocationInfo: MMobileLocationInfo[] = [];
  bShowNoLocationsAvailable = false;
  private selectedLocation: any;
  private locationFilterText = '';

  private geolocationWatchId = 0;
  private bIsUpdatingLocations = false;

  private geoData: MGeoCoordinates = {
    coords: {
      latitude: null,
      longitude: null,
      accuracy: null,
    },
  };

  //-------------
  private tempTitle: string = 'Mobile Access';

  constructor(
    private platform: Platform,
    private events: Events,
    private keyboard: Keyboard,
    private popoverCtrl: PopoverController,
    private mobileAccessProvider: MobileAccessProvider
  ) {}

  /**
   * Required by component, even if empty
   */
  ngOnInit() {}

  ionViewWillEnter() {
    // --------------------------WE NEED IT:
    this.platform.ready().then(() => {
      this.events.publish(Globals.Events.LOADER_SHOW, {
        bShow: true,
        message: 'Retrieving locations...',
      });
      this.getUpdatedLocationData();
    });
  }

  ionViewWillLeave() {
    // --------------------------WE NEED IT:
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this.geolocationWatchId);
    }
  }

  /**
   * Attempt to get geolocation data from browser, callback called when location value changes
   */
  // --------------------------WE NEED IT:
  private getUpdatedLocationData() {
    if (navigator.geolocation) {
      this.geolocationWatchId = navigator.geolocation.watchPosition(
        position => {
          if (position != null && position.coords != null) {
            this.geoData.coords = position.coords;
          }
          if (this.bIsUpdatingLocations === false) {
            this.retrieveMobileLocationData(false);
          }
        }
      );
    }
    this.retrieveMobileLocationData(false);
  }

  /**
   * Make request to retrieve Mobile Location information and handle response
   */
  private retrieveMobileLocationData(bShowLoader: boolean) {
    this.bIsUpdatingLocations = true;
    if (bShowLoader) {
      this.events.publish(Globals.Events.LOADER_SHOW, {
        bShow: true,
        message: 'Retrieving locations...',
      });
    }
    this.sourceSubscription.add(
      this.mobileAccessProvider.getMobileLocationData(this.geoData).subscribe(
        mobileLocationData => {
          this.handleMobileLocationResult(mobileLocationData);
        },
        (error: Error) => {
          let errorMessage =
            'An error occurred while trying to retrieve your information.';
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
              },
            },
          });
        }
      )
    );
  }

  private handleMobileLocationResult(
    newMobileLocations: MMobileLocationInfo[]
  ) {
    /// check for incoming data
    if (newMobileLocations && newMobileLocations.length > 0) {
      this.bShowNoLocationsAvailable = false;
      /// correct any distance value issues for display (make UI friendly)
      for (let i = 0; i < newMobileLocations.length; i++) {
        newMobileLocations[i].distance > 99
          ? (newMobileLocations[i].distance = NaN)
          : newMobileLocations[i].distance > 5
          ? (newMobileLocations[i].distance = Number(
              newMobileLocations[i].distance.toFixed(2)
            ))
          : (newMobileLocations[i].distance = newMobileLocations[i].distance);
      }

      if (
        !(
          this.mobileLocationInfo !== null &&
          JSON.stringify(this.mobileLocationInfo) ===
            JSON.stringify(newMobileLocations)
        )
      ) {
      }

      this.mobileLocationInfo = newMobileLocations;
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
          },
        },
      });
    }
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
  }

  trackByFn(index: number, item: MMobileLocationInfo) {
    return item.locationId; // or item.id
  }

  /**
   * Handle user input event from search bar
   * @param event serch input event object
   */
  onSearchInput(event: any) {
    this.locationFilterText = event.detail.value;
    this.filterLocations();
  }

  /**
   * Handle user enter key on search bar
   */
  onSearchEnterKey() {
    try {
      this.keyboard.hide();
    } catch (e) {}
  }

  /**
   * Filter the list of locations based on user input in search bar
   */
  private filterLocations() {
    if (this.locationFilterText.length <= 0) {
      this.mobileLocationInfoFiltered = Object.assign(
        [],
        this.mobileLocationInfo
      );

      return;
    }

    this.mobileLocationInfoFiltered = this.mobileLocationInfoFiltered.sort(
      this.sortFilteredLocationInfo
    );
  }

  /**
   * Sort filtered location info
   * @param o1
   * @param o2
   */
  private sortFilteredLocationInfo(o1, o2) {
    const isLocation1HasSubstring = o1.locationId.includes(
      this.locationFilterText
    );
    const isLocation2HasSubstring = o2.locationId.includes(
      this.locationFilterText
    );

    /// do both locations have the substring,?if so, sort by distance
    if (isLocation1HasSubstring && isLocation2HasSubstring) {
      if (o1.distance < o2.distance) {
        return -1;
      } else if (o2.distance < o1.distance) {
        return 1;
      } else {
        return 0;
      }
    }

    /// first sort by locationID
    if (isLocation1HasSubstring) {
      return -1;
    } else if (isLocation2HasSubstring) {
      return 1;
    }

    /// second sort by locationName
    if (
      o1.name
        .toLocaleLowerCase()
        .includes(this.locationFilterText.toLowerCase())
    ) {
      return -1;
    } else if (
      o2.name
        .toLocaleLowerCase()
        .includes(this.locationFilterText.toLowerCase())
    ) {
      return 1;
    }

    return 0;
  }

  /**
   * Handle the selection of a Mobile Location
   * @param item    MobileLocationInfo object of selection
   */
  // locationSelected(item: any) {
  //   this.selectedLocation = item;
  //   this.presentUnlockModal();
  // }

  /**
   * Display modal to allow user to activate the Mobile Location
   */
  // private async presentUnlockModal() {
  //   if (this.selectedLocation == null) {
  //     return;
  //   }
  //
  //   const detailPopover: HTMLIonPopoverElement = await this.popoverCtrl.create({
  //     component: LocationDetailPage,
  //     componentProps: {
  //       selectedLocation: this.selectedLocation,
  //       geoData: this.geoData,
  //     },
  //     animated: true,
  //     backdropDismiss: false,
  //   });
  //
  //   detailPopover.onDidDismiss().then(() => {
  //     this.selectedLocation = null;
  //   });
  //
  //   return await detailPopover.present();
  // }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }




  // START REDESIGN:

  onSearchedValue(event) {
    console.log(event)
  }
}
