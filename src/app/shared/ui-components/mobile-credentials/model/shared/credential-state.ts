import { CredentialProviders } from './credential-utils';
import { MobileCredentialConfig} from './mobile-credential-configs';


export interface MobileCredentialState {
  updateStatusMsg(): void;
  getStatusMsg(): string;
  isProvisioned(): boolean;
  isEnabled(): boolean;
  isAvailable(): boolean;
  getIssuer(): string;
  getConfig(): MobileCredentialConfig;
  getUiIconUrl(): string;
  setStatus(status: number):void;
  providedBy(provider: CredentialProviders): boolean;
}


export enum MobileCredentialStatuses{
  AVAILABLE = 1,
  PROVISIONED = 20,
  DISABLED = 0,
  REVOKED = 5, // only know by this app, only HID gets to that state so far.
  PROCESSING = 26
}
