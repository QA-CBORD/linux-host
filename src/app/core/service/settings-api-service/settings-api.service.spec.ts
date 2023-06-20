import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SettingsApiService } from './settings-api.service';

describe('SettingsApiService', () => {
  let service: SettingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsApiService]
    });
    service = TestBed.inject(SettingsApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
