import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HousingProxyService } from './housing-proxy.service';
import { ApplicationsStateService } from './applications/applications-state.service';
import { ContractsStateService } from './contracts/contracts-state.service';
import { TermsService } from './terms/terms.service';
import { ApplicationsService } from './applications/applications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { ContractListStateService } from '@sections/housing/contract-list/contract-list-state.service';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import { ApplicationDetails } from './applications/applications.model';
import { RequestedRoommateRequest } from './applications/applications.model';
import { NonAssignmentsStateService } from './non-assignments/non-assignments-state.service';
import { WaitingListStateService } from './waiting-lists/waiting-list-state.service';
import { WorkOrderStateService } from './work-orders/work-order-state.service';
import { InspectionsStateService } from './inspections-forms/inspections-forms-state.service';
import { Inspection } from './inspections-forms/inspections-forms.model';
import { AttachmentStateService } from './attachments/attachments-state.service';
import { HousingService } from './housing.service';

describe('HousingService', () => {
  let service: HousingService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const toastControllerStub = () => ({
      create: object => ({ then: () => ({}) })
    });
    const housingProxyServiceStub = () => ({
      get: apiUrl => ({ pipe: () => ({}) }),
      post: (apiUrl, request) => ({ pipe: () => ({}) }),
      put: (_patronApplicationsUrl, body) => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const applicationsStateServiceStub = () => ({
      setApplicationDetails: applicationDetails => ({}),
      setRequestedRoommates: roommates => ({}),
      setApplications: applications => ({}),
      applicationsState: {
        applicationDetails: {
          roommatePreferences: {
            filter: () => ({ map: () => ({}) }),
            find: () => ({}),
            some: () => ({})
          }
        }
      },
      getRequestedRoommate: () => ({ find: () => ({}) }),
      setRequestedRoommate: requestedRoommateObj => ({})
    });
    const contractsStateServiceStub = () => ({
      setContractDetails: contractDetails => ({}),
      setContracts: contracts => ({})
    });
    const termsServiceStub = () => ({});
    const applicationsServiceStub = () => ({
      patchApplicationsByStoredStatus: appDef => ({})
    });
    const loadingServiceStub = () => ({ closeSpinner: () => ({}) });
    const contractsServiceStub = () => ({ sign: arg => ({}) });
    const roomsStateServiceStub = () => ({
      setOccupantDetails: occupants => ({}),
      setRoomSelects: roomSelects => ({})
    });
    const contractListStateServiceStub = () => ({
      setContractSummaries: contractSummaries => ({})
    });
    const checkInOutStateServiceStub = () => ({
      setCheckInOuts: checkInOuts => ({})
    });
    const nonAssignmentsStateServiceStub = () => ({
      setNonAssignmentDetails: nonAssignmentDetails => ({}),
      setNonAssignments: nonAssignments => ({})
    });
    const waitingListStateServiceStub = () => ({
      setWaitingListDetails: response => ({}),
      setWaitingList: waitingLists => ({})
    });
    const workOrderStateServiceStub = () => ({
      setWorkOrderDetails: workOrdersDetails => ({}),
      setWorkOrder: workOrders => ({})
    });
    const inspectionsStateServiceStub = () => ({
      setInspectionList: value => ({}),
      setInspectionForm: value => ({})
    });
    const attachmentStateServiceStub = () => ({
      setAttachmentList: value => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        HousingService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: ToastController, useFactory: toastControllerStub },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        {
          provide: ApplicationsStateService,
          useFactory: applicationsStateServiceStub
        },
        {
          provide: ContractsStateService,
          useFactory: contractsStateServiceStub
        },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: ApplicationsService, useFactory: applicationsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ContractsService, useFactory: contractsServiceStub },
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        {
          provide: ContractListStateService,
          useFactory: contractListStateServiceStub
        },
        {
          provide: CheckInOutStateService,
          useFactory: checkInOutStateServiceStub
        },
        {
          provide: NonAssignmentsStateService,
          useFactory: nonAssignmentsStateServiceStub
        },
        {
          provide: WaitingListStateService,
          useFactory: waitingListStateServiceStub
        },
        {
          provide: WorkOrderStateService,
          useFactory: workOrderStateServiceStub
        },
        {
          provide: InspectionsStateService,
          useFactory: inspectionsStateServiceStub
        },
        {
          provide: AttachmentStateService,
          useFactory: attachmentStateServiceStub
        }
      ]
    });
    service = TestBed.inject(HousingService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getRequestedRoommates', () => {
    it('makes expected calls', () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      const requestedRoommateRequestStub: RequestedRoommateRequest = <any>{};
      spyOn(component, '_handleGetRequestedRoommatesError').and.callThrough();
      spyOn(housingProxyServiceStub, 'post').and.callThrough();
      service.getRequestedRoommates(requestedRoommateRequestStub);
      expect(service._handleGetRequestedRoommatesError).toHaveBeenCalled();
      expect(housingProxyServiceStub.post).toHaveBeenCalled();
    });
  });

  describe('_setInspection', () => {
    it('makes expected calls', () => {
      const inspectionsStateServiceStub: InspectionsStateService = TestBed.inject(
        InspectionsStateService
      );
      const inspectionStub: Inspection = <any>{};
      spyOn(inspectionsStateServiceStub, 'setInspectionForm').and.callThrough();
      service._setInspection(inspectionStub);
      expect(inspectionsStateServiceStub.setInspectionForm).toHaveBeenCalled();
    });
  });

  describe('updatePaymentSuccess', () => {
    it('makes expected calls', () => {
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      const applicationDetailsStub: ApplicationDetails = <any>{};
      spyOn(housingProxyServiceStub, 'put').and.callThrough();
      service.updatePaymentSuccess(applicationDetailsStub);
      expect(housingProxyServiceStub.put).toHaveBeenCalled();
    });
  });

  describe('_handleGetRoomSelectsError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setRoomsState').and.callThrough();
      service._handleGetRoomSelectsError();
      expect(service._setRoomsState).toHaveBeenCalled();
    });
  });

  describe('_handleInspectionSelectedError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setInspection').and.callThrough();
      service._handleInspectionSelectedError();
      expect(service._setInspection).toHaveBeenCalled();
    });
  });

  describe('_handleInspectionListSelectedError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setInspectionsList').and.callThrough();
      service._handleInspectionListSelectedError();
      expect(service._setInspectionsList).toHaveBeenCalled();
    });
  });

  describe('_handleAttachmentListSelectedError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setAttachmenstList').and.callThrough();
      service._handleAttachmentListSelectedError();
      expect(service._setAttachmenstList).toHaveBeenCalled();
    });
  });

  describe('_handleGetRequestedRoommatesError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setRequestedRoommateState').and.callThrough();
      service._handleGetRequestedRoommatesError();
      expect(service._setRequestedRoommateState).toHaveBeenCalled();
    });
  });

  describe('_handleGetContractSummariesError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setContractSummariesState').and.callThrough();
      service._handleGetContractSummariesError();
      expect(service._setContractSummariesState).toHaveBeenCalled();
    });
  });

  describe('_handleGetCheckInOutsError', () => {
    it('makes expected calls', () => {
      spyOn(component, '_setCheckInOutsState').and.callThrough();
      service._handleGetCheckInOutsError();
      expect(service._setCheckInOutsState).toHaveBeenCalled();
    });
  });

  describe('goToDashboard', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      service.goToDashboard();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('goToDashboard$', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      service.goToDashboard$();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
