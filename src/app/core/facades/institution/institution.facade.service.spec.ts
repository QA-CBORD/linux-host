import { TestBed } from '@angular/core/testing';
import { InstitutionFacadeService } from './institution.facade.service';


describe('User.FacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutionFacadeService = TestBed.get(InstitutionFacadeService);
    expect(service).toBeTruthy();
  });
});
