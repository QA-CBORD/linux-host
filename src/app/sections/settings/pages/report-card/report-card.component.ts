import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserInfo } from '@core/model/user';
import { take, switchMap } from 'rxjs/operators';
import { getCashlessStatus } from '@core/utils/general-helpers';
import { ToastService } from '@core/service/toast/toast.service';
import { ReportCardStatus } from '@sections/settings/models/report-card-status.config';
import { ModalController } from '@ionic/angular';
import { Settings } from 'src/app/app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Component({
  selector: 'st-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportCardComponent implements OnInit {
  get nextStatusText() {
    return this.isLost ? 'Found' : 'Lost';
  }

  isLost: boolean;

  user: UserInfo;

  isReporting: boolean;

  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly modalController: ModalController,
    private readonly settingsFacadeService: SettingsFacadeService,
    ) {}

  ngOnInit() {
    this.initForm();
  }

  toggleStatus() {
    this.isReporting = true;
    const newStatus = !this.isLost;
    this.userFacadeService
      .reportCard$(newStatus)
      .pipe(
        switchMap(trans => {
          if (trans.response) this.user.cashlessMediaStatus = getCashlessStatus(newStatus);
          return this.userFacadeService.getUser$();
        })
      )
      .toPromise()
      .then(() => this.presentToast())
      .catch(() => this.onErrorRetrieve('Something went wrong, please try again...'))
      .finally(async() => {
       this.isReporting = false;
        await this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES)
        .toPromise();
        this.modalController.dismiss();
        this.cdRef.detectChanges();
      });
  }

  private async initForm() {
    const user: UserInfo = await this.userFacadeService.getUser$().toPromise();

    this.user = { ...user };
    this.setReportCardStatus();
    this.cdRef.detectChanges();
  }

  setReportCardStatus() {
    this.isLost = this.user.cashlessMediaStatus === ReportCardStatus.LOST;
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showToast({
      message,
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
      ],
    });
  }

  private async presentToast(): Promise<void> {
    this.setReportCardStatus();
    const reportedStatus = this.isLost ? 'lost' : 'found'
    const message = `Reported card ${reportedStatus} successfully.`;
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Dismiss' }] });
  }

  close() {
    this.modalController.dismiss();
  }
}
