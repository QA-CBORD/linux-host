import { TestBed } from '@angular/core/testing';

import { SilentNotificationService } from './silent-notification.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

describe('SilentNotificationsHandlerService', () => {
  let service: SilentNotificationService;
 
  const nativeProvider = {
    isIos: jest.fn().mockReturnValue(false),
    isAndroid: jest.fn(() => true),
  };

  const userFacadeMock = {};

  beforeEach(() => {
    const MockDevicePlugin = {
      addListener: jest.fn().mockResolvedValue({ model: 'Mocked Device Model' })
    };

    jest.mock('@capacitor/core', () => ({
      registerPlugin: jest.fn().mockImplementation((pluginName: string) => {
        if (pluginName === 'IOSDevice' || pluginName === 'AndroidDevice') {
          return MockDevicePlugin;
        } 
        return {}; // Or any other default mock for other plugins
      })
    }));

    TestBed.configureTestingModule({
      providers: [
        { provide: NativeProvider, useValue: nativeProvider },
        { provide: UserFacadeService, useValue: userFacadeMock },
      ]});
    service = TestBed.inject(SilentNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
