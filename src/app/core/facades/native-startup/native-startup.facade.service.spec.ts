import { TestBed } from '@angular/core/testing';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';

describe('NativeStartup.FacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeStartupFacadeService = TestBed.get(NativeStartupFacadeService);
    expect(service).toBeTruthy();
  });
});
