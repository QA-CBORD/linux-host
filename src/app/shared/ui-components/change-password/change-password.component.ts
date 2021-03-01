import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { formControlErrorDecorator, validatePasswordDecorator } from '@core/utils/general-helpers';
import { PASS_CHANGE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  validOne = 'invalid';
  validTwo = 'invalid';

  constructor(
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  
  ngOnDestroy() {}
   
  private initForm() {
    const passwordValidations = [
      formControlErrorDecorator(Validators.required, CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.newPassword].required),
      formControlErrorDecorator(Validators.minLength(8), CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.newPassword].min),
      formControlErrorDecorator(Validators.pattern(PASS_CHANGE_REGEXP), CONTROL_ERROR[PASSWORD_FORM_CONTROL_NAMES.newPassword].pattern),
    ];

    this.changePasswordForm = this.fb.group({
      [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
      [PASSWORD_FORM_CONTROL_NAMES.newPassword]: ['', passwordValidations],
    });

    this.cdRef.detectChanges();
  }

  close() {
    this.modalController.dismiss();
  }

  async changePassword() {
    console.log('Create account');
    this.userFacadeService
      .changePassword$(this.currentPassword.value, this.newPassword.value)
      .pipe(take(1))
      .subscribe(response => {
        if (response) {
          this.toast.showToast({ message: 'Succesful' });
        } else {
          this.toast.showToast({ message: 'Failed' });
        }
      });
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
