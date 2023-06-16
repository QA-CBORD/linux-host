import { TestBed } from '@angular/core/testing';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeStartupApiService } from '@core/service/native-startup-api/native-startup-api.service';
import { NativeStartupInfo } from '@core/model/native-startup/native-startup-info';
import { StorageEntity } from '@core/classes/extendable-state-manager';
import { NativeStartupFacadeService } from './native-startup.facade.service';

describe('NativeStartupFacadeService', () => {
  let service: NativeStartupFacadeService;

  beforeEach(() => {
    const storageStateServiceStub = () => ({
      getStateEntityByKey$: digestKey => ({}),
      updateStateEntity: (digestKey, messageDigest) => ({})
    });
    const nativeStartupApiServiceStub = () => ({
      nativeStartup: (platform, build) => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        NativeStartupFacadeService,
        { provide: StorageStateService, useFactory: storageStateServiceStub },
        {
          provide: NativeStartupApiService,
          useFactory: nativeStartupApiServiceStub
        }
      ]
    });
    service = TestBed.inject(NativeStartupFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isStatusOk', () => {
    it('makes expected calls', () => {
      const nativeStartupInfoStub: NativeStartupInfo = <any>{};
     jest.spyOn(service, 'isMessageOk');
      service.isStatusOk(nativeStartupInfoStub);
      expect(service.isMessageOk).toHaveBeenCalled();
    });
  });

  describe('fetchNativeStartupInfo', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      const nativeStartupApiServiceStub: NativeStartupApiService = TestBed.inject(
        NativeStartupApiService
      );
     jest.spyOn(service, 'displayMessageToUser');
     jest.spyOn(service, 'isMessageOk');
     jest.spyOn(service, 'isStatusOk');
     jest.spyOn(service, 'digessIsOk');
     jest.spyOn(storageStateServiceStub, 'getStateEntityByKey$');
     jest.spyOn(storageStateServiceStub, 'updateStateEntity');
     jest.spyOn(nativeStartupApiServiceStub, 'nativeStartup');
      service.fetchNativeStartupInfo();
      expect(service.displayMessageToUser).toHaveBeenCalled();
      expect(service.isMessageOk).toHaveBeenCalled();
      expect(service.isStatusOk).toHaveBeenCalled();
      expect(service.digessIsOk).toHaveBeenCalled();
      expect(storageStateServiceStub.getStateEntityByKey$).toHaveBeenCalled();
      expect(storageStateServiceStub.updateStateEntity).toHaveBeenCalled();
      expect(nativeStartupApiServiceStub.nativeStartup).toHaveBeenCalled();
    });
  });
});
