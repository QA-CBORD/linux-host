import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PickCheckinModeComponent } from './pick-checkin-mode.component';

describe('PickCheckinModeComponent', () => {
  let component: PickCheckinModeComponent;
  let fixture: ComponentFixture<PickCheckinModeComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PickCheckinModeComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub }
      ]
    });
    fixture = TestBed.createComponent(PickCheckinModeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onScanCode', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(popoverControllerStub, 'dismiss');
      component.onScanCode();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onLocationCheckinClicked', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(popoverControllerStub, 'dismiss');
      component.onLocationCheckinClicked();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('closeMe', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(popoverControllerStub, 'dismiss');
      component.closeMe();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
