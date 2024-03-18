import { TestBed } from '@angular/core/testing';
import { SearchPipe } from './search.pipe';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

describe('SearchPipe', () => {
  let pipe: SearchPipe;
  let a11yService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPipe, { provide: AccessibilityService, useValue: a11yService }],
    });
    pipe = TestBed.inject(SearchPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should check for falsy values', () => {
    expect(pipe.transform(null, '').length).toBe(0);
  });
});
