import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DepositModalComponent } from './deposit-modal.component';

describe('DepositModalComponent', () => {
  let component: DepositModalComponent;
  let fixture: ComponentFixture<DepositModalComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepositModalComponent],
      providers: [{ provide: ModalController, useFactory: modalControllerStub }]
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
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.onClickedDone();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
