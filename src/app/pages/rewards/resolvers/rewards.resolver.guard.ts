import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';

import { tap, retryWhen, switchMap, take } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';
import { UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';
import { RewardsPopoverComponent } from '../components/rewards-popover';
import { PopupTypes } from '../rewards.config';

@Injectable()
export class RewardsResolverGuard implements Resolve<Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]>> {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly loader: LoadingService,
    private readonly popoverCtrl: PopoverController
  ) {}

  resolve(): Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]> {
    return this.downloadData();
  }

  private downloadData(): Observable<[UserRewardTrackInfo, UserFulfillmentActivityInfo[]]> {
    this.loader.showSpinner();
    return this.rewardsService.initContentStringsList().pipe(
      switchMap(() => this.rewardsService.getAllData(false)),
      take(1),
      retryWhen(errors => this.errorHandler(errors)),
      tap(() => this.loader.closeSpinner())
    );
  }

  private errorHandler(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap(err => {
        const subject = new Subject<any>();
        this.loader.closeSpinner();
        this.modalHandler(subject, err);

        return subject;
      })
    );
  }

  async modalHandler(subject: Subject<any>, err: string): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        type: PopupTypes.RETRY,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ data }) => {
      if (data === PopupTypes.RETRY) {
        this.loader.showSpinner();
        subject.next(true);
      } else {
        subject.error(err);
        subject.complete();
      }
    });

    return await popover.present();
  }
}
