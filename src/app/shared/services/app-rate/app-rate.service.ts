import { Injectable } from '@angular/core';
import { StorageEntity } from '@core/classes/extendable-state-manager';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Platform } from '@ionic/angular';
import { AppRate } from '@shared/model/app-rate.model';
import { InAppReview } from '@capacitor-community/in-app-review';
import { Observable, lastValueFrom, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppRateService {
  private readonly key = 'user_apprate';

  constructor(private readonly platform: Platform, private readonly storageStateService: StorageStateService) {}

  async evaluateToRequestRateApp() {
    const appRate = await lastValueFrom(this.getAppRateState());

    if (!appRate?.value) {
      this.rateApp();
      return;
    }

    const { lastDateRated, wasRated } = appRate.value;

    const lastDate = lastDateRated ? new Date(lastDateRated) : new Date();
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (wasRated && diffDays >= 21) {
      this.rateApp(appRate.value);
    }
  }

  async rateApp(appRate: AppRate = {} as AppRate) {
    if (!this.platform.is('capacitor')) {
      return;
    }

    this.storageStateService.updateStateEntity(this.key, {
      ...(appRate as AppRate),
      lastDateRated: new Date(),
      wasRated: true,
    } as AppRate);

    InAppReview?.requestReview();
  }

  private getAppRateState(): Observable<StorageEntity<AppRate | null>> {
    return this.storageStateService.getStateEntityByKey$<AppRate | null>(this.key).pipe(
      map(data => data),
      take(1)
    );
  }
}
