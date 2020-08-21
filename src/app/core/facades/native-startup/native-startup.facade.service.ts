import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeStartupApiService } from '@core/service/native-startup-api/native-startup-api.service';
import { buttons } from '@core/utils/buttons.config';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class NativeStartupFacadeService extends ServiceStateFacade {
  protected readonly _blockGlobalNavigation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private blockGlobalNavigation: boolean = false;
  private digestKey = 'get_nativeStartupMessageDigest';
  private checkForMessages: boolean = false;

  constructor(
    private readonly nativeStartupApiService: NativeStartupApiService,
    private readonly storageStateService: StorageStateService
  ) {
    super();
  }

  set checkForStartupMessage(value: boolean){
    this.checkForMessages = value;
  }

  set blockGlobalNavigationStatus(value: boolean) {
    this.blockGlobalNavigation = value;
    this._blockGlobalNavigation$.next(this.blockGlobalNavigation);
  }

  get blockGlobalNavigationStatus$(): Observable<boolean> {
    return this._blockGlobalNavigation$;
  }

  fetchNativeStartupInfo(): Observable<any> {
    if(!this.checkForMessages){
      return of(null);
    }
    this.checkForMessages = false;
    return from(Device.getInfo()).pipe(
      take(1),
      switchMap(deviceInfo => {
        if (deviceInfo.platform === 'web') {
          return of(null);
        }
        return zip(
          this.nativeStartupApiService
            .nativeStartup(deviceInfo.platform, deviceInfo.appVersion)
            .pipe(map(response => response.response)),
          this.storageStateService.getStateEntityByKey$(this.digestKey)
        ).pipe(
          map(([NativeStartupInfo, cachedDigest]) => {
            // the service call will return null if there is no Native Startup Message
            if (NativeStartupInfo != null) {
              if (NativeStartupInfo.minSupportedVersionFailure === 1) {
                return this.displayMessageToUser(
                  NativeStartupInfo.minSupportedVersionFailure,
                  NativeStartupInfo.action === 'block',
                  NativeStartupInfo.messageTitle,
                  NativeStartupInfo.message
                );
              } else {
                if (NativeStartupInfo.showMessage === 1) {
                  if (NativeStartupInfo.showOnce === 1) {
                    if (!cachedDigest || NativeStartupInfo.messageDigest != cachedDigest.value) {
                      this.storageStateService.updateStateEntity(this.digestKey, NativeStartupInfo.messageDigest);
                      return this.displayMessageToUser(
                        NativeStartupInfo.minSupportedVersionFailure,
                        NativeStartupInfo.action === 'block',
                        NativeStartupInfo.messageTitle,
                        NativeStartupInfo.message
                      );
                    }
                  } else {
                    return this.displayMessageToUser(
                      NativeStartupInfo.minSupportedVersionFailure,
                      NativeStartupInfo.action === 'block',
                      NativeStartupInfo.messageTitle,
                      NativeStartupInfo.message
                    );
                  }
                }
              }
            }
            return null;
          })
        );
      })
    );
  }

  displayMessageToUser(isMinVersionFailure, isBlocking, title, message) {
    const arrOfBtns = [];
    const positiveButtonText = isMinVersionFailure
      ? startupButtons['update']
      : isBlocking
      ? startupButtons['closeApp']
      : startupButtons['ok'];
    const isNegativeButtonVisible = isMinVersionFailure && !isBlocking;
    const negativeButtonText = startupButtons['notNow'];
    arrOfBtns.push(positiveButtonText);
    isNegativeButtonVisible && arrOfBtns.push(negativeButtonText);
    return {
      title,
      message,
      arrOfBtns,
    };
  }
}

export const startupButtons = {
  update: { ...buttons.OKAY, label: 'Update' },
  closeApp: { ...buttons.CLOSE, label: 'Close app' },
  ok: { ...buttons.CANCEL, label: 'Ok' },
  notNow: { ...buttons.CANCEL, label: 'Not now' },
};
