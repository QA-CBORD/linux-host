import { TestBed } from '@angular/core/testing';
import { NativeStartupFacadeService } from '../auth/auth.facade.service';

describe('NativeStartup.FacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeStartupFacadeService = TestBed.get(NativeStartupFacadeService);
    expect(service).toBeTruthy();
  });
});
