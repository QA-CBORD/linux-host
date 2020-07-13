import { TestBed } from '@angular/core/testing';
import { UserSettingsStateService } from './user-settings-state.service';

describe('UserSettingsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSettingsStateService = TestBed.get(UserSettingsStateService);
    expect(service).toBeTruthy();
  });
});
