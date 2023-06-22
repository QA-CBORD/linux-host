import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SessionStorageService] });
    service = TestBed.inject(SessionStorageService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
