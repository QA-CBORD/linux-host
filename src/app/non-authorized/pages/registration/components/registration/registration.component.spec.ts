import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: controls => ({}) });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: customLoadingOptions => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const modalControllerStub = () => ({
      dismiss: arg => ({}),
      create: object => ({ present: () => ({}), onDidDismiss: () => ({}) })
    });
    const registrationServiceFacadeStub = () => ({
      getData: () => ({ contentString: {} }),
      submit: value => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegistrationComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalController, useFactory: modalControllerStub },
        {
          provide: RegistrationServiceFacade,
          useFactory: registrationServiceFacadeStub
        }
      ]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`horizontalFields has default value`, () => {
    expect(component.horizontalFields).toEqual([]);
  });

  it(`formFields has default value`, () => {
    expect(component.formFields).toEqual([]);
  });

  it(`passwordValidators has default value`, () => {
    expect(component.passwordValidators).toEqual([]);
  });

  it(`allFields has default value`, () => {
    expect(component.allFields).toEqual([]);
  });

  describe('submitRegistration', () => {
    it('makes expected calls', () => {
      const formGroupStub: FormGroup = <any>{};
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const registrationServiceFacadeStub: RegistrationServiceFacade = fixture.debugElement.injector.get(
        RegistrationServiceFacade
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(toastServiceStub, 'showToast');
     jest.spyOn(registrationServiceFacadeStub, 'submit');
     jest.spyOn(registrationServiceFacadeStub, 'getData');
      component.submitRegistration(formGroupStub);
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
      expect(registrationServiceFacadeStub.submit).toHaveBeenCalled();
      expect(registrationServiceFacadeStub.getData).toHaveBeenCalled();
    });
  });

  describe('onDecline', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.onDecline();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
