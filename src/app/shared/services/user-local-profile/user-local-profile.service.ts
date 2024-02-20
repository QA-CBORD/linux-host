import { Injectable, inject, signal } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { getUserFullName } from '@core/utils/general-helpers';
import { combineLatest, first, map, tap } from 'rxjs';

interface UserLocalProfile {
  userFullName: string;
  pronouns: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserLocalProfileService {
  private readonly key = 'user_local_profile';
  private readonly storageStateService = inject(StorageStateService);
  private readonly userFacadeService = inject(UserFacadeService);

  private readonly _userLocalProfileSignal = signal<UserLocalProfile>({ userFullName: '', pronouns: '' });
  userLocalProfileSignal = this._userLocalProfileSignal.asReadonly();

  constructor() {
    this.initUserLocalProfile();
  }

  updatePronouns(pronouns: string) {
    this._userLocalProfileSignal.update(profile => ({ ...profile, pronouns }));
    this.updateStorage();
  }

  private initUserLocalProfile() {
    combineLatest([
      this.storageStateService.getStateEntityByKey$<UserLocalProfile>(this.key).pipe(
        first(),
        map(storageEntity => storageEntity?.value)
      ),
      this.userFacadeService.getUserData$().pipe(map(userInfo => getUserFullName(userInfo))),
    ])
      .pipe(
        tap(([storageEntity, userFullName]) => {
          if (storageEntity) {
            this._userLocalProfileSignal.set(storageEntity);
          }

          this._userLocalProfileSignal.update(profile => ({ ...profile, userFullName }));
          this.updateStorage();
        })
      )
      .subscribe();
  }

  private updateStorage() {
    this.storageStateService.updateStateEntity(this.key, this._userLocalProfileSignal());
  }
}
