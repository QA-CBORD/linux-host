import { TestBed } from '@angular/core/testing';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { InstitutionApiService } from '@core/service/institution-api/institution-api.service';
import { SettingsFacadeService } from '../settings/settings-facade.service';
import { AuthFacadeService } from '../auth/auth.facade.service';
import { GuestSetting } from '@sections/guest/model/guest-settings';
import { InstitutionFacadeService } from './institution.facade.service';

describe('InstitutionFacadeService', () => {
  let service: InstitutionFacadeService;

  beforeEach(() => {
    const storageStateServiceStub = () => ({
      getStateEntityByKey$: institutionKey => ({ pipe: () => ({}) }),
      updateStateEntity: (guestSettingKey, settings, object) => ({}),
      deleteStateEntityByKey: guestSettingKey => ({})
    });
    const institutionApiServiceStub = () => ({
      getInstitutionData: () => ({ pipe: () => ({}) }),
      getInstitutionDataById: (institutionId, sessionId, useSessionId) => ({
        pipe: () => ({})
      }),
      getInstitutionDataByShortName: (
        institutionShortName,
        sessionId,
        useSessionId
      ) => ({ pipe: () => ({}) }),
      getInstitutionPhotoById: (institutionId, sessionId, useSessionId) => ({
        pipe: () => ({})
      }),
      retrieveLookupList: systemSessionId => ({ pipe: () => ({}) }),
      retrieveAnonymousDepositFields: (id, sessionId) => ({})
    });
    const settingsFacadeServiceStub = () => ({
      getIsGuestRegAllowed: (sessionId, institutionId) => ({ pipe: () => ({}) })
    });
    const authFacadeServiceStub = () => ({
      getAuthSessionToken$: () => ({
        pipe: () => ({ pipe: () => ({ toPromise: () => ({}) }) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        InstitutionFacadeService,
        { provide: StorageStateService, useFactory: storageStateServiceStub },
        {
          provide: InstitutionApiService,
          useFactory: institutionApiServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: AuthFacadeService, useFactory: authFacadeServiceStub }
      ]
    });
    service = TestBed.inject(InstitutionFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('saveGuestSetting', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      const guestSettingStub: GuestSetting = <any>{};
      spyOn(storageStateServiceStub, 'updateStateEntity').and.callThrough();
      service.saveGuestSetting(guestSettingStub);
      expect(storageStateServiceStub.updateStateEntity).toHaveBeenCalled();
    });
  });

  describe('removeGuestSetting', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      spyOn(
        storageStateServiceStub,
        'deleteStateEntityByKey'
      ).and.callThrough();
      service.removeGuestSetting();
      expect(storageStateServiceStub.deleteStateEntityByKey).toHaveBeenCalled();
    });
  });

  describe('fetchInstitutionData', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      const institutionApiServiceStub: InstitutionApiService = TestBed.inject(
        InstitutionApiService
      );
      spyOn(storageStateServiceStub, 'updateStateEntity').and.callThrough();
      spyOn(institutionApiServiceStub, 'getInstitutionData').and.callThrough();
      service.fetchInstitutionData();
      expect(storageStateServiceStub.updateStateEntity).toHaveBeenCalled();
      expect(institutionApiServiceStub.getInstitutionData).toHaveBeenCalled();
    });
  });

  describe('retrieveAnonymousDepositFields', () => {
    it('makes expected calls', () => {
      const institutionApiServiceStub: InstitutionApiService = TestBed.inject(
        InstitutionApiService
      );
      const authFacadeServiceStub: AuthFacadeService = TestBed.inject(
        AuthFacadeService
      );
      spyOn(
        institutionApiServiceStub,
        'retrieveAnonymousDepositFields'
      ).and.callThrough();
      spyOn(authFacadeServiceStub, 'getAuthSessionToken$').and.callThrough();
      service.retrieveAnonymousDepositFields();
      expect(
        institutionApiServiceStub.retrieveAnonymousDepositFields
      ).toHaveBeenCalled();
      expect(authFacadeServiceStub.getAuthSessionToken$).toHaveBeenCalled();
    });
  });

  describe('clearCurrentInstitution', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      spyOn(
        storageStateServiceStub,
        'deleteStateEntityByKey'
      ).and.callThrough();
      service.clearCurrentInstitution();
      expect(storageStateServiceStub.deleteStateEntityByKey).toHaveBeenCalled();
    });
  });
});
