import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserInfo } from '@core/model/user';
import { take, switchMap } from 'rxjs/operators';
import { getCashlessStatus } from '@core/utils/general-helpers';
import { ToastService } from '@core/service/toast/toast.service';
import { ReportCardStatus } from '@sections/settings/models/report-card-status.config';

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
    private readonly toastService: ToastService
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
      .finally(() => {
        this.isReporting = false;
        this.setReportCardStatus();
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
    const message = `Reported successfully.`;
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Dismiss' }] });
  }
}
