import { Subject } from "rxjs";
import { StateTimeDuration } from "src/app/app.global";

export const VAULT_DEFAULT_TIME_OUT_IN_MILLIS = 1800000;

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

export const TIME_OUT_WITH_EXTRA = StateTimeDuration.TTL; // 10 minutes.

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
    isLocked?: boolean;
}


export class VaultAuthenticator {
    private onPinSuppliedCb: (pin: string) => void;
    private onPinModalClosedCb: (status: PinCloseStatus) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private pinVerifier: Subject<any> = new Subject();

    registerPinSuppliedCb(cb: (pin: string) => void) {
        this.onPinSuppliedCb = cb;
    }

    registerPinModalClosedCb(cb: (status: PinCloseStatus) => void) {
        this.onPinModalClosedCb = cb;
    }

    async authenticate(pin: string): Promise<void> {
        this.onPinSuppliedCb(pin);
        return new Promise((resolve, reject) => {
            const subscription = this.pinVerifier.subscribe({
                next: ({ success }) => success ? resolve(success) : reject({ success }),
                complete: () => subscription.unsubscribe()
            })
        });
    }

    onPinClosed(status: PinCloseStatus) {
        this.onPinModalClosedCb(status);
    }

    onPinFailed() {
        this.pinVerifier.next({ success: false });
    }

    onPinSuccess() {
        this.pinVerifier.next({ success: true });
    }
}

