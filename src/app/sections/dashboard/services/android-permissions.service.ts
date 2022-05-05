import { Injectable } from '@angular/core';
import { AndroidPermissionResponse, AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
  providedIn: 'root',
})

export class AndroidPermissionsService {
  permissionDismissed = false;
  constructor(private readonly androidPermissions: AndroidPermissions) {}

  async checkLocationPermission(): Promise<AndroidPermissionResponse> {
    return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
  }

  async requestLocationPermissions(): Promise<any> {
    return this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
    ]);
  }
}
