import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../app.global';
import { Observable } from 'rxjs';
import { ModalController, PopoverController } from '@ionic/angular';
import { PartnerPaymentApiFacadeService } from 'src/app/src/app/core/service/partner-payment-api-facade.service';

@Component({
  selector: 'st-global-navigation',
  templateUrl: './st-global-navigation.component.html',
  styleUrls: ['./st-global-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StGlobalNavigationComponent implements OnInit {
  isListShown: boolean = false;
  navElements$: Observable<NavigationBottomBarElement[]>;
  visibleAmountOfElements: number = 5;

  constructor(private readonly navigationSettingsService: NavigationFacadeSettingsService,
              private readonly router: Router,
              private paymentFacade: PartnerPaymentApiFacadeService, 
              private readonly popoverController: PopoverController, private readonly modalController: ModalController) {
  }

  ngOnInit() {
    this.navElements$ = this.navigationSettingsService.settings$;
    this.paymentFacade.androidCredential().subscribe(response => {
      console.log(response);
    })
  }

  toggleListAppearance() {
    this.isListShown = !this.isListShown;
  }

  async navigate(url: PATRON_NAVIGATION | string): Promise<void> {
    try {
      await this.popoverController.dismiss();
    } catch (e) {
      console.log('Global Navigation - No active popover')
    }

    try {
      await this.modalController.dismiss();
    } catch (e){
      console.log('Global Navigation - No active modal')
    }

    this.isListShown = false;
    await this.router.navigate([url]);
  }
}
