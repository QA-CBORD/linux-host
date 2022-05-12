import { Inject, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultMigrator, VaultType } from '@ionic-enterprise/identity-vault';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { PinAction, PinCloseStatus, PinPage } from '@shared/ui-components/pin/pin.page';
import { CustomPinService } from '@shared/ui-components/pin/pin.service';
import { Subject } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';


export interface SessionData {
    isLocked?: boolean;
    pin?: string;
    useBiometric: boolean;
}
const key = 'sessionPin';

const MAX_PIN_RETRY_COUNT = 2;

export const VAULT_DEFAULT_TIME_OUT_IN_MILLIS = 5000;

const config: IdentityVaultConfig = {
    key: 'get.cbord.com',
    type: VaultType.SecureStorage,
    lockAfterBackgrounded: VAULT_DEFAULT_TIME_OUT_IN_MILLIS
};

export interface PinResultObserver {
    notify: (data: any, role: any) => void
}

export interface VaultMessage {
    canLock: boolean;
    canLockOnResume: boolean;
}


@Injectable({ providedIn: 'root' })
export class VaultService {
    public state: SessionData = { useBiometric: false, pin: null };
    private vault: Vault | BrowserVault;
    public vaultAuthEventObs: Subject<{ success: boolean, biometricUsed: boolean, error?: any }> = new Subject();

    constructor(
        @Inject(Injector) private injector: Injector,
        private ngZone: NgZone,
        private readonly userPreferenceService: UserPreferenceService,
        private router: Router
    ) {
        this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
        window['VaultService'] = this;
    }

    private get pinService(): CustomPinService {
        return this.injector.get(CustomPinService);
    }

    async init() {
        await Device.setHideScreenOnBackground(false, false);

        this.vault.onError((error) => console.log("VAULT.ONERROR: ", error));

        this.vault.onPasscodeRequested((isPasscodeSetRequest) => {
            console.log("vault.onPasscodeRequested: ", isPasscodeSetRequest);
            return this.onPasscodeRequested(isPasscodeSetRequest);
        });

        this.vault.onUnlock(() => {
            this.ngZone.run(async () => {
                this.setIsLocked(false);
                this.state.pin = await this.vault.getValue(key);
                this.vaultAuthEventObs.next({ success: true, biometricUsed: this.state.useBiometric });
            })
        });
        this.vault.onLock(({ timeout }) => {
            this.ngZone.run(() => {
                this.state.pin = null;
                this.setIsLocked(true);
                if (timeout) {
                    this.doUnlockVault(this.state.useBiometric);
                }
            });
        });

        await this.migrateIfLegacyVault();
    }






    // this method is called when this app is going to open another app;
    // we may not want this app to lock itself is we're expecting a result from the other app.



    private async migrateIfLegacyVault(retryCount: number = 0): Promise<boolean> {
        const isBiometricsEnabled = async () => (await Device.isBiometricsEnabled()) && await this.userPreferenceService.cachedBiometricsEnabledUserPreference();
        const noDataInLegacyVault = ({ code, message }) => (code == undefined && /legacy/.test(message));
        const canRetry = async (error): Promise<boolean> => !noDataInLegacyVault(error) && !(await isBiometricsEnabled()) && retryCount < MAX_PIN_RETRY_COUNT;

        const migrator = new VaultMigrator({
            // old V4 config
            restoreSessionOnReady: false,
            unlockOnReady: false,
            unlockOnAccess: false,
            lockAfter: 5000,
            hideScreenOnBackground: false,
            allowSystemPinFallback: false,
            shouldClearVaultAfterTooManyFailedAttempts: false
        });

        try {
            const oldData = await migrator.exportVault();
            if (oldData) {
                const { session } = oldData;
                await this.vault.setCustomPasscode(session.pin);
                await this.vault.importVault({ [key]: session.pin });
                await migrator.clear();
                this.login({ ...session, useBiometric: await isBiometricsEnabled() });
                return true;
            }
            return false;
        } catch (error) {
            // Something went wrong...
            if ((await canRetry(error))) {
                return await this.migrateIfLegacyVault(++retryCount);
            } else if (!noDataInLegacyVault(error)) {
                await migrator.clear();
            }
        }
        return false;
    }



    async login(session: SessionData): Promise<void> {
        console.log("initAndUnlock: ", session);
        this.setIsLocked(false);
        this.setState(session);
        this.setUnlockMode(session);
    }

    private async setUnlockMode(session: SessionData) {
        let type = VaultType.CustomPasscode;
        let deviceSecurityType = DeviceSecurityType.None;
        this.state.useBiometric = session.useBiometric;
        await this.vault.setCustomPasscode(session.pin || await this.getPin());
        if (session.useBiometric) {
            type = VaultType.DeviceSecurity;
            deviceSecurityType = DeviceSecurityType.Biometrics;
        }
        console.log("NEW CONFIG: ", type, " deviceSecurityType:", deviceSecurityType);
        await this.patchVaultConfig({ type, deviceSecurityType });
    }

    async isVaultLocked(): Promise<boolean> {
        return (await this.hasStoredSession()) && (await this.vault.isLocked());
    }


    private async onPasscodeRequested(isPasscodeSetRequest: boolean): Promise<string> {

        if (isPasscodeSetRequest) {
            /// will happen on pin set
            return Promise.resolve(this.state.pin);
        } else {
            /// will happen on pin login
            const { data, role } = await this.presentPinModal(PinAction.LOGIN_PIN);
            if (PinCloseStatus.LOGIN_SUCCESS !== role) {
                const error = { code: role, message: data };
                this.vaultAuthEventObs.next({ biometricUsed: this.state.useBiometric, success: false, error });
                console.log("GOIN TO RETURN : ", error);
                return Promise.reject(error);
            }

            console.log("ARRIVED HERE....");
            this.vault.setCustomPasscode(data);
            return Promise.resolve(data);
        }
    }

    async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {
        return await this.pinService.navigateToPinPage(pinAction, pinModalProps);
    }


    async retrieveVaultPin(): Promise<string> {
        return await this.getPin();
    }

    async setState(session: SessionData) {
        const sessionPin = session.pin || await this.getPin()
        console.log("Setting the sessionPin to: ", sessionPin);
        this.state.pin = sessionPin;
        this.state.useBiometric = session.useBiometric;
        this.vault.setValue(key, sessionPin);
    }

    async getPin() {
        return this.state.pin || await this.vault.getValue(key);
    }

    async logout() {
        console.log("clearing vaults");
        this.state.pin = undefined;
        this.state.isLocked = false;
        await this.vault.clear();
    }

    async areBiometricsAvailable(): Promise<boolean> {
        return await Device.isBiometricsSupported();
    }


    async getAvailableBiometricHardware(): Promise<string[]> {
        return await Device.getAvailableHardware();
    }

    private setIsLocked(locked: boolean) {
        this.state.isLocked = locked;
    }

    getIsLocked() {
        return this.state.isLocked;
    }

    async setBiometricsEnabled(biometricEnabled: boolean): Promise<void> {
        return this.login({ useBiometric: biometricEnabled });
    }

    async lockVault(): Promise<void> {
        return await this.vault.lock();
    }




    async patchVaultConfig(config) {
        await this.vault.updateConfig({
            ...this.vault.config,
            ...config
        })
    }

    async unlockVault(biometricEnabled: boolean) {
        this.state.useBiometric = biometricEnabled;
        return await this.vault.unlock().catch((error) => {
            console.log("GOT ERROR 1: ", biometricEnabled, error);
            if (biometricEnabled) {
                this.retryPinUnlock();
            } else {
                console.log("GOT ERROR 222: ", biometricEnabled, error);
                this.vaultAuthEventObs.next({ success: false, error, biometricUsed: biometricEnabled })
            }
        });
    }

    private async doUnlockVault(biometricEnabled: boolean) {
        return this.showSplashScreen().then(() => {
            setTimeout(() => this.unlockVault(biometricEnabled), biometricEnabled ? 0 : 500);
        });
    }

    async retryPinUnlock() {
        console.log("retryPinUnlock ............")
        try {
            const data = await this.onPasscodeRequested(false);
            if (data) {
                this.vaultAuthEventObs.next({ success: true, biometricUsed: false, });
                await this.logout();
                this.login({ pin: data, useBiometric: this.state.useBiometric });
            }
        } catch (err) {
            console.log("ERROR CAUGHT: ", err);
        }
    }

    async hasStoredSession(): Promise<boolean> {
        return !(await this.vault.isEmpty());
    }


    async showSplashScreen(data = { replaceUrl: true, state: { skipLoginFlow: true } }) {
        return await this.ngZone.run(async () => {

            const navigated = await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            if (!navigated) {
                return await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            } else {
                return navigated;
            }
        });
    }

}