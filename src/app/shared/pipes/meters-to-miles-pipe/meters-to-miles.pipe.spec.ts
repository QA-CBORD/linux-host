import { TestBed } from '@angular/core/testing';
import { MetersToMilesPipe } from './meters-to-miles.pipe';

describe('MetersToMilesPipe', () => {
  let pipe: MetersToMilesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MetersToMilesPipe] });
    pipe = TestBed.inject(MetersToMilesPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});