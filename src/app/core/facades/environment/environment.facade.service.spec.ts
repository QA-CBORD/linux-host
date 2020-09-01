import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from './environment.facade.service';


describe('EnvironmentFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentFacadeService = TestBed.get(EnvironmentFacadeService);
    expect(service).toBeTruthy();
  });
});
