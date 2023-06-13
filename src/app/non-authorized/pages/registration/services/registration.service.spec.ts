import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { RegistrationApiMethods } from '../models/registration-utils';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    const institutionFacadeServiceStub = () => ({
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    const authFacadeServiceStub = () => ({
      getAuthSessionToken$: () => ({ pipe: () => ({}) })
    });
    const contentStringsFacadeServiceStub = () => ({
      fetchContentStringAfresh: (patronUi, category) => ({}),
      fetchContentStringModel: (category, args) => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RegistrationService,
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(RegistrationService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getString$', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
      const cONTENT_STRINGS_CATEGORIESStub: CONTENT_STRINGS_CATEGORIES = <
        any
      >{};
      spyOn(
        contentStringsFacadeServiceStub,
        'fetchContentStringAfresh'
      ).and.callThrough();
      service.getString$(cONTENT_STRINGS_CATEGORIESStub);
      expect(
        contentStringsFacadeServiceStub.fetchContentStringAfresh
      ).toHaveBeenCalled();
    });
  });
});
