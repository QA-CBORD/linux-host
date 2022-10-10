import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../app.global';
import { finalize, take } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import Setting = Settings.Setting;
import { LoadingService } from '@core/service/loading/loading.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { DEVICE_MARKED_LOST } from '@shared/model/generic-constants';
import { ConnectionService } from '@shared/services/connection-service';
import { ConnectivityAwareFacadeService } from 'src/app/non-authorized/pages/startup/connectivity-aware-facade.service';
import { PinAction, PinCloseStatus, VaultAuthenticator } from '@core/service/identity/model.identity';

@Component({
  selector: 'st-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit, OnDestroy {
  private readonly sourceSubscription: Subscription = new Subscription();
  readonly setNumbers: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  pinNumber: number[] = [];
  pinNumberCopy: number[] = [];
  arePINsMatch = true;
  disableInput = false;
  disableDelete = false;
  disableEnter = false;

  instructionText: string = null;
  errorText: string = null;

  currentLoginAttempts = 0;
  maxLoginAttempts = 3;
  private authenticator: VaultAuthenticator;

  /// temporary solution before content strings added
  private readonly setPinText: string = 'Create a 4 digit PIN to use when biometrics are not available';
  private readonly setPinNoBiometricsText: string = 'Create a 4 digit PIN';
  private readonly pinsDoNotMatchText: string = 'PINs do not match - please try again';
  private readonly currentPinText: string = 'Enter current PIN';
  private readonly newPinText: string = 'Enter your new PIN';
  private readonly confirmNewPinText: string = 'Confirm your new PIN';

  constructor(
    private modalController: ModalController,
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly a11yService: AccessibilityService,
    private readonly loadingService: LoadingService,
    private readonly connectionService: ConnectionService,
    private readonly connectivityFacade: ConnectivityAwareFacadeService
  ) {}

  @Input() pinAction: PinAction;
  @Input() showDismiss = true;

  ngOnInit() {
    this.retrievePinRetrys();
    this.setInstructionText();
    this.a11yService.readAloud(this.instructionText);
    this.connectivityFacade.setPinModalOpened(true);
  }

  private setInstructionText(text: string = null) {
    if (text !== null) {
      this.instructionText = text;
      return;
    }

    switch (this.pinAction) {
      case PinAction.SET_BIOMETRIC:
        this.instructionText = this.setPinText;
        break;
      case PinAction.SET_PIN_ONLY:
        this.instructionText = this.setPinNoBiometricsText;
        break;
      case PinAction.CHANGE_PIN_ONLY:
        this.instructionText = this.currentPinText;
        break;
      case PinAction.CHANGE_PIN_BIOMETRIC:
        this.instructionText = this.currentPinText;
        break;
      case PinAction.LOGIN_PIN:
        this.setInstructionText(this.currentPinText);
    }
  }

  private retrievePinRetrys() {
    if (!(this.pinAction === PinAction.LOGIN_PIN)) return;

    const subscription = this.settingsFacadeService
      .getSetting(Setting.PIN_ENTRY_MAX_FAILURES)
      .pipe(take(1))
      .subscribe((setting: SettingInfo) => {
        if (setting && setting.value) {
          this.maxLoginAttempts = parseInt(setting.value);
        }
      });
    this.sourceSubscription.add(subscription);
  }

  /// on pin login, the UI needs to be different
  /// only enter pin once, the description will be different, etc

  async append(number: number) {
    this.setErrorText(null);
    const executeSetPinLogic = this.pinAction === PinAction.SET_PIN_ONLY || this.pinAction === PinAction.SET_BIOMETRIC;
    const executeLoginPinLogic =
      this.pinAction === PinAction.LOGIN_PIN ||
      this.pinAction === PinAction.CHANGE_PIN_ONLY ||
      this.pinAction === PinAction.CHANGE_PIN_BIOMETRIC;
    if (executeSetPinLogic) {
      await this.setPinLogic(number);
    } else if (executeLoginPinLogic) {
      this.loginPinLogic(number);
    }
  }

  private async setPinLogic(number: number) {
    if (this.pinNumber.length >= 4) {
      return;
    }
    /// add new pin value to array
    this.pinNumber.push(number);
    /// check if confirming pin
    if (this.pinNumber.length === 4) {
      if (this.pinNumberCopy.length === 4) {
        this.arePINsMatch = this.matchPINs(this.pinNumber, this.pinNumberCopy);
        /// pins don't match
        if (!this.arePINsMatch) {
          this.setErrorText(this.pinsDoNotMatchText);
          this.cleanLocalState();
          this.setInstructionText(this.setPinNoBiometricsText);
          return;
        }
        this.setInstructionText(this.setPinNoBiometricsText);
        /// if setting pin, call service to set and then send to 'on dismiss' for vault to use pin
        this.setPin();
      } else {
        /// first pin entry complete, start second entry
        /// animate, delay a half second, then start pin confirm
        this.pinNumberCopy = this.pinNumber;
        this.disableInput = true;
        setTimeout(() => {
          this.setInstructionText(this.confirmNewPinText);
          this.pinNumber = [];
          this.disableInput = false;
        }, 300);
      }
    }
  }

  private loginPinLogic(number: number) {
    if (this.pinNumber.length >= 4) return;

    // add new pin value to array
    this.pinNumber.push(number);

    if (this.pinNumber.length === 4) {
      // check if confirming pin
      this.onPinSupplied();
    }
  }

  onPinSupplied() {
    const pin = this.pinNumber.join('');
    if (this.authenticator) {
      this.authenticateWithVault(pin);
    } else {
      this.loginPin(pin);
    }
  }

  ngOnDestroy(): void {
    this.connectivityFacade.setPinModalOpened(false);
  }

  dismissModal() {
    this.authenticator?.onPinClosed(PinCloseStatus.CANCELED);
    this.closePage(null, PinCloseStatus.CANCELED);
  }

  delete() {
    this.removeNumber();
  }

  async closePage(pin: string, status: PinCloseStatus) {
    this.loadingService.closeSpinner();
    try {
      await this.modalController.dismiss(pin, status);
    } catch (errr) {
      /**Ignored on purpose */
    }
  }

  back() {
    this.pinNumberCopy = [];
    this.pinNumber = [];
    this.setInstructionText(this.newPinText);
  }

  removeNumber(): void | undefined {
    if (!this.pinNumber.length) return;
    this.pinNumber.pop();
  }

  private matchPINs(pinNumber, pinNumberCopy): boolean {
    return JSON.stringify(pinNumber) === JSON.stringify(pinNumberCopy);
  }

  private cleanLocalState() {
    this.loadingService.closeSpinner();
    this.setInstructionText();
    this.pinNumber = [];
    this.pinNumberCopy = [];
  }

  private setErrorText(value: string) {
    this.errorText = value;
  }

  private async setPin() {
    this.setInstructionText('');
    await this.loadingService.showSpinner();
    /// set user pin in Database
    this.userFacadeService
      .createUserPin(this.pinNumber.join(''))
      .pipe(take(1))
      .subscribe(
        success => {
          /// on success, dismiss with pin in data
          if (success) {
            this.closePage(this.pinNumber.join(''), PinCloseStatus.SET_SUCCESS);
          } else {
            /// handle error here
            this.cleanLocalState();
            this.setErrorText('Error setting your PIN - please try again');
          }
        },
        async ({ message, status }) => {
          this.cleanLocalState();
          if (this.connectionService.isConnectionIssues({ message, status })) {
            await this.handleConnectionIssues();
          } else {
            this.setErrorText('Error setting your PIN - please try again');
          }
        }
      );
  }

  private authenticateWithVault(pin: string) {
    this.setInstructionText('');
    this.currentLoginAttempts++;
    setTimeout(() => {
      this.authenticator
        .authenticate(pin)
        .then(() => this.closePage(pin, PinCloseStatus.LOGIN_SUCCESS))
        .catch(() => {
          this.cleanLocalState();
          if (this.currentLoginAttempts >= this.maxLoginAttempts) {
            this.setErrorText('Maximum login attempts reached - logging you out');
            setTimeout(() => {
              this.authenticator.onPinClosed(PinCloseStatus.MAX_FAILURE);
              this.closePage(null, PinCloseStatus.MAX_FAILURE);
            }, 3000);
          } else {
            this.setErrorText('Incorrect PIN - please try again');
          }
        });
    }, 100);
  }

  private async loginPin(pin: string) {
    this.setInstructionText('');
    this.currentLoginAttempts++;
    await this.loadingService.showSpinner();
    this.authFacadeService
      .authenticatePinTotp$(pin)
      .pipe(
        finalize(() => this.loadingService.closeSpinner()),
        take(1)
      )
      .subscribe(
        success => {
          /// on success, dismiss with pin in data
          if (success) {
            if (this.pinAction === PinAction.CHANGE_PIN_BIOMETRIC) {
              this.pinAction = PinAction.SET_BIOMETRIC;
              this.cleanLocalState();
            } else if (this.pinAction === PinAction.CHANGE_PIN_ONLY) {
              this.pinAction = PinAction.SET_PIN_ONLY;
              this.cleanLocalState();
            } else {
              this.closePage(this.pinNumber.join(''), PinCloseStatus.LOGIN_SUCCESS);
            }
          } else {
            /// handle error here
            this.cleanLocalState();
            this.setErrorText('Error logging in - please try again');
          }
        },
        async ({ message, status }) => {
          this.cleanLocalState();
          if (this.currentLoginAttempts >= this.maxLoginAttempts) {
            this.setErrorText('Maximum login attempts reached - logging you out');
            setTimeout(() => {
              this.closePage(null, PinCloseStatus.MAX_FAILURE);
            }, 3000);
          } else if (DEVICE_MARKED_LOST.test(message)) {
            this.closePage(null, PinCloseStatus.DEVICE_MARK_LOST);
          } else if (this.connectionService.isConnectionIssues({ message, status })) {
            await this.handleConnectionIssues();
          } else {
            this.setErrorText('Incorrect PIN - please try again');
          }
        }
      );
    // on success, return the pin so the vault can be unlocked
  }

  handleConnectionIssues() {
    return this.connectivityFacade.onConnectivityError({
      onRetry: async () => {
        await this.loadingService.showSpinner();
        const connectionRestored = !(await this.connectionService.deviceOffline());
        await this.loadingService.closeSpinner();
        return connectionRestored;
      },
    });
  }

  get showReset() {
    return this.pinNumber.length < 4 && this.pinNumberCopy.length === 4;
  }
}
