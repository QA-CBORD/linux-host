import { TestBed } from '@angular/core/testing';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { MarkAsReadVal } from '@core/model/secure-messaging/secure-messaging.model';
import { APIService } from 'src/app/core/service/api-service/api.service';
import { SecureMessagingApiService } from './secure-messaging-api.service';

describe('SecureMessagingApiService', () => {
  let service: SecureMessagingApiService;

  beforeEach(() => {
    const aPIServiceStub = () => ({
      authenticatedHTTPCall: (get, url, json, arg, arg1, arg2) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        SecureMessagingApiService,
        { provide: APIService, useFactory: aPIServiceStub }
      ]
    });
    service = TestBed.inject(SecureMessagingApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('postSecureMessage', () => {
    it('makes expected calls', () => {
      const secureMessageInfoStub: SecureMessageInfo = <any>{};
      const aPIServiceStub: APIService = TestBed.inject(APIService);
      spyOn(aPIServiceStub, 'authenticatedHTTPCall').and.callThrough();
      service.postSecureMessage(secureMessageInfoStub);
      expect(aPIServiceStub.authenticatedHTTPCall).toHaveBeenCalled();
    });
  });

  describe('replyToSecureMessage', () => {
    it('makes expected calls', () => {
      const secureMessageInfoStub: SecureMessageInfo = <any>{};
      const aPIServiceStub: APIService = TestBed.inject(APIService);
      spyOn(aPIServiceStub, 'authenticatedHTTPCall').and.callThrough();
      service.replyToSecureMessage(secureMessageInfoStub);
      expect(aPIServiceStub.authenticatedHTTPCall).toHaveBeenCalled();
    });
  });

  describe('marAsRead', () => {
    it('makes expected calls', () => {
      const markAsReadValStub: MarkAsReadVal = <any>{};
      const aPIServiceStub: APIService = TestBed.inject(APIService);
      spyOn(aPIServiceStub, 'authenticatedHTTPCall').and.callThrough();
      service.marAsRead(markAsReadValStub);
      expect(aPIServiceStub.authenticatedHTTPCall).toHaveBeenCalled();
    });
  });
});
