import { MerchantDistancePipe } from './merchant-distance.pipe';

describe('MerchantDistancePipe', () => {
  it('create an instance', () => {
    const pipe = new MerchantDistancePipe(null);
    expect(pipe).toBeTruthy();
  });
});
