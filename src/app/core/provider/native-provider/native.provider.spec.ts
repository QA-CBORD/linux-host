import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { NativeData, NativeProvider } from './native.provider';
import { TestBed } from '@angular/core/testing';
import { X_Y_REGEXP } from '@core/utils/regexp-patterns';

describe(NativeProvider, () => {
  let nativeProvider: NativeProvider;
  let platformMock;
  let routerMock;
  let modalControllerMock;
  let popoverControllerMock;
  let actionSheetControllerMock;
  let alertControllerMock;
  let zoneMock;

  beforeEach(() => {
    platformMock = {
      platforms: jest.fn(),
      is: jest.fn(),
    };
    routerMock = {
      url: '/dashboard',
      navigate: jest.fn(),
    };
    modalControllerMock = {
      getTop: jest.fn(),
      dismiss: jest.fn(),
    };
    popoverControllerMock = {
      getTop: jest.fn(),
      dismiss: jest.fn(),
    };
    actionSheetControllerMock = {
      getTop: jest.fn(),
      dismiss: jest.fn(),
    };
    alertControllerMock = {
      getTop: jest.fn(),
      dismiss: jest.fn(),
    };

    zoneMock = {
      run: jest.fn((callback: () => void) => callback()),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Platform, useValue: platformMock },
        { provide: Router, useValue: routerMock },
        { provide: ModalController, useValue: modalControllerMock },
        { provide: PopoverController, useValue: popoverControllerMock },
        { provide: ActionSheetController, useValue: actionSheetControllerMock },
        { provide: AlertController, useValue: alertControllerMock },
      ],
    });

    nativeProvider = TestBed.inject(NativeProvider);
  });

  it('should create the NativeProvider', () => {
    expect(nativeProvider).toBeTruthy();
  });

  describe('isAndroid', () => {
    it('should return true if the platform is Android', () => {
      platformMock.platforms.mockReturnValue(['android']);
      expect(nativeProvider.isAndroid()).toBe(true);
    });

    it('should return false if the platform is not Android', () => {
      platformMock.platforms.mockReturnValue(['ios']);
      expect(nativeProvider.isAndroid()).toBe(false);
    });
  });

  describe('isIos', () => {
    it('should return true if the platform is iOS', () => {
      platformMock.platforms.mockReturnValue(['ios']);
      expect(nativeProvider.isIos()).toBe(true);
    });

    it('should return false if the platform is not iOS', () => {
      platformMock.platforms.mockReturnValue(['android']);
      expect(nativeProvider.isIos()).toBe(false);
    });
  });

  describe('isWeb', () => {
    it('should return true if the platform is not Cordova', () => {
      platformMock.is.mockReturnValue(false);
      expect(nativeProvider.isWeb()).toBe(true);
    });

    it('should return false if the platform is Cordova', () => {
      platformMock.is.mockReturnValue(true);
      expect(nativeProvider.isWeb()).toBe(false);
    });
  });

  describe('isMobile', () => {
    it('should return true if the platform is Cordova', () => {
      platformMock.is.mockReturnValue(true);
      expect(nativeProvider.isMobile()).toBe(true);
    });

    it('should return false if the platform is not Cordova', () => {
      platformMock.is.mockReturnValue(false);
      expect(nativeProvider.isMobile()).toBe(false);
    });
  });

  describe('dismissTopControllers', () => {
    it('should dismiss the top modal, popover, action sheet, and alert controller', async () => {
      const modalMock = { dismiss: jest.fn() };
      const popoverMock = { dismiss: jest.fn() };
      const actionSheetMock = { dismiss: jest.fn() };
      const alertMock = { dismiss: jest.fn() };
      modalControllerMock.getTop.mockResolvedValue(modalMock as any);
      popoverControllerMock.getTop.mockResolvedValue(popoverMock as any);
      actionSheetControllerMock.getTop.mockResolvedValue(actionSheetMock as any);
      alertControllerMock.getTop.mockResolvedValue(alertMock as any);

      await nativeProvider.dismissTopControllers();

      expect(modalMock.dismiss).toHaveBeenCalled();
      expect(popoverMock.dismiss).toHaveBeenCalled();
      expect(actionSheetMock.dismiss).toHaveBeenCalled();
      expect(alertMock.dismiss).toHaveBeenCalled();
    });

    it('should not dismiss the popover if keepPopover is set to true', async () => {
      const popoverMock = { dismiss: jest.fn() };
      popoverControllerMock.getTop.mockResolvedValue(popoverMock as any);

      await nativeProvider.dismissTopControllers(true);

      expect(popoverMock.dismiss).not.toHaveBeenCalled();
    });

    it('should not dismiss the modal if keepModal is set to true', async () => {
      const modalMock = { dismiss: jest.fn() };
      modalControllerMock.getTop.mockResolvedValue(modalMock as any);

      await nativeProvider.dismissTopControllers(false, true);

      expect(modalMock.dismiss).not.toHaveBeenCalled();
    });

    it('should update the previousRoute property with the current router URL', () => {
      nativeProvider.updatePreviousRoute();

      expect(nativeProvider['previousRoute']).toBe('/dashboard');
    });

    it('should return the result of the native Android method call', () => {
      const methodName = NativeData.SESSION_ID;
      const expectedData = 'session123';

      // Mock the androidInterface object
      const androidInterfaceMock = {
        [methodName]: jest.fn().mockReturnValue(expectedData),
      };
      (global as any).androidInterface = androidInterfaceMock;

      const result = nativeProvider.getAndroidData<string>(methodName);

      expect(result).toBe(expectedData);
      expect(androidInterfaceMock[methodName]).toHaveBeenCalled();
    });

    it('should return null if the native Android method call returns undefined', () => {
      const methodName = NativeData.SESSION_ID;

      // Mock the androidInterface object
      const androidInterfaceMock = {
        [methodName]: jest.fn().mockReturnValue(undefined),
      };
      (global as any).androidInterface = androidInterfaceMock;

      const result = nativeProvider.getAndroidData<string>(methodName);

      expect(result).toBeNull();
      expect(androidInterfaceMock[methodName]).toHaveBeenCalled();
    });

    it('should dismiss top controllers and perform native navigation', async () => {
      // Mock the modalController, popoverController, and alertCtrl
      modalControllerMock.getTop = jest.fn(() => Promise.resolve({ dismiss: jest.fn() }));
      popoverControllerMock.getTop = jest.fn(() => Promise.resolve({ dismiss: jest.fn() }));
      actionSheetControllerMock.getTop = jest.fn(() => Promise.resolve({ dismiss: jest.fn() }));
      alertControllerMock.getTop = jest.fn(() => Promise.resolve({ dismiss: jest.fn() }));

      // Call the method
      await nativeProvider.onNativeBackClicked();

      // Verify that the dismiss methods were called on the controllers
      expect(modalControllerMock.getTop).toHaveBeenCalled();
      expect(popoverControllerMock.getTop).toHaveBeenCalled();
      expect(actionSheetControllerMock.getTop).toHaveBeenCalled();
      expect(alertControllerMock.getTop).toHaveBeenCalled();
    });

    it('should generate a valid UUID', () => {
      const uuid = nativeProvider['generateUUID']();
      const regex = new RegExp(X_Y_REGEXP);

      expect(regex.test(uuid)).toBe(false);
    });

    it('should return the patron barcode on iOS', done => {
      nativeProvider['isAndroid'] = jest.fn(() => false);
      nativeProvider['isIos'] = jest.fn(() => true);
      nativeProvider['getIosData'] = jest.fn(() => Promise.resolve('67890'));

      nativeProvider.getPatronBarcode().subscribe(barcode => {
        expect(nativeProvider['isAndroid']).toHaveBeenCalled();
        expect(nativeProvider['isIos']).toHaveBeenCalled();
        expect(nativeProvider['getIosData']).toHaveBeenCalledWith(NativeData.BARCODE);
        expect(barcode).toBe('67890');
        done();
      });
    });

    it('should throw an error if not running on a native device', done => {
      nativeProvider['isAndroid'] = jest.fn(() => false);
      nativeProvider['isIos'] = jest.fn(() => false);

      nativeProvider.getPatronBarcode().subscribe(
        () => {},
        error => {
          expect(nativeProvider['isAndroid']).toHaveBeenCalled();
          expect(nativeProvider['isIos']).toHaveBeenCalled();
          expect(error).toEqual(new Error('This is not a native device'));
          done();
        }
      );
    });

    it('should set the keepTopModal value correctly', () => {
      // Arrange
      const mockValue = true;
  
      // Act
      nativeProvider.setKeepTopModal = mockValue;
  
      // Assert
      expect(nativeProvider.getKeepTopModal).toEqual(mockValue);
    });
    
  });
});
