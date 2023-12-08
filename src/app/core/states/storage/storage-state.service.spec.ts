import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { StorageStateService } from './storage-state.service';
import { ObservableStorageService } from '@shared/index';
import { of } from 'rxjs';

describe('StorageStateService', () => {
  let service: StorageStateService;
  let mockObservableStorageService = {
    init: jest.fn().mockReturnValue({}),
    set: jest.fn(),
    get: jest.fn().mockReturnValue(of(null)),
    remove: jest.fn().mockReturnValue(of(null)),
    clear: jest.fn().mockReturnValue(of(null)),
  };
  beforeEach(() => {
    const platformStub = () => ({ pause: { subscribe: f => f({}) }, is: jest.fn() });
    TestBed.configureTestingModule({
      providers: [
        StorageStateService,
        { provide: Platform, useFactory: platformStub },
        { provide: ObservableStorageService, useValue: mockObservableStorageService },
      ],
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
