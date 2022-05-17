import { Injectable } from '@angular/core';
import { Camera, CameraPermissionType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { Platform } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private readonly platform: Platform,
    private identityFacadeService: IdentityFacadeService) { }

  async getPhoto(options: ImageOptions): Promise<Photo> {
    await this.requestCameraPermission(options?.source || CameraSource.Photos);
    return Camera.getPhoto(options);
  }

  private async requestCameraPermission(cameraSource: CameraSource) {
    const permission = await Camera.checkPermissions();
    const source = cameraSource.toLocaleLowerCase();
    this.identityFacadeService.onNavigateExternal({ makeVaultUnLockable: true });
    if (/prompt/.test(permission[source])) {
      const permissionStatus = await Camera.requestPermissions({ permissions: [<CameraPermissionType>source] }).catch((error) => console.log("CAMERA: ", error));
      console.log("PERMISION STATUS: ", permissionStatus);
    }
  }

  private preventLockScreen() {
    this.platform.ready().then(() => {
      this.platform.resume.pipe(take(1)).subscribe(() => {

      });
    });
  }
}
