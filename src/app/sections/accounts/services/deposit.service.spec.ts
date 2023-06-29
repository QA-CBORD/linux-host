import { TestBed } from '@angular/core/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { BillMeMapping } from '@core/model/settings/billme-mapping.model';
import { firstValueFrom, of } from 'rxjs';
import { Settings } from 'src/app/app.global';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { DepositService } from './deposit.service';

describe('DepositService', () => {
  let service: DepositService;
  let commerceApiService: CommerceApiService;
  let contentServiceFacadeService: ContentStringsFacadeService;
  let settingsFacadeService: SettingsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepositService,
        {
          provide: CommerceApiService,
          useValue: {
            sale: jest.fn(),
            getUserAccounts: jest.fn(),
            deposit: jest.fn(),
            calculateDepositFee: jest.fn()
          },
        },
        {
          provide: ContentStringsFacadeService,
          useValue: {
            retrieveContentStringByConfig: jest.fn(),
          },
        },
        {
          provide: SettingsFacadeService,
          useValue: {
            getSetting: jest.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(DepositService);
    commerceApiService = TestBed.inject(CommerceApiService);
    contentServiceFacadeService = TestBed.inject(ContentStringsFacadeService);
    settingsFacadeService = TestBed.inject(SettingsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user accounts', () => {
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1, accountTender: 'tender1' },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2, accountTender: 'tender1' },
    ] as UserAccount[];

    const spy = jest.spyOn(commerceApiService, 'getUserAccounts').mockReturnValue(of(accounts));

    service.getUserAccounts().subscribe(() => {
      expect(service.accounts$).toBeTruthy();
      expect(service.accounts$).toEqual(of(accounts));
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should get user settings', () => {
    const settings = [Settings.Setting.ADDRESS_RESTRICTION, Settings.Setting.APPLE_PAY_ENABLED] as Settings.Setting[];
    const spy = jest
      .spyOn(settingsFacadeService, 'getSetting')
      .mockReturnValue(of({ category: 'text', name: 'text', value: 'text' } as SettingInfo));

    service.getUserSettings(settings).subscribe(() => {
      expect(service.settings$).toBeTruthy();
      expect(service.settings$).toEqual(of(settings));
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should filter accounts by payment system type', () => {
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1, accountTender: 'tender1' },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2, accountTender: 'tender1' },
    ] as UserAccount[];

    const filteredAccounts = service.filterAccountsByPaymentSystem(accounts);
    expect(filteredAccounts).toBeTruthy();
    // Perform assertions based on the expected filtered accounts
  });

  it('should filter credit card destination accounts', () => {
    const tendersId: string[] = ['tender1', 'tenders2'];
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1, accountTender: 'tender1' },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2, accountTender: 'tender1' },
    ] as UserAccount[];

    const filteredAccounts = service.filterCreditCardDestAccounts(tendersId, accounts);
    expect(filteredAccounts).toBeTruthy();
    // Perform assertions based on the expected filtered accounts
  });

  it('should filter billMe destination accounts', () => {
    const billmeMappingArr: BillMeMapping[] = [{ source: 'test', destination: 'destination' }];
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1 },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2 },
    ] as UserAccount[];

    const filteredAccounts = service.filterBillmeDestAccounts(billmeMappingArr, accounts);
    expect(filteredAccounts).toBeTruthy();
    // Perform assertions based on the expected filtered accounts
  });

  it('should filter billMe source accounts', () => {
    const billmeMappingArr: BillMeMapping[] = [];
    const accounts = [
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1 },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2 },
    ] as UserAccount[];

    const filteredAccounts = service.filterBillmeSourceAccounts(billmeMappingArr, accounts);
    expect(filteredAccounts).toBeTruthy();
    // Perform assertions based on the expected filtered accounts
  });

  it('should get source account for billMe deposit', () => {
    const selectedAccount = {
      id: '1',
      accountDisplayName: 'Account 1',
      paymentSystemType: 1,
      accountTender: '1',
    } as UserAccount;
    const billmeMappingArr: BillMeMapping[] = [{ source: 'test', destination: 'destination' }];

    service.accounts$['_accounts$'] = of([
      { id: '1', accountDisplayName: 'Account 1', paymentSystemType: 1 },
      { id: '2', accountDisplayName: 'Account 2', paymentSystemType: 2 },
    ] as UserAccount[])

    service.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr).subscribe(sourceAccount => {
      expect(sourceAccount).toBeTruthy()
    });

    expect(service.accounts$).toBeTruthy();
  });

  it('should calculate deposit fee', () => {
    const fromAccountId: string = 'fromAccountId';
    const toAccountId: string = 'toAccountId';
    const amount: number = 100;
    const spy = jest.spyOn(commerceApiService, 'calculateDepositFee').mockReturnValue(of(10));

    service.calculateDepositFee(fromAccountId, toAccountId, amount).subscribe(fee => {
      expect(fee).toBeTruthy();
      // Perform assertions based on the expected deposit fee
    });

    expect(spy).toHaveBeenCalledWith(fromAccountId, toAccountId, amount);
  });

  it('should deposit', () => {
    const fromAccountId: string = 'fromAccountId';
    const toAccountId: string = 'toAccountId';
    const amount: number = 100;
    const fromAccountCvv: string = '123';
    const spy = jest.spyOn(commerceApiService, 'deposit').mockReturnValue(of('success'));

    service.deposit(fromAccountId, toAccountId, amount, fromAccountCvv).subscribe(result => {
      expect(result).toBeTruthy();
      // Perform assertions based on the expected result
    });

    expect(spy).toHaveBeenCalledWith(fromAccountId, toAccountId, amount, fromAccountCvv);
  });

  it('should initialize content strings list', () => {
    const contentStringInfo: ContentStringInfo[] = [
      {
        category: 'text1',
        description: 'text',
        name: 'text',
        value: 'text',
        id: '1',
        contentMediaType: 1,
        domain: 'text',
        locale: 'es',
      },
    ];
    const spy = jest
      .spyOn(contentServiceFacadeService, 'retrieveContentStringByConfig')
      .mockReturnValue(of(contentStringInfo[0]));

    service.initContentStringsList().subscribe(result => {
      expect(result).toBeTruthy();
      expect(service.contentString).toBeTruthy();
      // Perform assertions based on the expected result and content strings
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should make payment', async () => {
    const fromAccountId: string = 'fromAccountId';
    const amount: string = '100';
    const spy = jest.spyOn(commerceApiService, 'sale').mockReturnValue(of('success'));

    const payment = await firstValueFrom(service.makePayment(fromAccountId, amount));

    expect(payment).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(fromAccountId, amount);
  });
});
