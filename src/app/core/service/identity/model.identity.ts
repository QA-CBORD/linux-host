import { DeviceSecurityType, IdentityVaultConfig, VaultType } from "@ionic-enterprise/identity-vault";

export const VAULT_DEFAULT_TIME_OUT_IN_MILLIS = 5000;

export enum PinCloseStatus {
    SET_SUCCESS = 'set_success',
    LOGIN_SUCCESS = 'login_success',
    CANCELED = 'cancelled',
    ERROR = 'error',
    MAX_FAILURE = 'max_failure',
    DEVICE_MARK_LOST = 'device_marked_lost',
    CLOSED_NO_CONNECTION = 'closed_no_connection'
  }
  
  export enum PinAction {
    SET_BIOMETRIC,
    SET_PIN_ONLY,
    CHANGE_PIN_BIOMETRIC,
    CHANGE_PIN_ONLY,
    LOGIN_PIN,
  }

export interface VaultTimeoutOptions {
    extendTimeout: boolean;
    estimatedTimeInMillis?: number;
    keepTimeoutExtendedOnResume?: boolean;
}

export const TIME_OUT_WITH_EXTRA = 600000; // 10 minutes.

export interface SessionData {
    isLocked?: boolean;
    pin?: string;
    biometricEnabled: boolean;
}

export interface VaultMessage {
    canLock: boolean;
    canLockOnResume: boolean;
}

export enum VaultMigrateResult {
    MIGRATION_SUCCESS,
    MIGRATION_FAILED,
    MIGRATION_NOT_NEEDED
}

export interface VaultSession {
    pin?: string;
    biometricUsed?: boolean;
}
