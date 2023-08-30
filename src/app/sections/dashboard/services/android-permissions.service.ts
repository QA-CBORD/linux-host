import { Injectable } from '@angular/core';
import { AndroidPermissionResponse } from '@awesome-cordova-plugins/android-permissions/ngx';
import { registerPlugin } from '@capacitor/core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AndroidPermissionsPlugin = registerPlugin<any>('AndroidPermissionsPlugin');

@Injectable({
  providedIn: 'root',
})
export class AndroidPermissionsService {
  permissionDismissed = false;

  async checkLocationPermission(): Promise<AndroidPermissionResponse> {
    return <AndroidPermissionResponse>AndroidPermissionsPlugin.checkPermissions();
  }

  async requestLocationPermissions(): Promise<AndroidPermissionResponse> {
    return <AndroidPermissionResponse>AndroidPermissionsPlugin.requestPermissions();
  }
}
