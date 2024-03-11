import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NativeStartupApiService } from './native-startup-api.service';
import { simpleServiceApiToAssert } from 'src/app/testing/helpers/api-helpers';

describe('NativeStartupApiService', () => {
  let service: NativeStartupApiService;
  let httpTestingController: HttpTestingController;
  const serviceUrl = '/json/configuration';
  let serviceAssert: (
    method: keyof NativeStartupApiService,
    params?: any[],
    serviceURL?: string,
    httpMethod?: string,
    response?: any
  ) => void;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NativeStartupApiService],
    });
    service = TestBed.inject(NativeStartupApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    serviceAssert = simpleServiceApiToAssert(httpTestingController, service);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('makes nativeStartup with invalid data calls', () => {
    serviceAssert('nativeStartup', [], serviceUrl);
  });
});
