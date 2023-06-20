import { TestBed } from '@angular/core/testing';
import { QuestionsEntries } from '../questions/questions-storage.service';
import { PatronAttributesService } from './patron-attributes.service';

describe('PatronAttributesService', () => {
  let service: PatronAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PatronAttributesService] });
    service = TestBed.inject(PatronAttributesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
