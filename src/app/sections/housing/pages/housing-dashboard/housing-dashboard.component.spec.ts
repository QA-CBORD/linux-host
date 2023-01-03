import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { IonicModule, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApplicationsModule } from '@sections/housing/applications/applications.module';
import { AttachmentModule } from '@sections/housing/attachments/attachments.module';
import { CheckInOutModule } from '@sections/housing/check-in-out/check-in-out.module';
import { ContractListModule } from '@sections/housing/contract-list/contract-list.module';
import { ContractsModule } from '@sections/housing/contracts/contracts.module';
import { HousingService } from '@sections/housing/housing.service';
import { InspectionsModule } from '@sections/housing/inspections-forms/inspections-forms.module';
import { NonAssginmentsModule } from '@sections/housing/non-assignments/non-assignments.module';
import { RoomsModule } from '@sections/housing/rooms/rooms.module';
import { TermsModule } from '@sections/housing/terms/terms.module';
import { TermsService } from '@sections/housing/terms/terms.service';
import { WaitingListsModule } from '@sections/housing/waiting-lists/waiting-lists.module';
import { EMPTY, of } from 'rxjs';
import { HousingDashboardPage } from './housing-dashboard.component';
import { HousingDashboardRoutingModule } from './housing-dashboard.routing.module';
import { MockDeclaration } from 'ng-mocks';
import { WorkOrdersComponent } from '@sections/housing/work-orders/work-orders.component';
import { StorageStateService } from '@core/states/storage/storage-state.service';

const _loadingService = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};
const _housingService = {
  refreshDefinitions$: EMPTY,
  getAttachmentsListDetails: jest.fn(),
  getInspections: jest.fn(),
  getCheckInOuts: jest.fn(),
  getPatronContracts: jest.fn(() => of(true)),
  getRoomSelects: jest.fn(),
  getDefinitions: jest.fn(),
  refreshDefinitions: jest.fn(),
};

const _environment = {
  getHousingAPIURL: jest.fn(),
  getEnvironmentObject: jest.fn(),
};

const _storage = {
  clear: jest.fn(),
  ready: jest.fn(),
  get: jest.fn(),
};
const _platform = {
  is: jest.fn(),
};

const _storageStateService = {
  initSaveStorageListeners: jest.fn(),
};
const termService = {
  termId$: EMPTY,
  getTerms: jest.fn(() => of(true)),
};

describe('HousingDashboardPage', () => {
  let component: HousingDashboardPage;
  let fixture: ComponentFixture<HousingDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //TODO: Temp fix for Swiper imports, should setup JEST instead
      declarations: [HousingDashboardPage, MockDeclaration(WorkOrdersComponent)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        FormsModule,
        TermsModule,
        ApplicationsModule,
        ContractsModule,
        HousingDashboardRoutingModule,
        RoomsModule,
        NonAssginmentsModule,
        ContractListModule,
        CheckInOutModule,
        WaitingListsModule,
        InspectionsModule,
        AttachmentModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: EnvironmentFacadeService, useValue: _environment },
        { provide: LoadingService, useValue: _loadingService },
        { provide: HousingService, useValue: _housingService },
        { provide: Storage, useValue: _storage },
        { provide: Platform, useValue: _platform },
        { provide: TermsService, useValue: termService },
        { provide: StorageStateService, useValue: _storageStateService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Housing Dashboard', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should load terms dropdown options', async () => {
      const spy = jest.spyOn(termService, 'getTerms');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
