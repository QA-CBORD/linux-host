import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

describe('SelectivePreloadingStrategy', () => {
  let service: SelectivePreloadingStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectivePreloadingStrategy]
    });
    service = TestBed.inject(SelectivePreloadingStrategy);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`preloadedModules has default value`, () => {
    expect(service.preloadedModules).toEqual([]);
  });
});
