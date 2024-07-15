import { TestBed } from '@angular/core/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import { Settings } from '../../../app.global';
import { AccountService } from './accounts.service';

describe('AccountService', () => {
  let service: AccountService;
  let commerceApiService: CommerceApiService;
  let contentStringsFacadeService: ContentStringsFacadeService;
  let settingsFacadeService: SettingsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        {
          provide: CommerceApiService,
          useValue: { getUserAccounts: jest.fn() },
        },
        {
          provide: ContentStringsFacadeService,
          useValue: { retrieveContentStringListByRequest: jest.fn(), fetchContentString$: jest.fn() },
        },
        {
          provide: SettingsFacadeService,
          useValue: { getSettings: jest.fn() },
        },
      ],
    });

    service = TestBed.inject(AccountService);
    commerceApiService = TestBed.inject(CommerceApiService);
    contentStringsFacadeService = TestBed.inject(ContentStringsFacadeService);
    settingsFacadeService = TestBed.inject(SettingsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserAccounts', () => {
    it('should call commerceApiService.getUserAccounts and set the accounts', () => {
      const accounts = [
        { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1 },
        { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2 },
      ] as UserAccount[];
      const getUserAccountsSpy = jest.spyOn(commerceApiService, 'getUserAccounts').mockReturnValue(of(accounts));
      const setAccountsSpy = jest.spyOn(service['_accounts$'], 'next');

      service.getUserAccounts().subscribe();

      expect(getUserAccountsSpy).toHaveBeenCalled();
      expect(setAccountsSpy).toHaveBeenCalledWith(accounts);
    });
  });

  describe('getUserSettings', () => {
    it('should call settingsFacadeService.getSettings and set the settings', () => {
      const settings = [
        { name: Settings.Setting.ADDRESS_RESTRICTION, value: 'Value 1' },
        { name: Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED, value: 'Value 2' },
      ];
      const getSettingsSpy = jest.spyOn(settingsFacadeService, 'getSettings').mockReturnValue(of(settings));
      const setSettingsSpy = jest.spyOn(service['_settings$'], 'next');

      service
        .getUserSettings([Settings.Setting.ADDRESS_RESTRICTION, Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED])
        .subscribe();

      expect(getSettingsSpy).toHaveBeenCalledWith([
        Settings.Setting.ADDRESS_RESTRICTION,
        Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED,
      ]);
      expect(setSettingsSpy).toHaveBeenCalledWith(settings);
    });
  });

  it('should return accounts as Observable', async () => {
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1 },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2 },
    ] as UserAccount[];
    service.accounts$['_accounts$'] = of(accounts);

    const result = service.accounts$;
    expect(result).toBeInstanceOf(Observable);
  });

  it('should return settings as Observable', () => {
    const settings: SettingInfo[] = [
      { name: 'Setting 1', value: 'Value 1' },
      { name: 'Setting 2', value: 'Value 2' },
    ];
    service._settings$['_settings$'] = of(settings);

    const result: Observable<SettingInfo[]> = service._settings$;

    expect(result).toBeInstanceOf(Observable);
  });

  it('should return the account with the matching ID', async () => {
    const accountId = '123';
    const account: UserAccount = {
      id: accountId,
      paymentSystemId: '1',
      accountDisplayName: 'John Doe',
      paymentSystemType: 1,
      accountTender: 'test',
      accountType: 1,
      balance: 1,
      billingAddressId: '1',
      userId: '2',
      isActive: true,
      depositAccepted: true,
      expirationMonth: 'January',
      expirationYear: '2019',
      institutionId: '1234',
      lastFour: '345',
      nameOnMedia: 'Test',
    };
    const accounts$ = new BehaviorSubject<UserAccount[]>([account]);
    jest.spyOn(service, 'accounts$', 'get').mockReturnValue(accounts$);

    const result = await firstValueFrom(service.getAccountById(accountId));

    expect(result).toEqual(account);
  });

  it('should return undefined if no account matches the ID', async () => {
    const accountId = '123';
    const accounts$ = new BehaviorSubject<UserAccount[]>([]);
    jest.spyOn(service, 'accounts$', 'get').mockReturnValue(accounts$);

    const result = await firstValueFrom(service.getAccountById(accountId));

    expect(result).toBeUndefined();
  });

  it('should return the filtered content strings', () => {
    const names = ['string1', 'string2', 'string3'];
    const contentString = {
      string1: 'Value 1',
      string2: 'Value 2',
      string4: 'Value 4',
    };

    service['contentString'] = contentString;

    const expectedResult = {
      string1: 'Value 1',
      string2: 'Value 2',
    };

    const result = service.getContentStrings(names);

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty object when no content strings match', () => {
    const names = ['string4', 'string5', 'string6'];
    const contentString = {
      string1: 'Value 1',
      string2: 'Value 2',
    };

    service['contentString'] = contentString;

    const expectedResult = {};

    const result = service.getContentStrings(names);

    expect(result).toEqual(expectedResult);
  });

  it('should return the combined content strings', async () => {
    const contentString1: ContentStringInfo = {
      name: 'string1',
      value: 'Value 1',
      domain: 'Test',
      category: 'Test',
      id: 'Test',
      description: 'Test',
      contentMediaType: 1,
      locale: 'us',
    };
    const contentString2: ContentStringInfo = {
      name: 'string2',
      value: 'Value 2',
      domain: 'Test',
      category: 'Test',
      id: 'Test',
      description: 'Test',
      contentMediaType: 1,
      locale: 'us',
    };
    const contentString3: ContentStringInfo = {
      name: 'string3',
      value: 'Value 3',
      domain: 'Test',
      category: 'Test',
      id: 'Test',
      description: 'Test',
      contentMediaType: 1,
      locale: 'us',
    };

    jest
      .spyOn(contentStringsFacadeService, 'retrieveContentStringListByRequest')
      .mockReturnValue(of([contentString1, contentString2]));
    jest.spyOn(contentStringsFacadeService, 'fetchContentString$').mockReturnValue(of(contentString3));

    const result = await firstValueFrom(service.initContentStringsList());
    expect(result.length).toEqual(5);
  });

  it('should return the content value by name', () => {
    const contentString = {
      string1: 'Value 1',
      string2: 'Value 2',
    };
    service['contentString'] = contentString;

    const result1 = service.getContentValueByName('string1');
    const result2 = service.getContentValueByName('string2');
    const result3 = service.getContentValueByName('string3');

    expect(result1).toEqual('Value 1');
    expect(result2).toEqual('Value 2');
    expect(result3).toEqual('');
  });

  it('should return the setting by name', () => {
    const settings = [
      { name: 'setting1', value: 'Value 1' },
      { name: 'setting2', value: 'Value 2' },
    ];

    const result1 = service.getSettingByName(settings, 'setting1');
    const result2 = service.getSettingByName(settings, 'setting2');
    const result3 = service.getSettingByName(settings, 'setting3');

    expect(result1).toEqual({ name: 'setting1', value: 'Value 1' });
    expect(result2).toEqual({ name: 'setting2', value: 'Value 2' });
    expect(result3).toBeUndefined();
  });

  it('should filter accounts by display tenders', async () => {
    const settingsValue = ['tender1', 'tender2'];
    const settings: SettingInfo[] = [];
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1, accountTender: 'tender1' },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2, accountTender: 'tender2' },
    ] as UserAccount[];

    jest.spyOn(service, 'getSettingByName').mockReturnValue({ value: JSON.stringify(settingsValue) } as SettingInfo);
    jest.spyOn(service, 'getSettingByName').mockReturnValue({ value: JSON.stringify(settingsValue) } as SettingInfo);
    service.settings$['setting$'] = of(settings);
    service.accounts$['_accounts$'] = of(accounts);

    const results = await firstValueFrom(service.getAccountsFilteredByDepositTenders());

    expect(results.length).toEqual(0);
  });

  it('should filter accounts by display tenders', async () => {
    const settings: SettingInfo[] = [
      { name: 'displayTenders', value: 'tender1' },
      { name: 'displayTenders', value: 'tender2' },
    ];
    jest.spyOn(settingsFacadeService, 'getSettings').mockReturnValue(of(settings));
    jest.spyOn(service, 'getSettingByName').mockReturnValue(settings[0]);
    jest.spyOn(service, 'transformStringToArray').mockReturnValue([settings[0]]);
    const result = await firstValueFrom(service.getAccountsFilteredByDisplayTenders());

    expect(result.length).toEqual(0);
  });
});
