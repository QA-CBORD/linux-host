import { Component, OnInit } from '@angular/core';
import { GuestDashboardSection } from './model/dashboard.item.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';
import { Router } from '@angular/router';
import { MessageProxy } from '@shared/services/injectable-message.proxy';

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
    private readonly commonService: CommonService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly messageProxy: MessageProxy
  ) {}

  ngOnInit() {
    this.sections = this.messageProxy.get<GuestDashboardSection[]>();
    this.loadInfo();
  }

  private async loadInfo(): Promise<void> {
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto(true, this.sanitizer);
    this.institutionBackgroundImage$ = this.commonService.getInstitutionBackgroundImage();
    this.userName$ = this.commonService.getUserName();
    this.institutionName$ = this.commonService.getInstitutionName();
    this.institutionColor$ = this.commonService.getInstitutionBgColor();
  }

  onclick(section: GuestDashboardSection) {
    if (section.willNavigate && section.url) {
      this.router.navigate([section.url], { replaceUrl: true });
    } else if (section.modalConfig && section.modalConfig.component) {
      // logic to open modal here....
    }
  }
}
