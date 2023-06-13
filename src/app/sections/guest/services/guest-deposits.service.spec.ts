import { TestBed } from '@angular/core/testing';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { ToastService } from '@core/service/toast/toast.service';
import { GuestDepositsService } from './guest-deposits.service';

describe('GuestDepositsService', () => {
  let service: GuestDepositsService;

  beforeEach(() => {
    const settingsFacadeServiceStub = () => ({
      getUserSettingNoCache: gUEST_DEPOSIT_RECIPIENTS => ({ pipe: () => ({}) }),
      saveUserSetting: (gUEST_DEPOSIT_RECIPIENTS, arg) => ({
        toPromise: () => ({}),
        pipe: () => ({})
      })
    });
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const userApiServiceStub = () => ({
      retrieveUserIdByCashlessFields: (id, sessionId, fields) => ({})
    });
    const institutionFacadeServiceStub = () => ({ cachedInstitutionInfo$: {} });
    const authFacadeServiceStub = () => ({
      getAuthSessionToken$: () => ({ pipe: () => ({ toPromise: () => ({}) }) }),
      isGuestUser: () => ({ pipe: () => ({}) })
    });
    const commerceApiServiceStub = () => ({
      retrieveAccountsByUser: userId => ({ pipe: () => ({}) }),
      retrieveDepositAccountsByUser: userId => ({ pipe: () => ({}) }),
      depositForUser: (userId, fromAccountId, toAccountId, amount) => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      providers: [
        GuestDepositsService,
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: UserApiService, useFactory: userApiServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        { provide: CommerceApiService, useFactory: commerceApiServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    service = TestBed.inject(GuestDepositsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getRecipientList', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(
        settingsFacadeServiceStub,
        'getUserSettingNoCache'
      ).and.callThrough();
      service.getRecipientList();
      expect(
        settingsFacadeServiceStub.getUserSettingNoCache
      ).toHaveBeenCalled();
    });
  });

  describe('guestAccounts', () => {
    it('makes expected calls', () => {
      const authFacadeServiceStub: AuthFacadeService = TestBed.inject(
        AuthFacadeService
      );
      const commerceApiServiceStub: CommerceApiService = TestBed.inject(
        CommerceApiService
      );
      spyOn(authFacadeServiceStub, 'isGuestUser').and.callThrough();
      spyOn(commerceApiServiceStub, 'retrieveAccountsByUser').and.callThrough();
      service.guestAccounts();
      expect(authFacadeServiceStub.isGuestUser).toHaveBeenCalled();
      expect(commerceApiServiceStub.retrieveAccountsByUser).toHaveBeenCalled();
    });
  });
});
