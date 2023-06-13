import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterState } from './filter-menu/filter-menu.component';
import { AccountService } from '../../../services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { TransactionService } from '../../../services/transaction.service';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const modalControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const accountServiceStub = () => ({
      getAccountsFilteredByDisplayTenders: () => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const transactionServiceStub = () => ({
      getTransactionsByAccountId: (accountId, period) => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      activeTimeRange: {},
      activeAccountId: {},
      getContentStrings: transactionStringNames => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onFilterDone', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const filterStateStub: FilterState = <any>{};
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(
        transactionServiceStub,
        'getTransactionsByAccountId'
      ).and.callThrough();
      component.onFilterDone(filterStateStub);
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(
        transactionServiceStub.getTransactionsByAccountId
      ).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'setContentStrings').and.callThrough();
      component.ngOnInit();
      expect(component.setContentStrings).toHaveBeenCalled();
    });
  });

  describe('setContentStrings', () => {
    it('makes expected calls', () => {
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
      spyOn(transactionServiceStub, 'getContentStrings').and.callThrough();
      component.setContentStrings();
      expect(transactionServiceStub.getContentStrings).toHaveBeenCalled();
    });
  });
});
