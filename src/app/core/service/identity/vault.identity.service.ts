import { Inject, Injectable, Injector, NgZone } from '@angular/core';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, Vault, VaultErrorCodes, VaultMigrator, VaultType } from '@ionic-enterprise/identity-vault';
import { ModalController } from '@ionic/angular';
import { NavigationService } from '@shared/services/navigation.service';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { PinPage } from '@shared/ui-components/pin/pin.page';
import { Subject, Subscription } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { LoadingService } from '../loading/loading.service';
import { SessionData, TIME_OUT_WITH_EXTRA, VaultMigrateResult, VaultTimeoutOptions, VaultSession, VAULT_DEFAULT_TIME_OUT_IN_MILLIS, PinAction, PinCloseStatus } from './model.identity';
import { VaultFactory } from './vault-factory.service';

const key = 'sessionPin';
const APP_STATE_CHANGE = 'appStateChange';

@Injectable({ providedIn: 'root' })
export class VaultIdentityService {
    public state: SessionData = { biometricEnabled: false, pin: null };
    private vault: Vault | BrowserVault;
    private vaultPinUnlockError$: Subject<any> = new Subject();
    private pluginListenerHandle: PluginListenerHandle;
    private setTimeoutId: number;
    private pinModalOpened = false;
    private tempPin: string;
    private isMigrating = false;
    pinSupplier$ = new Subject<string>();
    pinErrorSupplier$ = new Subject<string>();

    constructor(
        @Inject(Injector) private injector: Injector,
        private readonly ngZone: NgZone,
        private userPreferenceService: UserPreferenceService
    ) {
        window['vaultIdentityService'] = this;
    }


    get routingService(): NavigationService {
        return this.injector.get(NavigationService);
    }
    get modalController(): ModalController {
        return this.injector.get(ModalController);
    }

    get loadingService(): LoadingService {
        return this.injector.get(LoadingService);
    }

    async init(vault?: Vault | BrowserVault) {
        this.vault = vault || VaultFactory.newVaultInstance();
        await Device.setHideScreenOnBackground(false, false);
        this.vault.onPasscodeRequested((isPassSetReq, cb) => this.onPasscodeRequestedV2(isPassSetReq, cb));
        this.vault.onError((e) => console.log("VAULT.ERROR: ", e));
        this.vault.onLock(({ timeout }) => {
            this.ngZone?.run(() => {
                this.state.pin = null;
                this.setIsLocked(true);
                if (timeout) {
                    this.doUnlockVault(this.state.biometricEnabled);
                }
            });
        });
    }

    isBiometricPermissionDenied({ code }): boolean {
        const userDeniedBiometricPermission = (code == VaultErrorCodes.SecurityNotAvailable) || (code == VaultErrorCodes.AuthFailed);
        if (userDeniedBiometricPermission)
            this.userPreferenceService.setBiometricPermissionDenied();
        return userDeniedBiometricPermission;
    }

    /**
     * Will migrate data from old vault to new vault if needed. called externally.
     * @returns 
     */
    async migrateIfLegacyVault(): Promise<VaultMigrateResult> {

        const isBiometricsEnabled = async () => (await this.userPreferenceService.cachedBiometricsEnabledUserPreference() && await this.isBiometricAvailable());
        const noDataInLegacyVault = ({ code, message }) => (code == undefined && /no data in legacy vault/.test(message));

        const userFailedBiometricsAuth = async (error) => {
            const isBiometric = await this.userPreferenceService.cachedBiometricsEnabledUserPreference();
            return isBiometric && this.isBiometricPermissionDenied(error)
                || error.code === VaultErrorCodes.TooManyFailedAttempts
                || error.code === VaultErrorCodes.iOSBiometricsLockedOut
                || error.code === VaultErrorCodes.AndroidBiometricsLockedOut
                || error.code === VaultErrorCodes.BiometricsNotEnabled
                || error.code === VaultErrorCodes.UserCanceledInteraction;
        }
        const migrator = VaultFactory.newVaultMigratorInstance((e) => {
            console.log("MIGRATING WITH PIN: this.isMigrating: ", this.isMigrating);
            if (!this.isMigrating) {
                this.presentPinModal(PinAction.LOGIN_PIN);
            }
            this.isMigrating = true;
            return new Promise((resolve) => {
                this.pinSupplier$.subscribe({
                    next: (pin) => resolve(pin)
                })
            });
        });
        try {
            this.loadingService.closeSpinner();
            const oldVaultData = await migrator.exportVault();
            this.isMigrating = false;
            this.pinSupplier$.next(null);
            
            if (oldVaultData) {
                return this.onVaultMigratedSuccess(oldVaultData.session, migrator, await isBiometricsEnabled());
            }
        } catch (error) {
            if (noDataInLegacyVault(error)) {
                return VaultMigrateResult.MIGRATION_NOT_NEEDED;
            } if (await userFailedBiometricsAuth(error)) {
                return this.handleAuthFailureOnVaultMigration(migrator, await isBiometricsEnabled());
            } else {
                // pin rejected....
                this.pinErrorSupplier$.error(error);
                return await this.migrateIfLegacyVault()
            }
        }

        migrator.clear();
        return VaultMigrateResult.MIGRATION_FAILED;
    }


    async handleAuthFailureOnVaultMigration(migrator: VaultMigrator, biometricEnabled: boolean): Promise<VaultMigrateResult> {
        try {
            return this.onVaultMigratedSuccess(await this.retryPinUnlock(), migrator, biometricEnabled);
        } catch (e) {
            migrator.clear();
            return VaultMigrateResult.MIGRATION_FAILED
        }
    }

    /**
     * Called when we successfully migrated data from old vault config to new vault.
     */
    async onVaultMigratedSuccess(session: { pin: string }, migrator: VaultMigrator, biometricEnabled: boolean): Promise<VaultMigrateResult> {
        try {

            debugger
            await this.vault.setCustomPasscode(session.pin);
            await this.vault.importVault({ [key]: session.pin });
            await migrator.clear();
            this.login({ ...session, biometricEnabled });
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
        await this.setState(session);
        this.setUnlockMode(session);
    }

    /**
     * We want to able to change vault's config on the fly, from biometrics to customPasscode and vice versa.
     * @param session 
     */
    async setUnlockMode(session: SessionData) {
        let type = VaultType.CustomPasscode;
        let deviceSecurityType = DeviceSecurityType.None;
        this.state.biometricEnabled = session.biometricEnabled;
        if (session.biometricEnabled) {
            type = VaultType.DeviceSecurity;
            deviceSecurityType = DeviceSecurityType.Biometrics;
        }
        await this.patchVaultConfig({ type, deviceSecurityType });
    }

    async isVaultLocked(): Promise<boolean> {
        return (await this.hasStoredSession()) && (await this.vault.isLocked());
    }

    private async onPasscodeRequestedV2(isPasscodeSetRequest: boolean, complete) {
        console.log("onPasscodeRequestedV2: ", isPasscodeSetRequest);
        debugger
        if (isPasscodeSetRequest) {
            /// will happen on pin set
            return Promise.resolve(this.state.pin);
        } else {
            this.vault.setCustomPasscode(this.tempPin);
            return Promise.resolve(this.tempPin);
        }
    }


    /**
     * Called by iv when customPasscode is used and we try to unlock vault.
     * @param isPasscodeSetRequest 
     * @param publishError 
     * @returns 
     */
    private async onPasscodeRequested(isPasscodeSetRequest: boolean, publishError = true): Promise<string> {

        console.log("onPasscodeRequested: ", isPasscodeSetRequest);

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

    async setVaultPasscode(pin: string) {
        this.tempPin = pin;
        if (this.isMigrating) {
            this.pinSupplier$.next(this.tempPin);
            return new Promise((resolve, reject) => {
                const susbcription: Subscription = this.pinErrorSupplier$.subscribe({
                    next: () => resolve(pin),
                    error: (e) => reject(e),
                    complete: () => susbcription.unsubscribe()
                });
            })
        } else {
            return this.vault.unlock();
        }
    }

    async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {

        this.pinModalOpened = true;
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
        this.state.biometricEnabled = session.biometricEnabled;
        await this.vault.setCustomPasscode(sessionPin);
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

    async isBiometricAvailable(): Promise<boolean> {
        return await Device.isBiometricsEnabled() && await this.isBiometricAllowed();
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
        return this.login({ biometricEnabled });
    }

    async lockVault(): Promise<void> {
        return await this.vault.lock();
    }

    private async isBiometricAllowed(): Promise<boolean> {

        // uncomment next line when ionic fix reported bug
        // return (await Device.biometricsAllowed() == undefined) || await Device.biometricsAllowed();

        return !(await this.userPreferenceService.getBiometricPermissionDenied());
    }

    async patchVaultConfig(config) {
        await this.vault.updateConfig({
            ...this.vault.config,
            ...config
        })
    }

    /**
     * 
     * @returns VaultSession
     */
    async unlockVaultIfLocked(): Promise<VaultSession> {
        if (await this.hasStoredSession()) {
            return this.unlockVault(await this.userPreferenceService.cachedBiometricsEnabledUserPreference());
        }
        return { pin: null };
    }


    private async unlockVaultPin(resolve, reject) {
        const { data: pin, role: responseStatus } = await this.presentPinModal(PinAction.LOGIN_PIN);
        if (PinCloseStatus.LOGIN_SUCCESS == responseStatus) {
            this.onVaultUnlockSuccess(pin);
            return resolve({ pin, biometricUsed: false });
        }
        return reject({ message: responseStatus });
    }

    onVaultUnlockSuccess(pin: string) {
        console.log("onVaultUnlockSuccess*** : ", pin);
        this.setIsLocked(false);
        this.state.pin = pin;
    }


    private async unlockVaultBiometric(resolve, reject) {
        try {
            await this.vault.unlock();
            const pin = await this.vault.getValue(key);
            this.onVaultUnlockSuccess(pin);
            resolve({ pin, biometricUsed: true });
        } catch (error) {
            debugger
            await this.onBiometricAuthFailed(error, resolve, reject);
            reject(error);
        }
    }


    /**
     * Called to unlock vault. will ask user to enter biometrics (fingerprint, faceID) or pin, but will only do that if vault is locked.
     * @param biometricEnabled 
     * @returns 
     */
    async unlockVault(biometricEnabled: boolean): Promise<VaultSession> {
        this.state.biometricEnabled = biometricEnabled;
        await this.closeAllModals();
        return new Promise<VaultSession>((resolve, reject) => {
            if (this.state.biometricEnabled) {
                this.unlockVaultBiometric(resolve, reject);
            } else {
                this.unlockVaultPin(resolve, reject);
            }
        });
    }

    async onBiometricAuthFailed(error, resolve, reject) {
        const biometricAllowed = !this.isBiometricPermissionDenied(error);
        await this.patchVaultConfig({
            type: VaultType.CustomPasscode, deviceSecurityType: DeviceSecurityType.None
        });
        await this.retryPinUnlock().then(async (data) => {
            const session = { pin: data.pin, biometricEnabled: biometricAllowed };
            await this.logout();
            this.login(session);
            resolve({ ...session, biometricUsed: false });
        }).catch((e) => {
            reject(e);
        });
    }

    private async doUnlockVault(biometricEnabled: boolean) {
        return this.openStartupPage(biometricEnabled);
    }

    async retryPinUnlock(): Promise<{ pin: string, biometricEnabled: boolean }> {
        const sessionPin = await this.onPasscodeRequested(false, false);
        return { pin: sessionPin, biometricEnabled: false };
    }

    async hasStoredSession(): Promise<boolean> {
        return !(await this.vault.isEmpty());
    }


    async openStartupPage(biometricEnabled: boolean, skipLoginFlow = true) {
        return this.showSplashScreen({ skipLoginFlow, biometricEnabled });
    }

    async showSplashScreen(state: { skipLoginFlow: boolean, biometricEnabled: boolean }) {
        return await this.routingService.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup],
            { replaceUrl: true, state });
    }

    async closeAllModals(): Promise<void> {
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
     *  e.keepVaultUnLockableOnResume=true means you don't want vaultIdentityService to auto-adjust it's "lockAfterBackgrounded" setting back to "VAULT_DEFAULT_TIME_OUT_IN_MILLIS (5000)" once you get back from the app you opened.
     *  this defaults to false, meaning that vault will try to adjust the "lockAfterBackgrounded" setting back to 5000 millis unless otherwise specified.
     * @returns 
     */
    async updateVaultTimeout(e: VaultTimeoutOptions) {
        if (!e.extendTimeout) {
            return this.setNewVaultTimeoutValue()
                .finally(() => {
                    this.pluginListenerHandle?.remove();
                    clearTimeout(this.setTimeoutId);
                });
        }
        const estimatedTimeInMillis = e.estimatedTimeInMillis || TIME_OUT_WITH_EXTRA;
        this.setNewVaultTimeoutValue(estimatedTimeInMillis);
        if (e.keepTimeoutExtendedOnResume) {
            clearTimeout(this.setTimeoutId);
            this.setTimeoutId = setTimeout(() => this.setNewVaultTimeoutValue(), estimatedTimeInMillis);
        } else {
            this.pluginListenerHandle = await App.addListener(APP_STATE_CHANGE, ({ isActive }) => {
                if (isActive) {
                    setTimeout(() => this.setNewVaultTimeoutValue(), 1000);
                    this.pluginListenerHandle?.remove();
                }
            });
        }
    }

    async setNewVaultTimeoutValue(estimatedTime: number = VAULT_DEFAULT_TIME_OUT_IN_MILLIS) {
        const isVaultCurrentlyNotLocked = !(await this.isVaultLocked());
        if (isVaultCurrentlyNotLocked) {
            this.patchVaultConfig({ lockAfterBackgrounded: estimatedTime });
            return true;
        }
        return false;
    }

}