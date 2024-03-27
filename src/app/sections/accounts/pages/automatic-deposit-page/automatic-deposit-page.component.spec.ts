import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { firstValueFrom } from 'rxjs';
import { of } from 'rxjs';
import { DEPOSIT_FREQUENCY } from './auto-deposit.config';
import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';

describe('AutomaticDepositPageComponent', () => {
  let fixture: AutomaticDepositPageComponent;
  let fb,
    settingsFacadeService,
    route,
    depositService,
    autoDepositService,
    popoverCtrl,
    router,
    toastService,
    cdRef,
    loadingService,
    externalPaymentService,
    userFacadeService,
    translateService;

  beforeEach(() => {
    (fb = {}),
      (settingsFacadeService = {
        getSetting: jest.fn(() => {
          return of({
            category: 'deposit',
            contentMediaType: 200,
            description: 'Registered user deposit amounts to select from. Ignored if free-form amount entry allowed.',
            domain: 'get',
            id: '17f9bad2-c45a-4cef-8348-bccd6f1242d4',
            name: 'onetime_amounts',
            value:  '["25.00","50.00","100.00"]'
          } as SettingInfo);
        }),
      }),
      (route = {}),
      (depositService = {}),
      (autoDepositService = {}),
      (popoverCtrl = {}),
      (router = {}),
      (cdRef = {}),
      (externalPaymentService = {}),
      (userFacadeService = {}),
      (loadingService = {
        showSpinner: jest.fn(),
        closeSpinner: jest.fn(),
      },(translateService=>{}));
    fixture = new AutomaticDepositPageComponent(
      fb,
      settingsFacadeService,
      route,
      depositService,
      autoDepositService,
      popoverCtrl,
      router,
      toastService,
      cdRef,
      externalPaymentService,
      userFacadeService,
      loadingService,
      translateService
    );
  });

  describe('AutomaticDeposit', () => {
    it('Should retreive the list of amount', async () => {
      const amounts = await firstValueFrom(fixture.billMeAmounts$);
      expect(amounts.length).toBeGreaterThan(0);
    });
    it('Should have activeFrequency settled as week by default', async () => {
      expect(fixture.activeFrequency).toEqual(DEPOSIT_FREQUENCY.week);
    });
  });
});
