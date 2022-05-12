import { Component, ElementRef, OnInit } from '@angular/core';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Location } from '@angular/common';
import { LoadingService } from '@core/service/loading/loading.service';

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
    private readonly location: Location,
    private readonly loadingService: LoadingService,
    private readonly sessionFacadeService: SessionFacadeService
  ) { }

  ngOnInit(): void { }

  /// check login on enter
  ionViewDidEnter() {
    this.loadingService.showSpinner();
    const state = this.location.getState() as any;
    console.log("ROUTER HISTORY STATE: ", state);
    if (!state.skipLoginFlow) {
      this.checkLoginFlow();
    }
  }

  async checkLoginFlow() {
    // Lock vault by default or after being redirected here.
    /// ensure we have correct environment and check for login
    await this.environmentFacadeService.initialization();
    this.sessionFacadeService.doLoginChecks();
  }

  /// destroy after login complete
  ionViewDidLeave() {
    this.loadingService.closeSpinner();
    this.elementRef.nativeElement.remove();
  }
}
