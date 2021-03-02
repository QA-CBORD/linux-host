import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { validatePasswordDecorator } from '@core/utils/general-helpers';
import { ONE_LETTER_REGEXP, ONE_NUMBER_REGEXP, PASS_CHANGE_REGEXP } from '@core/utils/regexp-patterns';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'st-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading = false;

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
      validatePasswordDecorator(Validators.required, { required: true }),
      validatePasswordDecorator(Validators.pattern(ONE_NUMBER_REGEXP), { number: true }),
      validatePasswordDecorator(Validators.pattern(ONE_LETTER_REGEXP), { letter: true }),
      validatePasswordDecorator(Validators.minLength(8), { min: true }),
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
    this.isLoading = true;
    this.userFacadeService
      .changePassword$(this.currentPassword.value, this.newPassword.value)
      .pipe(take(1),
      catchError(err => {
        console.log('error', err);
        return of(false);
      })
      )
      .subscribe(response => {
        this.isLoading = false;
        if (response) {
          this.toast.showToast({ message: 'The password changed successfully!' });
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

// export const CONTROL_ERROR = {
//   [PASSWORD_FORM_CONTROL_NAMES.newPassword]: {
//     min: 'min',
//     pattern: 'pattern',
//     required: 'required',
//   },
// };
