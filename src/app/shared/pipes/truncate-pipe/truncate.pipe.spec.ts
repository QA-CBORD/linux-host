import { TestBed } from '@angular/core/testing';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TruncatePipe] });
    pipe = TestBed.inject(TruncatePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
