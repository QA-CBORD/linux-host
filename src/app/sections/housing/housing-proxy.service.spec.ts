import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { HousingProxyService } from './housing-proxy.service';

describe('HousingProxyService', () => {
  let service: HousingProxyService;

  beforeEach(() => {
    const authFacadeServiceStub = () => ({
      getExternalAuthenticationToken$: () => ({ pipe: () => ({}) })
    });
    const storageStateServiceStub = () => ({
      getStateEntityByKey$: jwt_key => ({ pipe: () => ({}) }),
      updateStateEntity: (jwt_key, jwt, object) => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HousingProxyService,
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        { provide: StorageStateService, useFactory: storageStateServiceStub }
      ]
    });
    service = TestBed.inject(HousingProxyService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
