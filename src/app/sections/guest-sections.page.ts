import { Component } from '@angular/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-guest-sections',
  templateUrl: './guest-sections.page.html',
  styleUrls: ['./guest-sections.page.scss'],
})
export class GuestSectionPage {
  constructor(private readonly globalNav: GlobalNavService) {}

  get isBackdropShown$() {
    return this.globalNav.isBackdropShown$;
  }

  get isMenuNavBarExpanded$() {
    return this.globalNav.isNavBarMenuExpanded$;
  }

  get isNavBarShown$() {
    return this.globalNav.isNavBarShown$;
  }
}
