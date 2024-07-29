import { TestBed } from '@angular/core/testing';

import { SentryAppStateListenerService } from './sentry-app-state-listener.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { of } from 'rxjs';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { CartService } from '@sections/ordering';

describe('SentryAppStateListenerService', () => {
  const mockInstitution = { id: 'institutionId' };

  let service: SentryAppStateListenerService;
  let mockInstitutionFacadeService = {
    cachedInstitutionInfo$: of(mockInstitution),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: InstitutionFacadeService, useValue: mockInstitutionFacadeService },
        {
          provide: UserFacadeService,
          useValue: {
            getUserState$: jest.fn(() => of({ id: 'userId' })),
          },
        },
        {
          provide: CartService,
          useValue: {
            merchant$: of({ id: 'merchantId' }),
          },
        },
        {
          provide: EnvironmentFacadeService,
          useValue: {
            getSavedEnvironmentInfo$: jest.fn(() => of({ environment: 'environment' })),
          },
        },
      ],
    });
    service = TestBed.inject(SentryAppStateListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
