import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthApiService } from './auth-api.service';
import { simpleServiceApiToAssert } from 'src/app/testing/helpers/api-helpers';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpTestingController: HttpTestingController;
  let serviceAssert: (method: keyof AuthApiService, params?: any[], serviceURL?: string, httpMethod?: string) => void;
  const serviceUrl = '/json/authentication';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });
    service = TestBed.inject(AuthApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    serviceAssert = simpleServiceApiToAssert(httpTestingController, service);
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

  it('makes authenticateUser calls', () => {
    serviceAssert(
      'authenticateUser',
      [
        {
          userName: 'userCredentials.userName',
          password: 'userCredentials.password',
          domain: 'userCredentials.domain',
          institutionId: 'userCredentials.institutionId',
        },
      ],
      serviceUrl
    );
  });

  it('makes authenticateUser for guests calls', () => {
    serviceAssert(
      'authenticateUser',
      [
        {
          userName: 'userCredentials.userName',
          password: 'userCredentials.password',
          domain: 'userCredentials.domain',
          institutionId: 'userCredentials.institutionId',
        },
        true,
      ],
      serviceUrl
    );
  });

  it('makes authenticatePin calls', () => {
    serviceAssert('authenticatePin', [], serviceUrl);
  });

  it('makes authenticateSessionToken calls', () => {
    serviceAssert('authenticateSessionToken', [], serviceUrl);
  });

  it('makes authenticateSessionToken calls', () => {
    serviceAssert('retrievePatronBarcodePayload', [], serviceUrl);
  });

  it('makes getExternalAuthenticationToken calls', () => {
    serviceAssert('getExternalAuthenticationToken', [], serviceUrl);
  });

  it('makes retrieveAuthorizationBlob calls', () => {
    serviceAssert('retrieveAuthorizationBlob', [], serviceUrl);
  });
});
