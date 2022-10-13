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
import { ToastService } from '@core/service/toast/toast.service';
import { Inspection } from '../../inspections-forms/inspections-forms.model';
import { InspectionService } from '../../inspections-forms/inspections-forms.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
@Component({
  selector: 'st-inspections-details',
  templateUrl: './inspections-details.page.html',
  styleUrls: ['./inspections-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionsDetailsPage implements OnInit, OnDestroy {
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
  isSubmitted: boolean;
  termKey = 0;
  canSubmit = true;
  status = 0;
  section = '';
  conditions: any[] = [];

  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _inspectionService: InspectionService,
    private  nativeProvider: NativeProvider,
  ) {}

  ngOnInit(): void {
    if (this.nativeProvider.isMobile()) {
      this.subscriptions = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.residentInspectionKey = parseInt(this._route.snapshot.params.residentInspectionKey);
    this.contractElementKey = parseInt(this._route.snapshot.params.contractElementKey);
    this.checkIn = JSON.parse(this._route.snapshot.params.checkIn);
    this.termKey = parseInt(this._route.snapshot.params.termKey);
    this.status = parseInt(this._route.snapshot.params.status);
    this._initInspectionDetailsObservable();
  }

  private getInspectionPages() {
    const result = this._inspectionService.getFormDefinitionInspection().subscribe(res => {
      this.conditions = res.values.filter(x => x.selected)
    })
    this.subscriptions.add(result);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async submit(): Promise<void> {
    this._touch();
  }

  private _touch(): void {
    this.questions.forEach((question: QuestionComponent) => question.touch());
  }

  private _initInspectionDetailsObservable(): void {
    this._loadingService.showSpinner();

    this.inspectionDetails$ = this._housingService.getInspectionDetails(this.termKey, this.residentInspectionKey, this.contractElementKey, this.checkIn)
      .pipe(
        tap((inspectionDetails: Inspection) => {
          this.getInspectionPages();
          this.section = inspectionDetails.sections[0].name;
          this.isSubmitted = inspectionDetails.isSubmitted;
          
          this._loadingService.closeSpinner();
          return inspectionDetails;
        }),
        catchError((error: Error) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
  }

  async save(inspectionData: Inspection): Promise<void> {
    inspectionData.residentInspectionKey = inspectionData.residentInspectionKey || null;
    await this.createInspectionAlert(inspectionData, `Are you sure you want to save this Inspection?`);
  }

  async submitInspection(inspectionData: Inspection) {
    inspectionData.isSubmitted = true;
    await this.createInspectionAlert(inspectionData, `Are you sure you want to submit this Inspection?`);
  }

  private async createInspectionAlert(inspectionData: Inspection, message: string) {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: message,
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
            this.createInspectionSubscription(inspectionData, alert);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }

  private createInspectionSubscription(inspectionData: Inspection, alert: HTMLIonAlertElement) {
    const createInspectionSubscription = this._inspectionService.submitInspection(inspectionData)
      .subscribe(status => {
          alert.dismiss().then(() => {
            if (status) {
              this._housingService.handleSuccess();
            } else {
              this._loadingService.closeSpinner();
              this._toastService.showToast({
                message: 'The form could not be processed at this time. Try again later',
              });
            }
          });
      });

    this.subscriptions.add(createInspectionSubscription);
  }

  countItemsLeft(inspectionData: Inspection) {
    return inspectionData.sections.filter(x => x.items.filter(y => y.residentConditionKey === 0).length > 0).length
  }

  getConditionStaff(conditionStaff: number): string {
    const conditionStaffValue = this.conditions.filter(x => x.value === conditionStaff.toString())[0]?.label
    return conditionStaffValue ? conditionStaffValue : 'none';
  }

  changeView(section: string) {
    this.section = section;
  }
}
