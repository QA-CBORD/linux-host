import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { HousingProxyService } from '../housing-proxy.service';
import { Term } from './terms.model';
import { TermsService } from './terms.service';

describe('TermsService', () => {
  let service: TermsService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({
      getEnvironmentObject: () => ({ housing_aws_url: {} })
    });
    const housingProxyServiceStub = () => ({
      get: apiUrl => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        TermsService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub }
      ]
    });
    service = TestBed.inject(TermsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getTerms', () => {
    it('makes expected calls', () => {
      const environmentFacadeServiceStub: EnvironmentFacadeService = TestBed.inject(
        EnvironmentFacadeService
      );
      const housingProxyServiceStub: HousingProxyService = TestBed.inject(
        HousingProxyService
      );
      spyOn(
        environmentFacadeServiceStub,
        'getEnvironmentObject'
      ).and.callThrough();
      spyOn(housingProxyServiceStub, 'get').and.callThrough();
      service.getTerms();
      expect(
        environmentFacadeServiceStub.getEnvironmentObject
      ).toHaveBeenCalled();
      expect(housingProxyServiceStub.get).toHaveBeenCalled();
    });
  });
});
