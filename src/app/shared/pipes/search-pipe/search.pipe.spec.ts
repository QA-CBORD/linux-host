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

  it('should check for falsy values', () => {
    expect(pipe.transform(null, '').length).toBe(0);
  });
});
