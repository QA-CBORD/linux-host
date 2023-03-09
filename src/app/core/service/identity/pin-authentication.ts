import { PinLoginProps } from "@core/model/authentication/pin-login-props.model";
import { VaultErrorCodes } from "@ionic-enterprise/identity-vault";
import { ModalController } from "@ionic/angular";
import { PinPage } from "@shared/ui-components/pin/pin.page";
import { firstValueFrom, Subject } from 'rxjs'
import { PinAction, PinCloseStatus, VaultAuthenticator } from "./model.identity";

export const PIN_MODAL_ID = 'pin-modal';

export class PinAuthenticator {
    private pinModalOpened = false;
    private authenticator: VaultAuthenticator = new VaultAuthenticator();
    private pinClosedSubject = new Subject<PinCloseStatus>();

    constructor(private modalController: ModalController) { }


    async onPasscodeRequested(): Promise<string> {
        if (!this.pinModalOpened) {
            this.presentPinModal(PinAction.LOGIN_PIN, this.authenticator);
        }

        return new Promise((resolve, reject) => {
            this.authenticator.registerPinSuppliedCb((pin) => resolve(pin))
            this.authenticator.registerPinModalClosedCb((status) => {
                reject({ code: status });
                this.pinClosedSubject.next(status);
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async try(unlockVault: () => Promise<any>): Promise<any> {
        const tryIt = async () => {
            try {
                const response = await unlockVault();
                this.onPinEvaluated(true);
                return response;
            } catch (error) {
                if (this.isWrongPin(error)) {
                    this.onPinEvaluated(false);
                    return tryIt();
                } else {
                    this.onPinEvaluated(false);
                    throw error;
                }
            }
        };
        return new Promise((resolve, reject) => {
            firstValueFrom(this.pinClosedSubject.asObservable()).then(reject);
            tryIt().then(resolve).catch(reject);
        });
    }

    async tryUnlock0(): Promise<{ pin: string, status: string }> {
        return this.presentPinModal(PinAction.LOGIN_PIN).then(({ data, role }) => ({ pin: data, status: role }));
    }


    private isWrongPin({ code }): boolean {
        return code == VaultErrorCodes.AuthFailed;
    }

    private async onPinEvaluated(isRightPing: boolean): Promise<void> {
        if (isRightPing) {
            this.authenticator.onPinSuccess();
        } else {
            this.authenticator.onPinFailed();
        }
    }

    async presentPinModal(pinAction: PinAction, authenticator?: VaultAuthenticator, props?: PinLoginProps) {

        this.pinModalOpened = true;
        const componentProps = { pinAction, authenticator, ...props };
        const pinModal = await this.modalController.create({
            backdropDismiss: false,
            component: PinPage,
            componentProps,
            id: PIN_MODAL_ID
        });

        await pinModal.present();
        return pinModal.onDidDismiss().finally(() => (this.pinModalOpened = false));
    }

}
