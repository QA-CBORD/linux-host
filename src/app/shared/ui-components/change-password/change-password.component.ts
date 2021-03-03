import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { RegistrationService } from 'src/app/non-authorized/pages/registration/services/registration.service';
import {
  buildPasswordValidators,
  InputValidator,
} from 'src/app/password-validation/models/input-validator.model';

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
  passwordControl: any = {};
  
  constructor(
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toast: ToastService,
    protected backendService: RegistrationService
  ) {}

  ngOnInit() {
    this.getValidators();
    this.initForm();
    this.initControl();
  }

  close() {
    this.modalController.dismiss();
  }

  async changePassword() {
    let resultMessage = 'Your password was changed successfully.';
    this.isLoading = true;
    this.userFacadeService
      .changePassword$(this.currentPassword.value, this.newPassword.value)
      .pipe(
        take(1),
        catchError(() => {
          resultMessage = 'Your current password is incorrect, please try again.';
          return of(false);
        })
      )
      .subscribe(async response => {
        await this.toast.showToast({ message:  resultMessage });
        this.isLoading = false;
        this.cdRef.detectChanges();
        if(response) {
          this.close();
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
  
  get passwordControls() {
    return this.passwordControl;
  }
 
  get disabled() {
    return this.changePasswordForm.invalid || this.passwordControl.hasError;
  }

  private initForm() {
    this.changePasswordForm = this.fb.group({
      [PASSWORD_FORM_CONTROL_NAMES.currentPassword]: ['', Validators.required],
      [PASSWORD_FORM_CONTROL_NAMES.newPassword]: ['', Validators.required],
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

  private initControl() {
    this.passwordControl = { control: this.newPassword, hasError: false };
  }
}

export enum PASSWORD_FORM_CONTROL_NAMES {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
}
