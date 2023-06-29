import { Injectable } from '@angular/core';

import { retryWhen, switchMap, finalize, take } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';
import { UserFulfillmentActivityInfo, UserRewardTrackInfo } from '../models';
import { RewardsPopoverComponent } from '../components/rewards-popover';
import { PopupTypes } from '../rewards.config';

@Injectable()
export class RewardsResolverGuard {
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
      take(1),
      retryWhen(errors => this.errorHandler(errors)),
      finalize(() => this.loader.closeSpinner())
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private errorHandler(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subject = new Subject<any>();
        this.loader.closeSpinner();
        this.modalHandler(subject);

        return subject;
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async modalHandler(subject: Subject<any>): Promise<void> {
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: RewardsPopoverComponent,
      componentProps: {
        type: PopupTypes.RETRY,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(() => {
      this.loader.showSpinner();
      subject.next(null);
    });

    return await popover.present();
  }
}
