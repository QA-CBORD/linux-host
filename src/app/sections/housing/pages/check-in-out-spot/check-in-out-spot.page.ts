import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { isMobile } from '@core/utils/platform-helper';
import {
  AlertController,
  Platform
} from '@ionic/angular';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import {
  CheckInOutSlot,
  CheckInOutSpot
} from '@sections/housing/check-in-out/check-in-out.model';
import { CheckInOutService } from '@sections/housing/check-in-out/check-in-out.service';
import { HousingService } from '@sections/housing/housing.service';
import {
  Observable,
  Subscription
} from 'rxjs';

@Component({
  selector: 'st-check-in-out-spot',
  templateUrl: './check-in-out-spot.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInOutSpotPage implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  selectedSlot$: Observable<CheckInOutSpot>;

  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _checkInOutService: CheckInOutService,
    private _checkInOutStateService: CheckInOutStateService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _datePipe: DatePipe
  ) { }

  ngOnInit() {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }

    this.selectedSlot$ = this._checkInOutStateService.getSelectedCheckInOutSlot();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async selectSpot(selectedSpot: CheckInOutSlot): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to select ${this._datePipe.transform(selectedSpot.slotDateTime, 'MMM d, y, h:mm a')}?`,
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

            const subs =
              this._checkInOutService.selectSpot(selectedSpot)
                  .subscribe(status => {
                    if (status) {
                      // redirect to housing dashboard (terms page)
                      this._checkInOutStateService.setActiveCheckInOutSlot(null);
                      alert.dismiss().then(() => this._housingService.goToDashboard());
                    } else {
                      alert.dismiss().then(() => {
                        this._loadingService.closeSpinner();
                        this._toastService.showToast({
                          message: 'The time you selected is not available anymore. Pick another time.',
                        });
                      });
                    }
                  });

            this.subscriptions.add(subs);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }
}
