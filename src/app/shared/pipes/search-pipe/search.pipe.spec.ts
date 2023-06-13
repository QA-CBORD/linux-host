import { TestBed } from '@angular/core/testing';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SearchPipe] });
    pipe = TestBed.inject(SearchPipe);
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
