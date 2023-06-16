import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateUtilObject } from '../date-util';
import { TransactionService } from '../../../../services/transaction.service';
import { FilterMenuComponent } from './filter-menu.component';

describe('FilterMenuComponent', () => {
  let component: FilterMenuComponent;
  let fixture: ComponentFixture<FilterMenuComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: filterState => ({}) });
    const transactionServiceStub = () => ({
      getContentStrings: transactionStringNames => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterMenuComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: TransactionService, useFactory: transactionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FilterMenuComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'setContentStrings');
      component.ngOnInit();
      expect(component.setContentStrings).toHaveBeenCalled();
    });
  });

  describe('onFilterDone', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onFilterDone();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onAllAccountChosen', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'onAccountChosen');
      component.onAllAccountChosen();
      expect(component.onAccountChosen).toHaveBeenCalled();
    });
  });

  describe('setContentStrings', () => {
    it('makes expected calls', () => {
      const transactionServiceStub: TransactionService = fixture.debugElement.injector.get(
        TransactionService
      );
     jest.spyOn(transactionServiceStub, 'getContentStrings');
      component.setContentStrings();
      expect(transactionServiceStub.getContentStrings).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onClose();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
