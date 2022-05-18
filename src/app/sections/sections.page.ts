import { Component } from '@angular/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss']
})
export class SectionsPage {
  isMenuNavBarExpanded$: Observable<boolean>;
  isBackdropShown$: Observable<boolean>;
  isNavBarShown$: Observable<boolean>;

  constructor(private readonly globalNav: GlobalNavService) {
    this.isMenuNavBarExpanded$ = this.globalNav.isNavBarMenuExpanded$;
    this.isBackdropShown$ = this.globalNav.isBackdropShown$;
    this.isNavBarShown$ = this.globalNav.isNavBarShown$;
  }
}
