import { TestBed } from '@angular/core/testing';

import { SettingsFactoryService } from './settings-factory.service';

describe('SettingsFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsFactoryService = TestBed.get(SettingsFactoryService);
    expect(service).toBeTruthy();
  });
});
