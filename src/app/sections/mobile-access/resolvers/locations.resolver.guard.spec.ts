import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MobileAccessService } from '../service';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { LocationsResolverGuard } from './locations.resolver.guard';

describe('LocationsResolverGuard', () => {
  let service: LocationsResolverGuard;

  beforeEach(() => {
    const routerStub = () => ({
      routerState: { snapshot: { url: { includes: () => ({}) } } }
    });
    const mobileAccessServiceStub = () => ({
      initContentStringsList: () => ({
        pipe: () => ({ subscribe: f => f({}) })
      }),
      getLocations: () => ({ pipe: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        LocationsResolverGuard,
        { provide: Router, useFactory: routerStub },
        { provide: MobileAccessService, useFactory: mobileAccessServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    service = TestBed.inject(LocationsResolverGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
