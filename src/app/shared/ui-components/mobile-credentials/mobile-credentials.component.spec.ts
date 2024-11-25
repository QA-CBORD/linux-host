import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { MobileCredentialsComponent } from './mobile-credentials.component';

describe('MobileCredentialsComponent', () => {
  let component: MobileCredentialsComponent;
  let fixture: ComponentFixture<MobileCredentialsComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({
      dismiss: object => ({ catch: () => ({}) })
    });
    const popoverControllerStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MobileCredentialsComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub }
      ]
    });
    fixture = TestBed.createComponent(MobileCredentialsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showFooter has default value`, () => {
    expect(component.showFooter).toEqual(true);
  });

  it(`closeNavbar has default value`, () => {
    expect(component.closeNavbar).toEqual(true);
  });

  describe('onAccept', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onAccept();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onDecline', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
     jest.spyOn(popoverControllerStub, 'dismiss');
      component.onDecline();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onButtonClicked', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(popoverControllerStub, 'dismiss');
      component.onButtonClicked();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
