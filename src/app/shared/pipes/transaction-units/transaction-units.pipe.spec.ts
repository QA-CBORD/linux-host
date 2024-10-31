import { TransactionUnitsPipe } from './transaction-units.pipe';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { ACCOUNT_TYPES, CONTENT_STRINGS } from '@sections/accounts/accounts.config';

describe('TransactionUnitsPipe', () => {
  let pipe: TransactionUnitsPipe;
  let accountServiceMock: jest.Mocked<AccountService>;

  beforeEach(() => {
    accountServiceMock = {
      getContentValueByName: jest.fn(),
    } as unknown as jest.Mocked<AccountService>;

    pipe = new TransactionUnitsPipe(accountServiceMock);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "no info" for null value', () => {
    const result = pipe.transform(null);
    expect(result).toBe('no info');
  });

  it('should transform a string value to a formatted dollar amount for charge account type', () => {
    const result = pipe.transform('1234.56', ACCOUNT_TYPES.charge);
    expect(result).toBe('$1,234.56');
  });

  it('should transform a number value to a formatted dollar amount for charge account type', () => {
    const result = pipe.transform(1234.56, ACCOUNT_TYPES.charge);
    expect(result).toBe('$1,234.56');
  });

  it('should transform a number value to a formatted dollar amount for decliningBalance account type', () => {
    const result = pipe.transform(1234.56, ACCOUNT_TYPES.decliningBalance);
    expect(result).toBe('$1,234.56');
  });

  it('should transform a number value to a meal count for meals account type', () => {
    accountServiceMock.getContentValueByName.mockReturnValueOnce('meal').mockReturnValueOnce('meals');
    const result = pipe.transform(1, ACCOUNT_TYPES.meals);
    expect(result).toBe('1 meal');
  });

  it('should transform a number value to a plural meal count for meals account type', () => {
    accountServiceMock.getContentValueByName.mockReturnValueOnce('meals');
    const result = pipe.transform(2, ACCOUNT_TYPES.meals);
    expect(result).toBe('2 meals');
  });
});
