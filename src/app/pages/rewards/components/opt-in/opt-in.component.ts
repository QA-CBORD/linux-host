import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserService } from '../../../../core/service/user-service/user.service';
import {RewardsService} from '../../services';

import { CONTENT_STRINGS } from '../../rewards.config';
import { UserRewardTrackInfo } from '../../models';
import { UserInfo } from '../../../../core/model/user';

@Component({
  selector: 'st-opt-in',
  templateUrl: './opt-in.component.html',
  styleUrls: ['./opt-in.component.scss'],
})
export class OptInComponent implements OnInit, OnDestroy {
  @Input() rewardTrack: UserRewardTrackInfo;
  @Output('optInSuccess') optInSuccess: EventEmitter<void> = new EventEmitter<void>();
  private toastDuration: number = 8000;
  private readonly sourceSubscription: Subscription = new Subscription();
  contentString: { [key: string]: string };

  constructor(
    private readonly userService: UserService,
    private rewardsService: RewardsService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.setContentStrings();
  }

  ngOnDestroy(): void {
    this.sourceSubscription.unsubscribe();
  }

  optIn() {
    console.log("OptIn Press");
    // const subscription = this.userService.userData
    //   .pipe(
    //     switchMap(({ id: userId }: MUserInfo) => {
    //       return this.rewardsService.optUserIntoRewardTrack(this.rewardTrack.trackID, userId);
    //     })
    //   )
    //   .subscribe(
    //     (success: boolean) => {
    //       if (success) {
    //         this.optInSuccess.emit();
    //       } else {
    //         this.presentOptInFailureToast();
    //       }
    //     },
    //     () => {
    //       this.presentOptInFailureToast();
    //     }
    //   );
    // this.sourceSubscription.add(subscription);
  }

  async presentOptInFailureToast() {
    const message = `${this.contentString.labelOptInFailed} "${this.rewardTrack.trackName}"`;
    const toast = await this.toastController.create({
      message,
      duration: this.toastDuration,
      // buttons: [
      //   {
      //     side: 'end',
      //     text: this.contentString.buttonRetry,
      //     handler: () => {
      //       this.optIn();
      //     },
      //   },
      // ],
    });
    toast.present();
  }

  private setContentStrings() {
    let buttonOptIn = this.rewardsService.getContentValueByName(CONTENT_STRINGS.optInBtn);
    let labelOptInFailed = this.rewardsService.getContentValueByName(CONTENT_STRINGS.optInFailLabel);
    let buttonRetry = this.rewardsService.getContentValueByName(CONTENT_STRINGS.retryBtn);
    buttonOptIn = buttonOptIn ? buttonOptIn : 'OPT IN ncs';
    labelOptInFailed = labelOptInFailed ? labelOptInFailed : 'We were unable to opt you into the Reward Track ncs';
    buttonRetry = buttonRetry ? buttonRetry : 'RETRY ncs';
    this.contentString = { buttonOptIn, labelOptInFailed, buttonRetry };
  }
}
