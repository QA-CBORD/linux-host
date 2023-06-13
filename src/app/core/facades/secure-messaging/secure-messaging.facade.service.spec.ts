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
      marAsRead: info => ({})
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

  describe('sendSecureMessage', () => {
    it('makes expected calls', () => {
      const secureMessageInfoStub: SecureMessageInfo = <any>{};
      const secureMessagingApiServiceStub: SecureMessagingApiService = TestBed.inject(
        SecureMessagingApiService
      );
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      spyOn(
        secureMessagingApiServiceStub,
        'postSecureMessage'
      ).and.callThrough();
      spyOn(storageStateServiceStub, 'updateStateEntity').and.callThrough();
      service.sendSecureMessage(secureMessageInfoStub);
      expect(
        secureMessagingApiServiceStub.postSecureMessage
      ).toHaveBeenCalled();
      expect(storageStateServiceStub.updateStateEntity).toHaveBeenCalled();
    });
  });

  describe('startConversation', () => {
    it('makes expected calls', () => {
      const secureMessageGroupInfoStub: SecureMessageGroupInfo = <any>{};
      spyOn(component, 'setSelectedConversation').and.callThrough();
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
      spyOn(secureMessagingApiServiceStub, 'marAsRead').and.callThrough();
      service.markAsRead(markAsReadValStub);
      expect(secureMessagingApiServiceStub.marAsRead).toHaveBeenCalled();
    });
  });

  describe('getInitialData$', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getInitialDataState$').and.callThrough();
      service.getInitialData$();
      expect(service.getInitialDataState$).toHaveBeenCalled();
    });
  });

  describe('getInitialDataState$', () => {
    it('makes expected calls', () => {
      const authApiServiceStub: AuthApiService = TestBed.inject(AuthApiService);
      spyOn(component, 'getInitialConvoData$').and.callThrough();
      spyOn(
        authApiServiceStub,
        'getExternalAuthenticationToken'
      ).and.callThrough();
      service.getInitialDataState$();
      expect(service.getInitialConvoData$).toHaveBeenCalled();
      expect(
        authApiServiceStub.getExternalAuthenticationToken
      ).toHaveBeenCalled();
    });
  });

  describe('getInitialConvoData$', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      spyOn(component, 'getSecureMessagesGroups').and.callThrough();
      spyOn(component, 'getSecureMessages').and.callThrough();
      spyOn(storageStateServiceStub, 'updateStateEntity').and.callThrough();
      service.getInitialConvoData$();
      expect(service.getSecureMessagesGroups).toHaveBeenCalled();
      expect(service.getSecureMessages).toHaveBeenCalled();
      expect(storageStateServiceStub.updateStateEntity).toHaveBeenCalled();
    });
  });

  describe('getSecureMessagesGroups', () => {
    it('makes expected calls', () => {
      const secureMessagingApiServiceStub: SecureMessagingApiService = TestBed.inject(
        SecureMessagingApiService
      );
      spyOn(
        secureMessagingApiServiceStub,
        'getSecureMessagesGroups'
      ).and.callThrough();
      service.getSecureMessagesGroups();
      expect(
        secureMessagingApiServiceStub.getSecureMessagesGroups
      ).toHaveBeenCalled();
    });
  });

  describe('getSecureMessages', () => {
    it('makes expected calls', () => {
      const secureMessagingApiServiceStub: SecureMessagingApiService = TestBed.inject(
        SecureMessagingApiService
      );
      spyOn(
        secureMessagingApiServiceStub,
        'getSecureMessages'
      ).and.callThrough();
      service.getSecureMessages();
      expect(
        secureMessagingApiServiceStub.getSecureMessages
      ).toHaveBeenCalled();
    });
  });

  describe('pollForDataInterval', () => {
    it('makes expected calls', () => {
      spyOn(component, 'mapToStorage').and.callThrough();
      service.pollForDataInterval();
      expect(service.mapToStorage).toHaveBeenCalled();
    });
  });
});
