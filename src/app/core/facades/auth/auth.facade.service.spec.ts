import { TestBed } from '@angular/core/testing';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { UserLogin } from '@core/model/user';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { BarcodeService } from '@core/service/barcode/barcode.service';
import { UserFacadeService } from '../user/user.facade.service';
import { AuthFacadeService } from './auth.facade.service';

describe('AuthFacadeService', () => {
  let service: AuthFacadeService;

  beforeEach(() => {
    const authApiServiceStub = () => ({
      authenticateUser: (userCredentials, isGuestUser) => ({
        pipe: () => ({})
      }),
      authenticatePin: (rawPin, identifier) => ({}),
      authenticateSessionToken: sessionToken => ({}),
      authenticateSystem: () => ({ pipe: () => ({}) }),
      getAuthenticationToken: () => ({}),
      getExternalAuthenticationToken: externalSystem => ({}),
      retrieveAuthorizationBlob: (deviceModel, deviceOSVersion) => ({})
    });
    const storageStateServiceStub = () => ({
      updateStateEntity: (isGuestUserKey, asGuest, object) => ({}),
      getStateEntityByKey$: isGuestUserKey => ({ pipe: () => ({}) })
    });
    const barcodeServiceStub = () => ({
      encodePin: pin => ({ pipe: () => ({}) })
    });
    const userFacadeServiceStub = () => ({
      getUser$: jest.fn(() => ({ pipe: () => ({}) }))
    });
    TestBed.configureTestingModule({
      providers: [
        AuthFacadeService,
        { provide: AuthApiService, useFactory: authApiServiceStub },
        { provide: StorageStateService, useFactory: storageStateServiceStub },
        { provide: BarcodeService, useFactory: barcodeServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub }
      ]
    });
    service = TestBed.inject(AuthFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('authenticateUser$', () => {
    it('makes expected calls', () => {
      const authApiServiceStub: AuthApiService = TestBed.inject(AuthApiService);
      const userLoginStub: UserLogin = <any>{};
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
     jest.spyOn(service, 'isGuestUser');
     jest.spyOn(service, 'setIsGuestUser');
     jest.spyOn(authApiServiceStub, 'authenticateUser');
     jest.spyOn(storageStateServiceStub, 'updateStateEntity');
     jest.spyOn(userFacadeServiceStub, 'getUser$');
      service.authenticateUser$(userLoginStub);
      expect(service.isGuestUser).toHaveBeenCalled();
      expect(service.setIsGuestUser).toHaveBeenCalled();
      expect(authApiServiceStub.authenticateUser).toHaveBeenCalled();
      expect(storageStateServiceStub.updateStateEntity).toHaveBeenCalled();
      expect(userFacadeServiceStub.getUser$).toHaveBeenCalled();
    });
  });

  describe('getAuthSessionToken$', () => {
    it('makes expected calls', () => {
     jest.spyOn(service, 'authenticateSystem$');
      service.getAuthSessionToken$();
      expect(service.authenticateSystem$).toHaveBeenCalled();
    });
  });

  describe('isGuestUser', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
     jest.spyOn(storageStateServiceStub, 'getStateEntityByKey$');
      service.isGuestUser();
      expect(storageStateServiceStub.getStateEntityByKey$).toHaveBeenCalled();
    });
  });

  describe('authenticateSystem$', () => {
    it('makes expected calls', () => {
      const authApiServiceStub: AuthApiService = TestBed.inject(AuthApiService);
     jest.spyOn(authApiServiceStub, 'authenticateSystem');
      service.authenticateSystem$();
      expect(authApiServiceStub.authenticateSystem).toHaveBeenCalled();
    });
  });

  describe('getAuthenticationToken$', () => {
    it('makes expected calls', () => {
      const authApiServiceStub: AuthApiService = TestBed.inject(AuthApiService);
     jest.spyOn(authApiServiceStub, 'getAuthenticationToken');
      service.getAuthenticationToken$();
      expect(authApiServiceStub.getAuthenticationToken).toHaveBeenCalled();
    });
  });
});
