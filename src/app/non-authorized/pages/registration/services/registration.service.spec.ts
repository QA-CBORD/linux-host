import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { RegistrationApiMethods } from '../models/registration-utils';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { RegistrationService } from './registration.service';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';
import { of, throwError } from 'rxjs';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { Institution } from '@core/model/institution';
import { HttpClient } from '@angular/common/http';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';

describe('RegistrationService', () => {
  let service: RegistrationService;
  const contentStringFacade = { fetchContentStringModel: jest.fn(), fetchContentStringAfresh: jest.fn() };
  const institutionFacadeService = { cachedInstitutionInfo$: of({}) };
  const authFacadeService = { getAuthSessionToken$: jest.fn() };
  const httpClient = { post: jest.fn() };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RegistrationService,
        {
          provide: InstitutionFacadeService,
          useValue: institutionFacadeService,
        },
        { provide: AuthFacadeService, useValue: authFacadeService },

        { provide: ContentStringsFacadeService, useValue: contentStringFacade },
        { provide: HttpClient, useValue: httpClient },
      ],
    });
    service = TestBed.inject(RegistrationService);
    service['makeRPCRequest'] = jest.fn().mockReturnValue(of({}));
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getString$', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(ContentStringsFacadeService);
      const cONTENT_STRINGS_CATEGORIESStub: CONTENT_STRINGS_CATEGORIES = <any>{};
      jest.spyOn(contentStringsFacadeServiceStub, 'fetchContentStringAfresh');
      service.getString$(cONTENT_STRINGS_CATEGORIESStub);
      expect(contentStringsFacadeServiceStub.fetchContentStringAfresh).toHaveBeenCalled();
    });
  });
  it('should return lookupFields when the request is successful', () => {
    const lookupFields: LookupFieldInfo = {
      lookupFieldId: '',
      displayName: '',
      displayOrder: 0,
      type: 1,
      value: '',
    };
    (service['makeRPCRequest'] as jest.Mock).mockReturnValue(of({ response: { lookupFields } }));

    service.retrieveRegistrationFields().subscribe(fields => {
      expect(fields).toEqual(lookupFields);
    });
  });
  it('should return lookupFields when the request is null', () => {
    (service['makeRPCRequest'] as jest.Mock).mockReturnValue(of({ response: { lookupFields: null } }));

    service.retrieveRegistrationFields().subscribe(fields => {
      expect(fields).toEqual([]);
    });
  });
  it('should return an empty array when the request fails', () => {
    (service['makeRPCRequest'] as jest.Mock).mockReturnValue(throwError('error'));

    service.retrieveRegistrationFields().subscribe(fields => {
      expect(fields).toEqual([]);
    });
  });
  it('should call makeRPCRequest with the correct parameters', () => {
    const method = RegistrationApiMethods.retrieveRegistrationFields;
    const params = { param1: 'value1' };
    const useSessionId = true;
    const useInstitutionId = false;

    service.callBackend(method, params, useSessionId, useInstitutionId);

    expect(service['makeRPCRequest']).toHaveBeenCalledWith(method, params, useSessionId, useInstitutionId);
  });
  it('should call makeRPCRequest with the default parameters', () => {
    const method = RegistrationApiMethods.retrieveRegistrationFields;

    service.callBackend(method);

    expect(service['makeRPCRequest']).toHaveBeenCalledWith(method, {}, true, false);
  });
  it('should call fetchContentStringModel with the correct parameters', () => {
    const category = ContentStringCategory.creditCardMgmt;
    const args = { data: 'data', requests: [] };
    const contentStringModel: ContentStringModel = {} as any;
    contentStringFacade.fetchContentStringModel.mockReturnValue(of(contentStringModel));

    const result$ = service.getStringModel$(category, args);

    expect(contentStringFacade.fetchContentStringModel).toHaveBeenCalledWith(category, args);
    result$.subscribe(result => {
      expect(result).toEqual(contentStringModel);
    });
  });
  it('should call fetchContentStringModel with the default parameters', () => {
    const category = ContentStringCategory.creditCardMgmt;
    const contentStringModel: ContentStringModel = {} as any;
    contentStringFacade.fetchContentStringModel.mockReturnValue(of(contentStringModel));

    const result$ = service.getStringModel$(category);

    expect(contentStringFacade.fetchContentStringModel).toHaveBeenCalledWith(category, {});
    result$.subscribe(result => {
      expect(result).toEqual(contentStringModel);
    });
  });
  it('should return the cached institution info', () => {
    const institution: Institution = {} as any;

    service.institution$().subscribe(result => {
      expect(result).toEqual(institution);
    });
  });
  it('should return the session token and institution info', () => {
    const sessionToken = 'token';
    const institution: Institution = {} as any;
    authFacadeService.getAuthSessionToken$.mockReturnValue(of(sessionToken));

    service['paramsObs$']().subscribe(([resultToken, resultInstitution]) => {
      expect(resultToken).toEqual(sessionToken);
      expect(resultInstitution).toEqual(institution);
    });
  });
  it('should make a post request with the correct parameters', () => {
    const method = RegistrationApiMethods.retrieveRegistrationFields;
    const params = { param1: 'value1' };
    const useSessionId = true;
    const useInstitutionId = false;
    const queryConfig = new RPCQueryConfig(
      method,
      { sessionId: 'sessionId', ...params },
      useSessionId,
      useInstitutionId
    );
    (httpClient.post as jest.Mock).mockReturnValue(of({}));

   service['makeRPCRequest'](method, params, useSessionId, useInstitutionId);
    
    service['paramsObs$']().subscribe(() => {
      expect(httpClient.post).toHaveBeenCalledWith(service['endpoints'].user, queryConfig);
    });
  });

  it('should throw an error when the request fails', () => {
    const method = RegistrationApiMethods.retrieveRegistrationFields;
    const params = { param1: 'value1' };
    const useSessionId = true;
    const useInstitutionId = false;
    (httpClient.post as jest.Mock).mockReturnValue(throwError('error'));

    service['makeRPCRequest'](method, params, useSessionId, useInstitutionId).subscribe({
      error: err => {
        expect(err).toBe('error');
      },
    });
  });
});
