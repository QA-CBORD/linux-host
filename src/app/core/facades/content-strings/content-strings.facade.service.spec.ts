import { TestBed } from '@angular/core/testing';
import { ContentStringsStateService } from '@core/states/content-strings/content-strings-state.service';
import { ContentStringsApiService } from '@core/service/content-service/content-strings-api.service';
import { CONTENT_STRINGS_CATEGORIES } from '../../../content-strings';
import { CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { ContentStringsFacadeService } from './content-strings.facade.service';

describe('ContentStringsFacadeService', () => {
  let service: ContentStringsFacadeService;

  beforeEach(() => {
    const contentStringsStateServiceStub = () => ({
      getContentString$: (domain, category, name) => ({}),
      getContentStrings$: (domain, category) => ({}),
      clearState: () => ({}),
      updateState: contentStrings => ({}),
      removeContentString: (domain, category, name) => ({})
    });
    const contentStringsApiServiceStub = () => ({
      retrieveContentStringByConfig: (config, sessionId, useSessionId) => ({}),
      retrieveContentStringListByRequest: object => ({}),
      ContentStringByInstitution$: (object, institutionId) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        ContentStringsFacadeService,
        {
          provide: ContentStringsStateService,
          useFactory: contentStringsStateServiceStub
        },
        {
          provide: ContentStringsApiService,
          useFactory: contentStringsApiServiceStub
        }
      ]
    });
    service = TestBed.inject(ContentStringsFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getContentStrings$', () => {
    it('makes expected calls', () => {
      const contentStringsStateServiceStub: ContentStringsStateService = TestBed.inject(
        ContentStringsStateService
      );
      const cONTENT_STRINGS_CATEGORIESStub: CONTENT_STRINGS_CATEGORIES = <
        any
      >{};
      const cONTENT_STRINGS_DOMAINSStub: CONTENT_STRINGS_DOMAINS = <any>{};
     jest.spyOn(
        contentStringsStateServiceStub,
        'getContentStrings$'
      );
      service.getContentStrings$(
        cONTENT_STRINGS_DOMAINSStub,
        cONTENT_STRINGS_CATEGORIESStub
      );
      expect(
        contentStringsStateServiceStub.getContentStrings$
      ).toHaveBeenCalled();
    });
  });

  describe('resolveContentStrings$', () => {
    it('makes expected calls', () => {
      const cONTENT_STRINGS_CATEGORIESStub: CONTENT_STRINGS_CATEGORIES = <
        any
      >{};
      const cONTENT_STRINGS_DOMAINSStub: CONTENT_STRINGS_DOMAINS = <any>{};
     jest.spyOn(service, 'getContentStrings$');
     jest.spyOn(service, 'fetchContentStrings$');
      service.resolveContentStrings$(
        cONTENT_STRINGS_DOMAINSStub,
        cONTENT_STRINGS_CATEGORIESStub
      );
      expect(service.getContentStrings$).toHaveBeenCalled();
      expect(service.fetchContentStrings$).toHaveBeenCalled();
    });
  });

  describe('retrieveContentStringListByRequest', () => {
    it('makes expected calls', () => {
      const contentStringsApiServiceStub: ContentStringsApiService = TestBed.inject(
        ContentStringsApiService
      );
      const contentStringRequestStub: ContentStringRequest = <any>{};
     jest.spyOn(
        contentStringsApiServiceStub,
        'retrieveContentStringListByRequest'
      );
      service.retrieveContentStringListByRequest(contentStringRequestStub);
      expect(
        contentStringsApiServiceStub.retrieveContentStringListByRequest
      ).toHaveBeenCalled();
    });
  });

  describe('clearState', () => {
    it('makes expected calls', () => {
      const contentStringsStateServiceStub: ContentStringsStateService = TestBed.inject(
        ContentStringsStateService
      );
     jest.spyOn(contentStringsStateServiceStub, 'clearState');
      service.clearState();
      expect(contentStringsStateServiceStub.clearState).toHaveBeenCalled();
    });
  });
});
