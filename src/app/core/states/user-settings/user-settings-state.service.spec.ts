import { TestBed } from '@angular/core/testing';
import { UserSettingsStateService } from './user-settings-state.service';

describe('UserSettingsStateService', () => {
  let service: UserSettingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserSettingsStateService] });
    service = TestBed.inject(UserSettingsStateService);
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
