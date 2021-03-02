import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../non-authorized.config';
import { FORGOT_PASSWORD_ROUTING } from './forgot-password.config';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEXP } from '@core/utils/regexp-patterns';
import { NotificationFacadeService } from '@core/facades/notification/notification-facade.service';
import { NavController } from '@ionic/angular';

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
    private readonly navController: NavController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  redirect() {
    this.router.navigate([ROLES.guest, GUEST_ROUTES.forgotPassword, FORGOT_PASSWORD_ROUTING.confirm]);
  }

  redirect2() {
    this.router.navigate([ROLES.guest, GUEST_ROUTES.forgotPassword, FORGOT_PASSWORD_ROUTING.enterCode]);
  }

  back() {
    this.navController.back();
  }

  async submit() {
    await this.notificationFacadeService.resetPasswordRequest(this.email.value);
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
