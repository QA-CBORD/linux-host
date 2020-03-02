import { PriceUnitsResolverPipe } from './price-units-resolver.pipe';

describe('PriceUnitsResolverPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceUnitsResolverPipe(null);
    expect(pipe).toBeTruthy();
  });
});
