import { TransactionActionPipe } from './transaction-action.pipe';

describe('TransactionActionPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionActionPipe();
    expect(pipe).toBeTruthy();
  });
});
