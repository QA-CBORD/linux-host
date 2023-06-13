import { TestBed } from '@angular/core/testing';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { BaseInterceptor } from './base.interceptor';

describe('BaseInterceptor', () => {
  let service: BaseInterceptor;

  beforeEach(() => {
    const authFacadeServiceStub = () => ({
      cachedAuthSessionToken$: { pipe: () => ({}) },
      getAuthSessionToken$: () => ({ pipe: () => ({}) })
    });
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    const environmentFacadeServiceStub = () => ({
      getSavedEnvironmentInfo$: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        BaseInterceptor,
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(BaseInterceptor);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept', () => {
    it('makes expected calls', () => {
      const httpHandlerStub: HttpHandler = <any>{};
      const httpRequestStub: HttpRequest = <any>{};
      spyOn(component, 'resolveRequest').and.callThrough();
      service.intercept(httpRequestStub, httpHandlerStub);
      expect(service.resolveRequest).toHaveBeenCalled();
    });
  });

  describe('resolveRequest', () => {
    it('makes expected calls', () => {
      const httpHandlerStub: HttpHandler = <any>{};
      const httpRequestStub: HttpRequest = <any>{};
      const environmentFacadeServiceStub: EnvironmentFacadeService = TestBed.inject(
        EnvironmentFacadeService
      );
      spyOn(httpHandlerStub, 'handle').and.callThrough();
      spyOn(httpRequestStub, 'clone').and.callThrough();
      spyOn(
        environmentFacadeServiceStub,
        'getSavedEnvironmentInfo$'
      ).and.callThrough();
      service.resolveRequest(httpRequestStub, httpHandlerStub);
      expect(httpHandlerStub.handle).toHaveBeenCalled();
      expect(httpRequestStub.clone).toHaveBeenCalled();
      expect(
        environmentFacadeServiceStub.getSavedEnvironmentInfo$
      ).toHaveBeenCalled();
    });
  });
});
