import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-biometric',
  templateUrl: './biometric.page.html',
  styleUrls: ['./biometric.page.scss'],
})
export class BiometricPage implements OnInit {
  loading: boolean = false;
  biometricConfig: { type: string; name: string } = null;
  constructor(
    private readonly identityFacadeService: IdentityFacadeService, 
    private readonly router: Router,
    private readonly globalNav: GlobalNavService) {}

  ngOnInit() {
    this.biometricConfig = this.router.getCurrentNavigation().extras.state.biometricConfig;
  }

  actForBiometric(action) {
    let biometricsEnabled = false;
    if (action === 'turnon') {
      biometricsEnabled = true;
    } else if (action === 'later' || action === 'disable') {
      this.identityFacadeService._biometricsEnabledUserPreference = false;
    }
    this.openPinModal(biometricsEnabled);
  }

  private async openPinModal(isBiometric: boolean): Promise<void> {
    try {
      // Displaying loading spinner while waiting for login response
      this.loading = true;
      this.loading = !!(await this.identityFacadeService.pinLoginSetup(isBiometric));
      this.globalNav.showNavBar();
    } catch (e) {
      this.loading = false;
    }
  }
}
