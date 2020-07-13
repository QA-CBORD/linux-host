import { TestBed } from '@angular/core/testing';

import { NavigationFacadeSettingsService } from './navigation-facade-settings.service';

describe('NavigationFacadeSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigationFacadeSettingsService = TestBed.get(NavigationFacadeSettingsService);
    expect(service).toBeTruthy();
  });
});
