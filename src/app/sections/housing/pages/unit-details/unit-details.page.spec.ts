import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoomsService } from '@sections/housing/rooms/rooms.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { UnitDetailsPage } from './unit-details.page';

describe('UnitDetailsPage', () => {
  let component: UnitDetailsPage;
  let fixture: ComponentFixture<UnitDetailsPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const roomsStateServiceStub = () => ({
      getUnitDetails: (facilityKey, unitKey) => ({}),
      getActiveRoomSelect: () => ({ key: {} })
    });
    const housingServiceStub = () => ({
      getOccupantDetails: (key, unitKey) => ({}),
      goToDashboard: () => ({})
    });
    const roomsServiceStub = () => ({
      postContractRequest: request => ({ subscribe: f => f({}) })
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const termsServiceStub = () => ({
      termId$: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    const alertControllerStub = () => ({
      create: object => ({
        dismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UnitDetailsPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: RoomsStateService, useFactory: roomsStateServiceStub },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: RoomsService, useFactory: roomsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UnitDetailsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isExpanded has default value`, () => {
    expect(component.isExpanded).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const roomsStateServiceStub: RoomsStateService = fixture.debugElement.injector.get(
        RoomsStateService
      );
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
      spyOn(roomsStateServiceStub, 'getUnitDetails').and.callThrough();
      spyOn(roomsStateServiceStub, 'getActiveRoomSelect').and.callThrough();
      spyOn(housingServiceStub, 'getOccupantDetails').and.callThrough();
      component.ngOnInit();
      expect(roomsStateServiceStub.getUnitDetails).toHaveBeenCalled();
      expect(roomsStateServiceStub.getActiveRoomSelect).toHaveBeenCalled();
      expect(housingServiceStub.getOccupantDetails).toHaveBeenCalled();
    });
  });

  describe('requestRoom', () => {
    it('makes expected calls', () => {
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
      const roomsServiceStub: RoomsService = fixture.debugElement.injector.get(
        RoomsService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(housingServiceStub, 'goToDashboard').and.callThrough();
      spyOn(roomsServiceStub, 'postContractRequest').and.callThrough();
      spyOn(toastServiceStub, 'showToast').and.callThrough();
      spyOn(alertControllerStub, 'create').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.requestRoom();
      expect(housingServiceStub.goToDashboard).toHaveBeenCalled();
      expect(roomsServiceStub.postContractRequest).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
      expect(alertControllerStub.create).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
