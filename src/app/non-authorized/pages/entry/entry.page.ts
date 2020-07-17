import { take } from 'rxjs/operators';
import { ROLES } from './../../../app.global';
import { GUEST_ROUTES } from './../../non-authorized.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';

@Component({
  selector: 'st-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  constructor(
    private readonly nav: Router,
    private readonly authFacadeService: AuthFacadeService,
    private readonly sessionFacadeService: SessionFacadeService
  ) {}

  ngOnInit() {
    this.initialization();
  }

  private async initialization(){
    const logoutUser = this.nav.getCurrentNavigation().extras.state.logoutUser || false;

    if(logoutUser){
      await this.sessionFacadeService.logoutUser();
    }

    this.authFacadeService
      .getAuthSessionToken$()
      .pipe(take(1))
      .toPromise();
  }

  redirectTo() {
    this.nav.navigate([ROLES.guest, GUEST_ROUTES.institutions]);
  }

  checkLocation() {
    console.log('checkLocation');
  }

}
