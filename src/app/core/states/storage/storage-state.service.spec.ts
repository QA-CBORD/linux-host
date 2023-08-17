import { TestBed } from '@angular/core/testing';
import { KeysResult } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ObservableStorageService } from '@shared/index';
import { StorageStateService } from './storage-state.service';
import { MockStorageService } from './storage-state.service.mock'; // Import the mock version

describe('StorageStateService', () => {
  let service: StorageStateService;
  let platform: Platform;
  let storageObservable: ObservableStorageService;

  beforeEach(() => {
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });

    const storageStub = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        StorageStateService,
        { provide: Platform, useFactory: platformStub },
        { provide: ObservableStorageService, useValue: storageStub },
        { provide: Storage, useClass: MockStorageService },
      ],
    });
    jest.spyOn(StorageStateService.prototype, 'initialization');
    jest.spyOn(StorageStateService.prototype, 'initMigration');

    service = TestBed.inject(StorageStateService);
    storageObservable = TestBed.inject(ObservableStorageService);
    platform = TestBed.inject(Platform);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`activeUpdaters has default value`, () => {
    expect(service['activeUpdaters']).toEqual(0);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(StorageStateService.prototype.initialization).toHaveBeenCalled();
    });
  });
});
