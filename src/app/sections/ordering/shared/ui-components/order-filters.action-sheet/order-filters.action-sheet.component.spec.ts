import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { DateUtilObject, getUniquePeriodName } from '@sections/accounts/shared/ui-components/filter/date-util';
import { OrderFiltersActionSheetComponent } from './order-filters.action-sheet.component';

describe('OrderFiltersActionSheetComponent', () => {
  let component: OrderFiltersActionSheetComponent;
  let fixture: ComponentFixture<OrderFiltersActionSheetComponent>;

  beforeEach(() => {
    const modalsServiceStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderFiltersActionSheetComponent],
      providers: [{ provide: ModalsService, useFactory: modalsServiceStub }],
    });
    fixture = TestBed.createComponent(OrderFiltersActionSheetComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const modalsServiceStub: ModalsService = fixture.debugElement.injector.get(ModalsService);
      jest.spyOn(modalsServiceStub, 'dismiss');
      component.onSubmit();
      expect(modalsServiceStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const modalsServiceStub: ModalsService = fixture.debugElement.injector.get(ModalsService);
      jest.spyOn(modalsServiceStub, 'dismiss');
      component.close();
      expect(modalsServiceStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('statusTypeOnChange', () => {
    it('should set selectedStatus to the provided status', () => {
      const status = 'newStatus';
      component.statusTypeOnChange(status);
      expect(component.selectedStatus).toBe(status);
    });
  });

  describe('periodTypeOnChange', () => {
    it('should set selectedPeriod to the provided period', () => {
      const period: DateUtilObject = { name: 'newPeriod', month: 1, year: 2020 };
      component.periodTypeOnChange(period);
      expect(component.selectedPeriod).toBe(period);
    });
  });

  describe('trackPeriod', () => {
    it('should return a unique name for the provided period', () => {
      const period: DateUtilObject = { name: 'newPeriod', month: 1, year: 2020 };

      const uniqueName = getUniquePeriodName(period);
      expect(component.trackPeriod(0, period)).toBe(uniqueName);
    });
  });
});
