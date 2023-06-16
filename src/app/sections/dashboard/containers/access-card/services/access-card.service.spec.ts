import { TestBed } from '@angular/core/testing';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { CommonService } from '@shared/services/common.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { AccessCardService } from './access-card.service';

describe('AccessCardService', () => {
  let service: AccessCardService;

  beforeEach(() => {
    const nativeProviderStub = () => ({
      isIos: () => ({}),
      getIosData: aPPLE_WALLET_INFO => ({})
    });
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ pipe: () => ({}) })
    });
    const institutionFacadeServiceStub = () => ({
      getInstitutionInfo$: institutionId => ({}),
      getInstitutionPhoto$: institutionId => ({}),
      cachedInstitutionInfo$: { pipe: () => ({}) }
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: mOBILE_HEADER_COLOR => ({ pipe: () => ({}) })
    });
    const commonServiceStub = () => ({
      getUserName: () => ({}),
      getUserPhoto: () => ({})
    });
    const environmentFacadeServiceStub = () => ({ getImageURL: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AccessCardService,
        { provide: NativeProvider, useFactory: nativeProviderStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(AccessCardService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserName', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
     jest.spyOn(commonServiceStub, 'getUserName');
      service.getUserName();
      expect(commonServiceStub.getUserName).toHaveBeenCalled();
    });
  });

  describe('getUserPhoto', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = TestBed.inject(CommonService);
     jest.spyOn(commonServiceStub, 'getUserPhoto');
      service.getUserPhoto();
      expect(commonServiceStub.getUserPhoto).toHaveBeenCalled();
    });
  });

  describe('getInstitutionName', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      const institutionFacadeServiceStub: InstitutionFacadeService = TestBed.inject(
        InstitutionFacadeService
      );
     jest.spyOn(userFacadeServiceStub, 'getUserData$');
     jest.spyOn(
        institutionFacadeServiceStub,
        'getInstitutionInfo$'
      );
      service.getInstitutionName();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
      expect(
        institutionFacadeServiceStub.getInstitutionInfo$
      ).toHaveBeenCalled();
    });
  });

  describe('getInstitutionImage', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      const institutionFacadeServiceStub: InstitutionFacadeService = TestBed.inject(
        InstitutionFacadeService
      );
     jest.spyOn(userFacadeServiceStub, 'getUserData$');
     jest.spyOn(
        institutionFacadeServiceStub,
        'getInstitutionPhoto$'
      );
      service.getInstitutionImage();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
      expect(
        institutionFacadeServiceStub.getInstitutionPhoto$
      ).toHaveBeenCalled();
    });
  });

  describe('getInstitutionBackgroundImage', () => {
    it('makes expected calls', () => {
      const environmentFacadeServiceStub: EnvironmentFacadeService = TestBed.inject(
        EnvironmentFacadeService
      );
     jest.spyOn(environmentFacadeServiceStub, 'getImageURL');
      service.getInstitutionBackgroundImage();
      expect(environmentFacadeServiceStub.getImageURL).toHaveBeenCalled();
    });
  });

  describe('getInstitutionColor', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      service.getInstitutionColor();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });

  describe('isGETMyCardEnabled', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      service.isGETMyCardEnabled();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });

  describe('isMobileAccessEnable', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(settingsFacadeServiceStub, 'getSetting');
      service.isMobileAccessEnable();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });

  describe('isAppleWalletEnabled', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = TestBed.inject(NativeProvider);
     jest.spyOn(nativeProviderStub, 'isIos');
     jest.spyOn(nativeProviderStub, 'getIosData');
      service.isAppleWalletEnabled();
      expect(nativeProviderStub.isIos).toHaveBeenCalled();
      expect(nativeProviderStub.getIosData).toHaveBeenCalled();
    });
  });
});
