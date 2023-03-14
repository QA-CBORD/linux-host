import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { WaitingListStateService } from './waiting-list-state.service';
import { isMobile } from '@core/utils/platform-helper';
import {  Subscription } from 'rxjs';
import { ROLES } from '../../../app.global';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../housing.service';
import { WaitingListsService } from './waiting-lists.service';
import { ToastService } from '@core/service/toast/toast.service';
import { WaitingList } from './waiting-lists.model';

@Component({
  selector: 'st-waiting-lists',
  templateUrl: './waiting-lists.component.html',
  styleUrls: ['./waiting-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingListsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];
  public urlEditForm: string;

  constructor(
    public _waitingListStateService: WaitingListStateService,
    private _platform: Platform,
    private _alertController: AlertController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _waitingService: WaitingListsService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.urlEditForm = `${ROLES.patron}/housing/waiting-lists/`;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getStatus(key: number): string {
    if (key || key !== 0) {
      return 'Submitted';
    }

    return 'New';
  }

  async removePatronWaitingList(waitingList: WaitingList): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to be removed from ${waitingList.waitListName} waiting list?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            this.activeAlerts = [];
            alert.dismiss();
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this._loadingService.showSpinner();
            this.activeAlerts = [];

            const sub = this._waitingService
              .removeFromWaitingList(waitingList.patronWaitingListKey)
              .subscribe(status => {
                if (status) {
                  alert.dismiss().then(() => this._housingService.goToDashboard());
                  this._housingService.refreshDefinitions();
                } else {
                  alert.dismiss().then(() => {
                    this._loadingService.closeSpinner();
                    this._toastService.showToast({
                      message: 'Unable to remove. Try again later',
                    });
                  });
                }
              });

            this.subscriptions.add(sub);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }


}
