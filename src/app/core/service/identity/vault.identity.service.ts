import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultErrorCodes, VaultMigrator, VaultType } from '@ionic-enterprise/identity-vault';
import { ModalController } from '@ionic/angular';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { PinAction, PinCloseStatus, PinPage } from '@shared/ui-components/pin/pin.page';
import { Subject } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { LoadingService } from '../loading/loading.service';


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
    //public vaultAuthEventObs: Subject<{ success: boolean, biometricUsed: boolean, error?: any }> = new Subject();
    private vaultPinUnlockError$: Subject<any> = new Subject();

    constructor(
        private ngZone: NgZone,
        private readonly userPreferenceService: UserPreferenceService,
        private router: Router,
        private modalController: ModalController,
        private loadingService: LoadingService
    ) {
        this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
        this.init();
        window['VaultService'] = this;
    }

    async init() {
        await Device.setHideScreenOnBackground(false, false);

        this.vault.onError((error) => console.log("VAULT.ONERROR: ", error));

        this.vault.onPasscodeRequested((isPasscodeSetRequest) => {
            console.log("vault.onPasscodeRequested: ", isPasscodeSetRequest);
            return this.onPasscodeRequested(isPasscodeSetRequest);
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
    }






    // this method is called when this app is going to open another app;
    // we may not want this app to lock itself is we're expecting a result from the other app.



    async migrateIfLegacyVault(retryCount: number = 0): Promise<VaultMigrateResult> {

        const isBiometricsEnabled = async () => (await Device.isBiometricsEnabled()) && await this.userPreferenceService.cachedBiometricsEnabledUserPreference();
        const noDataInLegacyVault = ({ code, message }) => (code == undefined && /no data in legacy vault/.test(message));

        const userFailedBiometricsAuth = async (error) => {
            return await isBiometricsEnabled() && (error.code == VaultErrorCodes.TooManyFailedAttempts
                || error.code == VaultErrorCodes.iOSBiometricsLockedOut
                || error.code == VaultErrorCodes.AndroidBiometricsLockedOut);
        }

        // old V4 config
        const migrator = new VaultMigrator({
            restoreSessionOnReady: false,
            unlockOnReady: false,
            unlockOnAccess: false,
            lockAfter: 5000,
            hideScreenOnBackground: false,
            allowSystemPinFallback: false,
            shouldClearVaultAfterTooManyFailedAttempts: false
        }, (isPasscodeSetRequest) => this.onPasscodeRequested(isPasscodeSetRequest));

        try {
            this.loadingService.closeSpinner();
            const oldVaultData = await migrator.exportVault();
            if (oldVaultData)
                return this.onVaultMigrated(oldVaultData.session, migrator, await isBiometricsEnabled())
        } catch (error) {
            // Something went wrong...
            console.log("GOT ERROR AQUI: ", error);
            if (noDataInLegacyVault(error)) {
                return VaultMigrateResult.MIGRATION_NOT_NEEDED;
            } if (await userFailedBiometricsAuth(error)) {
                return this.retryPinUnlock()
                    .then(async ({ pin }) => this.onVaultMigrated({ pin }, migrator, await isBiometricsEnabled()))
                    .catch(() => migrator.clear() && VaultMigrateResult.MIGRATION_FAILED)
            }
        }

        await migrator.clear();
        return VaultMigrateResult.MIGRATION_FAILED;
    }


    async onVaultMigrated(session: { pin: string }, migrator: VaultMigrator, isBiometricsEnabled: boolean): Promise<VaultMigrateResult> {
        try {
            await this.vault.setCustomPasscode(session.pin);
            await this.vault.importVault({ [key]: session.pin });
            await migrator.clear();
            this.login({ ...session, useBiometric: isBiometricsEnabled });
        } catch (error) { }
        return VaultMigrateResult.MIGRATION_SUCCESS;
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


    private async onPasscodeRequested(isPasscodeSetRequest: boolean, publishError: boolean = true): Promise<string> {
        console.log("onPasscodeRequested: called: ", isPasscodeSetRequest);

        if (isPasscodeSetRequest) {
            /// will happen on pin set
            return Promise.resolve(this.state.pin);
        } else {
            /// will happen on pin login
            const { data: pin, role: status } = await this.presentPinModal(PinAction.LOGIN_PIN);
            if (PinCloseStatus.LOGIN_SUCCESS !== status) {
                const error = { code: status, message: pin };
                if (publishError) this.vaultPinUnlockError$.next(error);
                console.log("GOIN TO RETURN : ", error);
                return Promise.reject(error);
            }

            console.log("ARRIVED HERE....");
            this.vault.setCustomPasscode(pin);
            return Promise.resolve(pin);
        }
    }

    async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {
        // return await this.pinService.navigateToPinPage(pinAction, pinModalProps);
        let componentProps = { pinAction, ...pinModalProps };
        const pinModal = await this.modalController.create({
            backdropDismiss: false,
            component: PinPage,
            componentProps,
        });
        await pinModal.present();
        return await pinModal.onDidDismiss();
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

    async unlockVault(biometricEnabled: boolean): Promise<{ pin: string, biometricUsed: boolean }> {

        biometricEnabled = biometricEnabled == null ? this.state.useBiometric : biometricEnabled;
        this.state.useBiometric = biometricEnabled;
        // close any modal if any opened.
        await this.closeAllModals();
        return await new Promise<{ pin: string, biometricUsed: boolean }>(async (resolve, reject) => {
            const subscription = this.vaultPinUnlockError$.subscribe(reject);
            this.vault.onUnlock(() => {
                this.ngZone.run(async () => {
                    this.setIsLocked(false);
                    this.state.pin = await this.vault.getValue(key);
                    console.log("Resolving promises....: ", this.state.pin)
                    resolve({ pin: this.state.pin, biometricUsed: biometricEnabled });
                })
            });

            try {
                await this.vault.unlock();
            } catch (error) {
                if (biometricEnabled) {
                    this.retryPinUnlock().then(async (data) => {
                        resolve(data);
                        this.logout();
                        setTimeout(() => this.login({ pin: data.pin, useBiometric: this.state.useBiometric }), 100);
                    }).catch((err) => { console.log("Ignored pin error: ", err) });
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


    async showSplashScreen(biometricUsed: boolean, skipLoginFlow: boolean = true, navigateToDashboard: boolean = false) {

        const state = {
            skipLoginFlow,
            navigateToDashboard,
            biometricUsed: biometricUsed
        }

        const data = { replaceUrl: true, state };

        return await this.ngZone.run(async () => {
            const navigated = await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            if (!navigated) {
                return await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            } else {
                return navigated;
            }
        });
    }

    async closeAllModals(): Promise<void> {
        /// check for all loaders and remove them
        this.loadingService.closeSpinner();
        let topModal = await this.modalController.getTop();

        while (topModal) {
            (await topModal.dismiss()) ? (topModal = await this.modalController.getTop()) : (topModal = null);
        }
    }

}