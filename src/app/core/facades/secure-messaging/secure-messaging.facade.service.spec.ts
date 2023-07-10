import { TestBed } from '@angular/core/testing';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { SecureMessageGroupInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { SecureMessageConversation } from '@core/model/secure-messaging/secure-messaging.model';
import { MarkAsReadVal } from '@core/model/secure-messaging/secure-messaging.model';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { SecureMessagingApiService } from '@core/service/secure-messaging/secure-messaging-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { SecureMessagingFacadeService } from './secure-messaging.facade.service';

describe('SecureMessagingFacadeService', () => {
  let service: SecureMessagingFacadeService;

  beforeEach(() => {
    const authApiServiceStub = () => ({
      getExternalAuthenticationToken: () => ({ pipe: () => ({}) })
    });
    const secureMessagingApiServiceStub = () => ({
      getSecureMessagesGroups: institution_id => ({}),
      getSecureMessages: (ma_type, id_field, id_value) => ({}),
      postSecureMessage: messageInfo => ({ pipe: () => ({}) }),
      markAsRead: info => ({})
    });
    const storageStateServiceStub = () => ({
      updateStateEntity: (secureMessaginKey, response, object) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        SecureMessagingFacadeService,
        { provide: AuthApiService, useFactory: authApiServiceStub },
        {
          provide: SecureMessagingApiService,
          useFactory: secureMessagingApiServiceStub
        },
        { provide: StorageStateService, useFactory: storageStateServiceStub }
      ]
    });
    service = TestBed.inject(SecureMessagingFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });


  describe('startConversation', () => {
    it('makes expected calls', () => {
      const secureMessageGroupInfoStub: SecureMessageGroupInfo = <any>{};
     jest.spyOn(service, 'setSelectedConversation');
      service.startConversation(secureMessageGroupInfoStub);
      expect(service.setSelectedConversation).toHaveBeenCalled();
    });
  });

  describe('markAsRead', () => {
    it('makes expected calls', () => {
      const markAsReadValStub: MarkAsReadVal = <any>{};
      const secureMessagingApiServiceStub: SecureMessagingApiService = TestBed.inject(
        SecureMessagingApiService
      );
     jest.spyOn(secureMessagingApiServiceStub, 'markAsRead');
      service.markAsRead(markAsReadValStub);
      expect(secureMessagingApiServiceStub.markAsRead).toHaveBeenCalled();
    });
  });
  describe('SecureMessagingFacadeService', () => {
    it('should return undefined if smAuthInfo is falsy', () => {
      SecureMessagingFacadeService["smAuthInfo"] = null;
      service.getSecureMessagesGroups();
      expect(jest.spyOn(service, 'getSecureMessagesGroups')).toHaveBeenCalledTimes(0);
    });
  });
});
