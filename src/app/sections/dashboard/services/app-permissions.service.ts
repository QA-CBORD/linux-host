import { Injectable } from '@angular/core';
import { AndroidPermissionResponse, AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraPermissionType, CameraSource } from '@capacitor/camera';
import { take } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  promptDismissed = false;
  constructor(
    private readonly androidPermissions: AndroidPermissions,
    private readonly platform: Platform,
    private readonly identityFacadeService: IdentityFacadeService
  ) {}

  async checkLocationPermission(): Promise<AndroidPermissionResponse> {
    return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
  }

  async requestLocationPermissions(): Promise<any> {
    return this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
    ]);
  }

  async requestCameraPermission(cameraSource: CameraSource) {
    const permission = await Camera.checkPermissions();
    const source = cameraSource.toLocaleLowerCase();
    if (/prompt/.test(permission[source])) {
      await Camera.requestPermissions({ permissions: [<CameraPermissionType>source] });
      this.preventLockScreen();
    }
  }

  private preventLockScreen() {
    this.platform.ready().then(() => {
      this.platform.resume.pipe(take(1)).subscribe(() => {
        this.identityFacadeService.navigatedToPlugin = true;
      });
    });
  }
}
