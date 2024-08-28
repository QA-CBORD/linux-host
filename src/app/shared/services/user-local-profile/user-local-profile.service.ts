import { Injectable, inject, signal } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { getUserFullName } from '@core/utils/general-helpers';
import { UserLocalProfile } from '@shared/model/user-local-profile.model';
import { combineLatest, first, map, tap } from 'rxjs';

const initState = { userFullName: '', pronouns: '' };
@Injectable({
  providedIn: 'root',
})
export class UserLocalProfileService {
  private readonly key = 'user_local_profile';
  private readonly storageStateService = inject(StorageStateService);
  private readonly userFacadeService = inject(UserFacadeService);

  private readonly _userLocalProfileSignal = signal<UserLocalProfile>(initState);
  userLocalProfileSignal = this._userLocalProfileSignal.asReadonly();

  constructor() {
    this.initUserLocalProfile();
  }

  updatePronouns(pronouns: string) {
    this._userLocalProfileSignal.update(profile => ({ ...profile, pronouns }));
    this.updateStorage();
  }
  updateUserName() {
    this.userFacadeService
      .getUser$()
      .pipe(
        first(),
        map(userInfo =>
          this._userLocalProfileSignal.update(profile => ({ ...profile, userFullName: getUserFullName(userInfo) }))
        ),
        tap(() => this.updateStorage())
      )
      .subscribe();
  }

  initUserLocalProfile() {
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

  clearState() {
    this._userLocalProfileSignal.set(initState);
    this.storageStateService.deleteStateEntityByKey(this.key);
  }

  private updateStorage() {
    this.storageStateService.updateStateEntity(this.key, this._userLocalProfileSignal());
  }
}
