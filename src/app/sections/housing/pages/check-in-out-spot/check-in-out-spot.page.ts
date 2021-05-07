import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { isMobile } from '@core/utils/platform-helper';
import {
  AlertController,
  Platform,
  ToastController
} from '@ionic/angular';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import {
  CheckInOutSlot,
  CheckInOutSlot2
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

  selectedSlot$: Observable<CheckInOutSlot2>;
  
  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _checkInOutService: CheckInOutService,
    private _checkInOutStateService: CheckInOutStateService,
    private _toasController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
  ) { }

  ngOnInit() {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(x => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }

    this.selectedSlot$ = this._checkInOutStateService.getSelectedCheckInOutSlot();
    this.selectedSlot$.subscribe(x => console.log);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async selectSpot(selectedSpot: CheckInOutSlot): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to select this time?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            // this._nonAssignmentsStateService.setSelectedAssetType([]);
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
                      // this._nonAssignmentsStateService.setSelectedAssetType([]);
                      alert.dismiss().then(() => this._housingService.handleSuccess());
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
