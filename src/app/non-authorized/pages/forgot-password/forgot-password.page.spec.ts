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
     jest.spyOn(messageProxyStub, 'get');
      component.ngOnInit();
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
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
     jest.spyOn(navControllerStub, 'back');
      component.back();
      expect(navControllerStub.back).toHaveBeenCalled();
    });
  });
});
