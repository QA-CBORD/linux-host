import { Injectable } from '@angular/core';
import { from, Observable, of, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeStartupApiService } from '@core/service/native-startup-api/native-startup-api.service';
import { buttons } from '@core/utils/buttons.config';
import { Device } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class NativeStartupFacadeService extends ServiceStateFacade {
  private ttl: number = 600000; // 10min
  private digestKey = 'get_nativeStartupMessageDigest';

  constructor(
    private readonly nativeStartupApiService: NativeStartupApiService,
    private readonly storageStateService: StorageStateService
  ) {
    super();
  }

  fetchNativeStartupInfo(institutionId: string, sessionId?: string, useSessionId?: boolean): Observable<any> {
    return from(Device.getInfo()).pipe(
      take(1),
      switchMap(deviceInfo => {
        if (deviceInfo.platform === 'web') {
          return of(null);
        }
        zip(
          this.nativeStartupApiService.nativeStartup(institutionId, deviceInfo.platform, sessionId, useSessionId),
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
                    if (NativeStartupInfo.messageDigest != cachedDigest.value) {
                      this.storageStateService.updateStateEntity(
                        this.digestKey,
                        NativeStartupInfo.messageDigest,
                        { ttl: this.ttl }
                      );
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
  closeApp: { ...buttons.CANCEL, label: 'Close app' },
  ok: { ...buttons.OKAY, label: 'Ok' },
  notNow: { ...buttons.CANCEL, label: 'Not now' },
};
