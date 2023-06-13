import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { Storage } from '@capacitor/preferences';
import { StorageStateService } from './storage-state.service';

describe('StorageStateService', () => {
  let service: StorageStateService;

  beforeEach(() => {
    const platformStub = () => ({ pause: { subscribe: f => f({}) } });
    TestBed.configureTestingModule({
      providers: [
        StorageStateService,
        { provide: Platform, useFactory: platformStub }
      ]
    });
    spyOn(StorageStateService.prototype, 'initialization');
    service = TestBed.inject(StorageStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`activeUpdaters has default value`, () => {
    expect(service.activeUpdaters).toEqual(0);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(StorageStateService.prototype.initialization).toHaveBeenCalled();
    });
  });
});
