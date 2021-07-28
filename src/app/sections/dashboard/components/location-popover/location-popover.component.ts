import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingService } from '@core/service/loading/loading.service';
import { Plugins } from '@capacitor/core';
import { take } from 'rxjs/operators';
import { from } from 'rxjs';


const { Geolocation } = Plugins;
@Component({
  selector: 'st-location-popover',
  templateUrl: './location-popover.component.html',
  styleUrls: ['./location-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LocationPermissionModal {
  constructor(
    private readonly modalController: ModalController,
    private readonly androidPermissions: AndroidPermissions,
    private readonly loadingService: LoadingService
  ) {}

  private readonly WAIT_IMAGE_RENDERING = 2000;


  ionViewWillEnter() {
    this.loadingService.showSpinner();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadingService.closeSpinner();
    }, this.WAIT_IMAGE_RENDERING);
  }

  async requestLocationPermissions() {
    // alert('requestLocationPermissions')
    console.log('requestLocationPermissions')
    this.requestLocationFromDevice();
    // await this.androidPermissions.requestPermissions([
    //   this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
    //   this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
    // ]);
    this.modalController.dismiss();
  }


  private requestLocationFromDevice() {

    const options = {
      enableHighAccuracy: true,
      timeout: 5,
    };

    from(Geolocation.getCurrentPosition(options))
      .pipe(
        take(1),
      )
      .subscribe();
  }
}

