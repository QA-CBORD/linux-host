import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from '../../../app.global';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { FORGOT_PASSWORD_ROUTING } from './forgot-password.config';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEXP } from '@core/utils/regexp-patterns';
import { NotificationFacadeService } from '@core/facades/notification/notification-facade.service';
import { NavController } from '@ionic/angular';
import { ToastService } from '@core/service/toast/toast.service';
import { ForgotPasswordCsModel } from './models/forgot-password-content-strings.model';
import { MessageProxy } from '@shared/services/injectable-message.proxy';

@Component({
  selector: 'st-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  tokenForm: FormGroup;
  forgotPasswordForm: FormGroup;
  isLoading: boolean;
  resetSent: boolean;
  pageContents: ForgotPasswordCsModel;

  get controlsNames() {
    return FORGOT_PWD_CONTROL_NAMES;
  }

  get email(): AbstractControl {
    return this.forgotPasswordForm.get(this.controlsNames.email);
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly notificationFacadeService: NotificationFacadeService,
    private readonly navController: NavController,
    private readonly toastService: ToastService,
    private readonly messageProxy: MessageProxy
  ) {}

  ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pageContents = this.messageProxy.get<ForgotPasswordCsModel>() || {} as any;
    this.initForm();
    setTimeout(() => {
      document.getElementById('form__description-text')?.focus();
    }, TIMEOUTS.A11yFocus);
  }

  redirect() {
    this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.forgotPassword, FORGOT_PASSWORD_ROUTING.confirm]);
  }

  redirect2() {
    this.router.navigate([ROLES.anonymous, ANONYMOUS_ROUTES.forgotPassword, FORGOT_PASSWORD_ROUTING.enterCode]);
  }

  back() {
    this.navController.back();
  }

  submit() {
    const errorMessage = 'Could not sent the reset email. Please try again in a few minutes.';
    this.isLoading = true;
    this.notificationFacadeService
      .resetPasswordRequest(this.email.value)
      .then(result => {
        if (result) {
          this.resetSent = true;
          setTimeout(() => {
            document.getElementById('confirmation-container__info')?.focus();
          }, TIMEOUTS.A11yFocus);
        } else {
          return this.toastService.showError(
           { message: errorMessage }
          );
        }
      })
      .catch(() => this.toastService.showError({ message: errorMessage }))
      .finally(() => (this.isLoading = false));
  }

  setSendEmailState() {
    this.resetSent = false;
  }

  private initForm() {
    this.tokenForm = this.fb.group({});
    this.forgotPasswordForm = this.fb.group({
      [this.controlsNames.email]: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
    });
  }
}

export enum FORGOT_PWD_CONTROL_NAMES {
  email = 'email',
}

const TIMEOUTS = {
  A11yFocus: 1500,
};
