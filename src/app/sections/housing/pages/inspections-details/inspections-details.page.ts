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
import { HousingService } from '@sections/housing/housing.service';
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { isMobile } from '@core/utils/platform-helper';
import { ToastService } from '@core/service/toast/toast.service';
import { FormGroup } from '@angular/forms';
import { WorkOrderDetails } from '../../work-orders/work-orders.model';
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
  termKey = 0;
  isSubmitted = false;
  canSubmit = true;
  section = '';
  conditions: any[] = [];

  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _inspectionStateService: InspectionsStateService,
    private _toasController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _termsService: TermsService,
    private _inspectionService: InspectionService
  ) { }

  ngOnInit(): void {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(() => {
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
  }

  private getPagesInspection(){
    const result = this._inspectionService.getFormDefinitionInspection().subscribe(res => {
      this.conditions = res.values.filter(x => x.selected)
    })
    this.subscriptions.add(result);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async submit(workOrderDetails: WorkOrderDetails, form: FormGroup, isLastPage: boolean): Promise<void> {
    this._touch();

    if (!this.isSubmitted && form.invalid) {
      return;
    }
  }

  private _touch(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _initInspectionDetailsObservable(): void {
    this._loadingService.showSpinner();

    this.inspectionDetails$ = this._housingService.getInspectionDetails(this.termKey,this.residentInspectionKey,this.contractElementKey,this.checkIn)
      .pipe(
        tap((inspectionDetails: Inspection) => {
          this.getPagesInspection();
          this.section = inspectionDetails.sections[0].name;
          this.isSubmitted = false; 
          this._loadingService.closeSpinner();
          return inspectionDetails;
        }),
        catchError((error: any) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
  }

  async save(inspectionData:Inspection): Promise<void> {
    inspectionData.residentInspectionKey = inspectionData.residentInspectionKey || null;
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to save this Inspection?`,
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

            const createInspectionSubscription =
              this._inspectionService.submitInspection(inspectionData)
                .subscribe(status => {
                  if (status) {
                    alert.dismiss().then(() => this._housingService.handleSuccess());
                  } else {
                    alert.dismiss().then(() => {
                      this._loadingService.closeSpinner();
                      console.log('Unable to create Inspection');
                      this._toastService.showToast({
                        message: 'The form could not be processed at this time. Try again later',
                      });
                    });
                  }
                });

            this.subscriptions.add(createInspectionSubscription);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }

  async submitInspection(inspectionData:Inspection){
    inspectionData.isSubmitted = true;
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to submit this Inspection?`,
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

            const createInspectionSubscription =
              this._inspectionService.submitInspection(inspectionData)
                .subscribe(status => {
                  if (status) {
                    alert.dismiss().then(() => this._housingService.handleSuccess());
                  } else {
                    alert.dismiss().then(() => {
                      this._loadingService.closeSpinner();
                      console.log('Unable to create Inspection');
                      this._toastService.showToast({
                        message: 'The form could not be processed at this time. Try again later',
                      });
                    });
                  }
                });

            this.subscriptions.add(createInspectionSubscription);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();

  }

  countItemsLeft(inspectionData:Inspection){
    return inspectionData.sections.filter(x => x.items.filter(y => y.residentConditionKey===0).length > 0).length
  }

  getConditionStaff(conditionStaff: number):string{
    const conditionStaffValue = this.conditions.filter(x => x.value === conditionStaff.toString())[0]?.label
    return conditionStaffValue? conditionStaffValue : 'none';
  }
}
