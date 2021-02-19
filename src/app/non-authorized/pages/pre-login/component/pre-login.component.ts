import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { ROLES } from 'src/app/app.global';
import { GUEST_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { PreLoginStringModel } from '../../registration/models/registration.shared.model';
import { PreLoginModule } from '../pre-login.module';

@Component({
  selector: 'st-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  pageContent: PreLoginStringModel;
  constructor(private readonly route: ActivatedRoute,private readonly nav: Router) { }
  ngOnInit() {
    const { data } = this.route.snapshot.data;
    this.pageContent = data as PreLoginStringModel;
    console.log(this.pageContent, history.state)
  }




  private navigateToLogin(loginState: number) {
    switch (loginState) {
      case LoginState.HOSTED:
        this.nav.navigate([ROLES.guest, GUEST_ROUTES.login]);
        break;
      case LoginState.EXTERNAL:
        this.nav.navigate([ROLES.guest, GUEST_ROUTES.external]);
        break;
    }
  }
}
