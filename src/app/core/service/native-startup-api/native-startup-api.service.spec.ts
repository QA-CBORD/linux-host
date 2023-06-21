import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NativeStartupApiService } from './native-startup-api.service';

describe('NativeStartupApiService', () => {
  let service: NativeStartupApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NativeStartupApiService]
    });
    service = TestBed.inject(NativeStartupApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
