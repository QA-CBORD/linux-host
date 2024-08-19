import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Component({
  selector: 'st-biometric',
  templateUrl: './biometric.page.html',
  styleUrls: ['./biometric.page.scss'],
})
export class BiometricPage implements OnInit {
  loading = false;
  biometricConfig: { type: string; name: string } = null;
  constructor(private readonly identityFacadeService: IdentityFacadeService, private readonly router: Router) {}

  ngOnInit() {
    this.biometricConfig = this.router.getCurrentNavigation().extras.state.biometricConfig;
  }

  actForBiometric(action) {
    let biometricsEnabled = false;
    if (action === 'turnon') {
      biometricsEnabled = true;
    } else if (action === 'later' || action === 'disable') {
      biometricsEnabled = false;
    }
    this.identityFacadeService._biometricsEnabledUserPreference = biometricsEnabled;
    this.openPinModal(biometricsEnabled);
  }

  private async openPinModal(isBiometric: boolean): Promise<void> {
    try {
      // Displaying loading spinner while waiting for login response
      this.loading = true;
      this.loading = !!(await this.identityFacadeService.pinLoginSetup(isBiometric));
    } catch (e) {
      this.loading = false;
    }
  }
}
