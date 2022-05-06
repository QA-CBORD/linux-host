import { Inject, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultMigrator, VaultType } from '@ionic-enterprise/identity-vault';
import { ModalController } from '@ionic/angular';
import { UserPreferenceService } from '@shared/services/user-preferences/user-preference.service';
import { PinAction, PinCloseStatus, PinPage } from '@shared/ui-components/pin/pin.page';
import { Subject } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { ANONYMOUS_ROUTES } from 'src/app/non-authorized/non-authorized.config';


export interface SessionData {
    isLocked?: boolean;
    pin?: string;
    useBiometric: boolean;
}

const config: IdentityVaultConfig = {
    key: 'get.cbord.com',
    type: VaultType.CustomPasscode,
    lockAfterBackgrounded: 5000
};
const key = 'sessionPin';


@Injectable({ providedIn: 'root' })
export class VaultService {
    public state: SessionData = {
        useBiometric: false,
        pin: null,
    };
    private vault: Vault | BrowserVault;
    public vaultAuthEventObs: Subject<{ success: boolean, biometricUsed: boolean, error?: any }> = new Subject();


    constructor(
        private ngZone: NgZone,
        @Inject(Injector) private injector: Injector,
        private readonly userPreferenceService: UserPreferenceService,
        private router: Router) {
        this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(config) : new Vault(config);
        window['VaultService'] = this;
    }

    private get modalController(): ModalController {
        return this.injector.get(ModalController);
    }

    async init() {
        await Device.setHideScreenOnBackground(false, false);

        this.vault.onError((error) => console.log("VAULT.ONERROR: ", error));

        this.vault.onPasscodeRequested(async (isPasscodeSetRequest) => this.onPasscodeRequested(isPasscodeSetRequest));
        this.vault.onUnlock(() => {
            this.ngZone.run(async () => {
                this.setIsLocked(false);
                this.state.pin = await this.vault.getValue(key);
                this.vaultAuthEventObs.next({ success: true, biometricUsed: this.state.useBiometric });
            })
        });
        this.vault.onLock(({ timeout }) => {
            console.log("ONLOCK Timeout: ", timeout);
            this.ngZone.run(() => {
                this.state.pin = null;
                this.setIsLocked(true);
                if (timeout) {
                    this.unlockVault(this.state.useBiometric);
                }
            });
        });

        await this.migrateIfLegacyVault();
    }


    private async migrateIfLegacyVault(): Promise<boolean> {

        try {
            const migrator = new VaultMigrator({
                // old V4 config
                restoreSessionOnReady: false,
                unlockOnReady: false,
                unlockOnAccess: false,
                lockAfter: 5000,
                hideScreenOnBackground: false,
                allowSystemPinFallback: false,
                shouldClearVaultAfterTooManyFailedAttempts: false,

            })
            const oldData = await migrator.exportVault();
            const useBiometric = (await Device.isBiometricsEnabled()) && await this.userPreferenceService.cachedBiometricsEnabledUserPreference();
            console.log("userPreferenceService.isBiometricsEnabled(): ", useBiometric);
            if (oldData) {
                // Import data into new vault
                console.log("VAULT oldData: ", oldData);
                const { session } = oldData;
                await this.vault.importVault({ [key]: session.pin });
                // Remove all of the old data from the legacy vault
                await migrator.clear();
                this.login({ ...session, useBiometric });
                return true;
            }
            return false;
        } catch (err) {
            // Something went wrong...
            console.log("MIGRATOR ERROR: ", err);
        }
        return false;
    }

    async login(session: SessionData): Promise<void> {
        console.log("initAndUnlock: ", session);
        this.setIsLocked(false);
        this.setUnlockMode(session);
        this.setState(session);
    }

    private async setUnlockMode(session: SessionData) {
        let type = VaultType.CustomPasscode;
        let deviceSecurityType = DeviceSecurityType.None;
        this.state.useBiometric = session.useBiometric;
        if (session.useBiometric) {
            type = VaultType.DeviceSecurity;
            deviceSecurityType = DeviceSecurityType.Biometrics;
        }
        console.log("NEW CONFIG: ", type, " deviceSecurityType:", deviceSecurityType);
        await this.vault.updateConfig({
            ...this.vault.config,
            type,
            deviceSecurityType
        });
    }

    async isVaultLocked(): Promise<boolean> {
        const hasSession = await this.hasStoredSession();
        return hasSession && await this.vault.isLocked();
    }


    private async onPasscodeRequested(isPasscodeSetRequest: boolean): Promise<string> {

        if (isPasscodeSetRequest) {
            /// will happen on pin set
            return Promise.resolve(this.state.pin);
        } else {
            /// will happen on pin login
            const { data, role } = await this.presentPinModal(PinAction.LOGIN_PIN);
            if (PinCloseStatus.LOGIN_SUCCESS !== role) {
                this.vaultAuthEventObs.next({
                    biometricUsed: this.state.useBiometric,
                    success: false,
                    error: {
                        code: role,
                        message: data
                    }
                });
                return Promise.resolve(null);
            }
            this.vault.setCustomPasscode(data);
            return Promise.resolve(data);
        }
    }

    async presentPinModal(pinAction: PinAction, pinModalProps?: any): Promise<any> {
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
        const sessionPin = session.pin || await this.getPin();
        console.log("Setting the sessionPin to: ", sessionPin);
        await this.vault.setCustomPasscode(sessionPin);
        this.state.pin = sessionPin;
        this.state.useBiometric = session.useBiometric;
        this.vault.setValue(key, sessionPin);
    }

    async getPin() {
        return this.state.pin || await this.vault.getValue(key);
    }

    async logout() {
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

    async unlockVault(biometricEnabled: boolean) {
        this.state.useBiometric = biometricEnabled;
        return this.showSplashScreen().then(async () => {
            return await this.vault.unlock().catch(async (error) => {
                console.log("GOT ERROR 1: ", biometricEnabled, error)
                if (biometricEnabled) {
                    this.retryPinUnlock();
                } else {
                    this.vaultAuthEventObs.next({ success: false, error, biometricUsed: biometricEnabled })
                }
            });
        });
    }

    private async retryPinUnlock() {
        this.onPasscodeRequested(false).then(async (data) => {
            if (data) {
                this.vaultAuthEventObs.next({
                    success: true,
                    biometricUsed: false,
                });
                await this.logout();
                this.login({ pin: data, useBiometric: true });
            }
        })
    }

    async hasStoredSession(): Promise<boolean> {
        return !(await this.vault.isEmpty());
    }


    private async showSplashScreen() {
        return await this.ngZone.run(async () => {
            const data = {
                replaceUrl: true,
                state: { skipLoginFlow: true }
            };
            const navigated = await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            if (!navigated) {
                return await this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.startup], data)
            } else {
                return navigated;
            }
        });
    }

}