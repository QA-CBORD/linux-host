import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { APIService } from './api.service';

describe('APIService', () => {
  let service: APIService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({
      getSecureMessagingAPIURL: () => ({ concat: () => ({}) }),
      getPartnerServicesURL: () => ({ concat: () => ({}) })
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        APIService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(APIService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
