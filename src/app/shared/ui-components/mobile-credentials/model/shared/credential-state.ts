import { CredentialProviders } from './credential-utils';
import { MobileCredentialConfig } from './mobile-credential-configs';


export interface MobileCredentialState {
  updateStatusMsg(): void;
  getStatusMsg(): string;
  isProvisioned(): boolean;
  isEnabled(): boolean;
  isAvailable(): boolean;
  getIssuer(): string;
  getConfig(): MobileCredentialConfig;
  getUiIconUrl(): string;
  setStatus(status: MobileCredentialStatuses):void;
  providedBy(provider: CredentialProviders): boolean;
}


export enum MobileCredentialStatuses{
  AVAILABLE = 1,
  PROVISIONED = 20,
  DISABLED = 0,
  REVOKED = 5, // only know by this app, only HID gets to that state so far.
  PROCESSING = 26
}


export enum EndpointStatuses {
  PROVISIONED_ACTIVE = 20,
  PROVISIONED_INACTIVE = 0, //
  PROVISIONED_PROCESSING = 26,
  NOT_SETUP = -1,
  REVOKED = 5,
  LOCATION_PERMISSION_REQUIRED = 2,
  DELETE_CONFIRMED = -3
}
