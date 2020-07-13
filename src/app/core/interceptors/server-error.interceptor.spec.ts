import { ServerError } from './server-error.interceptor';

describe('ServerError', () => {
  it('should create an instance', () => {
    expect(new ServerError(null)).toBeTruthy();
  });
});
