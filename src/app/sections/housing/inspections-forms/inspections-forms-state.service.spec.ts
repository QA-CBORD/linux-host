import { TestBed } from '@angular/core/testing';
import { Inspection } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';

describe('InspectionsStateService', () => {
  let service: InspectionsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [InspectionsStateService] });
    service = TestBed.inject(InspectionsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
