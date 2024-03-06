import { TestBed } from '@angular/core/testing';
import { AccountTypeResolverPipe } from './account-type-resolver.pipe';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { AccountDisplayPipe } from '@sections/accounts/shared/pipes/account-display/account-display.pipe';
import { CurrencyPipe } from '@angular/common';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreditCardTypePipe } from '@sections/accounts/shared/pipes/credit-card-type';

describe('AccountTypeResolverPipe', () => {
  let pipe: AccountTypeResolverPipe;
  let priceUnitsResolverPipe: PriceUnitsResolverPipe;
  let accountDisplayPipe: AccountDisplayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountTypeResolverPipe,
        PriceUnitsResolverPipe,
        AccountDisplayPipe,
        CurrencyPipe,
        OrderingService,
        ContentStringsFacadeService,
        CreditCardTypePipe
      ],
    });
    pipe = TestBed.inject(AccountTypeResolverPipe);
    priceUnitsResolverPipe = TestBed.inject(PriceUnitsResolverPipe);
    accountDisplayPipe = TestBed.inject(AccountDisplayPipe);
  });

  it('should return empty string if account is null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return the result of accountDisplayPipe.transform if it is not null or undefined', () => {
    const account = { accountDisplayName: 'Test Account', balance: 100 };
    jest.spyOn(accountDisplayPipe, 'transform').mockReturnValue('Transformed Account');

    expect(pipe.transform(account)).toBe('Transformed Account');
  });

  it('should return accountDisplayName if balance is null or undefined', () => {
    const account = { accountDisplayName: 'Test Account', balance: null };
    jest.spyOn(accountDisplayPipe, 'transform').mockReturnValue(null);

    expect(pipe.transform(account)).toBe('Test Account');
  });

  it('should return accountDisplayName and transformed balance if balance is not null or undefined', () => {
    const account = { accountDisplayName: 'Test Account', balance: 100 };
    jest.spyOn(accountDisplayPipe, 'transform').mockReturnValue(null);
    jest.spyOn(priceUnitsResolverPipe, 'transform').mockReturnValue('100 Units');

    expect(pipe.transform(account)).toBe('Test Account (100 Units)');
  });
});
