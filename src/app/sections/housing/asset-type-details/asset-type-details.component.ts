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
import { NonAssignmentsService } from '../non-assignments/non-assignments.service';
import { TermsService } from '../terms/terms.service';
import { HousingService } from '../housing.service';
import { ToastService } from '@core/service/toast/toast.service';

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

  termKey: number = 0;

  constructor(
    private _alertController: AlertController,
    private _platform: Platform,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _nonAssignmentService: NonAssignmentsService,
    private _termsService: TermsService,
    private _toastService: ToastService) { }

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

    this._initTermSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackByLabel(_: number, assetTypeDetail: AssetTypeDetailValue): string {
    return assetTypeDetail.label;
  }

  async selectAsset(selectedAsset: AssetTypeDetailValue[]) {
    const assetTypeKey = selectedAsset[0].assetTypeKey;
    const assetTypeName = selectedAsset.find(x => x.label === 'Name').value;

    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to select ${assetTypeName}?`,
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
            
            console.log('selected asset:', assetTypeKey);

            const createContractSubscription =
              this._nonAssignmentService.submitContract(assetTypeKey, this.termKey)
                  .subscribe(status => {
                    if (status) {
                      // redirect to housing dashboard (terms page)
                      alert.dismiss().then(() => this._housingService.handleSuccess());
                    } else {
                      alert.dismiss().then(() => {
                        this._loadingService.closeSpinner();
                        console.log('Unable to create contract for selected asset type');
                        this._toastService.showToast({
                          message: 'The form could not be processed at this time. Try again later',
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
  }

  private _initTermSubscription() {
    const termSubs = this._termsService.termId$.subscribe(termId => this.termKey = termId);
    this.subscriptions.add(termSubs);
  }
}
