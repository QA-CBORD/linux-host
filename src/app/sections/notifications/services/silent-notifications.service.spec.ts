import { TestBed } from '@angular/core/testing';

import { SilentNotificationService } from './silent-notification.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

describe('SilentNotificationsHandlerService', () => {
  let service: SilentNotificationService;
 
  const nativeProvider = {
    isIos: jest.fn(() => true),
    isAndroid: jest.fn(() => true),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NativeProvider, useValue: nativeProvider },
      ]});
    service = TestBed.inject(SilentNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
