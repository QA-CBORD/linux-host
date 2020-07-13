import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../non-authorized.config';
import { FORGOT_PASSWORD_ROUTING } from './forgot-password.config';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'st-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  tokenForm: FormGroup;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  redirect() {
    this.router.navigate([ROLES.guest, GUEST_ROUTES.forgotPassword, FORGOT_PASSWORD_ROUTING.confirm]);
  }

  redirect2() {
    this.router.navigate([ROLES.guest, GUEST_ROUTES.forgotPassword, FORGOT_PASSWORD_ROUTING.enterCode]);
  }

  private initForm() {
    this.tokenForm = this.fb.group({});
  }
}
