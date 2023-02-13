import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '@sections/housing/housing.service';
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { isMobile } from '@core/utils/platform-helper';
import { ToastService } from '@core/service/toast/toast.service';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkOrderDetails } from '../../work-orders/work-orders.model';
import { WorkOrdersService } from '../../work-orders/work-orders.service';
@Component({
  selector: 'st-work-order-details',
  templateUrl: './work-order-details.page.html',
  styleUrls: ['./work-order-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrderDetailsPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  workOrderDetails$: Observable<WorkOrderDetails>;
  pages$: Observable<QuestionsPage[]>;
  selectedAssetType$: Observable<AssetTypeDetailValue[]>;

  workOrderKey: number;
  selectedAssetKey: number;
  selectedAssetName: string;
  termKey = 0;
  isSubmitted = false;
  canSubmit = true;

  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _workOrderService: WorkOrdersService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _termsService: TermsService
  ) {}

  ngOnInit(): void {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.workOrderKey = parseInt(this._route.snapshot.params.workOrderKey);
    this.termKey = parseInt(this._route.snapshot.params.termKey);
    this._initWorkOrderDetailsObservable();
    this._initPagesObservable();
    this._initTermSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async submit(workOrderDetails: WorkOrderDetails, form: FormGroup, isLastPage: boolean): Promise<void> {
    this._touch();

    if (!this.isSubmitted && form.invalid) {
      return;
    }

    if (!isLastPage) {
      this._next(form.value);
    } else {
     this._update(workOrderDetails, form.value);
    }
  }

  private _touch(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _initPagesObservable(): void {
    this.pages$ = this._workOrderService.getQuestions(this.workOrderKey);
  }

  private _initWorkOrderDetailsObservable(): void {
    this._loadingService.showSpinner();

    this.workOrderDetails$ = this._housingService.getWorkOrders(this.termKey, this.workOrderKey).pipe(
      tap(() => {
        this.isSubmitted = false;
        this._loadingService.closeSpinner();
      }),
      catchError((error: any) => {
        this._loadingService.closeSpinner();
        return throwError(error);
      })
    );
  }

  private _initTermSubscription() {
    const termSubs = this._termsService.termId$.subscribe(termId => (this.termKey = termId));
    this.subscriptions.add(termSubs);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _next(formValue: any): void {
    this.content.scrollToTop();

    if (this.isSubmitted) {
      return this.stepper.next();
    }

    const nextSubscription: Subscription = this._workOrderService.next(this.workOrderKey).subscribe({
      next: () => this.stepper.next(),
    });

    this.subscriptions.add(nextSubscription);
  }

  private async _update(workOrderDetails: WorkOrderDetails, formValue: FormControl): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to submit this work order?`,
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

            const createWorkOrderSubscription = this._workOrderService
              .submitWorkOrder(workOrderDetails, formValue)
              .subscribe(status => {
                alert.dismiss().then(() => {
                  if (status) {
                    this._housingService.goToDashboard();
                  } else {
                    this._loadingService.closeSpinner();
                    this._toastService.showToast({
                      message: 'The form could not be processed at this time. Try again later',
                    });
                  }
                });
              });

            this.subscriptions.add(createWorkOrderSubscription);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }
}
