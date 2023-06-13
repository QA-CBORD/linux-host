import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MobileAccessService } from '../service';
import { MobileAccessPopoverComponent } from './mobile-access-popover.component';

describe('MobileAccessPopoverComponent', () => {
  let component: MobileAccessPopoverComponent;
  let fixture: ComponentFixture<MobileAccessPopoverComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({ dismiss: closeModal => ({}) });
    const mobileAccessServiceStub = () => ({
      getContentValueByName: errorResponseDialogHeader => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MobileAccessPopoverComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: MobileAccessService, useFactory: mobileAccessServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MobileAccessPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initPopover').and.callThrough();
      component.ngOnInit();
      expect(component.initPopover).toHaveBeenCalled();
    });
  });

  describe('initPopover', () => {
    it('makes expected calls', () => {
      spyOn(component, 'configureButtons').and.callThrough();
      component.initPopover();
      expect(component.configureButtons).toHaveBeenCalled();
    });
  });
});
