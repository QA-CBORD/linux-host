import { TestBed } from '@angular/core/testing';
import { QuestionsEntries } from '../questions/questions-storage.service';
import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {
  let service: PreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PreferencesService] });
    service = TestBed.inject(PreferencesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
