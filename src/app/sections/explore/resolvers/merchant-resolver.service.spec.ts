import { TestBed } from '@angular/core/testing';
import { ExploreService } from '@sections/explore/services/explore.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantResolverService } from './merchant-resolver.service';

describe('MerchantResolverService', () => {
  let service: MerchantResolverService;

  beforeEach(() => {
    const exploreServiceStub = () => ({
      getInitialMerchantData$: () => ({ pipe: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        MerchantResolverService,
        { provide: ExploreService, useFactory: exploreServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(MerchantResolverService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const exploreServiceStub: ExploreService = TestBed.inject(ExploreService);
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      spyOn(exploreServiceStub, 'getInitialMerchantData$').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      service.resolve();
      expect(exploreServiceStub.getInitialMerchantData$).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
