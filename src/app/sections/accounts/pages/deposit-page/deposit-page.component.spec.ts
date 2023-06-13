import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { CommonService } from '@shared/services/common.service';
import { DepositPageComponent } from './deposit-page.component';

describe('DepositPageComponent', () => {
  let component: DepositPageComponent;
  let fixture: ComponentFixture<DepositPageComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({
      detectChanges: () => ({}),
      markForCheck: () => ({})
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const modalControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const depositServiceStub = () => ({
      settings$: { pipe: () => ({ subscribe: f => f({}) }) },
      calculateDepositFee: (id, id1, amount) => ({}),
      getUserAccounts: () => ({}),
      accounts$: { pipe: () => ({}) },
      deposit: (id, id1, amount, value) => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      filterAccountsByPaymentSystem: accounts => ({}),
      filterCreditCardDestAccounts: (tendersId, accounts) => ({}),
      filterBillmeDestAccounts: (billmeMappingArr, accounts) => ({}),
      sourceAccForBillmeDeposit: (selectedAccount, billmeMappingArr) => ({}),
      getSettingByName: (settings, property) => ({ value: {} })
    });
    const userFacadeServiceStub = () => ({ isApplePayEnabled$: () => ({}) });
    const externalPaymentServiceStub = () => ({
      payWithApplePay: (dEPOSITS_WITH_APPLE_PAY, object) => ({
        then: () => ({ catch: () => ({ finally: () => ({}) }) })
      }),
      addUSAePayCreditCard: () => ({})
    });
    const toastServiceStub = () => ({ showError: message => ({}) });
    const accessibilityServiceStub = () => ({
      isVoiceOverClick$: { then: () => ({}) }
    });
    const commonServiceStub = () => ({ getString: deposit => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepositPageComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: Router, useFactory: routerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: DepositService, useFactory: depositServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: ExternalPaymentService,
          useFactory: externalPaymentServiceStub
        },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AccessibilityService, useFactory: accessibilityServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DepositPageComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`focusLine has default value`, () => {
    expect(component.focusLine).toEqual(false);
  });

  it(`isDepositing has default value`, () => {
    expect(component.isDepositing).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = fixture.debugElement.injector.get(
        UserFacadeService
      );
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(userFacadeServiceStub, 'isApplePayEnabled$').and.callThrough();
      spyOn(commonServiceStub, 'getString').and.callThrough();
      component.ngOnInit();
      expect(userFacadeServiceStub.isApplePayEnabled$).toHaveBeenCalled();
      expect(commonServiceStub.getString).toHaveBeenCalled();
    });
  });

  describe('onFormSubmit', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const depositServiceStub: DepositService = fixture.debugElement.injector.get(
        DepositService
      );
      const externalPaymentServiceStub: ExternalPaymentService = fixture.debugElement.injector.get(
        ExternalPaymentService
      );
      spyOn(component, 'confirmationDepositPopover').and.callThrough();
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(depositServiceStub, 'calculateDepositFee').and.callThrough();
      spyOn(externalPaymentServiceStub, 'payWithApplePay').and.callThrough();
      component.onFormSubmit();
      expect(component.confirmationDepositPopover).toHaveBeenCalled();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(depositServiceStub.calculateDepositFee).toHaveBeenCalled();
      expect(externalPaymentServiceStub.payWithApplePay).toHaveBeenCalled();
    });
  });

  describe('setFormValidators', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const depositServiceStub: DepositService = fixture.debugElement.injector.get(
        DepositService
      );
      const externalPaymentServiceStub: ExternalPaymentService = fixture.debugElement.injector.get(
        ExternalPaymentService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(depositServiceStub, 'getUserAccounts').and.callThrough();
      spyOn(
        externalPaymentServiceStub,
        'addUSAePayCreditCard'
      ).and.callThrough();
      component.setFormValidators();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(depositServiceStub.getUserAccounts).toHaveBeenCalled();
      expect(
        externalPaymentServiceStub.addUSAePayCreditCard
      ).toHaveBeenCalled();
    });
  });
});
