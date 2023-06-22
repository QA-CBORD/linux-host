import { TestBed } from '@angular/core/testing';
import { QuestionsEntries } from '../questions/questions-storage.service';
import { FacilityAttributesService } from './facility-attributes.service';

describe('FacilityAttributesService', () => {
  let service: FacilityAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FacilityAttributesService] });
    service = TestBed.inject(FacilityAttributesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
