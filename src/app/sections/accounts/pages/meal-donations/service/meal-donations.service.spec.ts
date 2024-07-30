import { TestBed } from '@angular/core/testing';
import { MealDonationsService } from './meal-donations.service';
import { Observable, map, of } from 'rxjs';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { MEAL_CONTENT_STRINGS } from '../meal-donation.config';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { Settings } from '../../../../../app.global';
import { UserAccount } from '@core/model/account/account.model';
import { PAYMENT_SYSTEM_TYPE } from '@sections/ordering/ordering.config';

describe('MealDonationsServie', () => {
  let service: MealDonationsService;

  const mealDonationsSettings$ = [{ name: 'MEAL_DONATIONS_TENDERS', value: '1,2' }];
  const accounts$: UserAccount[] = [
    {
      accountDisplayName: '',
      accountTender: '1',
      accountType: 0,
      balance: 0,
      billingAddressId: '',
      depositAccepted: false,
      expirationMonth: '',
      expirationYear: '',
      id: '1',
      institutionId: '',
      isActive: false,
      lastFour: '',
      nameOnMedia: '',
      paymentSystemId: '',
      paymentSystemType: PAYMENT_SYSTEM_TYPE.OPCS,
      userId: '1',
    },
    {
      accountDisplayName: '',
      accountTender: '2',
      accountType: 0,
      balance: 0,
      billingAddressId: '',
      depositAccepted: false,
      expirationMonth: '',
      expirationYear: '',
      id: '2',
      institutionId: '',
      isActive: false,
      lastFour: '',
      nameOnMedia: '',
      paymentSystemId: '',
      paymentSystemType: PAYMENT_SYSTEM_TYPE.CSGOLD,
      userId: '1',
    },
  ];
  const settingsFacadeService = {
    getSetting: jest.fn().mockReturnValue(of({})),
  };
  const contentStringFacade = {
    fetchContentString$: jest.fn().mockReturnValue(of([])),
    fetchContentStrings$: jest.fn().mockReturnValue(of([])),
    getContentStringValue$: jest.fn().mockReturnValue(of('')),
  };
  const commerceApiService = {
    getUserAccounts: jest.fn().mockReturnValue(of([])),
    donate: jest.fn().mockReturnValue(of('donate')),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MealDonationsService,
        { provide: CommerceApiService, useValue: commerceApiService },
        { provide: SettingsFacadeService, useValue: settingsFacadeService },
        { provide: ContentStringsFacadeService, useValue: contentStringFacade },
      ],
    });
    service = TestBed.inject(MealDonationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchContentString$ with correct arguments', () => {
    const fetchSpy = jest.spyOn(contentStringFacade, 'fetchContentString$');
    const name = MEAL_CONTENT_STRINGS.amountToDonate;
    service.fetchMealsDonationContentStringByName$(name);
    expect(fetchSpy).toHaveBeenCalledWith(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.mealDonation,
      name
    );
  });
  it(' should call getContentStringValue$ with correct arguments', () => {
    const fetchSpy = jest.spyOn(contentStringFacade, 'getContentStringValue$');
    const name = MEAL_CONTENT_STRINGS.amountToDonate;
    service.getMealsDonationContentStringByName$(name);
    expect(fetchSpy).toHaveBeenCalledWith(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.mealDonation,
      name
    );
  });
  it('should call fetchMealsDonationContentStrings$ with correct arguments', () => {
    const fetchSpy = jest.spyOn(contentStringFacade, 'fetchContentStrings$');
    service.fetchMealsDonationContentStrings$();
    expect(fetchSpy).toHaveBeenCalledWith(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.mealDonation);
  });
  it('should call getUserAccounts and return correctly', () => {
    const getUserAccountsSpy = jest.spyOn(commerceApiService, 'getUserAccounts');
    service.getUserAccounts().subscribe(accounts => {
      expect(accounts).toEqual([]);
    });
    expect(getUserAccountsSpy).toHaveBeenCalled();
  });
  it('should return the correct setting by name', () => {
    const settings: SettingInfo[] = [
      { name: 'setting1', value: 'value1' },
      { name: 'setting2', value: 'value2' },
      { name: 'setting3', value: 'value3' },
    ];

    const result = service.getSettingByName(settings, 'setting2');

    expect(result).toEqual({ name: 'setting2', value: 'value2' });
  });

  it('should return undefined if no setting is found with the specified name', () => {
    const settings: SettingInfo[] = [
      { name: 'setting1', value: 'value1' },
      { name: 'setting2', value: 'value2' },
      { name: 'setting3', value: 'value3' },
    ];

    const result = service.getSettingByName(settings, 'setting4');

    expect(result).toBeUndefined();
  });

  it('should return user settings', () => {
    const settings = [
      Settings.Setting.APPLE_PAY_ENABLED,
      Settings.Setting.APPLE_WALLET_ENABLED,
      Settings.Setting.PUSH_NOTIFICATION_ENABLED,
    ];
    const getSettingSpy = jest.spyOn(settingsFacadeService, 'getSetting').mockReturnValue(of({}));
    service.getUserSettings(settings).subscribe(result => {
      expect(result).toEqual([{}, {}, {}]);
    });
    expect(getSettingSpy).toHaveBeenCalledTimes(3);
  });

  it('should return accounts filtered by meal donations tenders', () => {
    service['_settings$'].next(mealDonationsSettings$);
    service['_accounts$'].next(accounts$);

    service.getAccountsFilteredByMealsTenders().subscribe(result => {
      expect(result).toEqual([{ id: '1' /* other properties... */ }, { id: '2' /* other properties... */ }]);
    });
  });
  it('should call donate method of commerceApiService with correct arguments', () => {
    const accountId = 'testAccountId';
    const amount = '100';
    const result = 'Success';
    service.donate(accountId, amount).subscribe(res => {
      expect(res).toEqual(result);
    });

    expect(commerceApiService.donate).toHaveBeenCalledWith(accountId, amount);
  });
 
  it('should return empty array when isCashlessAccount is false', () => {
    const accountsId = ['1', '2'];
    const accounts = [
      { ...accounts$[0], paymentSystemType: 4 },
      { ...accounts$[2], paymentSystemType: 4 },
      { ...accounts$[3], paymentSystemType: 4 },
    ];

    const result = service['filterAccountsByTenders'](accountsId, accounts);

    expect(result).toEqual([]);
  });
});
