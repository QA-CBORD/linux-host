import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ModalController, AngularDelegate, PopoverController, IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ControlErrorsModule } from '@shared/ui-components/control-errors/control-errors.module';
import { RadioGroupModule } from '@shared/ui-components/radio-group/radio-group.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StDateSelectModule } from '@shared/ui-components/st-date-select/st-date-select.module';
import { StHierarcheTreeDialogModule } from '@shared/ui-components/st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.module';
import { StHierarcheTreeModule } from '@shared/ui-components/st-hierarchy-tree/st-hierarchy-tree.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { of, BehaviorSubject } from 'rxjs';
import { ApplicationsStateService } from '../applications/applications-state.service';
import { AssetTypeDetailsModule } from '../asset-type-details/asset-type-details.module';
import { ChargeSchedulesModule } from '../charge-schedules/charge-schedules.module';
import { ContractListStateService } from '../contract-list/contract-list-state.service';
import { SignContractModule } from '../sign-contract/sign-contract.module';
import { TermsService } from '../terms/terms.service';
import { WorkOrderStateService } from '../work-orders/work-order-state.service';
import { ImageData, WorkOrderDetails } from '../work-orders/work-orders.model';
import { FacilityPickerModule } from './facility-picker/facility-picker.module';
import { QuestionComponent } from './question.component';
import { QUESTIONS_TYPES } from './questions.model';
const _storage = {
  clear: jest.fn(),
  ready: jest.fn(),
  get: jest.fn(),
};
const _environmentFacadeService = {
  getEnvironmentObject: jest.fn(()=> ({housing_aws_url:''}))
}

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let mockApplicationsStateService: Partial<ApplicationsStateService>;
  let mockWorkOrderStateService: Partial<WorkOrderStateService>;
  let mockTermService: Partial<TermsService>;
  let mockContractListStateService: Partial<ContractListStateService>;

  beforeEach(async () => {
    mockApplicationsStateService = {
      roommateSearchOptions: of({}),
    };
    mockWorkOrderStateService = {
      workOrderImage$: new BehaviorSubject<ImageData>({
        comments: null,
        contents: null,
        filename: null,
        studentSubmitted: null,
        workOrderKey: 5,
      }),
      workOrderDetails: new BehaviorSubject<WorkOrderDetails>({
        facilityTree: [],
        workOrderDetails: null,
        workOrderKey: 54,
        workOrderTypes: null,
        formDefinition: null,
      }),
      setSelectedFacilityTree: () => {},
    };
    mockTermService = {
      termId$: of(1),
    };
    mockContractListStateService = {
      getContractDetails: () => [
        { fullName: 'Facility', facilityKey: 1, startDate: '2023-04-20', endDate: '2023-05-20', state: 1 },
      ],
    };
    await TestBed.configureTestingModule({
      imports:[
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        StInputFloatingLabelModule,
        StTextareaFloatingLabelModule,
        StSelectFloatingLabelModule,
        StDateSelectModule,
        ControlErrorsModule,
        RadioGroupModule,
        FacilityPickerModule,
        ChargeSchedulesModule,
        SignContractModule,
        AssetTypeDetailsModule,
        StHierarcheTreeModule,
        StHierarcheTreeDialogModule,
        StButtonModule
      ],
      declarations: [QuestionComponent],
      providers: [
        { provide: ApplicationsStateService, useValue: mockApplicationsStateService },
        { provide: WorkOrderStateService, useValue: mockWorkOrderStateService },
        { provide: TermsService, useValue: mockTermService },
        { provide: ContractListStateService, useValue: mockContractListStateService },
        { provide: Storage, useValue: _storage },
        {provide: EnvironmentFacadeService, useValue: _environmentFacadeService},

        HttpClient,
        HttpHandler,
        ModalController,
        AngularDelegate,
        PopoverController,
        AndroidPermissions,
        Network,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = { type: QUESTIONS_TYPES.FACILITY } as any;
    fixture.detectChanges();
  });

  it('should initialize roommateSearchOptions on ngOnInit', () => {
    expect(component.roommateSearchOptions$).toBe(mockApplicationsStateService.roommateSearchOptions);
  });

 
});
