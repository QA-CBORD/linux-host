import { TestBed } from '@angular/core/testing';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserSettingsStateService } from '@core/states/user-settings/user-settings-state.service';
import { BarcodeService } from '@core/service/barcode/barcode.service';
import { Platform } from '@ionic/angular';
import { of, zip, from } from 'rxjs';
import { UserFacadeService } from './user.facade.service';
import { UserInfo } from '@core/model/user';

describe('UserFacadeService', () => {
  let service: UserFacadeService;
  let mockUserApiService: any;
  let mockStorageStateService: any;
  let mockNativeProvider: any;
  let mockSettingsFacadeService: any;
  let mockUserSettingsStateService: any;
  let mockBarcodeService: any;
  let mockPlatform: any;

  beforeEach(() => {
    mockUserApiService = {
      getUser: jest.fn(),
      addUserPhoto: jest.fn(),
      getUserAddresses: jest.fn(),
      createUserPin: jest.fn(),
      createUserPinTotp: jest.fn(),
      requestDeposit: jest.fn(),
      getPhotoListByUserId: jest.fn(),
      getUserPhoto: jest.fn(),
      updateUserPhotoStatus: jest.fn(),
      saveNotification$: jest.fn(),
      logoutAndRemoveUserNotification$: jest.fn(),
      updateUserInfo$: jest.fn(),
      reportCard$: jest.fn(),
      changePassword$: jest.fn(),
    };

    mockStorageStateService = {
      getStateEntityByKey$: jest.fn(),
      updateStateEntity: jest.fn(),
      clearState: jest.fn(),
      clearStorage: jest.fn(),
    };

    mockNativeProvider = {
      isIos: jest.fn(),
    };

    mockSettingsFacadeService = {
      getSetting: jest.fn(),
    };

    mockUserSettingsStateService = {
      clearState: jest.fn(),
    };

    mockBarcodeService = {
      encodePin: jest.fn(),
    };

    mockPlatform = {
      is: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        UserFacadeService,
        { provide: UserApiService, useValue: mockUserApiService },
        { provide: StorageStateService, useValue: mockStorageStateService },
        { provide: NativeProvider, useValue: mockNativeProvider },
        { provide: SettingsFacadeService, useValue: mockSettingsFacadeService },
        { provide: UserSettingsStateService, useValue: mockUserSettingsStateService },
        { provide: BarcodeService, useValue: mockBarcodeService },
        { provide: Platform, useValue: mockPlatform },
      ],
    });

    service = TestBed.inject(UserFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserData$', () => {
    it('should return the user data', () => {
      const mockUserData = { id: '123', userName: 'John Doe' } as UserInfo;

      jest.spyOn(service, 'getUserState$').mockReturnValue(of(mockUserData));

      service.getUserData$().subscribe(data => {
        expect(data).toEqual(mockUserData);
      });

      expect(service.getUserState$).toHaveBeenCalled();
    });
  });

  describe('getUserState$', () => {
    it('should return the user state from storage if valid and not expired', () => {
      const mockUserData = { id: '123', name: 'John Doe', lastModified: Date.now(), timeToLive: 60000 };
      const mockUserState = { key: 'get_user', value: mockUserData };

      jest.spyOn(mockStorageStateService, 'getStateEntityByKey$').mockReturnValue(of(mockUserState));

      service.getUserState$().subscribe(data => {
        expect(data).toEqual(mockUserData);
      });

      expect(mockStorageStateService.getStateEntityByKey$).toHaveBeenCalledWith('get_user');
    });

    it('should call getUser$ if user state is not valid or expired', () => {
      const mockUserData = { id: '123', userName: 'John Doe' } as UserInfo;
      const mockUserState = null;

      jest.spyOn(mockStorageStateService, 'getStateEntityByKey$').mockReturnValue(of(mockUserState));
      jest.spyOn(service, 'getUser$').mockReturnValue(of(mockUserData));

      service.getUserState$().subscribe(data => {
        expect(data).toEqual(mockUserData);
      });

      expect(mockStorageStateService.getStateEntityByKey$).toHaveBeenCalledWith('get_user');
      expect(service.getUser$).toHaveBeenCalled();
    });
  });

  // Add more test cases for the remaining methods
});
