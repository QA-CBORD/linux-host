import { TestBed } from '@angular/core/testing';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

describe('Identity.FacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityFacadeService = TestBed.get(IdentityFacadeService);
    expect(service).toBeTruthy();
  });
});
