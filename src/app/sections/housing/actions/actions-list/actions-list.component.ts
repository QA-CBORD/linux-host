import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { LoadingService } from '../../../../core/service/loading/loading.service';
import { HousingService } from '@sections/housing/housing.service';
import { ToastService } from '../../../../core/service/toast/toast.service';
import { WaitingListsService } from '../../waiting-lists/waiting-lists.service';
import { Subscription } from 'rxjs';
import { WaitingList } from '../../waiting-lists/waiting-lists.model';

@Component({
  selector: 'st-actions-list',
  templateUrl: './actions-list.component.html',
})
export class ActionsListComponent {

  private activeAlerts: HTMLIonAlertElement[] = [];
  private subscriptions: Subscription = new Subscription();
  @Input() path: string;

  @Input() edit: boolean;

  @Input() waitingList: WaitingList;

  constructor(private _popoverController: PopoverController,
    private _alertController: AlertController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _waitingService: WaitingListsService,
    private _toastService: ToastService) {}

  handleEdit(): void {
    this._popoverController.dismiss();
  }

  async removeWaitingList(): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to remove from this waiting list ?`,
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


            const createContractSubscription =
              this._waitingService.removeFromWaitingList(this.waitingList.waitListKey)
                .subscribe(status => {
                  if (status) {
                    alert.dismiss().then(() => this._housingService.handleSuccess());
                  } else {
                    alert.dismiss().then(() => {
                      this._loadingService.closeSpinner();
                      this._toastService.showToast({
                        message: 'Unable to remove. Try again later',
                      });
                    });
                  }
                });

            this.subscriptions.add(createContractSubscription);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
    this.handleEdit();
  }

  isPatronWaitingList(){
    return parseInt(this.waitingList.patronWaitingListKey, 10);
  }
}
