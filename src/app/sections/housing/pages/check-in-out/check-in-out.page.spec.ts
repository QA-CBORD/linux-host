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
    const _router = {
      navigate: jest.fn(),
    };
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const checkInOutStateServiceStub = () => ({
      setActiveCheckInOutSlot: jest.fn(selectedSlot => ({}))
    });
    const housingServiceStub = () => ({
      getCheckInOutSlots: checkInOutKey => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInOutPage],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useValue: _router },
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
    it('makes expected calls', async () => {
      const checkInOutStateServiceStub: CheckInOutStateService = fixture.debugElement.injector.get(
        CheckInOutStateService
      );
      const checkInOutSpotStub: CheckInOutSpot = <any>{};
     const spy = jest.spyOn(
        checkInOutStateServiceStub,
        'setActiveCheckInOutSlot'
      );
      await component.showAvailableSpots(checkInOutSpotStub);
      expect(spy).toHaveBeenCalled();
    });
  });
});
