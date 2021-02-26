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

    const passwordValidations = [
      Validators.required,
      formControlErrorDecorator(
        Validators.pattern(PASS_CHANGE_REGEXP),
        CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.newPassword].pattern
      ),
      formControlErrorDecorator(Validators.minLength(8), CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.newPassword].min),
    ];
    
    this.changePasswordForm = this.fb.group({
      [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
      [PASSWORD_FORM_CONTROL_NAMES.newPassword]: ['', passwordValidations],
    });

    this.cdRef.detectChanges();
  }

  get currentPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.currentPassword);
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.get(this.controlsNames.newPassword);
  }

  get controlsNames() {
    return PASSWORD_FORM_CONTROL_NAMES;
  }
}

export enum PASSWORD_FORM_CONTROL_NAMES {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
}

export const CONTROL_ERROR = {
  [PASSWORD_FORM_CONTROL_NAMES.newPassword]: {
    min: 'Passwords must have at least eight characters in length.',
    pattern: 'Passwords must contain at least one letter and one number.',
    required: 'Password field is required.',
  },
};
