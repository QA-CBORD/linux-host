import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Component({
  selector: 'st-biometric',
  templateUrl: './biometric.page.html',
  styleUrls: ['./biometric.page.scss'],
})
export class BiometricPage implements OnInit {
  biometricConfig: { type: string; name: string } = null;
  constructor(
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.biometricConfig = this.router.getCurrentNavigation().extras.state.biometricConfig;
  }

  actForBiometric(action) {
    if (action === 'turnon') {
      this.openPinModal(true);
    } else if(action === 'later' || action === 'disable'){
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
