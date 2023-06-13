import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmModalComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub }
      ]
    });
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`primaryBtnDisabled has default value`, () => {
    expect(component.primaryBtnDisabled).toEqual(false);
  });

  it(`secondaryBtnDisabled has default value`, () => {
    expect(component.secondaryBtnDisabled).toEqual(false);
  });

  describe('onScanCode', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      spyOn(popoverControllerStub, 'dismiss').and.callThrough();
      component.onScanCode();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onLocationCheckinClicked', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      spyOn(popoverControllerStub, 'dismiss').and.callThrough();
      component.onLocationCheckinClicked();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('closeMe', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      spyOn(popoverControllerStub, 'dismiss').and.callThrough();
      component.closeMe();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
