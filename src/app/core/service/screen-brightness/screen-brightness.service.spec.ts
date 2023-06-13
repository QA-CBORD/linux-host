import { TestBed } from '@angular/core/testing';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { SetBrightnessOptions } from '@capacitor-community/screen-brightness';
import { ScreenBrigtnessService } from './screen-brightness.service';

describe('ScreenBrigtnessService', () => {
  let service: ScreenBrigtnessService;

  beforeEach(() => {
    const nativeProviderStub = () => ({ isMobile: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ScreenBrigtnessService,
        { provide: NativeProvider, useFactory: nativeProviderStub }
      ]
    });
    service = TestBed.inject(ScreenBrigtnessService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('setBrightness', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = TestBed.inject(NativeProvider);
      const setBrightnessOptionsStub: SetBrightnessOptions = <any>{};
      spyOn(nativeProviderStub, 'isMobile').and.callThrough();
      service.setBrightness(setBrightnessOptionsStub);
      expect(nativeProviderStub.isMobile).toHaveBeenCalled();
    });
  });

  describe('getBrightness', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = TestBed.inject(NativeProvider);
      spyOn(nativeProviderStub, 'isMobile').and.callThrough();
      service.getBrightness();
      expect(nativeProviderStub.isMobile).toHaveBeenCalled();
    });
  });
});
