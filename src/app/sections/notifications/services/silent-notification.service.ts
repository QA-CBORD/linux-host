import { inject, Injectable } from '@angular/core';
import { registerPlugin } from '@capacitor/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { PhotoUploadInfo } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { firstValueFrom } from 'rxjs';

export enum SilentEventCategory {
  PHOTO_UPLOAD_UPDATE = 'PHOTO_UPLOAD_UPDATE',
}

export enum SilentEventStatus {
  ACCEPTED = 'ACCEPTED',
}
@Injectable({
  providedIn: 'root'
})
export class SilentNotificationService {
  constructor() { }

  private readonly userFacadeService = inject(UserFacadeService);
  private readonly nativeProvider: NativeProvider = inject(NativeProvider);
  private listener: { remove: () => void } = { remove: () => { } };

  async addListener(eventName: string, callback: (event?: PhotoUploadInfo) => void) {
    if (this.nativeProvider.isIos()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const IOSDevice = registerPlugin<any>('IOSDevice');
      const eventListener = await IOSDevice.addListener(eventName, callback);
      this.listener = eventListener;
    } else if (this.nativeProvider.isAndroid()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AndroidDevice = registerPlugin<any>('AndroidDevice');
      const eventListener = await AndroidDevice.addListener(eventName, callback);
      this.listener = eventListener;
    }
  }

  removeLastListener() {
    this.listener?.remove();
  }

  async isSentToCurrentUser(sentId: string): Promise<boolean> {
    const user = await firstValueFrom(this.userFacadeService.getUserData$());
    return user.id === sentId;
  }
}
