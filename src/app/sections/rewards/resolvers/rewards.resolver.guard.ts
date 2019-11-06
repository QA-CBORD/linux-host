import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';

import { tap, retryWhen, switchMap } from 'rxjs/operators';
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
    return this.rewardsService.getAllData(false).pipe(
      retryWhen(errors => this.errorHandler(errors)),
      tap(() => this.loader.closeSpinner())
    );
  }

  private errorHandler(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap(() => {
        const subject = new Subject<any>();
        this.loader.closeSpinner();
        this.modalHandler(subject);

        return subject;
      })
    );
  }

  async modalHandler(subject: Subject<any>): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: RewardsPopoverComponent,
      componentProps: {
        type: PopupTypes.RETRY,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(() => {
      this.loader.showSpinner();
      subject.next();
    });

    return await popover.present();
  }
}
