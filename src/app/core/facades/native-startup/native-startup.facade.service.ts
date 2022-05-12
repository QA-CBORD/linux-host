import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeStartupApiService } from '@core/service/native-startup-api/native-startup-api.service';
import { buttons } from '@core/utils/buttons.config';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root',
})
export class NativeStartupFacadeService extends ServiceStateFacade {
  protected readonly _blockGlobalNavigation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private blockGlobalNavigation = false;
  private digestKey = 'get_nativeStartupMessageDigest';
  private blockNavStartup = false;

  constructor(
    private readonly nativeStartupApiService: NativeStartupApiService,
    private readonly storageStateService: StorageStateService
  ) {
    super();
  }

  set blockGlobalNavigationStatus(value: boolean) {
    this.blockGlobalNavigation = value;
    this._blockGlobalNavigation$.next(this.blockGlobalNavigation);
  }

  get blockGlobalNavigationStatus$(): Observable<boolean> {
    return this._blockGlobalNavigation$;
  }

  get blockNavigationStartup(): boolean {
    return this.blockNavStartup;
  }

  unblockNavigationStartup() {
    this.blockNavStartup = true;
  }

  fetchNativeStartupInfo(): Observable<any> {
    return from(Device.getInfo()).pipe(
      take(1),
      switchMap(async deviceInfo => {
        if (deviceInfo.platform === 'web') {
          return null;
        }

        const appInfo = await App.getInfo();
        return {
          platform: deviceInfo.platform,
          build: appInfo.build,
        };
      }),
      switchMap(deviceInfo => {
        if (!deviceInfo) {
          return null;
        }

        return zip(
          this.nativeStartupApiService
            .nativeStartup(deviceInfo.platform, deviceInfo.build)
            .pipe(map(response => response.response)),
          this.storageStateService.getStateEntityByKey$(this.digestKey)
        ).pipe(
          map(([NativeStartupInfo, cachedDigest]) => {
            this.blockNavStartup = NativeStartupInfo.action === 'block';
            // the service call will return null if there is no Native Startup Message
            if (NativeStartupInfo != null) {
              if (NativeStartupInfo.minSupportedVersionFailure === 1) {
                return this.displayMessageToUser(
                  NativeStartupInfo.minSupportedVersionFailure,
                  this.blockNavStartup,
                  NativeStartupInfo.messageTitle,
                  NativeStartupInfo.message
                );
              } else {
                if (NativeStartupInfo.showMessage === 1) {
                  if (NativeStartupInfo.showOnce === 1) {
                    if (!cachedDigest || NativeStartupInfo.messageDigest != cachedDigest.value) {
                      this.storageStateService.updateStateEntity(this.digestKey, NativeStartupInfo.messageDigest);
                      this.resetBlockPopover(); // Show message once
                      return this.displayMessageToUser(
                        NativeStartupInfo.minSupportedVersionFailure,
                        this.blockNavStartup,
                        NativeStartupInfo.messageTitle,
                        NativeStartupInfo.message
                      );
                    }
                  } else {
                    return this.displayMessageToUser(
                      NativeStartupInfo.minSupportedVersionFailure,
                      this.blockNavStartup,
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

  private resetBlockPopover() {
    this.blockNavStartup = false;
  }
}

export const startupButtons = {
  update: { ...buttons.OKAY, label: 'Update' },
  closeApp: { ...buttons.CLOSE, label: 'Close app' },
  ok: { ...buttons.CANCEL, label: 'Ok' },
  notNow: { ...buttons.CANCEL, label: 'Not now' },
};
