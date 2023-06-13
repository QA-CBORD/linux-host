import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import { CheckInOutSpot } from '@sections/housing/check-in-out/check-in-out.model';
import { HousingService } from '@sections/housing/housing.service';
import { monthDayYear } from '../../../../shared/constants/dateFormats.constant';
import { CheckInOutPage } from './check-in-out.page';

describe('CheckInOutPage', () => {
  let component: CheckInOutPage;
  let fixture: ComponentFixture<CheckInOutPage>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigate: array => ({ then: () => ({}) }) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const checkInOutStateServiceStub = () => ({
      setActiveCheckInOutSlot: selectedSlot => ({})
    });
    const housingServiceStub = () => ({
      getCheckInOutSlots: checkInOutKey => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInOutPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: CheckInOutStateService,
          useFactory: checkInOutStateServiceStub
        },
        { provide: HousingService, useFactory: housingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CheckInOutPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`availableSlots has default value`, () => {
    expect(component.availableSlots).toEqual([]);
  });

  it(`dateFormat has default value`, () => {
    expect(component.dateFormat).toEqual(monthDayYear);
  });

  describe('showAvailableSpots', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const checkInOutStateServiceStub: CheckInOutStateService = fixture.debugElement.injector.get(
        CheckInOutStateService
      );
      const checkInOutSpotStub: CheckInOutSpot = <any>{};
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(
        checkInOutStateServiceStub,
        'setActiveCheckInOutSlot'
      ).and.callThrough();
      component.showAvailableSpots(checkInOutSpotStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(
        checkInOutStateServiceStub.setActiveCheckInOutSlot
      ).toHaveBeenCalled();
    });
  });
});
