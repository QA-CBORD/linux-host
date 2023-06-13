import { TestBed } from '@angular/core/testing';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { ScanCardResolverService } from './scan-card-resolver.service';

describe('ScanCardResolverService', () => {
  let service: ScanCardResolverService;

  beforeEach(() => {
    const barcodeFacadeServiceStub = () => ({
      getSetting: pATRON_DISPLAY_MEDIA_TYPE => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        ScanCardResolverService,
        { provide: BarcodeFacadeService, useFactory: barcodeFacadeServiceStub }
      ]
    });
    service = TestBed.inject(ScanCardResolverService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const barcodeFacadeServiceStub: BarcodeFacadeService = TestBed.inject(
        BarcodeFacadeService
      );
      spyOn(barcodeFacadeServiceStub, 'getSetting').and.callThrough();
      service.resolve();
      expect(barcodeFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });
});
