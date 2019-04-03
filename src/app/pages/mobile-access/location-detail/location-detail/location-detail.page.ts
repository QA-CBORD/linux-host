import { Component, OnInit, Input } from '@angular/core';

import { Events, ModalController, PopoverController } from '@ionic/angular';

import * as Globals from 'src/app/app.global';

import { MobileAccessProvider } from 'src/app/pages/mobile-access/provider/mobile-access.provider';
import { ExceptionProvider } from 'src/app/core/provider/exception-provider/exception.provider';

import { MGeoCoordinates } from 'src/app/core/model/geolocation/geocoordinates.interface';
import { MActivateMobileLocationResult } from '../../model/mobile-access.interface';


@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {

  @Input() selectedLocation: any;
  @Input() geoData: MGeoCoordinates;

  constructor(
    private events: Events,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private mobileAccessProvider: MobileAccessProvider,
  ) {
  }

  ngOnInit() {
  }

  /**
   * Activate the selected Mobile Location
   */
  activateSelected() {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: true, message: 'Activating...' });
    this.activateMobileLocation(false);
  }

  /**
   * Activate mobile location
   *
   * @param bUseLocation    Whether or not to use location data
   */
  private activateMobileLocation(bUseLocation: boolean) {

    this.mobileAccessProvider.activateMobileLocation(this.geoData, this.selectedLocation.locationId, null)
      .subscribe(
        data => {
          this.handleActivateMobileLocationResponse(data);
        },
        error => {
          this.onActivateMobileLocationFailure(bUseLocation, error);
        }
      );

  }

  /**
   * Manage the success response returned when activating a mobile location
   *
   * @param response Response returned from service call
   */
  private handleActivateMobileLocationResponse(response: MActivateMobileLocationResult) {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
    if (!response.responseCode || response.responseCode === '00') {
      // need fucntional PDF_417 generator

      if (response.showTempCode === 1) {
        //   if (response.showBarCode == 1) {
        //     // show response code as barcode?
        //   } else {
        //     // show temp code as text
        //   }

        let tCodeMessage = `Temporary Number: ${response.issuedCode}`;
        if (response.message && response.issuedCode && response.message.includes(response.issuedCode)) {
          tCodeMessage = response.message;
        }

        ExceptionProvider.showException(this.events,
          {
            displayOptions: Globals.Exception.DisplayOptions.ONE_BUTTON,
            messageInfo: {
              title: 'Success!',
              message: tCodeMessage,
              positiveButtonTitle: 'OK',
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
              title: 'Success!',
              message: response.message,
              positiveButtonTitle: 'OK',
              positiveButtonHandler: () => {
                this.closeModal();
              }
            }
          });
      }
    } else {
      // falure
      ExceptionProvider.showException(this.events, {
        displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
        messageInfo: {
          title: 'Failed',
          message: response.message,
          positiveButtonTitle: 'RETRY',
          positiveButtonHandler: () => {
            this.activateSelected();
          },
          negativeButtonTitle: 'CLOSE',
          negativeButtonHandler: () => {
            this.closeModal();
          }
        }
      });
    }
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
          title: 'Error activating location',
          message: errorMessage,
          positiveButtonTitle: 'Retry',
          positiveButtonHandler: () => {
            this.activateMobileLocation(bUseLocation);
          },
          negativeButtonTitle: 'Close',
          negativeButtonHandler: () => {
            this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
          }
        }
      });
  }

  /**
   * Close the Activate Mobile Location Modal
   */
  async closeModal() {
    await this.popoverCtrl.dismiss();
    // await this.modalCtrl.dismiss();
  }

}
