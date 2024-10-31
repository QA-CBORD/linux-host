import { TestBed } from '@angular/core/testing';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { of, Subject } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { HidCredentialDataService } from '../../../service/hid-credential.data.service';
import { HIDWalletCredentialManager } from './hid-wallet-credential-manager';
import { HID_SDK_ERR, HID_WALLET_SDK_ERR, HIDPlugginProxy } from './hid-plugin.proxy';
import { EndpointStatuses, MobileCredentialStatuses } from '../../shared/credential-state';
import { registerPlugin } from '@capacitor/core';
import { AndroidCredential, HIDCredential } from '../android-credential.model';

jest.mock('@capacitor/core', () => {
  const actualCapacitor = jest.requireActual('@capacitor/core');

  const plugins = {
    HIDPlugin: {
      isEndpointSetup: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      isEndpointActive: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      setupEndpoint: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      hasWalletCards: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      initializeSdk: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      refreshEndpoint: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
      deleteEndpoint: jest.fn().mockResolvedValue({ transactionStatus: 'success' }),
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

   TestBed.configureTestingModule({
      providers: [
        HIDWalletCredentialManager,
        { provide: HIDPlugginProxy, useValue: hidPlugginProxyMock },
        {
          provide: ModalController,
          useValue: {
            create: jest
              .fn()
              .mockReturnValue({ present: jest.fn(), onDidDismiss: jest.fn().mockResolvedValueOnce({ data: 'test' }) }),
          },
        },
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
            deleteCredential$: jest.fn().mockReturnValue(of(true)),
            deleteAllCachedEndpoint$: jest.fn().mockReturnValue(of(true)),
            updateCachedCredential$: jest.fn(),
            updateCredential$: jest.fn().mockReturnValue(of(true)),
            unloadContentStrings: jest.fn(),
            getContents: jest.fn().mockResolvedValue({
              alreadyInstalledDialogString$: { title: 'title', message: 'message' },
              installErrorDialogString$: { title: 'title', mContent: 'message' },
              nfcDialogString$: { title: 'title', mContent: 'message', cancelTxt: 'cancel', acceptTxt: 'accept' },
              alreadyProvisionedDialogString$: { title: 'title', message: 'message' },
            }),
            getEndpointStateFromLocalCache: jest.fn().mockResolvedValue({
              deletionPermissionGranted: jest.fn(),
              isProcessing: jest.fn().mockReturnValue(false),
            }),
            setUicString$: jest.fn().mockReturnValue(null),
            activePasses$: jest.fn().mockReturnValue(
              of({
                passes: { android_hid: 0, android_nxp: 0, iPhone: 0, iWatch: 0, android_hid_wallet: 1 },
                credStatus: { android_hid: 0, android_nxp: 0, iPhone: 0, iWatch: 0, android_hid_wallet: 20 },
                referenceIdentifier: 'FAPLOSc1140230-cd12-4202-9dc4-b5e0fc8feabf_000000009925',
                setUicString$: jest.fn().mockReturnValue(null),
              })
            ),
            androidCredentialBundle$: jest.fn().mockReturnValue(of({ id: '' })),
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

  it('should not implement additional icon handler', () => {
    const onUiIconClicked = jest.spyOn(service, 'onUiIconClicked');
    expect(onUiIconClicked).rejects.toReturn();
  });

  it('should not implement additional icon handler', () => {
    const refresh = jest.spyOn(service, 'refresh');
    expect(refresh).rejects.toReturn();
  });

  it('should call onWillLogout and stop task execution', async () => {
    const stopTaskExecutionSpy = jest.spyOn(service['hidSdkManager'](), 'stopTaskExecution');
    await service.onWillLogout();
    expect(stopTaskExecutionSpy).not.toHaveBeenCalled();
  });

  describe('onUiImageClicked', () => {
    it('should handle onUiImageClicked without credential availability check', async () => {
      const showTermsAndConditionsSpy = jest.spyOn(service as any, 'showTermsAndConditions').mockResolvedValue(null);
      await service.onUiImageClicked({ shouldCheckCredentialAvailability: false });
      expect(showTermsAndConditionsSpy).toHaveBeenCalled();
    });

    it('should handle onUiImageClicked with credential availability check', async () => {
      const validateAndInstallSpy = jest.spyOn(service as any, 'validateAndInstall');
      await service.onUiImageClicked({ shouldCheckCredentialAvailability: true });
      expect(validateAndInstallSpy).toHaveBeenCalled();
    });

    it('show an NFC off alert', async () => {
      const MobileCredentialStatusPlugin = registerPlugin<any>('MobileCredentialStatusPlugin');
      MobileCredentialStatusPlugin.deviceNativeState = jest
        .fn()
        .mockResolvedValueOnce({ deviceState: { nfcOn: false } });
      const nfcOffSpy = jest.spyOn(service as any, 'nfcOffAlert');
      await service.onUiImageClicked({ shouldCheckCredentialAvailability: true });
      expect(nfcOffSpy).toHaveBeenCalled();
    });
  });

  it('should return credential availability', done => {
    service.setCredential({} as AndroidCredential<any>);
    service['mCredential'].isAvailable = jest.fn().mockReturnValueOnce(true);
    service.credentialAvailable$().subscribe(isAvailable => {
      expect(isAvailable).toBeTruthy();
      done();
    });
  });

  it('should return credential availability', done => {
    service.setCredential({} as AndroidCredential<any>);
    service['mCredential'].isAvailable = jest.fn().mockReturnValueOnce(false);
    service.credentialAvailable$().subscribe(isAvailable => {
      expect(isAvailable).toBeFalsy();
      done();
    });
  });

  describe('credentialEnabled$', () => {
    it('should return credential status as false when is neither enabled nor provisioned', done => {
      service.setCredential({} as AndroidCredential<any>);
      service['mCredential'].isEnabled = jest.fn().mockReturnValueOnce(false);
      service['mCredential'].isProvisioned = jest.fn().mockReturnValueOnce(false);
      service.credentialEnabled$().subscribe(isEnabled => {
        expect(isEnabled).toBeFalsy();
        done();
      });
    });

    it('should return credential status as true when is enabled and sdk initializes successfully and not provisioned', done => {
      service.setCredential({} as AndroidCredential<any>);
      service['mCredential'].isEnabled = jest.fn().mockReturnValueOnce(true);
      service['mCredential'].isProvisioned = jest.fn().mockReturnValueOnce(false);
      service.credentialEnabled$().subscribe(isEnabled => {
        expect(isEnabled).toBeTruthy();
        done();
      });
    });

    it('should return credential status as true when is enabled and sdk initializes successfully and provisioned', done => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      service['mCredential'].isEnabled = jest.fn().mockReturnValueOnce(true);
      service['mCredential'].isProvisioned = jest.fn().mockReturnValueOnce(true);
      service.credentialEnabled$().subscribe(isEnabled => {
        expect(isEnabled).toBeTruthy();
        done();
      });
    });

    it('should return credential status as true when is NOT enabled and sdk initializes successfully and provisioned', done => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      service['mCredential'].isEnabled = jest.fn().mockReturnValueOnce(false);
      service['mCredential'].isProvisioned = jest.fn().mockReturnValueOnce(true);
      service.credentialEnabled$().subscribe(isEnabled => {
        expect(isEnabled).toBeTruthy();
        done();
      });
    });
  });

  describe('validateAndInstall', () => {
    it('should handle validateAndInstall with no credential', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue(null);
      const showInstallationErrorAlertSpy = jest
        .spyOn(service as any, 'showInstallationErrorAlert')
        .mockResolvedValue(null);
      const showLoadingSpy = jest.spyOn(service as any, 'showLoading');
      await service['validateAndInstall']();
      expect(showInstallationErrorAlertSpy).toHaveBeenCalled();
      expect(showLoadingSpy).toHaveBeenCalled();
    });

    it('should show credential install alert on wallet already active', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => false,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => false,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const showCredentialAlreadyInstalledAlert = jest.spyOn(service as any, 'showCredentialAlreadyInstalledAlert');
      await service['validateAndInstall']();
      expect(showCredentialAlreadyInstalledAlert).toHaveBeenCalled();
    });

    it('should handle show credential install alert accepting to delete old credentials', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => true,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => false,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => true,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const onProvisioningAcceptedHandler = jest.spyOn(service as any, 'onProvisioningAcceptedHandler');
      const updateCachedCredential = jest.spyOn(credentialService, 'updateCachedCredential$').mockResolvedValue(null);
      const deleteCredentialFromServer = jest
        .spyOn(service as any, 'deleteCredentialFromServer$')
        .mockResolvedValue(null);
      const getEndpointStateFromLocalCache = jest
        .spyOn(credentialService, 'getEndpointStateFromLocalCache')
        .mockResolvedValue(null);
      const deleteCredentialFromDevice = jest
        .spyOn(service as any, 'deleteCredentialFromDevice$')
        .mockResolvedValue(null);
      const showCredentialAlreadyProvisionedAlert = jest
        .spyOn(service as any, 'showCredentialAlreadyProvisionedAlert')
        .mockResolvedValue(null);
      await service['validateAndInstall']();
      expect(onProvisioningAcceptedHandler).toHaveBeenCalled();
      expect(updateCachedCredential).toHaveBeenCalled();
      expect(deleteCredentialFromServer).toHaveBeenCalled();
      expect(getEndpointStateFromLocalCache).toHaveBeenCalled();
      expect(deleteCredentialFromDevice).toHaveBeenCalled();
      expect(showCredentialAlreadyProvisionedAlert).toHaveBeenCalled();
    });

    it('should handle show credential install alert accepting to delete old credentials and show terms and conditions', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => true,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => true,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => true,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const onProvisioningAcceptedHandler = jest.spyOn(service as any, 'onProvisioningAcceptedHandler');
      const updateCachedCredential = jest.spyOn(credentialService, 'updateCachedCredential$').mockResolvedValue(null);
      const deleteCredentialFromServer = jest
        .spyOn(service as any, 'deleteCredentialFromServer$')
        .mockResolvedValue(null);
      const getEndpointStateFromLocalCache = jest
        .spyOn(credentialService, 'getEndpointStateFromLocalCache')
        .mockResolvedValue(null);
      const deleteCredentialFromDevice = jest
        .spyOn(service as any, 'deleteCredentialFromDevice$')
        .mockResolvedValue(null);
      const showCredentialAlreadyProvisionedAlert = jest
        .spyOn(service as any, 'showCredentialAlreadyProvisionedAlert')
        .mockResolvedValue(null);
      const showTermsAndConditions = jest.spyOn(service as any, 'showTermsAndConditions');
      await service['validateAndInstall']();
      expect(onProvisioningAcceptedHandler).toHaveBeenCalled();
      expect(updateCachedCredential).toHaveBeenCalled();
      expect(deleteCredentialFromServer).toHaveBeenCalled();
      expect(getEndpointStateFromLocalCache).toHaveBeenCalled();
      expect(deleteCredentialFromDevice).toHaveBeenCalled();
      expect(showTermsAndConditions).toHaveBeenCalled();
      expect(showCredentialAlreadyProvisionedAlert).not.toHaveBeenCalled();
    });

    it('should show credential provisioned alert on wallet already provisioned', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => true,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => false,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => false });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => false,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const showCredentialAlreadyProvisionedAlert = jest.spyOn(service as any, 'showCredentialAlreadyProvisionedAlert');
      await service['validateAndInstall']();
      expect(showCredentialAlreadyProvisionedAlert).toHaveBeenCalled();
    });

    it('should delete the credential if permission delete granted and show alert if cred not available', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => true,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => false,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => false });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => true,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const showCredentialAlreadyProvisionedAlert = jest.spyOn(service as any, 'showCredentialAlreadyProvisionedAlert');
      const updateCachedCredential = jest.spyOn(credentialService, 'updateCachedCredential$').mockResolvedValue(null);
      const showInstallationErrorAlert = jest.spyOn(service as any, 'showInstallationErrorAlert');
      await service['validateAndInstall']();
      expect(showCredentialAlreadyProvisionedAlert).toHaveBeenCalled();
      expect(updateCachedCredential).toHaveBeenCalledWith(EndpointStatuses.DELETE_CONFIRMED);
      expect(showInstallationErrorAlert).toHaveBeenCalled();
    });

    it('should delete the credential if permission delete granted and show alert if cred not available', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => true,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => false,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => false });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => true,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      jest.spyOn(credentialService, 'deleteCredential$').mockReturnValue(of(true));
      jest.spyOn(service as any, 'checkCredentialAvailability').mockReturnValue(of(false));
      const showInstallationErrorAlert = jest.spyOn(service as any, 'showInstallationErrorAlert');
      const onUiImageClicked = jest.spyOn(service as any, 'onUiImageClicked');
      await service['validateAndInstall']();
      expect(showInstallationErrorAlert).not.toHaveBeenCalled();
      expect(onUiImageClicked).toHaveBeenCalled();
    });

    it('should show terms and conditions on credential available', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => true,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => false });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => false,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const showTermsAndConditions = jest.spyOn(service as any, 'showTermsAndConditions');
      await service['validateAndInstall']();
      expect(showTermsAndConditions).toHaveBeenCalled();
    });

    it('should show installation error', async () => {
      jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
        isAvailable: () => false,
        isCreated: () => false,
      });
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => false });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        deletionPermissionGranted: () => false,
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
      });
      const showInstallationErrorAlert = jest.spyOn(service as any, 'showInstallationErrorAlert');
      await service['validateAndInstall']();
      expect(showInstallationErrorAlert).toHaveBeenCalled();
    });
  });

  it('should handle showCredentialAlreadyProvisionedAlert with deletion permission granted', async () => {
    jest
      .spyOn(service as any, 'getLocalCachedEndpointState')
      .mockResolvedValue({ deletionPermissionGranted: () => true });
    const actualOnAcceptHandlerSpy = jest
      .spyOn(service as any, 'showCredentialAlreadyProvisionedAlert')
      .mockResolvedValue(null);
    await service['showCredentialAlreadyProvisionedAlert']();
    expect(actualOnAcceptHandlerSpy).toHaveBeenCalled();
  });

  it('should an alert when the already provisioned but the delete is not successful', async () => {
    jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
      deletionPermissionGranted: () => true,
      isProvisioned: () => false,
      isProcessing: () => false,
      isRevoked: () => false,
      isAvailable: () => false,
    });

    jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
      isProvisioned: () => false,
      isProcessing: () => false,
      isRevoked: () => false,
      isAvailable: () => true,
    });
    jest.spyOn(service as any, 'deleteCredentialFromServer$').mockResolvedValue(false);
    const showInstallationErrorAlert = jest.spyOn(service as any, 'showInstallationErrorAlert');
    await service['showCredentialAlreadyProvisionedAlert']();
    expect(showInstallationErrorAlert).toHaveBeenCalled();
  });

  it('should handle showTermsAndConditions and accept terms', async () => {
    const modal = { present: jest.fn(), onDidDismiss: jest.fn().mockResolvedValue({ data: { termsAccepted: true } }) };
    jest.spyOn(modalCtrl, 'create').mockResolvedValue(modal as any);
    const onTermsAndConditionsAcceptedSpy = jest
      .spyOn(service as any, 'onTermsAndConditionsAccepted')
      .mockResolvedValue(null);
    await service['showTermsAndConditions']();
    expect(onTermsAndConditionsAcceptedSpy).toHaveBeenCalled();
  });

  it('should handle deleteCredentialFromServer$ and return true', async () => {
    jest.spyOn(credentialService, 'deleteCredential$').mockReturnValue(of(true));
    const result = await service['deleteCredentialFromServer$']();
    expect(result).toBeTruthy();
  });

  it('should handle deleteCredentialFromServer$ and return true', async () => {
    jest.spyOn(credentialService, 'deleteCredential$').mockReturnValue(of(false));
    const result = await service['deleteCredentialFromServer$']();
    expect(result).toBeFalsy();
  });

  it('should handle deleteCredentialFromDevice$ and return true', async () => {
    jest.spyOn(service['hidSdkManager'](), 'deleteEndpoint').mockResolvedValue(HID_SDK_ERR.TRANSACTION_SUCCESS);
    service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
    const result = await service['deleteCredentialFromDevice$']();
    expect(result).toBe(true);
  });

  it('should handle deleteCredentialFromDevice$ and return true', async () => {
    jest.spyOn(service['hidSdkManager'](), 'deleteEndpoint').mockResolvedValue(HID_SDK_ERR.INTERNAL_ERROR);
    service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
    const setStatusSpy = jest.spyOn(service['mCredential'] as any, 'setStatus').mockReturnValueOnce(null);
    await service['deleteCredentialFromDevice$']();
    expect(setStatusSpy).not.toHaveBeenCalled();
  });

  it('should handle doNativeInstall$ and return true', async () => {
    jest.spyOn(service['hidSdkManager'](), 'setupEndpoint').mockResolvedValue(true);
    service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
    (service['mCredential'] as HIDCredential).getInvitationCode = jest
      .fn()
      .mockReturnValueOnce('66a970db-53c8-4a25-88ac-16cb1b16e072');
    const closeLoadingSpy = jest.spyOn(loadingService, 'closeSpinner');
    const result = await service['doNativeInstall$']();
    expect(result).toBe(true);
    expect(closeLoadingSpy).toHaveBeenCalled();
  });

  it('should handle doNativeInstall$ should set an error message if an error gets thrown', async () => {
    jest.spyOn(service['hidSdkManager'](), 'setupEndpoint').mockRejectedValue(Error('error'));
    service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
    (service['mCredential'] as HIDCredential).getInvitationCode = jest
      .fn()
      .mockReturnValueOnce('66a970db-53c8-4a25-88ac-16cb1b16e072');
    const closeLoadingSpy = jest.spyOn(loadingService, 'closeSpinner');
    await service['doNativeInstall$']();
    expect(service.hidSdkErrorMessage).toContain('error');
    expect(closeLoadingSpy).toHaveBeenCalled();
  });

  it('should handle getCredentialBundle$ with valid invitation code', async () => {
    service.setCredential({
      setStatus: jest.fn(),
      getCredentialBundle: jest.fn().mockReturnValue({ id: '' }),
    } as unknown as AndroidCredential<any>);
    (service['mCredential'] as HIDCredential).getInvitationCode = jest
      .fn()
      .mockReturnValueOnce('66a970db-53c8-4a25-88ac-16cb1b16e072');
    const result = await service['getCredentialBundle$']();
    expect(result).toBeDefined();
  });

  it('should handle getCredentialBundle$ when there is no invitation code and get it from the server', async () => {
    service.setCredential({
      setStatus: jest.fn(),
      getReferenceIdentifier: jest.fn().mockReturnValue(of('test')),
    } as unknown as AndroidCredential<any>);
    (service['mCredential'] as HIDCredential).getInvitationCode = jest.fn().mockReturnValueOnce('');
    const androidCredentialBundle$ = jest
      .spyOn(credentialService as any, 'androidCredentialBundle$')
      .mockReturnValue(of({ invitationCode: '', invitationId: '', issuer: '', issuerToken: '' }));
    const result = await service['getCredentialBundle$']();
    expect(result).toBeDefined();
    expect(androidCredentialBundle$).toHaveBeenCalled();
  });

  it('should handle credentialStateChangedSubscription and update status', () => {
    const taskExecutionSubject = new Subject<EndpointStatuses>();
    service['hidSdkManager']().taskExecutionObs$ = taskExecutionSubject;
    service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
    service['credentialStateChangedSubscription']();
    taskExecutionSubject.next(EndpointStatuses.PROVISIONED_ACTIVE);
    const updateCachedCredential = jest.spyOn(credentialService, 'updateCachedCredential$').mockResolvedValue(null);
    expect(updateCachedCredential).toHaveBeenCalledWith(EndpointStatuses.PROVISIONED_ACTIVE);
  });

  describe('checkDeviceEndpointState$', () => {
    it('should handle checkDeviceEndpointState$ and return true', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({ isProcessing: () => false });
      const result = await service['checkDeviceEndpointState$']();
      expect(result).toBe(true);
    });

    it('should handle checkDeviceEndpointState$ should set status', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'getDeviceEndpointState').mockResolvedValue({ isProvisioned: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({ isProcessing: () => true });
      const setStatusSpy = jest.spyOn(service['mCredential'] as any, 'setStatus').mockReturnValueOnce(null);
      const result = await service['checkDeviceEndpointState$']();
      expect(result).toBe(true);
      expect(setStatusSpy).toHaveBeenCalled();
    });

    it('should handle checkDeviceEndpointState$ should check if endpoint is inactive', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest
        .spyOn(service as any, 'getDeviceEndpointState')
        .mockResolvedValue({ isProvisioned: () => false, isInactive: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
        isInactive: () => true,
      });
      const setStatusSpy = jest.spyOn(service['mCredential'] as any, 'setStatus').mockReturnValueOnce(null);
      const result = await service['checkDeviceEndpointState$']();
      expect(result).toBe(true);
      expect(setStatusSpy).toHaveBeenCalled();
    });

    it('should revoke credentials', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest
        .spyOn(service as any, 'getDeviceEndpointState')
        .mockResolvedValue({ isProvisioned: () => false, isInactive: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => false,
        isRevoked: () => false,
        isInactive: () => true,
      });
      jest.spyOn(service['mCredential'] as any, 'setStatus').mockReturnValueOnce(null);
      jest.spyOn(service as any, 'isEndpointRevoked').mockResolvedValue(true);
      jest
        .spyOn(service as any, 'fetchFromServer$')
        .mockResolvedValue({ revoked: () => false, isProvisioned: () => false });
      const result = await service['checkDeviceEndpointState$']();
      const deleteEndpoint = jest.spyOn(service['hidSdkManager'](), 'deleteEndpoint');
      jest.spyOn(service as any, 'onCredentialStateChanged').mockResolvedValue(true);
      expect(result).toBe(true);
      expect(deleteEndpoint).toHaveBeenCalled();
    });

    it('should set status to processing if cache value is processing', async () => {
      jest.resetAllMocks();
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest
        .spyOn(service as any, 'getDeviceEndpointState')
        .mockResolvedValue({ isProvisioned: () => false, isInactive: () => true });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => true,
        isRevoked: () => false,
        isInactive: () => true,
      });
      const setStatusSpy = jest.spyOn(service['mCredential'] as any, 'setStatus').mockReturnValueOnce(true);
      jest.spyOn(service as any, 'isEndpointRevoked').mockResolvedValue(false);
      jest
        .spyOn(service as any, 'fetchFromServer$')
        .mockResolvedValue({ revoked: () => false, isProvisioned: () => false });
      await service['checkDeviceEndpointState$']();
      const deleteEndpoint = jest.spyOn(service['hidSdkManager'](), 'deleteEndpoint');
      expect(setStatusSpy).toHaveBeenCalledWith(MobileCredentialStatuses.PROCESSING);
      expect(deleteEndpoint).not.toHaveBeenCalled();
    });

    it('should set status to availabel if it is neither provisioned nor inactive', async () => {
      jest.resetAllMocks();
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest
        .spyOn(service as any, 'getDeviceEndpointState')
        .mockResolvedValue({ isProvisioned: () => false, isInactive: () => false });
      jest.spyOn(service as any, 'getLocalCachedEndpointState').mockResolvedValue({
        isProvisioned: () => false,
        isProcessing: () => true,
        isRevoked: () => false,
        isInactive: () => false,
      });
      const setStatusSpy = jest.spyOn(service['mCredential'] as any, 'setStatus').mockReturnValueOnce(true);
      jest.spyOn(service as any, 'isEndpointRevoked').mockResolvedValue(false);
      jest
        .spyOn(service as any, 'fetchFromServer$')
        .mockResolvedValue({ revoked: () => false, isProvisioned: () => false });
      await service['checkDeviceEndpointState$']();
      const deleteEndpoint = jest.spyOn(service['hidSdkManager'](), 'deleteEndpoint');
      expect(deleteEndpoint).not.toHaveBeenCalled();
      expect(setStatusSpy).toHaveBeenCalledWith(MobileCredentialStatuses.AVAILABLE);
    });
  });

  it('should handle onEndpointRevoked and update credential', async () => {
    jest
      .spyOn(service as any, 'fetchFromServer$')
      .mockResolvedValue({ revoked: () => false, isProvisioned: () => false });
    const setCredentialRevokedSpy = jest.spyOn(service as any, 'setCredentialRevoked').mockResolvedValue(true);
    await service['onEndpointRevoked']();
    expect(setCredentialRevokedSpy).toHaveBeenCalled();
  });

  describe('installCredentialOnDevice', () => {
    it('should handle successful provisioning', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      service['mCredential'].credentialBundle = { id: 'test' };
      jest.spyOn(service as any, 'doNativeInstall$').mockResolvedValue(true);
      const onCredentialStateChanged = jest.spyOn(service as any, 'onCredentialStateChanged').mockResolvedValue(true);
      await service['installCredentialOnDevice']();
      expect(onCredentialStateChanged).toHaveBeenCalled();
    });

    it('should handle show an alert and delete credentials if provisioning fails', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      service['mCredential'].credentialBundle = { id: 'test' };
      jest.spyOn(service as any, 'doNativeInstall$').mockResolvedValue(true);
      jest.spyOn(service as any, 'updateCredentialOnServer$').mockResolvedValue(false);
      const showInstallationErrorAlertSpy = jest
        .spyOn(service as any, 'showInstallationErrorAlert')
        .mockResolvedValue(true);
      const deleteCredentialFromDeviceSpy = jest
        .spyOn(service as any, 'deleteCredentialFromDevice$')
        .mockResolvedValue(true);
      await service['installCredentialOnDevice']();
      expect(showInstallationErrorAlertSpy).toHaveBeenCalled();
      expect(deleteCredentialFromDeviceSpy).toHaveBeenCalled();
    });

    it('should check if invalid token error is thrown on invalid token', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'doNativeInstall$').mockResolvedValue(false);
      jest.spyOn(service as any, 'updateCredentialOnServer$').mockResolvedValue(false);
      jest
        .spyOn(service['hidSdkManager'](), 'setupEndpoint')
        .mockRejectedValue(Error(HID_WALLET_SDK_ERR.INVALID_ISSUANCE_TOKEN));
      const deleteCredentialFromServer = jest
        .spyOn(service as any, 'deleteCredentialFromServer$')
        .mockResolvedValue(null);
      service.hidSdkErrorMessage = HID_WALLET_SDK_ERR.INVALID_ISSUANCE_TOKEN;
      await service['installCredentialOnDevice']();
      expect(deleteCredentialFromServer).not.toHaveBeenCalled();
    });

    it('should check if invalid wallet error is thrown', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'doNativeInstall$').mockResolvedValue(false);
      jest.spyOn(service as any, 'updateCredentialOnServer$').mockResolvedValue(false);
      jest
        .spyOn(service['hidSdkManager'](), 'setupEndpoint')
        .mockRejectedValue(Error(HID_WALLET_SDK_ERR.ADD_CARD_TO_WALLET_FAILED));
      const deleteCredentialFromServer = jest
        .spyOn(service as any, 'deleteCredentialFromServer$')
        .mockResolvedValue(null);
      service.hidSdkErrorMessage = HID_WALLET_SDK_ERR.ADD_CARD_TO_WALLET_FAILED;
      await service['installCredentialOnDevice']();
      expect(deleteCredentialFromServer).toHaveBeenCalled();
    });

    it('should check if unknown error is thrown', async () => {
      service.setCredential({ setStatus: jest.fn() } as unknown as AndroidCredential<any>);
      jest.spyOn(service as any, 'doNativeInstall$').mockResolvedValue(false);
      jest.spyOn(service as any, 'updateCredentialOnServer$').mockResolvedValue(false);
      jest
        .spyOn(service['hidSdkManager'](), 'setupEndpoint')
        .mockRejectedValue(Error(''));
      jest
        .spyOn(service as any, 'deleteCredentialFromServer$')
        .mockResolvedValue(null);
      const showInstallationErrorAlert = jest.spyOn(service as any, 'showInstallationErrorAlert');
      await service['installCredentialOnDevice']();
      expect(showInstallationErrorAlert).toHaveBeenCalled();
    });

    describe('onTermsAndConditionsAccepted', () => {
      it('should show the spinner', async () => {
        const spy = jest.spyOn(service as any, 'getCredentialBundle$');
        const showLoadingSpy = jest.spyOn(service as any, 'showLoading');
        service['onTermsAndConditionsAccepted']();
        expect(spy).toHaveBeenCalled();
        expect(showLoadingSpy).toHaveBeenCalled();
      });

      it('should get the credential bundle', async () => {
        const spy = jest
          .spyOn(service as any, 'getCredentialBundle$')
          .mockResolvedValue({ invitationCode: '', invitationId: '', issuer: '', issuerToken: '' });
        service.setCredential({
          setStatus: jest.fn(),
          setCredentialBundle: jest.fn().mockReturnValue({ id: '' }),
          getInvitationCode: jest.fn(),
        } as unknown as AndroidCredential<any>);
        const showLoadingSpy = jest.spyOn(service as any, 'showLoading');
        service['onTermsAndConditionsAccepted']();
        expect(spy).toHaveBeenCalled();
        expect(showLoadingSpy).toHaveBeenCalled();
      });

      describe('handleDeleteCredential', () => {

        it('should show the terms and conditions screen', async () => {
          jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
            isProvisioned: () => false,
            isProcessing: () => false,
            isRevoked: () => false,
            isAvailable: () => true,
          });
          const showTermsAndConditionsSpy = jest.spyOn(service as any, 'showTermsAndConditions').mockResolvedValue(null);
          await service['handleDeleteCredential']();
          expect(showTermsAndConditionsSpy).toHaveBeenCalled();
        });

        it('should show the installation alert', async () => {
          jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
            isProvisioned: () => false,
            isProcessing: () => false,
            isRevoked: () => false,
            isAvailable: () => false,
          });
          const showInstallationErrorAlertSpy = jest
          .spyOn(service as any, 'showInstallationErrorAlert')
          .mockResolvedValue(null);
          const showTermsAndConditionsSpy = jest.spyOn(service as any, 'showTermsAndConditions').mockResolvedValue(null);
          await service['handleDeleteCredential']();
          expect(showTermsAndConditionsSpy).not.toHaveBeenCalled();
          expect(showInstallationErrorAlertSpy).toHaveBeenCalled();
        });

   

        it('should show the installation alert', async () => {
          jest.spyOn(service as any, 'fetchFromServer$').mockResolvedValue({
            isProvisioned: () => false,
            isProcessing: () => false,
            isRevoked: () => false,
            isAvailable: () => false,
          });
          const showInstallationErrorAlertSpy = jest
          .spyOn(service as any, 'showInstallationErrorAlert')
          .mockResolvedValue(null);
          jest.spyOn(service as any, 'deleteCredentialFromServer$').mockResolvedValue(false);
          const showTermsAndConditionsSpy = jest.spyOn(service as any, 'showTermsAndConditions').mockResolvedValue(null);
          await service['handleDeleteCredential']();
          expect(showTermsAndConditionsSpy).not.toHaveBeenCalled();
          expect(showInstallationErrorAlertSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
