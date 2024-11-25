import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GuestDashboardSection } from './model/dashboard.item.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { GUEST_DEEP_LINKS } from 'src/app/app.global';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'st-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss'],
})
export class GuestDashboard implements OnInit, AfterViewInit {
  sections$: Observable<GuestDashboardSection[]>;
  institutionName$: Promise<string>;
  institutionPhoto$: Promise<SafeResourceUrl>;
  userName$: Promise<string>;
  institutionColor$: Promise<string>;
  institutionBackgroundImage$: Observable<string>;

  constructor(
    private readonly commonService: CommonService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly accessCardService: AccessCardService
  ) {}

  ngOnInit() {
    this.sections$ = this.activatedRoute.data.pipe(map(data => data.sections));
    this.loadInfo();
    this.pushNotificationRegistration();
  }

  ngAfterViewInit() {
    this.checkOpenedFromDeepLink();
  }

  private async loadInfo(): Promise<void> {
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto(true, this.sanitizer);
    this.institutionBackgroundImage$ = this.accessCardService.getInstitutionBackgroundImage();
    this.userName$ = this.commonService.getUserName();
    this.institutionName$ = this.commonService.getInstitutionName();
    this.institutionColor$ = this.commonService.getInstitutionBgColor();
  }

  onclick(section: GuestDashboardSection) {
    if (section.willNavigate && section.url) {
      this.router.navigate([section.url], { replaceUrl: !section.stackNavigation });
    } else if (section.modalConfig && section.modalConfig.component) {
      // logic to open modal here....
    }
  }

  private checkOpenedFromDeepLink() {
    // Check if opened from deep link and navigate
    const deepLinkPath = this.sessionFacadeService.deepLinkPath;
    if (deepLinkPath && deepLinkPath.length && GUEST_DEEP_LINKS.includes(deepLinkPath.join('/'))) {
      this.router.navigate(deepLinkPath).then(() => this.sessionFacadeService.navigatedToLinkPath());
    }
  }
  pushNotificationRegistration() {
    this.sessionFacadeService.handlePushNotificationRegistration();
  }
}
