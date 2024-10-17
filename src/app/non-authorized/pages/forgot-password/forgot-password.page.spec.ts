import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NotificationFacadeService } from '@core/facades/notification/notification-facade.service';
import { NavController } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { ForgotPasswordPage, TIMEOUTS } from './forgot-password.page';
import { TIMEOUT } from 'dns';
import { A11_TIMEOUTS } from '@shared/model/generic-constants';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  const notificationFacadeService = {
    resetPasswordRequest: jest.fn(),
  };
  const toastService = {
    showError: jest.fn(),
  };
  beforeEach(() => {
    jest.useFakeTimers();
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });

    const navControllerStub = () => ({ back: () => ({}) });
    const messageProxyStub = () => ({ get: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ForgotPasswordPage],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        {
          provide: NotificationFacadeService,
          useValue: notificationFacadeService,
        },
        { provide: NavController, useFactory: navControllerStub },
        { provide: ToastService, useValue: toastService },
        { provide: MessageProxy, useFactory: messageProxyStub },
      ],
    });
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    component.forgotPasswordForm = {
      get: jest.fn().mockReturnValue({ value: 'test@example.com' }),
    } as any;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const messageProxyStub: MessageProxy = fixture.debugElement.injector.get(MessageProxy);
      const mockElement: HTMLElement = {
        focus: jest.fn(),
      } as any;
      const focusSpy = jest.spyOn(mockElement, 'focus');
      jest.spyOn(messageProxyStub, 'get');
      jest.spyOn(document, 'getElementById').mockImplementation(() => mockElement);
      component.ngOnInit();

      jest.runAllTimers();
      expect(focusSpy).toHaveBeenCalled();
      expect(messageProxyStub.get).toHaveBeenCalled();
    });
  });

  describe('redirect', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      jest.spyOn(routerStub, 'navigate');
      component.redirect();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('redirect2', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      jest.spyOn(routerStub, 'navigate');
      component.redirect2();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('back', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(NavController);
      jest.spyOn(navControllerStub, 'back');
      component.back();
      expect(navControllerStub.back).toHaveBeenCalled();
    });
  });
  it('should handle reset password request and set state', async () => {
    const resetPasswordRequestSpy = jest
      .spyOn(notificationFacadeService, 'resetPasswordRequest')
      .mockResolvedValue(true);
    const showErrorSpy = jest.spyOn(toastService, 'showError');

    // Mock document.getElementById to return an object with a focus method
    const mockElement: HTMLElement = {
      focus: jest.fn(),
    } as any;
    jest.spyOn(document, 'getElementById').mockImplementation(() => mockElement);
    const focusSpy = jest.spyOn(mockElement, 'focus');

    await component.submit();

    expect(resetPasswordRequestSpy).toHaveBeenCalledWith(component.email.value);
    expect(component.resetSent).toBe(true);

    // Run all timers
    jest.runAllTimers();

    expect(focusSpy).toHaveBeenCalled();
    expect(showErrorSpy).not.toHaveBeenCalled();

    component.setSendEmailState();

    expect(component.resetSent).toBe(false);
  });

  it('should return the email control', () => {
    const emailControl = component.email;

    expect(emailControl.value).toBe('test@example.com');
  });
  it('should handle failed reset password request', async () => {
    const errorMessage = 'Could not sent the reset email. Please try again in a few minutes.';
    const resetPasswordRequestSpy = jest
      .spyOn(notificationFacadeService, 'resetPasswordRequest')
      .mockResolvedValue(false);
    const showErrorSpy = jest.spyOn(toastService, 'showError');

    await component.submit();

    expect(resetPasswordRequestSpy).toHaveBeenCalledWith(component.email.value);
    expect(component.resetSent).toBeFalsy();
    expect(showErrorSpy).toHaveBeenCalledWith({ message: errorMessage });
  });
  it('should handle error during reset password request', async () => {
    const errorMessage = 'Could not sent the reset email. Please try again in a few minutes.';
    const resetPasswordRequestSpy = jest
      .spyOn(notificationFacadeService, 'resetPasswordRequest')
      .mockRejectedValue(new Error());
    const showErrorSpy = jest.spyOn(toastService, 'showError');

    await component.submit();

    expect(resetPasswordRequestSpy).toHaveBeenCalledWith(component.email.value);
    expect(component.resetSent).toBeFalsy();
    expect(showErrorSpy).toHaveBeenCalledWith({ message: errorMessage });
  });
});
