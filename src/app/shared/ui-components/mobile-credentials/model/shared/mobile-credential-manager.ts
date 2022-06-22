import { Observable } from 'rxjs';
import { AndroidCredentialCsModel } from '../android/android-credential-content-strings.model';
import { MobileCredential } from './mobile-credential';
import { MobileCredentialDataService } from './mobile-credential-data.service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MobileCredentialManagerAdapter {}

export interface CredentialStateChangeListener {
  onCredentialStateChanged(): void;
}

export interface MobileCredentialManager extends MobileCredentialManagerAdapter {
  setCredential(mobileCredential: MobileCredential): void;
  onUiImageClicked(event?: any): void;
  credentialEnabled$(): Observable<boolean>;
  credentialAvailable$(): Observable<boolean>;
  getCredential(): MobileCredential;
  onUiIconClicked(): void;
  setCredentialStateChangeListener(CredentialStateChangeListener: CredentialStateChangeListener): void;
  refresh(): void;
  onWillLogout(): Promise<void>;
  getService(): MobileCredentialDataService;
  contentStringAsync(udpateUi?: boolean): Promise<AndroidCredentialCsModel>
  onCredentialStateChanged(): Promise<void>
}

export interface IDeviceState {
  bluetoothSupported: boolean;
  bluetoothOn: boolean;
  nfcSupported: boolean;
  nfcOn: boolean;
  nfcPermissionGranted: boolean;
  hasLocationPermission: boolean;
  lastServerSync: string;
}

export class DeviceState {
  env$: string;
  osVersion$: string;

  constructor(public state: IDeviceState) {}

  get bluetoothState(): string {
    let text = 'Bluetooth On';
    if (this.state.bluetoothSupported) {
      if (!this.state.bluetoothOn) text = 'Bluetooth Off';
    } else text = 'Bluetooth not supported';
    return text;
  }

  get bluetoothPermissionState(): string {
    return this.state.bluetoothOn ? 'BLE permission granted' : 'Bluetooth not enabled';
  }

  get locationServiceSate(): string {
    return this.state.hasLocationPermission ? 'Location services On' : 'Location services Off';
  }

  get locationPermissionState(): string {
    return this.state.hasLocationPermission ? 'Location permission granted' : 'Location permission denied';
  }

  get nfcState(): string {
    let text = 'Nfc On';
    if (this.state.nfcSupported) {
      if (!this.state.nfcOn) {
        text = 'Nfc Off';
      }
    } else {
      text = 'Nfc not supported';
    }
    return text;
  }

  get nfcPermissionState(): string {
    return this.state.nfcPermissionGranted ? 'Permission granted' : 'Permission not granted';
  }

  get env(): string {
    return this.env$;
  }

  get osVersion(): string {
    return this.osVersion$;
  }

  get lastServerSyncState(): string {
    return this.state.lastServerSync;
  }

  get deviceCompatibility$(): string {
    if (this.state.nfcSupported) return 'Device Compatible';
    return 'Not Compatible';
  }
}
