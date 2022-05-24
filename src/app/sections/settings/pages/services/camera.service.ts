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
    this.identityFacadeService.updateVaultTimeout({ extendTimeout: true, keepTimeoutExtendedOnResume: true });
    return Camera.getPhoto(options).finally(() =>
      this.identityFacadeService.updateVaultTimeout({ extendTimeout: false }));
  }

  private async requestCameraPermission(cameraSource: CameraSource) {
    const permission = await Camera.checkPermissions();
    const source = cameraSource.toLocaleLowerCase();
    if (/prompt/.test(permission[source])) {
       await Camera.requestPermissions({ permissions: [<CameraPermissionType>source] });
    }
  }

  private preventLockScreen() {
    this.platform.ready().then(() => {
      this.platform.resume.pipe(take(1)).subscribe(() => {

      });
    });
  }
}
