import { of } from 'rxjs';
import { DepositPageComponent } from './deposit-page.component';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ExternalPaymentService } from '@core/service/external-payment/external-payment.service';
import { CommonService } from '@shared/index';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { AppRateService } from '@shared/services/app-rate/app-rate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DepositModule } from './deposit.module';
import { Storage } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';

describe('DepositPageComponent', () => {
  let component: DepositPageComponent;
  let fixture: ComponentFixture<DepositPageComponent>;

  beforeEach(async () => {
    const fb = new FormBuilder();
    const orderingService = {};
    const commonService = {
      getString: jest.fn(() => {
        return 'test';
      }),
    };
    const depositService = {
      getSettingByName: jest.fn().mockReturnValue({
        id: '13cba56e-d78e-4c55-9f04-d73037ebcdea',
        name: 'allow_freeform_onetime_amounts',
        domain: 'get',
        category: 'deposit',
        contentMediaType: 3,
        value: '[1,2]',
        description: 'Whether free-form amount entry is allowed for registered users.',
      }),
      settings$: of([
        {
          name: 'test',
          value: '1',
          category: 'cat',
        } as SettingInfo,
        {
          name: 'test2',
          value: '3',
          category: 'cat 2',
        } as SettingInfo,
      ] as SettingInfo[]),
      accounts$: of([]),
      calculateDepositFee: jest.fn().mockReturnValue(of(42)),
      getUserAccounts: jest.fn().mockReturnValue(of([])),
      filterAccountsByPaymentSystem: jest.fn().mockReturnValue([]),
      filterCreditCardDestAccounts: jest.fn().mockReturnValue([]),
      filterBillmeDestAccounts: jest.fn().mockReturnValue([]),
      souceAccForBillmeDeposit: jest.fn().mockReturnValue(of({})),
    };
    const userFacadeService = {
      isApplePayEnabled$: jest.fn(() => {
        return of(true);
      }),
    };
    const externalPaymentService = {};
    const cdRef = {};
    const modalController = {};
    const toastService = {};
    const popoverCtrl = {
      create: jest.fn(),
    };
    const appRateService = {
      evaluateToRequestRateApp: jest.fn(),
    };
    const loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn(),
    };

    const storage = {
      clear: jest.fn(),
      ready: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DepositModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [DepositPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        UserFacadeService,
        { provide: Storage, useValue: storage },
        { provide: DepositService, useValue: depositService },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: ModalController, useValue: modalController },
        { provide: ToastService, useValue: toastService },
        { provide: LoadingService, useValue: loadingService },
        { provide: ChangeDetectorRef, useValue: cdRef },
        { provide: ExternalPaymentService, useValue: externalPaymentService },
        { provide: CommonService, useValue: commonService },
        { provide: OrderingService, useValue: orderingService },
        { provide: AppRateService, useValue: appRateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
