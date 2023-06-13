import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NotificationFacadeService } from '@core/facades/notification/notification-facade.service';
import { NavController } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { ForgotPasswordPage } from './forgot-password.page';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const notificationFacadeServiceStub = () => ({
      resetPasswordRequest: value => ({
        then: () => ({ catch: () => ({ finally: () => ({}) }) })
      })
    });
    const navControllerStub = () => ({ back: () => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const messageProxyStub = () => ({ get: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ForgotPasswordPage],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        {
          provide: NotificationFacadeService,
          useFactory: notificationFacadeServiceStub
        },
        { provide: NavController, useFactory: navControllerStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: MessageProxy, useFactory: messageProxyStub }
      ]
    });
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const messageProxyStub: MessageProxy = fixture.debugElement.injector.get(
        MessageProxy
      );
      spyOn(messageProxyStub, 'get').and.callThrough();
      component.ngOnInit();
      expect(messageProxyStub.get).toHaveBeenCalled();
    });
  });

  describe('redirect', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.redirect();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('redirect2', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.redirect2();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('back', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'back').and.callThrough();
      component.back();
      expect(navControllerStub.back).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('makes expected calls', () => {
      const notificationFacadeServiceStub: NotificationFacadeService = fixture.debugElement.injector.get(
        NotificationFacadeService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      spyOn(
        notificationFacadeServiceStub,
        'resetPasswordRequest'
      ).and.callThrough();
      spyOn(toastServiceStub, 'showToast').and.callThrough();
      component.submit();
      expect(
        notificationFacadeServiceStub.resetPasswordRequest
      ).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
    });
  });
});
