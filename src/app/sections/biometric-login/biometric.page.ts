import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '@core/service/identity/identity.service';
import { PATRON_NAVIGATION } from '../../app.global';
import { take } from 'rxjs/operators';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Component({
  selector: 'st-biometric',
  templateUrl: './biometric.page.html',
  styleUrls: ['./biometric.page.scss'],
})
export class BiometricPage implements OnInit {
  biometricConfig: { type: string; name: string } = null;
  constructor(
    private readonly nav: Router,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.biometricConfig = this.nav.getCurrentNavigation().extras.state.biometricConfig;
  }

  actForBiometric(action) {
    if (action === 'turnon') {
      this.openPinModal(true);
    } else if(action === 'later'){
      this.openPinModal(false);
    } else if (action === 'disable'){
      this.identityFacadeService._biometricsEnabledUserPreference = false;
      this.openPinModal(false);
    }
  }

  private async openPinModal(isBiometric: boolean): Promise<void> {
    try {
      if (isBiometric) {
        await this.identityFacadeService.biometricLoginSetup();
      } else {
        await this.identityFacadeService.pinOnlyLoginSetup();
      }
    } catch (e){
    }
  }
}
