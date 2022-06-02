import { Subject} from "rxjs";

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
    private pinVerifier: Subject<any> = new Subject();

    registerPinSuppliedCb(cb: (pin: string) => void) {
        console.log("registering callback: PinSuppliedCb", cb);
        this.onPinSuppliedCb = cb;
    }

    registerPinModalClosedCb(cb: (status: PinCloseStatus) => void) {
        console.log("registering callback: PinModalClosedCb", cb);
        this.onPinModalClosedCb = cb;
    }

    async authenticate(pin: string): Promise<void> {
        console.log("Authenticate called...", pin);
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

    onPinFailed(pin?: string) {
        console.log("onPinFailed: ", pin);
        this.pinVerifier.next({ success: false });
    }

    onPinSuccess(pin?: string) {
        console.log("onPinSuccess: ", pin);
        this.pinVerifier.next({ success: true });
    }
}

