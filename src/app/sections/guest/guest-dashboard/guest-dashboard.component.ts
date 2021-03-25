import { Component, OnInit } from '@angular/core';
import { GuestFacadeService } from '../services/guest.facade.service';
import { MessageChannel } from '@shared/model/shared-api';
import { GuestDashboardSection } from '../model/dashboard.item.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'st-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss'],
})
export class GuestDashboard implements OnInit {
  sections: GuestDashboardSection[] = [];
  institutionName$: Promise<string>;
  institutionPhoto$: Promise<SafeResourceUrl>;
  userName$: Promise<string>;
  institutionColor$: Promise<string>;
  institutionBackgroundImage$: Promise<string>;

  constructor(
    private readonly guestFacadeService: GuestFacadeService,
    private readonly commonService: CommonService,
    private readonly sanitizer: DomSanitizer,
    private readonly globalNav: GlobalNavService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.sections = MessageChannel.get<GuestDashboardSection[]>();
    this.loadInfo();
    //setTimeout(() => this.globalNav.showNavBar());
  }

  private async loadInfo(): Promise<void> {
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto(null, null, this.sanitizer);
    this.institutionBackgroundImage$ = this.commonService.getInstitutionBackgroundImage();
    this.userName$ = this.commonService.getUserName();
    this.institutionName$ = this.commonService.getInstitutionName();
    this.institutionColor$ = this.commonService.getNativeHeaderBg();
  }

  onclick(section: GuestDashboardSection) {
    if (section.willNavigate && section.url) {
      this.router.navigate([section.url], { replaceUrl: true });
    } else if (section.modalConfig && section.modalConfig.component) {
      // logic to open modal here....
    }
  }
}
