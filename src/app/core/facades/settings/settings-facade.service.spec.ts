import { TestBed } from '@angular/core/testing';

import { SettingsFacadeService } from './settings-facade.service';

describe('UserSettingsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsFacadeService = TestBed.get(SettingsFacadeService);
    expect(service).toBeTruthy();
  });
});
