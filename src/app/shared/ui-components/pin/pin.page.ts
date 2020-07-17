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
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';

export enum PinCloseStatus {
  SET_SUCCESS = 'set_success',
  LOGIN_SUCCESS = 'login_success',
  CANCELED = 'cancelled',
  ERROR = 'error',
  MAX_FAILURE = 'max_failure',
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
  private readonly confirmPinText: string = 'Confirm PIN';
  private readonly pinCreatedText: string = 'Your PIN has been created';
  private readonly pinsDoNotMatchText: string = 'PINs do not match - please try again';
  private readonly currentPinText: string = 'Enter current PIN';
  private readonly newPinText: string = 'Enter your new PIN';
  private readonly confirmNewPinText: string = 'Confirm your new PIN';
  private readonly pinUpdatedText: string = 'Your PIN has been updated';

  constructor(
    private modalController: ModalController,
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly loadingService: LoadingService
  ) {}

  @Input() pinAction: PinAction;

  ngOnInit() {
    this.retrievePinRetrys();
    switch (this.pinAction) {
      case PinAction.SET_BIOMETRIC:
        this.instructionText = this.setPinText;
        break;
      case PinAction.SET_PIN_ONLY:
        this.instructionText = this.setPinNoBiometricsText;
        break;
      case PinAction.LOGIN_PIN:
        this.instructionText = this.currentPinText;
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
    if (this.pinAction === PinAction.SET_PIN_ONLY || this.pinAction === PinAction.SET_BIOMETRIC) {
      await this.setPinLogic(number);
    } else if (this.pinAction === PinAction.LOGIN_PIN) {
      this.loginPinLogic(number);
    }
  }

  private async setPinLogic(number: number) {
    if (this.pinNumber.length === 4) {
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
          this.instructionText = this.setPinNoBiometricsText;
          return;
        }
        this.instructionText = this.setPinNoBiometricsText;
        /// if setting pin, call service to set and then send to 'on dismiss' for vault to use pin
        this.setPin();
      } else {
        /// first pin entry complete, start second entry
        /// animate, delay a half second, then start pin confirm
        this.pinNumberCopy = this.pinNumber;
        this.disableInput = true;
        setTimeout(() => {
          this.instructionText = this.confirmNewPinText;
          this.pinNumber = [];
          this.disableInput = false;
        }, 300);
      }
    }
  }

  private loginPinLogic(number: number) {
    /// add new pin value to array
    this.pinNumber.push(number);
    /// check if confirming pin
    if (this.pinNumber.length === 4) {
      this.loginPin();
    }
  }

  enter() {
    console.log('Enter pressed');
  }

  delete() {
    console.log('Delete pressed');
    this.removeNumber();
  }

  closePage(pin: string, status: PinCloseStatus) {
    this.modalController.dismiss(pin, status);
  }

  back() {
    this.pinNumberCopy = [];
    this.pinNumber = [];
    this.instructionText = this.newPinText; //bugfix/GCS-1998 #UI Back Button in Confirm New PIN is not returning to Enter Pin Screen.
  }

  removeNumber(): void | undefined {
    if (!this.pinNumber.length) return;
    this.pinNumber.pop();
  }

  private matchPINs(pinNumber, pinNumberCopy): boolean {
    return JSON.stringify(pinNumber) === JSON.stringify(pinNumberCopy);
  }

  private cleanLocalState() {
    this.pinNumber = [];
    this.pinNumberCopy = [];
  }

  private setErrorText(value: string) {
    this.errorText = value;
  }

  private async setPin() {
    await this.loadingService.showSpinner();
    /// set user pin in Database
    this.userFacadeService
      .createUserPin(this.pinNumber.join(''))
      .pipe(finalize(() => this.loadingService.closeSpinner()))
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
          console.log('Pin Set Error', error);
          this.cleanLocalState();
          this.setErrorText('Error setting your PIN - please try again');
        },
        () => console.log('Pin Set Complete')
      );
  }

  private async loginPin() {
    await this.loadingService.showSpinner();
    this.currentLoginAttempts++;

    this.authFacadeService
      .authenticatePin$(this.pinNumber.join(''))
      .pipe(finalize(() => this.loadingService.closeSpinner()))
      .subscribe(
        success => {
          /// on success, dismiss with pin in data
          if (success) {
            this.closePage(this.pinNumber.join(''), PinCloseStatus.LOGIN_SUCCESS);
          } else {
            /// handle error here
            this.cleanLocalState();
            this.setErrorText('Error logging in - please try again');
          }
        },
        error => {
          console.log('Pin Login Error', error);
          this.cleanLocalState();
          if (this.currentLoginAttempts >= this.maxLoginAttempts) {
            this.setErrorText('Maximum login attempts reached - logging you out');
            setTimeout(() => {
              this.closePage(null, PinCloseStatus.MAX_FAILURE);
            }, 3000);
          } else {
            this.setErrorText('Incorrect PIN - please try again');
          }
        },
        () => console.log('Pin Login Complete')
      );
    // on success, return the pin so the vault can be unlocked
  }
}
