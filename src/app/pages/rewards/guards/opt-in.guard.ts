import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { map, retryWhen, switchMap } from 'rxjs/operators';

import { RewardsApiService, RewardsService } from '../services';
import { RewardsPopoverComponent } from '../components/rewards-popover';
import { OPT_IN_STATUS, PopupTypes } from '../rewards.config';
import { UserRewardTrackInfo } from '../models';
import { UserService } from '../../../core/service/user-service/user.service';
import { UserInfo } from '../../../core/model/user';

@Injectable()
export class OptInGuard implements CanActivate {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly popoverCtrl: PopoverController,
    private readonly apiService: RewardsApiService,
    private readonly userService: UserService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.rewardsService.getUserRewardTrackInfo().pipe(
      map((rewardTrackInfo: UserRewardTrackInfo) => {
        if (rewardTrackInfo.userOptInStatus === OPT_IN_STATUS.yes) {
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
        switchMap(() => this.userService.userData),
        switchMap(({ id }: UserInfo) => this.apiService.optUserIntoRewardTrack(trackID, id))
      );
  }

  private async modalHandler(subject: Subject<unknown>, userTrackInfo: UserRewardTrackInfo): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        type: PopupTypes.OPT_IN,
        userTrackInfo,
        data: {
          shortDescription:
            userTrackInfo.trackDescription ||
            'my modal body my modal body my modal body my modal body my modal body my modal body my modal body',
          name: userTrackInfo.trackName,
        },
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(() => {
      subject.next();
      subject.complete();
    });

    return await popover.present();
  }
}
