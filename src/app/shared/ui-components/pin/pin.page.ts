import { Component, Input, OnInit } from '@angular/core';
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
import { DEVICE_MARKED_LOST, NO_INTERNET_STATUS_CODE } from '@shared/model/generic-constants';
import { ConnectionService } from '@shared/services/connection-service';
import { ConnectivityService } from '@shared/services/connectivity.service';

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

@Component({
  selector: 'st-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  private readonly sourceSubscription: Subscription = new Subscription();
  readonly setNumbers: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  pinNumber: number[] = [];
  pinNumberCopy: number[] = [];
  arePINsMatch: boolean = true;
  disableInput: boolean = false;
  disableDelete: boolean = false;
  disableEnter: boolean = false;

  instructionText: string = null;
  errorText: string = null;

  currentLoginAttempts: number = 0;
  maxLoginAttempts: number = 3;

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
    private readonly connectivityService: ConnectivityService,
  ) { }

  @Input() pinAction: PinAction;
  @Input() showDismiss: boolean = true;

  ngOnInit() {
    this.retrievePinRetrys();
    this.setInstructionText();
    this.a11yService.readAloud(this.instructionText);
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
    let executeSetPinLogic = this.pinAction === PinAction.SET_PIN_ONLY || this.pinAction === PinAction.SET_BIOMETRIC;
    let executeLoginPinLogic =
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
      this.loginPin();
    }
  }


  delete() {
    this.removeNumber();
  }

  closePage(pin: string, status: PinCloseStatus) {
    this.loadingService.closeSpinner();
    this.modalController.dismiss(pin, status);
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
        error => {
          this.cleanLocalState();
          this.setErrorText('Error setting your PIN - please try again');
        }
      );
  }

  private async loginPin() {
    this.setInstructionText('');
    await this.loadingService.showSpinner();
    this.currentLoginAttempts++;

    this.authFacadeService
      .authenticatePin$(this.pinNumber.join(''))
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
        ({ message, status }) => {
          this.cleanLocalState();
          if (this.currentLoginAttempts >= this.maxLoginAttempts) {
            this.setErrorText('Maximum login attempts reached - logging you out');
            setTimeout(() => {
              this.closePage(null, PinCloseStatus.MAX_FAILURE);
            }, 3000);
          } else if (DEVICE_MARKED_LOST.test(message)) {
            this.closePage(null, PinCloseStatus.DEVICE_MARK_LOST);
          } else if (this.connectionService.isConnectionIssues({ message, status })) {
            this.currentLoginAttempts--;
            this.connectivityService.handleConnectionError({
              onScanCode: async () => {
                await this.modalController.dismiss(message, `${NO_INTERNET_STATUS_CODE}`);
                await this.modalController.dismiss(message, `${NO_INTERNET_STATUS_CODE}`);
              },
              onRetry: async () => {
                await this.loadingService.showSpinner();
                const connectionRestored = !(await this.connectionService.deviceOffline())
                await this.loadingService.closeSpinner();
                return connectionRestored;
              }
            });
          } else {
            this.setErrorText('Incorrect PIN - please try again');
          }
        }
      );
    // on success, return the pin so the vault can be unlocked
  }

  get showReset() {
    return this.pinNumber.length < 4 && this.pinNumberCopy.length === 4;
  }
}

