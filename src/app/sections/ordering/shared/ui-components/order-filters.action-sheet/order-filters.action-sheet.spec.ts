import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { OrderFiltersActionSheetComponent } from './order-filters.action-sheet.component';
import { ModalsService } from '@core/service/modals/modals.service';
import { DateUtilObject } from '@sections/accounts/shared/ui-components/filter/date-util';
import {
  ORDERING_STATUS_LABEL_LBL,
  ORDERS_PERIOD_LABEL,
} from '../recent-oders-list/recent-orders-list-item/recent-orders.config';
import { By } from '@angular/platform-browser';

describe('OrderOptionsActionSheet', () => {
  let component: OrderFiltersActionSheetComponent;
  let fixture: ComponentFixture<OrderFiltersActionSheetComponent>;
  let modalService;

  const periods = [
    {
      name: ORDERS_PERIOD_LABEL[0],
    },
    {
      name: 'January',
    },
    {
      name: 'February',
    },
  ] as DateUtilObject[];

  const statuses = [
    ORDERING_STATUS_LABEL_LBL.ALL,
    ORDERING_STATUS_LABEL_LBL.PENDING,
    ORDERING_STATUS_LABEL_LBL.COMPLETED,
    ORDERING_STATUS_LABEL_LBL.CANCELED,
  ];

  beforeEach(waitForAsync(() => {
    modalService = {
      dismiss: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [OrderFiltersActionSheetComponent],
      imports: [...CoreTestingModules],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ModalsService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFiltersActionSheetComponent);
    component = fixture.componentInstance;
    component.periods = periods;
    component.statuses = statuses;
    component.selectedPeriod = {
      name: ORDERS_PERIOD_LABEL[0],
    };
    component.selectedStatus = ORDERING_STATUS_LABEL_LBL.PENDING;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Periods options to be the exact amount of items passed', () => {
    const radioGroup = fixture.debugElement.query(By.css('.period-radio-group'));
    fixture.detectChanges();
    expect(radioGroup.children.length).toEqual(periods.length);
  });

  it('Statuses options to be the exact amount of item passed', () => {
    const radioGroup = fixture.debugElement.query(By.css('.status-radio-group'));
    fixture.detectChanges();
    expect(radioGroup.children.length).toEqual(statuses.length);
  });

  it('should dismiss the modal with the selected period and status', () => {
    const period: DateUtilObject = { name: 'newPeriod', month: 1, year: 2020 };
    const status = 'newStatus';
    component.selectedPeriod = period;
    component.selectedStatus = status;

    const dismissSpy = jest.spyOn(modalService, 'dismiss');
    component.onSubmit();

    expect(dismissSpy).toHaveBeenCalledWith({ period, status });
  });

  it('should dismiss the modal', () => {
    const dismissSpy = jest.spyOn(modalService, 'dismiss');
    component.close();

    expect(dismissSpy).toHaveBeenCalled();
  });

  it('should set selectedStatus to the provided status', () => {
    const status = 'newStatus';
    component.statusTypeOnChange(status);

    expect(component.selectedStatus).toBe(status);
  });

  it('should set selectedPeriod to the provided period', () => {
    const period: DateUtilObject = { name: 'newPeriod', month: 1, year: 2020 };
    component.periodTypeOnChange(period);

    expect(component.selectedPeriod).toBe(period);
  });
});
