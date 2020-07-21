import { TestBed } from '@angular/core/testing';

import { SessionFacadeService } from './session.facade.service';

describe('SessionFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionFacadeService = TestBed.get(SessionFacadeService);
    expect(service).toBeTruthy();
  });
});
