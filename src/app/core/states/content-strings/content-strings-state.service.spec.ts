import { TestBed } from '@angular/core/testing';
import { ContentStringsStateService } from './content-strings-state.service';

describe('ContentStringsStateService', () => {
  let service: ContentStringsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ContentStringsStateService] });
    service = TestBed.inject(ContentStringsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`activeUpdaters has default value`, () => {
    expect(service['activeUpdaters']).toEqual(0);
  });

  it(`state has default value`, () => {
    expect(service['state']).toEqual([]);
  });
});
