import { TestBed } from '@angular/core/testing';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { TypeMessagePipe } from './type-message.pipe';

describe('TypeMessagePipe', () => {
  let pipe: TypeMessagePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TypeMessagePipe] });
    pipe = TestBed.inject(TypeMessagePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args = {} as any;
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
