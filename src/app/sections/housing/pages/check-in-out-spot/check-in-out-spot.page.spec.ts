import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import { CheckInOutSlot } from '@sections/housing/check-in-out/check-in-out.model';
import { CheckInOutService } from '@sections/housing/check-in-out/check-in-out.service';
import { HousingService } from '@sections/housing/housing.service';
import { CheckInOutSpotPage } from './check-in-out-spot.page';

describe('CheckInOutSpotPage', () => {
  let component: CheckInOutSpotPage;
  let fixture: ComponentFixture<CheckInOutSpotPage>;

  beforeEach(() => {
    const datePipeStub = () => ({ transform: (slotDateTime, string) => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const alertControllerStub = () => ({
      create: object => ({
        dismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    const checkInOutStateServiceStub = () => ({
      getSelectedCheckInOutSlot: () => ({}),
      setActiveCheckInOutSlot: arg => ({})
    });
    const checkInOutServiceStub = () => ({
      selectSpot: selectedSpot => ({ subscribe: f => f({}) })
    });
    const housingServiceStub = () => ({ goToDashboard: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInOutSpotPage],
      providers: [
        { provide: DatePipe, useFactory: datePipeStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: Platform, useFactory: platformStub },
        {
          provide: CheckInOutStateService,
          useFactory: checkInOutStateServiceStub
        },
        { provide: CheckInOutService, useFactory: checkInOutServiceStub },
        { provide: HousingService, useFactory: housingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CheckInOutSpotPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('selectSpot', () => {
    it('makes expected calls', () => {
      const datePipeStub: DatePipe = fixture.debugElement.injector.get(
        DatePipe
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      const checkInOutStateServiceStub: CheckInOutStateService = fixture.debugElement.injector.get(
        CheckInOutStateService
      );
      const checkInOutSlotStub: CheckInOutSlot = <any>{};
      const checkInOutServiceStub: CheckInOutService = fixture.debugElement.injector.get(
        CheckInOutService
      );
      const housingServiceStub: HousingService = fixture.debugElement.injector.get(
        HousingService
      );
     jest.spyOn(datePipeStub, 'transform');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(toastServiceStub, 'showToast');
     jest.spyOn(alertControllerStub, 'create');
     jest.spyOn(
        checkInOutStateServiceStub,
        'setActiveCheckInOutSlot'
      );
     jest.spyOn(checkInOutServiceStub, 'selectSpot');
     jest.spyOn(housingServiceStub, 'goToDashboard');
      component.selectSpot(checkInOutSlotStub);
      expect(datePipeStub.transform).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
      expect(alertControllerStub.create).toHaveBeenCalled();
      expect(
        checkInOutStateServiceStub.setActiveCheckInOutSlot
      ).toHaveBeenCalled();
      expect(checkInOutServiceStub.selectSpot).toHaveBeenCalled();
      expect(housingServiceStub.goToDashboard).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const checkInOutStateServiceStub: CheckInOutStateService = fixture.debugElement.injector.get(
        CheckInOutStateService
      );
     jest.spyOn(
        checkInOutStateServiceStub,
        'getSelectedCheckInOutSlot'
      );
      component.ngOnInit();
      expect(
        checkInOutStateServiceStub.getSelectedCheckInOutSlot
      ).toHaveBeenCalled();
    });
  });
});
