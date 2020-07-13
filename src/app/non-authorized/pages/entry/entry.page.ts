import { take } from 'rxjs/operators';
import { ROLES } from './../../../app.global';
import { GUEST_ROUTES } from './../../non-authorized.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';

@Component({
  selector: 'st-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  constructor(
    private readonly nav: Router,
    private readonly authFacadeService: AuthFacadeService,
  ) {}

  ngOnInit() {
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
