import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PopoverController } from '@ionic/angular';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { GuestAddFundsComponent } from './guest-add-funds.component';

describe('GuestAddFundsComponent', () => {
  let component: GuestAddFundsComponent;
  let fixture: ComponentFixture<GuestAddFundsComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({
      detectChanges: () => ({}),
      markForCheck: () => ({})
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const activatedRouteStub = () => ({ data: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const externalPaymentServiceStub = () => ({
      addUSAePayCreditCard: () => ({})
    });
    const loadingServiceStub = () => ({
      closeSpinner: () => ({}),
      showSpinner: () => ({})
    });
    const modalsServiceStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const toastServiceStub = () => ({});
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const depositServiceStub = () => ({
      calculateDepositFee: (id, id1, amount) => ({ pipe: () => ({}) })
    });
    const guestDepositsServiceStub = () => ({
      guestDeposit: (id, id1, amount) => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      guestAccounts: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GuestAddFundsComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: ExternalPaymentService,
          useFactory: externalPaymentServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ModalsService, useFactory: modalsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: DepositService, useFactory: depositServiceStub },
        { provide: GuestDepositsService, useFactory: guestDepositsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(GuestAddFundsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`focusLine has default value`, () => {
    expect(component.focusLine).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'initForm');
      component.ngOnInit();
      expect(component.initForm).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(component, 'setFormValidators');
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.ionViewWillEnter();
      expect(component.setFormValidators).toHaveBeenCalled();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('initForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
     jest.spyOn(formBuilderStub, 'group');
      component.initForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('onSubmitDeposit', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const depositServiceStub: DepositService = fixture.debugElement.injector.get(
        DepositService
      );
     jest.spyOn(component, 'confirmationDepositPopover');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(depositServiceStub, 'calculateDepositFee');
      component.onSubmitDeposit();
      expect(component.confirmationDepositPopover).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(depositServiceStub.calculateDepositFee).toHaveBeenCalled();
    });
  });
});
