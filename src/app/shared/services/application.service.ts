import { Injectable } from "@angular/core";
import { App } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";
import { VaultService, VAULT_DEFAULT_TIME_OUT_IN_MILLIS } from "@core/service/identity/vault.identity.service";

export interface EventInfo {
    estimatedTimeInMillis?: number;
    makeVaultUnLockable: boolean;
    keepVaultUnLockableOnResume?: boolean;
}

const APP_STATE_CHANGE = 'appStateChange';

const TIME_OUT_WITH_EXTRA = 600000 / 10; // 10 minutes.

@Injectable({ providedIn: 'root' })
export class ApplicationService {
    // 
    private pluginListenerHandle: PluginListenerHandle;

    constructor(private readonly identityVaultService: VaultService) { }


    async onNavigateExternal(e: EventInfo) {
        let canLockVault = !e.makeVaultUnLockable;

        if (canLockVault) {
            return this.canLockScreen(true).finally(() => {
                this.pluginListenerHandle?.remove();
                console.log("");
                this.pluginListenerHandle = null;
            });
        }
        const estimatedTimeInMillis = e.estimatedTimeInMillis || TIME_OUT_WITH_EXTRA;
        this.canLockScreen(canLockVault, estimatedTimeInMillis);
        const makeVaultLockableOnResume = !e.keepVaultUnLockableOnResume;
        this.pluginListenerHandle = await App.addListener(APP_STATE_CHANGE, ({ isActive }) => {
            console.log("onNavigateExternal APP_STATE_CHANGE: ", isActive, makeVaultLockableOnResume);
            if (isActive) {
                if (makeVaultLockableOnResume)
                    setTimeout(() => this.canLockScreen(true), 3000);
                this.pluginListenerHandle?.remove();
            }
        });

        if (e.keepVaultUnLockableOnResume) {
            setTimeout(async () => {
                console.log("keepVaultUnLockableOnResume: going to reset vault..............: ", this.pluginListenerHandle)
                this.canLockScreen(true).finally(() => this.pluginListenerHandle?.remove());
            }, estimatedTimeInMillis);
        }
    }

    private async canLockScreen(canLock: boolean, estimatedTime: number = VAULT_DEFAULT_TIME_OUT_IN_MILLIS) {
        const isVaultCurrentlyNotLocked = !(await this.identityVaultService.isVaultLocked());
        console.log("canLockScreen: ", canLock, estimatedTime, isVaultCurrentlyNotLocked);
        if (isVaultCurrentlyNotLocked) {
            return this.identityVaultService.patchVaultConfig({ lockAfterBackgrounded: estimatedTime }).then(() => true);
        }
        return false;
    }
}