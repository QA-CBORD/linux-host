import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonService } from './common.service';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { UserInfo, UserPhotoInfo } from '@core/model/user';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { MessageProxy } from './injectable-message.proxy';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { AuthenticationInfo } from '@core/model/authentication/authentication-info.model';
import { DomSanitizer } from '@angular/platform-browser';

const ilustrationPath = '/assets/images/card_background_illustration.svg';
const mockInfo = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  externalId: '1',
  id: '1234',
  insertTime: '10:00:01',
  lastUpdated: '10:00:01',
  mimeType: 'JPEG',
  status: 1,
  statusReason: '1',
  type: 1,
  userId: '1234',
  institutionId: '12345565',
  version: 1,
} as UserPhotoInfo;

const institutionInfo = {
  active: true,
  name: 'Odysey With USAPay',
  authenticationInfo: {
    authenticationType: 'CAS',
    casLoginURL: '',
    casLogoutURL: '',
    casValidateURL: '',
    cookieName: 'login',
    fieldCashlessID: '',
    fieldEmail: '',
    logoutURL: '',
    showPreloginPage: true,
  } as AuthenticationInfo,
  authenticationSystemType: 1,
  cashlessPaymentSystemType: 1,
  id: '1234',
  imageBannerFull: '',
  lastChangedTerms: new Date(),
  payWithGETOnly: true,
  type: 1,
} as Institution;

const bgColor = '019019';

JSON.parse = jest.fn().mockImplementationOnce(() => {
  return {
    'native-header-bg': bgColor,
  };
});

describe(CommonService, () => {
  let service: CommonService;
  let _institutionFacadeService,
    _settingsFacadeService,
    _authFacadeService,
    _userFacadeService,
    _contentStringFacadeService,
    _messageProxy;

  beforeEach(() => {
    _institutionFacadeService = {
      getInstitutionPhoto$: jest.fn((instId, sessId, status) =>
        of({
          ...mockInfo,
          insertTime: new Date(),
          lastUpdated: new Date(),
          institutionId: '12345',
        } as InstitutionPhotoInfo)
      ),
      getInstitutionPhotoById$: jest.fn(() =>
        of({
          ...mockInfo,
          insertTime: new Date(),
          lastUpdated: new Date(),
          institutionId: '12345',
        } as InstitutionPhotoInfo)
      ),
      cachedInstitutionInfo$: { pipe: jest.fn(() => of('123456')) },
      getInstitutionInfo$: jest.fn(() => of(institutionInfo)),
      getInstitutionDataById$: jest.fn(() => of(institutionInfo)),
    };
    _settingsFacadeService = {
      getSetting: jest.fn(() =>
        of({
          category: '1',
          contentMediaType: 1,
          description: '',
          domain: '',
          id: '',
          name: '',
          value: '',
        } as SettingInfo)
      ),
      fetchSetting: jest.fn(() =>
        of({
          category: '1',
          contentMediaType: 1,
          description: '',
          domain: '',
          id: '',
          name: '',
          value: '',
        } as SettingInfo)
      ),
    };
    _authFacadeService = {
      getAuthSessionToken$: jest.fn(() => of('1234567890')),
    };
    _userFacadeService = {
      getUserData$: jest.fn(() =>
        of({
          active: true,
          cashlessMediaStatus: 1,
          email: 'example@mail.com',
          emailBounceMessage: 'example@mail.com',
          emailBounceStatus: 'ok',
          firstName: 'Example',
          guestUser: true,
          hasCashlessCard: false,
          id: '12345',
          institutionId: 'XQ00wjj1111',
          lastName: 'Jobs',
          lastUpdatedCashless: new Date(),
          lastUpdatedProfile: new Date(),
          locale: 'ES',
          middleName: 'Steve',
          objectRevision: 1,
          phone: '409-090-0900',
          staleProfile: true,
          status: 1,
          timeZone: 'AST',
          userName: 'getaws@cbord.com',
          userNotificationInfoList: [],
        } as UserInfo)
      ),
      getAcceptedPhoto$: jest.fn(() =>
        of({
          ...mockInfo,
        } as UserPhotoInfo)
      ),
    };
    _contentStringFacadeService = {
      fetchContentStringModel: jest.fn(() =>
        of({
          forgotPassword: 'Forgot Password',
        })
      ),
    };
    _messageProxy = {
      put: jest.fn(),
      get: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: InstitutionFacadeService, useValue: _institutionFacadeService },
        { provide: SettingsFacadeService, useValue: _settingsFacadeService },
        { provide: AuthFacadeService, useValue: _authFacadeService },
        { provide: UserFacadeService, useValue: _userFacadeService },
        { provide: ContentStringsFacadeService, useValue: _contentStringFacadeService },
        { provide: MessageProxy, useValue: _messageProxy },
      ],
    });

    service = TestBed.inject(CommonService);
  });

  afterEach(() => {
    _userFacadeService.getAcceptedPhoto$.mockReset();
    _messageProxy.get.mockReset();
    _settingsFacadeService.getSetting.mockReset();
  })

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return a the institution photo', async () => {
    const safeUrl = await service.getInstitutionPhoto(false, {
      sanitize: () => 'safeString',
      bypassSecurityTrustHtml: () => 'safeString',
      bypassSecurityTrustStyle: () => '',
      bypassSecurityTrustScript: () => '',
      bypassSecurityTrustUrl: () => '',
      bypassSecurityTrustResourceUrl: () => 'https://www.google.com',
    });
    expect(safeUrl).toBeTruthy();
  });

  it('should return a the institution photo', async () => {
    const safeUrl = await service.getInstitutionPhoto(true, null);
    expect(safeUrl).toBeTruthy();
  });

  it('should return the institution background svg image ', async () => {
    const image = await service.getInstitutionBackgroundImage();
    expect(image).toEqual(ilustrationPath);
  });

  it('should return a valid session Id', async () => {
    const id = await service.sessionId();
    expect(id).toEqual('1234567890');
  });

  it('should return content string', async () => {
    expect(service.getString(ContentStringCategory.identifyRecipient)).toBeTruthy();
  });

  it('should return content string with category', async () => {
    _messageProxy.get = jest.fn().mockImplementationOnce(() => {
      return of({
        [ContentStringCategory.identifyRecipient]: 'hello world'
      })
    });
    expect(service.getString(ContentStringCategory.identifyRecipient)).toBeTruthy();
  });

  it('should return content string', async () => {
    const spy1 = jest.spyOn(_contentStringFacadeService as any, 'fetchContentStringModel');
    expect(service.loadContentString(ContentStringCategory.identifyRecipient)).toBeTruthy();
    expect(spy1).toBeCalledTimes(1);
  });

  it('should return institution`s name', async () => {
    const name = await service.getInstitutionName();
    expect(name).toEqual(institutionInfo.name);
  });

  it('should return institution info', async () => {
    const institution = await service.getInstitution();
    expect(institution.id).toEqual(institutionInfo.id);
    expect(institution.authenticationInfo.cookieName).toEqual(institutionInfo.authenticationInfo.cookieName);
  });

  it('should return institution bgColor', async () => {
    const color = await service.getInstitutionBgColor();
    expect(color).toEqual(`#${bgColor}`);
  });

  it('should return institution bgColor null', async () => {
    _settingsFacadeService.getSetting = jest.fn().mockImplementationOnce(() => {
      return of({ value: null })
    });
    
    const color = await service.getInstitutionBgColor();
    expect(color).toEqual(undefined);
  });

  it('should return default institution bgColor', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return {
        'native-header-bg': null,
      };
    });

    const color = await service.getInstitutionBgColor();
    expect(color).toEqual(`#166dff`);
  });
});
