import { OrderByPipe } from './order-by.pipe';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });
});
