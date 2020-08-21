import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IdentityFacadeService, LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../non-authorized.config';
import { PATRON_ROUTES } from '@sections/section.config';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { from } from 'rxjs';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Component({
  selector: 'st-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage {
  /// startup page used as a backdrop for login, it ensures global navbar is hidden by url route checking

  constructor(
    private readonly elementRef: ElementRef,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly sessionFacadeService: SessionFacadeService
  ) {}

  /// check login on enter
  ionViewDidEnter() {
    this.checkLoginFlow();
  }

  async checkLoginFlow() {
    /// ensure we have correct environment and check for login
    await this.environmentFacadeService.initialization();
    this.sessionFacadeService.doLoginChecks();
  }

  /// destroy after login complete
  ionViewDidLeave() {
    this.elementRef.nativeElement.remove();
  }
}
