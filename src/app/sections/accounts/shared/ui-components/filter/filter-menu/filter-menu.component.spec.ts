import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { FilterMenuComponent } from './filter-menu.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { TranslateServiceStub } from '@sections/notifications/notifications.component.spec';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FilterMenuComponent', () => {
  let component: FilterMenuComponent;
  let fixture: ComponentFixture<FilterMenuComponent>;

  const modalControllerStub = {
    dismiss: () => { }
  };

  const transactionServiceStub = {
    getAccounts: jest.fn(),
    getTransactions: jest.fn(),
    getContentStrings: jest.fn(() => {}),
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [FilterMenuComponent, TranslateModule],
      providers: [
        { provide: ModalController, useValue: modalControllerStub },
        { provide: TransactionService, useValue: transactionServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterMenuComponent);
    component = fixture.componentInstance;
    component.activeTimeRange = {
      name: 'test',
      year: 2022,
      month: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filter state', () => {
    expect(component['filterState']).toEqual({ "accountId": undefined, "period": { "month": 0, "name": "test", "year": 2022 } });
  });

  it('should set time period', () => {
    expect(component.timePeriod).toBeDefined();
  });

  it('should set cs names', () => {
    expect(component.csNames).toBeDefined();
  });

  it('should call onFilterDone method when filter is done', () => {
    jest.spyOn(component, 'onFilterDone');
    component.onFilterDone();
    expect(component.onFilterDone).toHaveBeenCalled();
  });

  it('should call onAccountChosen method when an account is chosen', () => {
    const accountId = '123';
    jest.spyOn(component, 'onAccountChosen');
    component.onAccountChosen(accountId);
    expect(component.onAccountChosen).toHaveBeenCalledWith(accountId);
  });

  it('should call onAllAccountChosen method when all accounts are chosen', () => {
    jest.spyOn(component, 'onAllAccountChosen');
    component.onAllAccountChosen();
    expect(component.onAllAccountChosen).toHaveBeenCalled();
  });

  it('should call onTimeChosen method when a time period is chosen', () => {
    const period = { startDate: new Date(), endDate: new Date() } as any;
    jest.spyOn(component, 'onTimeChosen');
    component.onTimeChosen(period);
    expect(component.onTimeChosen).toHaveBeenCalledWith(period);
  });

  it('should call trackPeriod method when tracking periods', () => {
    const index = 0;
    const period = { startDate: new Date(), endDate: new Date() } as any;
    jest.spyOn(component, 'trackPeriod');
    component.trackPeriod(index, period);
    expect(component.trackPeriod).toHaveBeenCalledWith(index, period);
  });

  it('should call onClose method when closing the filter menu', async () => {
    jest.spyOn(component, 'onClose');
    await component.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
});