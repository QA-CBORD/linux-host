import { MobileCredentialProvider } from './credential-utils';
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
}
