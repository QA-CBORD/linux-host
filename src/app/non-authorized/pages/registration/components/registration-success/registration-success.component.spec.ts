import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegistrationSuccessComponent } from './registration-success.component';

describe('RegistrationSuccessComponent', () => {
  let component: RegistrationSuccessComponent;
  let fixture: ComponentFixture<RegistrationSuccessComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegistrationSuccessComponent],
      providers: [{ provide: ModalController, useFactory: modalControllerStub }]
    });
    fixture = TestBed.createComponent(RegistrationSuccessComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('dismiss', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.dismiss();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onDecline', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'dismiss');
      component.onDecline();
      expect(component.dismiss).toHaveBeenCalled();
    });
  });
});
