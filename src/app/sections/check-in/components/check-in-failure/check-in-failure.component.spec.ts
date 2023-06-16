import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CheckInFailureComponent } from './check-in-failure.component';

describe('CheckInFailureComponent', () => {
  let component: CheckInFailureComponent;
  let fixture: ComponentFixture<CheckInFailureComponent>;

  beforeEach(() => {
    const loadingServiceStub = () => ({ closeSpinner: () => ({}) });
    const modalControllerStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInFailureComponent],
      providers: [
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ModalController, useFactory: modalControllerStub }
      ]
    });
    fixture = TestBed.createComponent(CheckInFailureComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ionViewDidEnter', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      component.ionViewDidEnter();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('onBack', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onBack();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('onScanCode', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onScanCode();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
