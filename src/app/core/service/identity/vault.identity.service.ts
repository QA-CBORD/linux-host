import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultErrorCodes, VaultMigrator, VaultType } from '@ionic-enterprise/identity-vault';
import { ModalController } from '@ionic/angular';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { PinAction, PinCloseStatus, PinPage } from '@shared/ui-components/pin/pin.page';
import { Subject } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { LoadingService } from '../loading/loading.service';


export interface EventInfo {
    estimatedTimeInMillis?: number;
    makeVaultUnLockable: boolean;
    keepVaultUnLockableOnResume?: boolean;
}

const APP_STATE_CHANGE = 'appStateChange';

const TIME_OUT_WITH_EXTRA = 600000; // 10 minutes.

export interface SessionData {
    isLocked?: boolean;
    pin?: string;
    useBiometric: boolean;
}
const key = 'sessionPin';

export const VAULT_DEFAULT_TIME_OUT_IN_MILLIS = 5000;

const config: IdentityVaultConfig = {
    key: 'get.cbord.com',
    type: VaultType.CustomPasscode,
    deviceSecurityType: DeviceSecurityType.None,
    lockAfterBackgrounded: VAULT_DEFAULT_TIME_OUT_IN_MILLIS
};

export interface PinResultObserver {
    notify: (data: any, role: any) => void
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


@Injectable({ providedIn: 'root' })
export class VaultService {
    public state: SessionData = { useBiometric: false, pin: null };
    private vault: Vault | BrowserVault;
    private vaultPinUnlockError$: Subject<any> = new Subject();
    private pluginListenerHandle: PluginListenerHandle;

    constructor(
        private ngZone: NgZone,
        private readonly userPreferenceService: UserPreferenceService,
        private router: Router,
        private modalController: ModalController,
        private loadingService: LoadingService
    ) {
        this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
        this.init();
    }

    private async init() {
        await Device.setHideScreenOnBackground(false, false);
        this.vault.onError((error) => console.log("VAULT.ONERROR: ", error));
        this.vault.onPasscodeRequested((isPassSetReq) => this.onPasscodeRequested(isPassSetReq));

        this.vault.onLock(({ timeout }) => {
            this.ngZone.run(() => {
                this.state.pin = null;
                this.setIsLocked(true);
                if (timeout) {
                    this.doUnlockVault(this.state.useBiometric);
                }
            });
        });
    }


    /**
     * Will migrate data from old vault to new vault if needed. called externally.
     * @returns 
     */
    async migrateIfLegacyVault(): Promise<VaultMigrateResult> {
        const wasBiometricPreferredByUser = async () => await this.userPreferenceService.cachedBiometricsEnabledUserPreference();
        const isBiometricsEnabled = async () => (await wasBiometricPreferredByUser() && await this.isBiometricsEnabled());
        const noDataInLegacyVault = ({ code, message }) => (code == undefined && /no data in legacy vault/.test(message));

        const userFailedBiometricsAuth = async (error) => {
            return await wasBiometricPreferredByUser() && (
                error.code == VaultErrorCodes.TooManyFailedAttempts
                || error.code == VaultErrorCodes.iOSBiometricsLockedOut
                || error.code == VaultErrorCodes.AndroidBiometricsLockedOut
                || error.code == VaultErrorCodes.SecurityNotAvailable
                || error.code == VaultErrorCodes.BiometricsNotEnabled);
        }

        // old V4 config
        const oldVaultConfig = {
            restoreSessionOnReady: false,
            unlockOnReady: false,
            unlockOnAccess: false,
            lockAfter: 5000,
            hideScreenOnBackground: false,
            allowSystemPinFallback: false,
            shouldClearVaultAfterTooManyFailedAttempts: false
        };
        const migrator = new VaultMigrator(oldVaultConfig, () => this.onPasscodeRequested(false));
        try {
            this.loadingService.closeSpinner();
            const oldVaultData = await migrator.exportVault();
            if (oldVaultData)
                return this.onVaultMigrated(oldVaultData.session, migrator, await isBiometricsEnabled())
        } catch (error) {
            if (noDataInLegacyVault(error)) {
                return VaultMigrateResult.MIGRATION_NOT_NEEDED;
            } if ((await userFailedBiometricsAuth(error))) {
                return this.retryPinUnlock()
                    .then(async ({ pin }) => this.onVaultMigrated({ pin }, migrator, await isBiometricsEnabled()))
                    .catch(() => migrator.clear() && VaultMigrateResult.MIGRATION_FAILED)
            }
        }

        await migrator.clear();
        return VaultMigrateResult.MIGRATION_FAILED;
    }


    /**
     * Called when we successfully migrated data from old vault config to new vault.
     */
    private async onVaultMigrated(session: { pin: string }, migrator: VaultMigrator, isBiometricsEnabled: boolean): Promise<VaultMigrateResult> {
        try {
            await this.vault.setCustomPasscode(session.pin);
            await this.vault.importVault({ [key]: session.pin });
            await migrator.clear();
            this.login({ ...session, useBiometric: isBiometricsEnabled });
        } catch (error) { /**Ignored on purpose */ }
        return VaultMigrateResult.MIGRATION_SUCCESS;
    }


    /**
     * Called to start vault setup.
     * @param session 
     * session must contain the pin.
     */
    async login(session: SessionData): Promise<void> {
        this.setIsLocked(false);
        this.setState(session);
        this.setUnlockMode(session);
    }

    /**
     * We want to able to change vault's config on the fly, from biometrics to customPasscode and vice versa.
     * @param session 
     */
    private async setUnlockMode(session: SessionData) {
        let type = VaultType.CustomPasscode;
        let deviceSecurityType = DeviceSecurityType.None;
        this.state.useBiometric = session.useBiometric;
        await this.vault.setCustomPasscode(session.pin || await this.getPin());
        if (session.useBiometric) {
            type = VaultType.DeviceSecurity;
            deviceSecurityType = DeviceSecurityType.Biometrics;
        }
        await this.patchVaultConfig({ type, deviceSecurityType });
    }

    async isVaultLocked(): Promise<boolean> {
        return (await this.hasStoredSession()) && (await this.vault.isLocked());
    }


    /**
     * Called by iv when customPasscode is used and we try to unlock vault.
     * @param isPasscodeSetRequest 
     * @param publishError 
     * @returns 
     */
    private async onPasscodeRequested(isPasscodeSetRequest: boolean, publishError: boolean = true): Promise<string> {

        if (isPasscodeSetRequest) {
            /// will happen on pin set
            return Promise.resolve(this.state.pin);
        } else {
            /// will happen on pin login
            const { data: pin, role: responseStatus } = await this.presentPinModal(PinAction.LOGIN_PIN);
            if (PinCloseStatus.LOGIN_SUCCESS == responseStatus) {
                this.vault.setCustomPasscode(pin);
                return Promise.resolve(pin);
            }

            const error = { code: responseStatus, message: pin };
            if (publishError) this.vaultPinUnlockError$.next(error);
            return Promise.reject(error);
        }
    }

    async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {
        const componentProps = { pinAction, ...pinModalProps };
        const pinModal = await this.modalController.create({
            backdropDismiss: false,
            component: PinPage,
            componentProps,
        });
        await pinModal.present();
        return await pinModal.onDidDismiss();
    }

    private async setState(session: SessionData) {
        const sessionPin = session.pin || await this.getPin();
        this.state.pin = sessionPin;
        this.state.useBiometric = session.useBiometric;
        this.vault.setValue(key, sessionPin);
    }

    private async getPin() {
        return this.state.pin || await this.vault.getValue(key);
    }

    async logout() {
        this.state.pin = undefined;
        this.state.isLocked = false;
        await this.vault.clear();
    }

    async isBiometricsEnabled(): Promise<boolean> {
        return await Device.isBiometricsEnabled();
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

    private async patchVaultConfig(config) {
        await this.vault.updateConfig({
            ...this.vault.config,
            ...config
        })
    }


    /**
     * Called to unlock vault. will ask user to enter biometrics (fingerprint, faceID) or pin.
     * @param biometricEnabled 
     * @returns 
     */
    async unlockVault(biometricEnabled: boolean = this.state.useBiometric): Promise<{ pin: string, biometricUsed: boolean }> {
        this.state.useBiometric = biometricEnabled;
        // close any modal if any opened.
        await this.closeAllModals();
        return await new Promise<{ pin: string, biometricUsed: boolean }>(async (resolve, reject) => {
            const subscription = this.vaultPinUnlockError$.subscribe(reject);
            this.vault.onUnlock(() => {
                this.ngZone.run(async () => {
                    this.setIsLocked(false);
                    this.state.pin = await this.vault.getValue(key);
                    resolve({ pin: this.state.pin, biometricUsed: biometricEnabled });
                })
            });

            try {
                await this.vault.unlock();
            } catch (error) {
                if (biometricEnabled) {
                    this.retryPinUnlock().then((data) => {
                        resolve(data);
                        this.logout();
                        setTimeout(() => this.login({ pin: data.pin, useBiometric: this.state.useBiometric }), 100);
                    }).catch(() => { /** Ignored on purpose */ });
                }
            } finally {
                subscription.unsubscribe();
            }
        });
    }

    private async doUnlockVault(biometricEnabled: boolean) {
        return this.showSplashScreen(biometricEnabled);
    }

    private async retryPinUnlock(): Promise<{ pin: string, biometricUsed: boolean }> {
        let sessionPin = await this.onPasscodeRequested(false, false);
        return { pin: sessionPin, biometricUsed: false };
    }

    async hasStoredSession(): Promise<boolean> {
        return !(await this.vault.isEmpty());
    }


    private async showSplashScreen(biometricUsed: boolean, skipLoginFlow: boolean = true) {
        const data = {
            replaceUrl: true,
            state: {
                skipLoginFlow,
                biometricUsed: biometricUsed
            }
        };

        return await this.ngZone.run(async () => {
            const navigated = await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            if (!navigated) {
                return await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            } else {
                return navigated;
            }
        });
    }

    private async closeAllModals(): Promise<void> {
        /// check for all loaders and remove them
        this.loadingService.closeSpinner();
        let topModal = await this.modalController.getTop();

        while (topModal) {
            (await topModal.dismiss()) ? (topModal = await this.modalController.getTop()) : (topModal = null);
        }
    }

    /**
     * this method should be called when this app (GetApp) is going to open another app (or an activity from another app), because vault will lock this app while you're still in the other app.
     * We may not want vault to lock itself if we're expecting a result from the other app.
     * otherwise the user will be asked to authenticate and you will probably lose the results from the other app.
     * @param e 
     *  e.makeVaultUnLockable=true means you don't want GetApp to lock itself, defaults to "false"
     *  e.estimatedTimeInMillis means for how long you want vault to wait before it locks itself. defaults to "TIME_OUT_WITH_EXTRA" (10min)
     *  e.keepVaultUnLockableOnResume=true means you don't want vaultService to auto-adjust it's "lockAfterBackgrounded" setting back to "VAULT_DEFAULT_TIME_OUT_IN_MILLIS (5000)" once you get back from the app you opened.
     *  this defaults to false, meaning that vault will try to adjust the "lockAfterBackgrounded" setting back to 5000 millis unless otherwise specified.
     * @returns 
     */
    async onNavigateExternal(e: EventInfo) {
        let canLockVault = !e.makeVaultUnLockable;

        if (canLockVault) {
            return this.canLockScreen(true).finally(() => {
                this.pluginListenerHandle?.remove();
                this.pluginListenerHandle = null;
            });
        }
        const estimatedTimeInMillis = e.estimatedTimeInMillis || TIME_OUT_WITH_EXTRA;
        this.canLockScreen(canLockVault, estimatedTimeInMillis);
        const makeVaultLockableOnResume = !e.keepVaultUnLockableOnResume;
        this.pluginListenerHandle = await App.addListener(APP_STATE_CHANGE, ({ isActive }) => {
            if (isActive) {
                if (makeVaultLockableOnResume)
                    setTimeout(() => this.canLockScreen(true), 3000);
                this.pluginListenerHandle?.remove();
            }
        });

        if (e.keepVaultUnLockableOnResume) {
            setTimeout(async () => {
                if (this.pluginListenerHandle) {
                    this.canLockScreen(true).finally(() => this.pluginListenerHandle?.remove());
                }
            }, estimatedTimeInMillis);
        }
    }

    private async canLockScreen(canLock: boolean, estimatedTime: number = VAULT_DEFAULT_TIME_OUT_IN_MILLIS) {
        const isVaultCurrentlyNotLocked = !(await this.isVaultLocked());
        if (isVaultCurrentlyNotLocked) {
            return this.patchVaultConfig({ lockAfterBackgrounded: estimatedTime }).then(() => true);
        }
        return false;
    }

}