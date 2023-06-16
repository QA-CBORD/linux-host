import { TestBed } from '@angular/core/testing';
import { SettingsStateService } from './settings-state.service';

describe('SettingsStateService', () => {
  let service: SettingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SettingsStateService] });
    service = TestBed.inject(SettingsStateService);
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
