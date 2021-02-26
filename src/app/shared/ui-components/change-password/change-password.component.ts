import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { formControlErrorDecorator } from '@core/utils/general-helpers';
import { PASS_CHANGE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {}

  close() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    console.log('Save changes called!');
    //const await this.userFacadeService.changePassword$(this.newPassword.value, this.confirmPassword.value);
  }

  private initForm() {
    this.changePasswordForm = this.fb.group({
      [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
      [PASSWORD_FORM_CONTROL_NAMES.newPassword]: [''],
      [PASSWORD_FORM_CONTROL_NAMES.confirmPassword]: [''],
    });

    const passwordErrors = [
      Validators.required,
      formControlErrorDecorator(
        Validators.pattern(PASS_CHANGE_REGEXP),
        CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.confirmPassword].pattern
      ),
      formControlErrorDecorator(
        Validators.minLength(7),
        CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.confirmPassword].length
      ),
      formControlErrorDecorator(
        Validators.maxLength(12),
        CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.confirmPassword].length
      ),
      formControlErrorDecorator(
        this.checkPasswords(),
        CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.confirmPassword].match
      ),
    ];

    this.changePasswordForm.controls[PASSWORD_FORM_CONTROL_NAMES.newPassword].setValidators(passwordErrors);
    this.changePasswordForm.controls[PASSWORD_FORM_CONTROL_NAMES.confirmPassword].setValidators(passwordErrors);
    this.cdRef.detectChanges();
  }

  get currentPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.currentPassword);
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.newPassword);
  }

  get confirmPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.confirmPassword);
  }

  get controlsNames() {
    return PASSWORD_FORM_CONTROL_NAMES;
  }

  checkPasswords(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      this.newPassword.value === this.confirmPassword.value ? null : { incorrect: true };
  }
}

export enum PASSWORD_FORM_CONTROL_NAMES {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
  confirmPassword = 'confirmPassword',
}

export const CONTROL_ERROR = {
  [PASSWORD_FORM_CONTROL_NAMES.confirmPassword]: {
    length: 'Passwords must be between 7-12 characters in length',
    match: `The password didn't match. Try again.`,
    pattern: 'Passwords must contain at least one letter and one number',
  },
};
