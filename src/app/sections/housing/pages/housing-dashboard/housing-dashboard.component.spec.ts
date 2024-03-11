import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { IonContent, IonicModule, Platform } from '@ionic/angular';
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
import { HousingDashboardPage, SelectedHousingTab } from './housing-dashboard.component';
import { HousingDashboardRoutingModule } from './housing-dashboard.routing.module';
import { WorkOrdersComponent } from '@sections/housing/work-orders/work-orders.component';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { By } from '@angular/platform-browser';

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
      declarations: [HousingDashboardPage, WorkOrdersComponent],
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Housing Dashboard', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should load terms dropdown options', async () => {
      fixture.detectChanges();
      const spy = jest.spyOn(termService, 'getTerms');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should display forms when selectedHousingTab is HousingTab.Forms', () => {
      component.selectedHousingTab = SelectedHousingTab.Forms;
      fixture.detectChanges();
      const applications = isComponentDisplayed(fixture, 'st-applications');
      const waitingLists = isComponentDisplayed(fixture, 'st-waiting-lists');
      const nonAssignments = isComponentDisplayed(fixture, 'st-non-assignments');
      const contracts = isComponentDisplayed(fixture, 'st-contracts');
      const workOrders = isComponentDisplayed(fixture, 'st-work-orders');
      const attachments = isComponentDisplayed(fixture, 'st-attachments');
      expect(applications).toBeTruthy();
      expect(waitingLists).toBeTruthy();
      expect(nonAssignments).toBeTruthy();
      expect(contracts).toBeTruthy();
      expect(workOrders).toBeTruthy();
      expect(attachments).toBeTruthy();
    });

    it('should display rooms when selectedHousingTab is HousingTab.Rooms', () => {
      component.selectedHousingTab = SelectedHousingTab.Rooms;
      fixture.detectChanges();
      const checkIn = isComponentDisplayed(fixture, 'st-check-in-out');
      const rooms = isComponentDisplayed(fixture, 'st-rooms');
      const inspections = isComponentDisplayed(fixture, 'st-inspections-forms');
      expect(checkIn).toBeTruthy();
      expect(rooms).toBeTruthy();
      expect(inspections).toBeTruthy();
    });

    it('should display contracts when selectedHousingTab is HousingTab.Contracts', () => {
      component.selectedHousingTab = SelectedHousingTab.Contracts;
      fixture.detectChanges();
      const contractList = isComponentDisplayed(fixture, 'st-contract-list');
      expect(contractList).toBeTruthy();
    });

    it('should display transactions when selectedHousingTab is HousingTab.Transactions', () => {
      component.selectedHousingTab = SelectedHousingTab.Transactions;
      fixture.detectChanges();
      const transactions = isComponentDisplayed(fixture, 'st-housing-transactions-only');
      expect(transactions).toBeTruthy();
    });
  });
});

function isComponentDisplayed(fixture: ComponentFixture<HousingDashboardPage>, selector: string) {
  const ionContent = fixture.debugElement.query(By.directive(IonContent));
  return ionContent.children.find(value => value.name === selector);
}
