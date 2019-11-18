import { TestBed } from '@angular/core/testing';

import { AccessCardService } from './access-card.service';

describe('AccessCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessCardService = TestBed.get(AccessCardService);
    expect(service).toBeTruthy();
  });
});
