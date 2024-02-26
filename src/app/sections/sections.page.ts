import { Component, OnInit, inject } from '@angular/core';
import { UserLocalProfileService } from '@shared/services/user-local-profile/user-local-profile.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
})
export class SectionsPage implements OnInit {
  private readonly _userLocalProfileService = inject(UserLocalProfileService);

  constructor(private readonly globalNav: GlobalNavService) {}

  ngOnInit(): void {
    this._userLocalProfileService.initUserLocalProfile();
  }

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
