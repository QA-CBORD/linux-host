import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { PasswordChangeComponent } from './password-change.component';

describe('PasswordChangeComponent', () => {
  let component: PasswordChangeComponent;
  let fixture: ComponentFixture<PasswordChangeComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const userFacadeServiceStub = () => ({
      changePassword$: (value, value1) => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const modalControllerStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PasswordChangeComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: ModalController, useFactory: modalControllerStub }
      ]
    });
    fixture = TestBed.createComponent(PasswordChangeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(false);
  });

  it(`validators has default value`, () => {
    expect(component.validators).toEqual([]);
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
      component.ionViewWillEnter();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
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

  describe('close', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
     jest.spyOn(modalControllerStub, 'dismiss');
      component.close();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
