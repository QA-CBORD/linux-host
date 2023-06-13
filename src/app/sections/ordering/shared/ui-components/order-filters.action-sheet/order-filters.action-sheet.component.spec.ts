import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { DateUtilObject } from '@sections/accounts/shared/ui-components/filter/date-util';
import { OrderFiltersActionSheetComponent } from './order-filters.action-sheet.component';

describe('OrderFiltersActionSheetComponent', () => {
  let component: OrderFiltersActionSheetComponent;
  let fixture: ComponentFixture<OrderFiltersActionSheetComponent>;

  beforeEach(() => {
    const modalsServiceStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderFiltersActionSheetComponent],
      providers: [{ provide: ModalsService, useFactory: modalsServiceStub }]
    });
    fixture = TestBed.createComponent(OrderFiltersActionSheetComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const modalsServiceStub: ModalsService = fixture.debugElement.injector.get(
        ModalsService
      );
      spyOn(modalsServiceStub, 'dismiss').and.callThrough();
      component.onSubmit();
      expect(modalsServiceStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const modalsServiceStub: ModalsService = fixture.debugElement.injector.get(
        ModalsService
      );
      spyOn(modalsServiceStub, 'dismiss').and.callThrough();
      component.close();
      expect(modalsServiceStub.dismiss).toHaveBeenCalled();
    });
  });
});
