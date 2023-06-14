import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
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
  first,
  share,
  tap
} from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '@sections/housing/housing.service';
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { ToastService } from '@core/service/toast/toast.service';
import { Inspection } from '../../inspections-forms/inspections-forms.model';
import { InspectionService } from '../../inspections-forms/inspections-forms.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
@Component({
  selector: 'st-inspections-details',
  templateUrl: './inspections-details.page.html',
  styleUrls: ['./inspections-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable({
  providedIn: 'root',
})
export class InspectionsDetailsPage implements OnInit, OnDestroy {
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  inspectionDetails$: Observable<Inspection>;
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
  conditions = [];
  inspectionForm: FormGroup;
  roomsMapping = {
    '=0': 'No rooms left.',
    '=1': '# room left.',
    'other': '# rooms left.'
  }


  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _inspectionService: InspectionService,
    private  nativeProvider: NativeProvider,
    private fb: FormBuilder,
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
    this.createInspectionForm();
  }

  private getInspectionConditions() {
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
        first(),
        share(),
        tap((inspectionDetails: Inspection) => {
          this.getInspectionConditions();
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
      this.subscriptions.add(this.inspectionDetails$.subscribe() )
  }

  async save(inspectionData: Inspection): Promise<void> {
    inspectionData.sections = this.inspectionForm.value.sections;
    inspectionData.residentInspectionKey = inspectionData.residentInspectionKey || null;
    await this.createInspectionAlert(inspectionData, `Are you sure you want to save this Inspection?`);
  }

  async submitInspection(inspectionData: Inspection) {
    inspectionData.sections = this.inspectionForm.value.sections;
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
            this._housingService.goToDashboard();
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

  setSectionsForm(){
    this.inspectionDetails$.subscribe((res)=>{
      res.sections.forEach((section)=>{
        const sectionGroup = this.fb.group({
          name: [section.name],
          items: this.fb.array([])
        });

        section.items.forEach(item => {
          const itemGroup = this.fb.group({
            residentInspectionItemKey: [item.residentInspectionItemKey],
            staffInspectionItemKey: [item.staffInspectionItemKey],
            inventoryTemplateItemKey: [item.inventoryTemplateItemKey],
            staffConditionKey: [item.staffConditionKey],
            residentConditionKey: [item.residentConditionKey],
            name: [item.name],
            comments: [item.comments]
          });

          (sectionGroup.get('items') as FormArray).push(itemGroup);
        });

        this.sectionsFormArray.push(sectionGroup);
      })
    });
  }

  get sectionsFormArray(): FormArray{
    return this.inspectionForm.get("sections") as FormArray
  }

  createInspectionForm(){
    this.inspectionForm = this.fb.group({
      sections: this.fb.array([])
    });
    this.setSectionsForm();
  }

  getItemsArray(section: AbstractControl): FormArray{
    return section.get('items') as FormArray
  }
}
