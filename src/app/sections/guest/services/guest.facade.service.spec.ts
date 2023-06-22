import { TestBed } from '@angular/core/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { GuestFacadeService } from './guest.facade.service';

describe('GuestFacadeService', () => {
  let service: GuestFacadeService;

  beforeEach(() => {
    const contentStringsFacadeServiceStub = () => ({
      fetchContentStringModel: guestDashboard => ({})
    });
    const institutionFacadeServiceStub = () => ({ guestSettings: {} });
    TestBed.configureTestingModule({
      providers: [
        GuestFacadeService,
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(GuestFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
