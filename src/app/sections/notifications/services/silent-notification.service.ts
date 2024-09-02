import { inject, Injectable } from '@angular/core';
import { registerPlugin } from '@capacitor/core';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { PhotoUploadInfo } from '@sections/settings/pages/photo-upload/photo-upload.component';

const IOSDevice = registerPlugin<any>('IOSDevice');
const AndroidDevice = registerPlugin<any>('AndroidDevice');

@Injectable({
  providedIn: 'root'
})
export class SilentNotificationService {
  constructor() { }

  private readonly nativeProvider: NativeProvider = inject(NativeProvider);

  addListener(eventName: string, listenerFunc: (event?: PhotoUploadInfo) => void) { 
    if (this.nativeProvider.isIos()) {
      IOSDevice.addListener(eventName, listenerFunc);
    } else if (this.nativeProvider.isAndroid()) {
      AndroidDevice.addListener(eventName, listenerFunc);
    }
  }

  removeAllListeners() {
    if (this.nativeProvider.isIos()) {
      IOSDevice.removeAllListeners();
    } else if (this.nativeProvider.isAndroid()) {
      AndroidDevice.removeListener();
    }
  }
}
