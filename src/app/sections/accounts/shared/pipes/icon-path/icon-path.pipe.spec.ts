import { TestBed } from '@angular/core/testing';
import { IconPathPipe } from './icon-path.pipe';

describe('IconPathPipe', () => {
  let pipe: IconPathPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [IconPathPipe] });
    pipe = TestBed.inject(IconPathPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
