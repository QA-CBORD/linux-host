import { Component, ElementRef, OnInit } from '@angular/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Component({
  selector: 'st-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {
  /// startup page used as a backdrop for login, it ensures global navbar is hidden by url route checking

  constructor(
    private readonly elementRef: ElementRef,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly sessionFacadeService: SessionFacadeService
  ) {}

  ngOnInit(): void {}

  /// check login on enter
  ionViewDidEnter() {
    this.checkLoginFlow();
  }

  async checkLoginFlow() {
    // Lock vault by default or after being redirected here.
    this.identityFacadeService.setIsLocked();
    /// ensure we have correct environment and check for login
    await this.environmentFacadeService.initialization();
    this.sessionFacadeService.doLoginChecks();
  }

  /// destroy after login complete
  ionViewDidLeave() {
    this.elementRef.nativeElement.remove();
  }
}
