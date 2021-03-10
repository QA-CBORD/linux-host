import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';

import { LoadingService } from '@core/service/loading/loading.service';
import { isMobile } from '@core/utils/platform-helper';
import { NonAssignmentsStateService } from '../non-assignments/non-assignments-state.service';
import { AssetTypeDetailValue } from '../non-assignments/non-assignments.model';
import { QuestionAssetTypeDetails } from '../questions/types';

@Component({
  selector: 'st-asset-type-details',
  templateUrl: './asset-type-details.component.html',
  styleUrls: ['../questions/question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetTypeDetailsComponent implements OnInit, OnDestroy {
  @Input() question: QuestionAssetTypeDetails;
  @Input() parentGroup: FormGroup;
  @Input() isSubmitted: boolean;

  private subscriptions: Subscription;
  private activeAlerts: HTMLIonAlertElement[] = [];

  constructor(
    private _alertController: AlertController,
    private _platform: Platform,
    private _loadingService: LoadingService,
    private _nonAssignmentStateService: NonAssignmentsStateService) { }

  ngOnInit() {
    console.log(isMobile(this._platform));
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(x => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackByLabel(_: number, assetTypeDetail: AssetTypeDetailValue): string {
    return assetTypeDetail.label;
  }

  async markItemAsSelected(assetType: number) {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to select this asset?',
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
            const sub = this._nonAssignmentStateService.setSelectedAssetType(assetType)
              .subscribe(d => {
                this._loadingService.closeSpinner();
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
