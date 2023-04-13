import { Component } from '@angular/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage {
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
