import { TestBed } from '@angular/core/testing';
import { FacilitiesService } from './facilities.service';

describe('FacilitiesService', () => {
  let service: FacilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FacilitiesService] });
    service = TestBed.inject(FacilitiesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
