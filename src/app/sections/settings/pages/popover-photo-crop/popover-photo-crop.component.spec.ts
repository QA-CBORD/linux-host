import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverCropComponent } from './popover-photo-crop.component';

describe('PopoverCropComponent', () => {
  let component: PopoverCropComponent;
  let fixture: ComponentFixture<PopoverCropComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PopoverCropComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub }
      ]
    });
    fixture = TestBed.createComponent(PopoverCropComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('dismissModal', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(popoverControllerStub, 'dismiss');
      component.dismissModal();
      expect(popoverControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
