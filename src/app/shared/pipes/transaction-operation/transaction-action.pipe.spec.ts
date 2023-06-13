import { TestBed } from '@angular/core/testing';
import { TransactionActionPipe } from './transaction-action.pipe';

describe('TransactionActionPipe', () => {
  let pipe: TransactionActionPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TransactionActionPipe] });
    pipe = TestBed.inject(TransactionActionPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
