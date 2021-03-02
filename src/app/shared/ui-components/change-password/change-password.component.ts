import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { validatePasswordDecorator } from '@core/utils/general-helpers';
import { PASS_CHANGE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import {
  buildPasswordValidators,
  getDefaultPasswordValidators,
  InputValidator,
} from 'src/app/non-authorized/pages/registration/models/password-validation';
import { RegistrationService } from 'src/app/non-authorized/pages/registration/services/registration.service';

@Component({
  selector: 'st-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading = false;
  validators: InputValidator[] = [];
  hasError: boolean;

  constructor(
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toast: ToastService,
    protected backendService: RegistrationService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getValidators();
    this.newPassword.valueChanges.pipe(catchError((error) => {
      console.log('Catch error: ', error)
      return of(false);
    })).subscribe((value) => {
      console.log("Value: ", value);
      const validator = getDefaultPasswordValidators();
      validator.forEach(item => { this.hasError = !item.test(value)
      console.log("Has error: ", this.hasError);
      });
    });
  }

  private getValidators() {
    this.backendService
      .getString$(CONTENT_STRINGS_CATEGORIES.passwordValidation)
      .pipe(
        take(1),
        map(data => buildPasswordValidators(data)),
        catchError(() => of(buildPasswordValidators()))
      )
      .subscribe(data => {
        this.validators = data;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {}

  private initForm() {
    // const passwordValidations = [
    //   validatePasswordDecorator(Validators.required, { required: true }),
    //   validatePasswordDecorator(Validators.pattern(PASS_CHANGE_REGEXP), { number: true })
    // ];

    this.changePasswordForm = this.fb.group({
      [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
      [PASSWORD_FORM_CONTROL_NAMES.newPassword]: ['', Validators.required],
    });

    this.cdRef.detectChanges();
  }

  close() {
    this.modalController.dismiss();
  }

  async changePassword() {
    this.isLoading = true;
    this.userFacadeService
      .changePassword$(this.currentPassword.value, this.newPassword.value)
      .pipe(
        take(1),
        catchError(err => {
          return of(false);
        })
      )
      .subscribe(response => {
        this.isLoading = false;
        if (response) {
          this.toast.showToast({ message: 'The password was changed successfully!' });
        } else {
          this.toast.showToast({ message: 'The current password does not match. Please try again.' });
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
