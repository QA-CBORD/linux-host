import { TestBed } from '@angular/core/testing';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { HIDWalletCredentialManager } from './hid-wallet-credential-manager';
import { HIDPlugginProxy } from './hid-plugin.proxy';
import { EndpointStatuses } from '../../shared/credential-state';
import { registerPlugin } from '@capacitor/core';

jest.mock('@capacitor/core', () => {
  const actualCapacitor = jest.requireActual('@capacitor/core');

  const plugins = {
    HIDPlugin: {
      isEndpointSetup: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      setupEndpoint: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      hasWalletCards: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      deleteEndpoint: jest.fn(),
    },
    MobileCredentialStatusPlugin: {
      deviceNativeState: jest.fn().mockResolvedValue({
        deviceState: {
          nfcOn: true,
        },
      }),
    },
  };

  return {
    ...actualCapacitor,
    registerPlugin: jest.fn().mockImplementation(pluginName => {
      return plugins[pluginName] || {};
    }),
  };
});

describe('HIDWalletCredentialManager', () => {
  let service: HIDWalletCredentialManager;
  let modalCtrl: ModalController;
  let alertCtrl: AlertController;
  let popoverCtrl: PopoverController;
  let toastService: ToastController;
  let loadingService: LoadingService;
  let credentialService: HidCredentialDataService;

  beforeEach(() => {
    const hidPlugginProxyMock = {
      taskExecutionObs$: of(EndpointStatuses.PROVISIONED_ACTIVE),
    };

    const MockDevicePlugin = {
      addListener: jest.fn().mockResolvedValue({ model: 'Mocked Device Model' }),
    };

    TestBed.configureTestingModule({
      providers: [
        HIDWalletCredentialManager,
        { provide: HIDPlugginProxy, useValue: hidPlugginProxyMock },
        { provide: ModalController, useValue: { create: jest.fn().mockReturnValue({ present: jest.fn() }) } },
        { provide: AlertController, useValue: { create: jest.fn().mockReturnValue({ present: jest.fn() }) } },
        { provide: PopoverController, useValue: {} },
        { provide: ToastController, useValue: {} },
        {
          provide: LoadingService,
          useValue: { closeSpinner: jest.fn(), showLoading: jest.fn(), notLoading: jest.fn() },
        },
        {
          provide: HidCredentialDataService,
          useValue: {
            deleteCredential$: jest.fn(),
            updateCachedCredential$: jest.fn(),
            unloadContentStrings: jest.fn(),
            getContents: jest.fn().mockResolvedValue({
              alreadyInstalledDialogString$: { title: 'title', message: 'message' },
              installErorDialogString$: { title: 'title', mContent: 'message' },
              nfcDialogString$: { title: 'title', mContent: 'message', cancelTxt: 'cancel', acceptTxt: 'accept' },
            }),
            getEndpointStateFromLocalCache: jest.fn().mockResolvedValue({ deletionPermissionGranted: jest.fn() }),
            setUicString$: jest.fn().mockReturnValue(null),
            activePasses$: jest.fn().mockReturnValue(
              of({
                passes: { android_hid: 0, android_nxp: 0, iPhone: 0, iWatch: 0, android_hid_wallet: 1 },
                credStatus: { android_hid: 0, android_nxp: 0, iPhone: 0, iWatch: 0, android_hid_wallet: 20 },
                referenceIdentifier: 'FAPLOSc1140230-cd12-4202-9dc4-b5e0fc8feabf_000000009925',
                setUicString$: jest.fn().mockReturnValue(null),
              })
            ),
          },
        },
      ],
    });

    service = TestBed.inject(HIDWalletCredentialManager);
    modalCtrl = TestBed.inject(ModalController);
    alertCtrl = TestBed.inject(AlertController);
    popoverCtrl = TestBed.inject(PopoverController);
    toastService = TestBed.inject(ToastController);
    loadingService = TestBed.inject(LoadingService);
    credentialService = TestBed.inject(HidCredentialDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call onWillLogout and stop task execution', async () => {
    const stopTaskExecutionSpy = jest.spyOn(service['hidSdkManager'](), 'stopTaskExecution');
    await service.onWillLogout();
    expect(stopTaskExecutionSpy).not.toHaveBeenCalled();
  });

  it('should handle onUiImageClicked with credential availability check', async () => {
    const validateAndInstallSpy = jest.spyOn(service as any, 'validateAndInstall');
    await service.onUiImageClicked({ shouldCheckCredentialAvailability: true });
    expect(validateAndInstallSpy).toHaveBeenCalledTimes(1);
  });

  it('show an NFC off alert', async () => {
    const MobileCredentialStatusPlugin = registerPlugin<any>('MobileCredentialStatusPlugin');
    MobileCredentialStatusPlugin.deviceNativeState = jest.fn().mockResolvedValueOnce({ deviceState: { nfcOn: false } });
    const nfcOffSpy = jest.spyOn(service as any, 'nfcOffAlert');
    await service.onUiImageClicked({ shouldCheckCredentialAvailability: true });
    expect(nfcOffSpy).toHaveBeenCalledTimes(1);
  });

  // it('should handle onUiImageClicked without credential availability check', async () => {
  //     const showTermsAndConditionsSpy = jest.spyOn(service as any, 'showTermsAndConditions').mockResolvedValue(null);
  //     await service.onUiImageClicked({ shouldCheckCredentialAvailability: false });
  //     expect(showTermsAndConditionsSpy).toHaveBeenCalled();
  // });

  // it('should return credential availability', done => {
  //     jest.spyOn(service['mCredential'], 'isAvailable').mockReturnValue(true);
  //     service.credentialAvailable$().subscribe(isAvailable => {
  //         expect(isAvailable).toBe(true);
  //         done();
  //     });
  // });

  // it('should return credential enabled status', done => {
  //     jest.spyOn(service['mCredential'], 'isEnabled').mockReturnValue(true);
  //     jest.spyOn(service['mCredential'], 'isProvisioned').mockReturnValue(true);
  //     jest.spyOn(service as any, 'checkDeviceEndpointState$').mockResolvedValue(true);
  //     service.credentialEnabled$().subscribe(isEnabled => {
  //         expect(isEnabled).toBe(true);
  //         done();
  //     });
  // });

  // it('should handle validateAndInstall with no credential', async () => {
  //     jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue(null);
  //     const showInstallationErrorAlertSpy = jest.spyOn(service as any, 'showInstallationErrorAlert').mockResolvedValue(null);
  //     await service['validateAndInstall']();
  //     expect(showInstallationErrorAlertSpy).toHaveBeenCalled();
  // });

  // it('should handle showCredentialAlreadyProvisionedAlert with deletion permission granted', async () => {
  //     jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({ deletionPermissionGranted: () => true });
  //     const actualOnAcceptHandlerSpy = jest.spyOn(service as any, 'showCredentialAlreadyProvisionedAlert').mockResolvedValue(null);
  //     await service['showCredentialAlreadyProvisionedAlert']();
  //     expect(actualOnAcceptHandlerSpy).toHaveBeenCalled();
  // });

  // it('should handle showTermsAndConditions and accept terms', async () => {
  //     const modal = { present: jest.fn(), onDidDismiss: jest.fn().mockResolvedValue({ data: { termsAccepted: true } }) };
  //     jest.spyOn(modalCtrl, 'create').mockResolvedValue(modal as any);
  //     const onTermsAndConditionsAcceptedSpy = jest.spyOn(service as any, 'onTermsAndConditionsAccepted').mockResolvedValue(null);
  //     await service['showTermsAndConditions']();
  //     expect(onTermsAndConditionsAcceptedSpy).toHaveBeenCalled();
  // });

  // it('should handle deleteCredentialFromServer$ and return true', async () => {
  //     jest.spyOn(credentialService, 'deleteCredential$').mockReturnValue(of(true));
  //     const result = await service['deleteCredentialFromServer$']();
  //     expect(result).toBe(true);
  // });

  // it('should handle deleteCredentialFromDevice$ and return true', async () => {
  //     jest.spyOn(service['hidSdkManager'](), 'deleteEndpoint').mockResolvedValue(HID_SDK_ERR.TRANSACTION_SUCCESS);
  //     const result = await service['deleteCredentialFromDevice$']();
  //     expect(result).toBe(true);
  // });

  // it('should handle doNativeInstall$ and return true', async () => {
  //     jest.spyOn(service['hidSdkManager'](), 'setupEndpoint').mockResolvedValue(true);
  //     const result = await service['doNativeInstall$']();
  //     expect(result).toBe(true);
  // });

  // it('should handle getCredentialBundle$ with valid invitation code', async () => {
  //     jest.spyOn(service['mCredential'] as any, 'getInvitationCode').mockReturnValue('validCode');
  //     const result = await service['getCredentialBundle$']();
  //     expect(result).toBeDefined();
  // });

  // it('should handle credentialStateChangedSubscription and update status', () => {
  //     const taskExecutionObs$ = of(EndpointStatuses.PROVISIONED_ACTIVE);
  //     jest.spyOn(service['hidSdkManager'](), 'taskExecutionObs$', 'get').mockReturnValue(null);
  //     const setStatusSpy = jest.spyOn(service['mCredential'], 'setStatus');
  //     service['credentialStateChangedSubscription']();
  //     expect(setStatusSpy).toHaveBeenCalledWith(MobileCredentialStatuses.PROVISIONED);
  // });

  // it('should handle checkDeviceEndpointState$ and return true', async () => {
  //     jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => true });
  //     jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({ isProcessing: () => false });
  //     const result = await service['checkDeviceEndpointState$']();
  //     expect(result).toBe(true);
  // });

  // it('should handle onEndpointRevoked and update credential', async () => {
  //     jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({ revoked: () => false, isProvisioned: () => false });
  //     const setCredentialRevokedSpy = jest.spyOn(service as any, 'setCredentialRevoked').mockResolvedValue(true);
  //     await service['onEndpointRevoked']();
  //     expect(setCredentialRevokedSpy).toHaveBeenCalled();
  // });
});
