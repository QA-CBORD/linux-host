import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { finalize, switchMap, take } from 'rxjs/operators';
import { ToastService } from '@core/service/toast/toast.service';
import { ReportCardStatus } from '@sections/settings/models/report-card-status.config';
import { ModalController } from '@ionic/angular';
import { Settings } from 'src/app/app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AsyncPipe } from '@angular/common';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { LOST_CARD_CONTENT_STRINGS } from '@sections/settings/sections/settings.content-strings';

@Component({
  selector: 'st-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AsyncPipe],
})
export class ReportCardComponent implements OnInit {
  nextStatusText: string;
  isLost: boolean;
  isReporting: boolean;

  get nextStatusDescription$() {
    return this.contentStringsFacadeService.resolveContentStringValue$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.lostCardScreen,
      this.isLost ? LOST_CARD_CONTENT_STRINGS.found : LOST_CARD_CONTENT_STRINGS.lost
    );
  }
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly modalController: ModalController,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    readonly asynPipe: AsyncPipe
  ) {
    this.isLost =
      asynPipe.transform(this.userFacadeService.getUserState$())?.cashlessMediaStatus === ReportCardStatus.LOST;
    this.nextStatusText = this.isLost ? 'Found' : 'Lost';
  }

  ngOnInit() {
    this.cdRef.detectChanges();
  }

  toggleStatus() {
    this.isReporting = true;
    this.userFacadeService
      .reportCard$(!this.isLost)
      .pipe(
        switchMap(() => this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES)),
        take(1),
        finalize(() => {
          this.isReporting = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(
        async () => {
          this.isLost = !this.isLost;
          const reportedStatus = this.isLost ? 'lost' : 'found';
          const message = `Card reported ${reportedStatus} successfully.`;

          await this.toastService.showToast({
            message,
            toastButtons: [{ text: 'Dismiss' }],
          });
          this.modalController.dismiss();
        },
        () => this.onErrorRetrieve('Something went wrong, please try again...')
      );
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showError(
      message,
       {
        toastButtons: [
          {
            text: 'Retry',
            handler: () => {
              this.toggleStatus();
            },
          },
          {
            text: 'Dismiss',
          },
        ]
       }
    );
  }
  close() {
    this.modalController.dismiss();
  }
}
