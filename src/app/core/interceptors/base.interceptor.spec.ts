import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest } from '@angular/common/http';
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

});
