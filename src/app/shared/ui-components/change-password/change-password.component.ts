import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  saveChanges() {
    console.log('Save changes called!');
  }

  private initForm() {
    const passwordErrors = [
      formControlErrorDecorator(
        Validators.pattern(PASS_CHANGE_REGEXP),
        'Passwords must contain at least one letter and one number'
      ),
      formControlErrorDecorator(Validators.minLength(7), 'Passwords must be between 7-12 characters in length'),
      formControlErrorDecorator(Validators.maxLength(12), 'Passwords must be between 7-12 characters in length'),
      ///formControlErrorDecorator(this.checkPasswords(), 'The password does not match')
    ];

    const passwordValidations = [Validators.required, ...passwordErrors];

    this.changePasswordForm = this.fb.group(
      {
        [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
        [PASSWORD_FORM_CONTROL_NAMES.newPassword]: ['', passwordValidations],
        [PASSWORD_FORM_CONTROL_NAMES.confirmPassword]: ['', passwordValidations],
      }
    );

    this.cdRef.detectChanges();
    this.changePasswordForm.valueChanges.subscribe(data => {
      console.log('data: ', data);
    });
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

  // checkPasswords(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null =>
  //     this.newPassword.value === this.confirmPassword.value ? null : { incorrect: true };
  // }
}

export enum PASSWORD_FORM_CONTROL_NAMES {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
  confirmPassword = 'confirmPassword',
}
