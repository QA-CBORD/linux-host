import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { StorageStateService } from './storage-state.service';
import { MockStorageService } from './storage-state-mock.service';
import { Storage } from '@ionic/storage';

describe('StorageStateService', () => {
  let service: StorageStateService;

  beforeEach(() => {
    const platformStub = () => ({ pause: { subscribe: f => f({}) }, is: jest.fn() });
    TestBed.configureTestingModule({
      providers: [
        StorageStateService,
        { provide: Platform, useFactory: platformStub },
        { provide: Storage, useClass: MockStorageService}
      ]
    });
   jest.spyOn(StorageStateService.prototype, 'initialization');
    service = TestBed.inject(StorageStateService);
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
