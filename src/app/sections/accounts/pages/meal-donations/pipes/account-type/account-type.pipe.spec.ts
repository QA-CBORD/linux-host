import { AccountTypePipe } from './account-type.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new AccountTypePipe();
    expect(pipe).toBeTruthy();
  });
});
