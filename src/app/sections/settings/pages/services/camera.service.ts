import { Injectable } from '@angular/core';
import { Camera, CameraPermissionType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private identityFacadeService: IdentityFacadeService) {}

  async getPhoto(options: ImageOptions): Promise<Photo> {
    if (!options?.source) return;
    await this.requestCameraPermission(options?.source);
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
}
