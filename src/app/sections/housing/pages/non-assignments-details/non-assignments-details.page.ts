import {
  ChangeDetectionStrategy,
  Component, 
  OnDestroy, 
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  Platform,
  ToastController
} from '@ionic/angular';

import {
  Observable,
  Subscription,
  throwError
} from 'rxjs';
import {
  catchError,
  tap
} from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { FormTypes } from '@sections/housing/housing.model';
import { HousingService } from '@sections/housing/housing.service';
import { AssetTypeDetailValue, NonAssignmentDetails } from '@sections/housing/non-assignments/non-assignments.model';
import { NonAssignmentsService } from '@sections/housing/non-assignments/non-assignments.service';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { isMobile } from '@core/utils/platform-helper';
import { ToastService } from '@core/service/toast/toast.service';
import { NonAssignmentsStateService } from '@sections/housing/non-assignments/non-assignments-state.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-non-assignments-details',
  templateUrl: './non-assignments-details.page.html',
  styleUrls: ['./non-assignments-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonAssignmentsDetailsPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  nonAssignmentDetails$: Observable<NonAssignmentDetails>;
  pages$: Observable<QuestionsPage[]>;
  selectedAssetType$: Observable<AssetTypeDetailValue[]>;

  nonAssignmentKey: number;
  selectedAssetKey: number;
  selectedAssetName: string;
  termKey = 0;
  isSubmitted = false;
  canSubmit = true;
  
  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _nonAssignmentsService: NonAssignmentsService,
    private _toasController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _nonAssignmentsStateService: NonAssignmentsStateService,
    private _termsService: TermsService
  ) { }

  ngOnInit(): void {
    console.log(isMobile(this._platform));
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.nonAssignmentKey = parseInt(this._route.snapshot.paramMap.get('nonAssignmentKey'), 10);
    this._initNonAssignmentDetailsObservable();
    this._initPagesObservable();
    this._initTermSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async submit(nonAssignmentDetails: NonAssignmentDetails, form: FormGroup, isLastPage: boolean): Promise<void> {
    const sub = this._nonAssignmentsService.getSelectedAssetType()
      .subscribe(data => {
        if (data.length > 0) {
          this.selectedAssetKey = data[0].assetTypeKey;
          this.selectedAssetName = data.find(x => x.label === 'Name').value;
        }
    });
    
    this.subscriptions.add(sub);

    if (this.isSubmitted) {
      if (!isLastPage) {
        this._next(form.value);
        return;
      } else {
        return;
      }
    } else {
      if (this.selectedAssetKey) {
        await this._update(nonAssignmentDetails, form.value);
      } else if (!isLastPage) {
        this._next(form.value);
      }
    }
  }

  private _initPagesObservable(): void {
    this.pages$ = this._nonAssignmentsService.getQuestions(this.nonAssignmentKey);
  }

  private _initNonAssignmentDetailsObservable(): void {
    this._loadingService.showSpinner();
    
    const queryParams: string[] = [`formTypeKey=${FormTypes.NON_ASSIGNMENTS}`];

    this.nonAssignmentDetails$ = this._housingService.getNonAssignmentDetails(this.nonAssignmentKey, queryParams)
      .pipe(
        tap(() => {
          this.isSubmitted = false; //!!nonAssignmentDetails.nonAssignmentInfo.dateTimeSigned;
          this._loadingService.closeSpinner();
        }),
        catchError((error: any) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
  }

  private _initTermSubscription() {
    const termSubs = this._termsService.termId$.subscribe(termId => this.termKey = termId);
    this.subscriptions.add(termSubs);
  }

  private _next(formValue: any): void {
    this.content.scrollToTop();

    if (this.isSubmitted) {
      return this.stepper.next();
    }

    const nextSubscription: Subscription = this._nonAssignmentsService
      .next(this.nonAssignmentKey, formValue)
      .subscribe({
        next: () => this.stepper.next(),
      });

    this.subscriptions.add(nextSubscription);
  }

  private async _update(nonAssignmentDetails: NonAssignmentDetails, formValue: any): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to select ${this.selectedAssetName}?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            this._nonAssignmentsStateService.setSelectedAssetType([]);
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
            
            console.log('selected asset:', this.selectedAssetKey);

            const createContractSubscription =
              this._nonAssignmentsService.submitContract(
                                            this.nonAssignmentKey,
                                            nonAssignmentDetails,
                                            this.selectedAssetKey, 
                                            this.termKey,
                                            formValue)
                  .subscribe(status => {
                    if (status) {
                      // redirect to housing dashboard (terms page)
                      this._nonAssignmentsStateService.setSelectedAssetType([]);
                      alert.dismiss().then(() => this._housingService.goToDashboard());
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
}
