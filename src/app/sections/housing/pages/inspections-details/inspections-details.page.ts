import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { WorkOrderDetails } from '../../work-orders/work-orders.model';
import { WorkOrdersService } from '../../work-orders/work-orders.service';
import { Inspection } from '../../inspections-forms/inspections-forms.model';
import { InspectionService } from '../../inspections-forms/inspections-forms.service';
import { InspectionsStateService } from '../../inspections-forms/inspections-forms-state.service';
@Component({
  selector: 'st-inspections-details',
  templateUrl: './inspections-details.page.html',
  styleUrls: ['./inspections-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionsDetailsPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  inspectionDetails$: Observable<Inspection>;
  pages$: Observable<QuestionsPage[]>;
  selectedAssetType$: Observable<AssetTypeDetailValue[]>;

  residentInspectionKey: number;
  contractElementKey: number;
  checkIn: boolean;
  selectedAssetKey: number;
  selectedAssetName: string;
  termKey: number = 0;
  isSubmitted: boolean = false;
  canSubmit: boolean = true;

  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _inspectionStateService: InspectionsStateService,
    private _toasController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _termsService: TermsService
  ) { }

  ngOnInit(): void {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(x => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.residentInspectionKey = parseInt(this._route.snapshot.paramMap.get('residentInspectionKey'), 10);
    this.contractElementKey = parseInt(this._route.snapshot.paramMap.get('contractElementKey'), 10);
    this.checkIn = this._route.snapshot.paramMap.get('checkIn')=== 'true'? true: false;
    this.termKey = parseInt(this._route.snapshot.paramMap.get('termKey'), 10);
    this._initInspectionDetailsObservable();
    // this._initPagesObservable();
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
      this._update(this.termKey, workOrderDetails, form.value);
    }
  }

  private _touch(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  // private _initPagesObservable(): void {
  //   this.pages$ = this._workOrderService.getQuestions(this.inspectionKey);
  // }

  private _initInspectionDetailsObservable(): void {
    this._loadingService.showSpinner();

    this.inspectionDetails$ = this._housingService.getInspectionDetails(this.termKey,this.residentInspectionKey,this.contractElementKey,this.checkIn)
      .pipe(
        tap((inspectionDetails: Inspection) => {
          this.isSubmitted = false; 
          this._loadingService.closeSpinner();
          return inspectionDetails;
        }),
        catchError((error: any) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
    // this.inspectionDetails$ = this._inspectionStateService.inspectionForm$;
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

    // const nextSubscription: Subscription = this._workOrderService
    //   .next(this.inspectionKey)
    //   .subscribe({
    //     next: () => this.stepper.next(),
    //   });

    // this.subscriptions.add(nextSubscription);
  }

  private async _update(inspectionKey: number, workOrderDetails: WorkOrderDetails, formValue: any): Promise<void> {
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

            // const createWorkOrderSubscription =
            //   this._workOrderService.submitWorkOrder(
            //     workOrderDetails,
            //     formValue)
            //     .subscribe(status => {
            //       if (status) {
            //         alert.dismiss().then(() => this._housingService.handleSuccess());
            //       } else {
            //         alert.dismiss().then(() => {
            //           this._loadingService.closeSpinner();
            //           console.log('Unable to create Work Order for selected asset type');
            //           this._toastService.showToast({
            //             message: 'The form could not be processed at this time. Try again later',
            //           });
            //         });
            //       }
            //     });

            // this.subscriptions.add(createWorkOrderSubscription);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }

  save(){

  }
}