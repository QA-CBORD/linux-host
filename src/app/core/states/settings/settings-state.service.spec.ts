import { TestBed } from '@angular/core/testing';

import { SettingsStateService } from './settings-state.service';

describe('UserSettingsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsStateService = TestBed.get(SettingsStateService);
    expect(service).toBeTruthy();
  });
});
