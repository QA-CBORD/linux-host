import { AmountLabelControlPipe } from './amount-label-control.pipe';

describe('AmountLabelControlPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountLabelControlPipe(null);
    expect(pipe).toBeTruthy();
  });
});
