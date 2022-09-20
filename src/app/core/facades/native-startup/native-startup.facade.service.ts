import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeStartupApiService } from '@core/service/native-startup-api/native-startup-api.service';
import { buttons } from '@core/utils/buttons.config';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { NativeStartupInfo } from '@core/model/native-startup/native-startup-info';
import { StorageEntity } from '@core/classes/extendable-state-manager';

@Injectable({
  providedIn: 'root',
})
export class NativeStartupFacadeService extends ServiceStateFacade {
  protected readonly _blockGlobalNavigation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private blockGlobalNavigation = false;
  private digestKey = 'get_nativeStartupMessageDigest';
  private blockNavStartup = false;
  private STATUS = 1;

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

  isMessageOk(nativeStartupInfo: NativeStartupInfo): boolean {
    return nativeStartupInfo.showMessage === this.STATUS;
  }

  isStatusOk(nativeStartupInfo: NativeStartupInfo): boolean {
    return this.isMessageOk(nativeStartupInfo) && nativeStartupInfo.showOnce === this.STATUS;
  }

  digessIsOk(cachedDigest: StorageEntity<unknown>, nativeStartupInfo: NativeStartupInfo): boolean {
    return !cachedDigest || nativeStartupInfo.messageDigest != cachedDigest.value;
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
          map(([nativeStartupInfo, cachedDigest]) => {
            this.blockNavStartup = nativeStartupInfo.action === 'block';
            // the service call will return null if there is no Native Startup Message
            if (nativeStartupInfo === null) {
              return null;
            }

            if (nativeStartupInfo.minSupportedVersionFailure === this.STATUS) {
              return this.displayMessageToUser(
                nativeStartupInfo.minSupportedVersionFailure,
                this.blockNavStartup,
                nativeStartupInfo.messageTitle,
                nativeStartupInfo.message
              );
            }

            if (!this.isMessageOk(nativeStartupInfo)) {
              return null;
            }

            if (this.isStatusOk(nativeStartupInfo) && this.digessIsOk(cachedDigest, nativeStartupInfo)) {
              this.storageStateService.updateStateEntity(this.digestKey, nativeStartupInfo.messageDigest);
              this.resetBlockPopover(); // Show message once
              return this.displayMessageToUser(
                nativeStartupInfo.minSupportedVersionFailure,
                this.blockNavStartup,
                nativeStartupInfo.messageTitle,
                nativeStartupInfo.message
              );
            }

            if (this.isMessageOk(nativeStartupInfo)) {
              return this.displayMessageToUser(
                nativeStartupInfo.minSupportedVersionFailure,
                this.blockNavStartup,
                nativeStartupInfo.messageTitle,
                nativeStartupInfo.message
              );
            }

            return null;
          })
        );
      })
    );
  }

  displayMessageToUser(isMinVersionFailure, isBlocking, title, message) {
    const arrOfBtns = [];
    const isMinVersion = isMinVersionFailure ? startupButtons['update'] : isBlocking;
    const positiveButtonText = isMinVersion ? startupButtons['closeApp'] : startupButtons['ok'];
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
