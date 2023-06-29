import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { map, retryWhen, switchMap, tap } from 'rxjs/operators';

import { RewardsApiService, RewardsService } from '../services';
import { RewardsPopoverComponent } from '../components/rewards-popover';
import { CONTENT_STRINGS, OPT_IN_STATUS, PopupTypes } from '../rewards.config';
import { UserRewardTrackInfo } from '../models';
import { UserInfo } from '../../../core/model/user';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';

@Injectable()
export class OptInGuard {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly popoverCtrl: PopoverController,
    private readonly apiService: RewardsApiService,
    private readonly userFacadeService: UserFacadeService,
    private readonly toastService: ToastService
  ) {}

  canActivate(): Observable<boolean> {
    return this.rewardsService.initContentStringsList().pipe(
      switchMap(() => this.rewardsService.getUserRewardTrackInfo()),
      map((rewardTrackInfo: UserRewardTrackInfo) => {
        if (rewardTrackInfo === null || rewardTrackInfo.userOptInStatus === OPT_IN_STATUS.yes) {
          return true;
        }
        throw rewardTrackInfo;
      }),
      retryWhen(rewardTrackInfo => this.errorHandler(rewardTrackInfo))
    );
  }

  private errorHandler(rewardTrackInfo: Observable<UserRewardTrackInfo>): Observable<unknown> {
    return rewardTrackInfo.pipe(
      switchMap(rewardTrackInfo => {
        const subject = new Subject<unknown>();
        this.modalHandler(subject, rewardTrackInfo);

        return subject.pipe(this.callForOptIn(rewardTrackInfo.trackID));
      })
    );
  }

  private callForOptIn(trackID: string): (source: Observable<unknown>) => Observable<boolean> {
    return (source: Observable<unknown>) =>
      source.pipe(
        switchMap(() => this.userFacadeService.getUserData$()),
        switchMap(({ id }: UserInfo) => this.apiService.optUserIntoRewardTrack(trackID, id)),
        tap(() => this.presentToast())
      );
  }

  private async modalHandler(subject: Subject<unknown>, userTrackInfo: UserRewardTrackInfo): Promise<void> {
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: RewardsPopoverComponent,
      componentProps: {
        type: PopupTypes.OPT_IN,
        userTrackInfo,
        data: {
          shortDescription: userTrackInfo.trackDescription,
          name: userTrackInfo.trackName,
        },
      },
      animated: false,
      backdropDismiss: false,
    });

    popover.onDidDismiss().then(() => subject.next(null));

    return await popover.present();
  }

  private async presentToast() {
    const message = this.rewardsService.getContentValueByName(CONTENT_STRINGS.optInToast);
    await this.toastService.showToast({ message });
  }
}
