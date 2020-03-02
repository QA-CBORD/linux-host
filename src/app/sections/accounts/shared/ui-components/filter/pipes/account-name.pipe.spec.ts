import { AccountNamePipe } from './account-name.pipe';

describe('AccountNamePipe', () => {
  it('create an instance', () => {
    const pipe = new AccountNamePipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
