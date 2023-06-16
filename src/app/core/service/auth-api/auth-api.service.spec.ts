import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserLogin } from '@core/model/user';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('authenticateSystem', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.authenticateSystem().subscribe(res => {
        expect(res).toEqual({});
      });
      const req = httpTestingController.expectOne('/json/authentication');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });

  describe('getAuthenticationToken', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAuthenticationToken().subscribe(res => {
        expect(res).toEqual({});
      });
      const req = httpTestingController.expectOne('/json/authentication');
      expect(req.request.method).toEqual('POST');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
