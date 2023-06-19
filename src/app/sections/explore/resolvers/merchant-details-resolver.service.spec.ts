import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ExploreService } from '@sections/explore/services/explore.service';
import { MerchantDetailsResolverService } from './merchant-details-resolver.service';

describe('MerchantDetailsResolverService', () => {
  let service: MerchantDetailsResolverService;

  beforeEach(() => {
    const routerStub = () => ({
      routerState: { snapshot: { url: { includes: () => ({}) } } }
    });
    const exploreServiceStub = () => ({
      getInitialMerchantData$: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        MerchantDetailsResolverService,
        { provide: Router, useFactory: routerStub },
        { provide: ExploreService, useFactory: exploreServiceStub }
      ]
    });
    service = TestBed.inject(MerchantDetailsResolverService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
