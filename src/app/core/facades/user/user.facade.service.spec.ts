import { TestBed } from '@angular/core/testing';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserSettingsStateService } from '@core/states/user-settings/user-settings-state.service';
import { BarcodeService } from '@core/service/barcode/barcode.service';
import { Platform } from '@ionic/angular';
import { of, lastValueFrom } from 'rxjs';
import { UserFacadeService } from './user.facade.service';
import { UserInfo, UserPhotoInfo, UserPhotoList } from '@core/model/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddressInfo } from '@core/model/address/address-info';
import { Device } from '@capacitor/device';
import { MessageResponse } from '@core/model/service/message-response.model';
import { getPhotoDataUrl } from '@core/operators/images.operators';
import { Settings } from 'src/app/app.global';
import { UserNotificationsFacadeService } from '../notifications/user-notifications.service';


jest.mock('@capacitor/device', () => ({
  Device: {
    getId: jest.fn(),
  },
}));

jest.mock('@core/operators/images.operators', () => ({
  getPhotoDataUrl: jest.fn(() => (source$) => source$)
}));

jest.mock('@capacitor/push-notifications', () => ({
  Token: jest.fn(),
  PushNotifications:  jest.fn(),
  PushNotificationSchema: jest.fn(),
}));

describe('UserFacadeService', () => {
  let service: UserFacadeService;
  let mockUserApiService: any;
  let mockStorageStateService: any;
  let mockNativeProvider: any;
  let mockSettingsFacadeService: any;
  let mockUserSettingsStateService: any;
  let mockBarcodeService: any;
  let mockPlatform: any;
  let mockPingEncoderService: any;
  let mockPushNotifications: any;
  let mockUserNotificationsFacadeService: any;

  beforeEach(() => {
    mockUserNotificationsFacadeService = {
      fetchNotifications: jest.fn()
    };

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
      retrievePendingOrRejectedUserPhoto: jest.fn(),
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

    mockPingEncoderService = {
      encodePin: jest.fn(),
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
        { provide: BarcodeService, useValue: mockPingEncoderService },
        { provide: UserNotificationsFacadeService, useValue: mockUserNotificationsFacadeService },
      ],
      imports: [HttpClientTestingModule],
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

  it('should add user photo and return response', async () => {
    const mockUserData = { id: '123' } as UserInfo;
    const mockPhoto = {} as UserPhotoInfo;
    const mockResponse = { response: true };

    jest.spyOn(service, 'getUserData$').mockReturnValue(of(mockUserData));
    mockUserApiService.addUserPhoto.mockReturnValue(of(mockResponse));

    const result = await lastValueFrom(service.addUserPhoto(mockPhoto));

    expect(result).toBe(true);
    expect(service.getUserData$).toHaveBeenCalled();
    expect(mockUserApiService.addUserPhoto).toHaveBeenCalledWith(mockUserData.id, mockPhoto);
  });

  it('should get user addresses and update state entity', async () => {
    const mockAddresses = [
      {
        id: '1',
        address1: '',
        city: 'Springfield',
        state: 'IL',
      },
    ] as AddressInfo[];

    mockUserApiService.getUserAddresses.mockReturnValue(of(mockAddresses));

    const result = await lastValueFrom(service.getUserAddresses$());
    expect(result).toEqual(mockAddresses);
    expect(mockUserApiService.getUserAddresses).toHaveBeenCalled();
    expect(mockStorageStateService.updateStateEntity).toHaveBeenCalled();
  });

  it('should encode pin and create user pin', async () => {
    const mockPin = '1234';
    const mockEncryptedPin = 'encrypted1234';
    const mockResponse = true;

    mockPingEncoderService.encodePin.mockReturnValue(of(mockEncryptedPin));
    jest.spyOn(service, 'createUserPin').mockReturnValue(of(mockResponse));

    const result = await lastValueFrom(service.createUserPinTotp(mockPin));
    expect(result).toBe(mockResponse);
    expect(mockPingEncoderService.encodePin).toHaveBeenCalledWith(mockPin);
    expect(service.createUserPin).toHaveBeenCalledWith(mockEncryptedPin);
  });

  describe('createUserPin', () => {
    it('should create user pin with device identifier', async () => {
      const mockPin = '1234';
      const mockDeviceId = { identifier: 'device123' };
      const mockResponse = { response: true };

      jest.spyOn(Device, 'getId').mockReturnValue(Promise.resolve(mockDeviceId));
      mockUserApiService.createUserPin.mockReturnValue(of(mockResponse));

      const result = await lastValueFrom(service.createUserPin(mockPin));
      expect(result).toBe(mockResponse.response);
      expect(mockUserApiService.createUserPin).toHaveBeenCalledWith(mockPin, mockDeviceId.identifier);
    });
  });

  // Existing test cases
  it('should get user addresses and update state entity', async () => {
    const mockAddresses = [{}];
    const userAddressKey = 'user_addresses';

    mockUserApiService.getUserAddresses.mockReturnValue(of(mockAddresses));

    const result = await lastValueFrom(service.getUserAddresses$());
    expect(result).toEqual(mockAddresses);
    expect(mockUserApiService.getUserAddresses).toHaveBeenCalled();
    expect(mockStorageStateService.updateStateEntity).toHaveBeenCalled();
  });

  it('should encode pin and create user pin', async () => {
    const mockPin = '1234';
    const mockEncryptedPin = 'encrypted1234';
    const mockResponse = true;

    mockPingEncoderService.encodePin.mockReturnValue(of(mockEncryptedPin));
    jest.spyOn(service, 'createUserPin').mockReturnValue(of(mockResponse));

    const result = await lastValueFrom(service.createUserPinTotp(mockPin));
    expect(result).toBe(mockResponse);
    expect(mockPingEncoderService.encodePin).toHaveBeenCalledWith(mockPin);
    expect(service.createUserPin).toHaveBeenCalledWith(mockEncryptedPin);
  });

  it('should request a deposit with the correct parameters', async () => {
    const recipientName = 'John Doe';
    const recipientEmail = 'john.doe@example.com';
    const message = 'Happy Birthday!';
    const depositToAccountId = 'account123';
    const requestAmount = '100';
    const mockResponse = { success: true };

    mockUserApiService.requestDeposit.mockReturnValue(of(mockResponse));

    const result = await lastValueFrom(
      service.requestDeposit$(
        recipientName,
        recipientEmail,
        message,
        depositToAccountId,
        requestAmount
      )
    );

    expect(result).toEqual(mockResponse);
    expect(mockUserApiService.requestDeposit).toHaveBeenCalledWith(
      recipientName,
      recipientEmail,
      message,
      depositToAccountId,
      requestAmount
    );
  });

  it('should return the photo list for the user', async () => {
    const mockUserInfo = { id: '1' } as UserInfo;
    const mockPhotoList = { empty: false, list: [{ id: '1' }, { id: '2' }] } as UserPhotoList;
  
    
    jest.spyOn(service, 'getUserData$').mockReturnValue(of(mockUserInfo));
    jest.spyOn(mockUserApiService, 'getPhotoListByUserId').mockReturnValue(of({
      response: mockPhotoList
    } as MessageResponse<UserPhotoList>));
    
    const result = await lastValueFrom(service.getPhotoList());
  
    expect(result).toEqual(mockPhotoList);
    expect(service.getUserData$).toHaveBeenCalled();
    expect(mockUserApiService.getPhotoListByUserId).toHaveBeenCalledWith(mockUserInfo.id);
  });

  it('should retrieve pending or rejected photo', async () => {
    const mockUserInfo = { id: '1' } as UserInfo;
    const mockPhotoInfo = { id: '1', status:  1} as UserPhotoInfo;
    const mockResponse = { response: mockPhotoInfo } as MessageResponse<UserPhotoInfo>;
  
    jest.spyOn(service, 'getUserData$').mockReturnValue(of(mockUserInfo));
    jest.spyOn(mockUserApiService, 'retrievePendingOrRejectedUserPhoto').mockReturnValue(of(mockResponse));
  
    const result = await lastValueFrom(service.getPendingOrRejectedPhoto());
  
    expect(result).toEqual(mockPhotoInfo);
    expect(service.getUserData$).toHaveBeenCalled();
    expect(mockUserApiService.retrievePendingOrRejectedUserPhoto).toHaveBeenCalledWith(mockUserInfo.id);
  });

  it('should retrieve photo by id', async () => {
    const photoId = '123';
    const mockPhotoInfo = { id: photoId, status: 2 } as UserPhotoInfo;
    const mockResponse = { response: mockPhotoInfo } as MessageResponse<UserPhotoInfo>;
  
    jest.spyOn(mockUserApiService, 'getUserPhoto').mockReturnValue(of(mockResponse));
  
    const result = await lastValueFrom(service.getPhotoById(photoId));
  
    expect(result).toEqual(mockPhotoInfo);
    expect(mockUserApiService.getUserPhoto).toHaveBeenCalledWith(photoId);
  });

  it('should retrieve accepted photo data URL', async () => {
    const mockPhotoInfo = { id: '1', status: 2 } as UserPhotoInfo;
    const mockResponse = { response: mockPhotoInfo } as MessageResponse<UserPhotoInfo>;
    const mockDataUrl = 'data:image/png;base64,...';

    jest.spyOn(mockUserApiService, 'getUserPhoto').mockReturnValue(of(mockResponse));
    (getPhotoDataUrl as jest.Mock).mockReturnValue(() => of(mockDataUrl));

    const result = await lastValueFrom(service.getAcceptedPhoto$());

    expect(result).toEqual(mockDataUrl);
    expect(mockUserApiService.getUserPhoto).toHaveBeenCalledWith(null);
    expect(getPhotoDataUrl).toHaveBeenCalled();
  });

  describe('isApplePayEnabled$', () => {
    it('should return true if iOS and setting is enabled', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(true);
      const mockSetting = { value: '1' };
      jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(mockSetting));
  
      const result = await lastValueFrom(service.isApplePayEnabled$());
  
      expect(result).toBe(true);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.APPLE_PAY_ENABLED);
    });
  
    it('should return false if iOS and setting is disabled', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(true);
      const mockSetting = { value: '0' };
      jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(mockSetting));
  
      const result = await lastValueFrom(service.isApplePayEnabled$());
  
      expect(result).toBe(false);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.APPLE_PAY_ENABLED);
    });
  
    it('should return false if not iOS', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(false);
  
      const result = await lastValueFrom(service.isApplePayEnabled$());
  
      expect(result).toBe(false);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).not.toHaveBeenCalled();
    });
  });

  describe('isAppleWalletEnabled$', () => {
    it('should return true if iOS and setting is enabled', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(true);
      const mockSetting = { value: '1' };
      jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(mockSetting));
  
      const result = await lastValueFrom(service.isAppleWalletEnabled$());
  
      expect(result).toBe(true);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.APPLE_WALLET_ENABLED);
    });
  
    it('should return false if iOS and setting is disabled', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(true);
      const mockSetting = { value: '0' };
      jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(mockSetting));
  
      const result = await lastValueFrom(service.isAppleWalletEnabled$());
  
      expect(result).toBe(false);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.APPLE_WALLET_ENABLED);
    });
  
    it('should return false if not iOS', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(false);
  
      const result = await lastValueFrom(service.isAppleWalletEnabled$());
  
      expect(result).toBe(false);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).not.toHaveBeenCalled();
    });
  });

  describe('isAppleWalletEnabled$', () => {
    it('should return true if iOS and setting is enabled', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(true);
      const mockSetting = { value: '1' };
      jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(mockSetting));
  
      const result = await lastValueFrom(service.isAppleWalletEnabled$());
  
      expect(result).toBe(true);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.APPLE_WALLET_ENABLED);
    });
  
    it('should return false if iOS and setting is disabled', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(true);
      const mockSetting = { value: '0' };
      jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(mockSetting));
  
      const result = await lastValueFrom(service.isAppleWalletEnabled$());
  
      expect(result).toBe(false);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).toHaveBeenCalledWith(Settings.Setting.APPLE_WALLET_ENABLED);
    });
  
    it('should return false if not iOS', async () => {
      jest.spyOn(mockNativeProvider, 'isIos').mockReturnValue(false);
  
      const result = await lastValueFrom(service.isAppleWalletEnabled$());
  
      expect(result).toBe(false);
      expect(mockNativeProvider.isIos).toHaveBeenCalled();
      expect(mockSettingsFacadeService.getSetting).not.toHaveBeenCalled();
    });
  });

  describe('getPhotoIdByStatus', () => {
    it('should return the photo with the specified status', () => {
      const photoList = [
        { id: '1', status: 1 },
        { id: '2', status: 2 },
        { id: '3', status: 1 }
      ] as UserPhotoInfo[];

      const result = service['getPhotoIdByStatus'](photoList, 2);

      expect(result).toEqual({ id: '2', status: 2 });
    });

    it('should return undefined if no photo with the specified status is found', () => {
      const photoList = [
        { id: '1', status: 1 },
        { id: '2', status: 1 }
      ] as UserPhotoInfo[];

      const result = service['getPhotoIdByStatus'](photoList, 3);

      expect(result).toBeUndefined();
    });
  });

  it('should return true if the API call is successful', async () => {
    const mockResponse = { response: true };
    jest.spyOn(mockUserApiService, 'updateUserPhotoStatus').mockReturnValue(of(mockResponse));

    const result = await lastValueFrom(service.updateUserPhotoStatus('photoId', 1, 'reason'));

    expect(result).toBe(true);
    expect(mockUserApiService.updateUserPhotoStatus).toHaveBeenCalledWith('photoId', 1, 'reason');
  });

  it('should return false if the API call is unsuccessful', async () => {
    const mockResponse = { response: false };
    jest.spyOn(mockUserApiService, 'updateUserPhotoStatus').mockReturnValue(of(mockResponse));

    const result = await lastValueFrom(service.updateUserPhotoStatus('photoId', 1, 'reason'));

    expect(result).toBe(false);
    expect(mockUserApiService.updateUserPhotoStatus).toHaveBeenCalledWith('photoId', 1, 'reason');
  });
});
