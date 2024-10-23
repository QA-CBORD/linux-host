import { AddressSubHeaderFormatPipe } from './address-subheader-format-pipe.pipe';
import { AddressInfo } from '@core/model/address/address-info';
import { getAddressSubHeader } from '@core/utils/address-helper';

jest.mock('@core/utils/address-helper');

describe('AddressSubHeaderFormatPipe', () => {
  let pipe: AddressSubHeaderFormatPipe;

  beforeEach(() => {
    pipe = new AddressSubHeaderFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid AddressInfo object', () => {
    const address: AddressInfo = {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    } as any as AddressInfo;
    (getAddressSubHeader as jest.Mock).mockReturnValue('123 Main St, Anytown, CA 12345');
    const result = pipe.transform(address);
    expect(result).toBe('123 Main St, Anytown, CA 12345');
    expect(getAddressSubHeader).toHaveBeenCalledWith(address);
  });

  it('should return "Address misconfigured =(" for null address', () => {
    const result = pipe.transform(null);
    expect(result).toBe('Address misconfigured =(');
  });

  it('should return "Address misconfigured =(" for undefined address', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('Address misconfigured =(');
  });

  it('should transform an AddressInfo object with missing properties', () => {
    const address = {
      street: '123 Main St',
      city: 'Anytown',
      state: '',
      zip: '',
    } as any as AddressInfo;
    (getAddressSubHeader as jest.Mock).mockReturnValue('123 Main St, Anytown');
    const result = pipe.transform(address);
    expect(result).toBe('123 Main St, Anytown');
    expect(getAddressSubHeader).toHaveBeenCalledWith(address);
  });
});
