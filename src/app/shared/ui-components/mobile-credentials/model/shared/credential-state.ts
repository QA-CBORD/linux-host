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
  IS_AVAILABLE = 1,
  IS_PROVISIONED = 20,
  IS_DISABLED = 0,
}
