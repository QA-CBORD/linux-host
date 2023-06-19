import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepositModalComponent } from './deposit-modal.component';
import { TransactionUnitsPipeModule } from '@shared/pipes/transaction-units';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DepositModalComponent', () => {
  let component: DepositModalComponent;
  let fixture: ComponentFixture<DepositModalComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepositModalComponent],
      providers: [{ provide: ModalController, useFactory: modalControllerStub }],
      imports: [TransactionUnitsPipeModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DepositModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickedDone', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onClickedDone();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
