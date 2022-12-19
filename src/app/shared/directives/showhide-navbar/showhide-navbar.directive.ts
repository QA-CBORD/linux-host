import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[stShowHideNavbar]',
})
export class ShowHideNavbarDirective {
  /**
   * @description User this array to hide specifics routes
   * Ex: Adding order/menu-item only hide the specified route when name matches with the url
   */
  private notAllowedRoutes: string[] = [
    'full-menu',
    'menu-category-items',
    'item-detail',
    'cart',
    'deposit',
    'addfunds',
    'scanCode',
    'applications',
    'rooms-search',
    'check-in-out',
    'facilities',
    'contracts',
    'work-orders',
    'units',
    'favorites',
    'non-assignments',
    'check-in-out-spots',
    'waiting-lists',
    'inspections',
    'form-payment',
    'attachments',
    'roommates-search-result',
    'search-by'
  ];

  /**
   * @description User this array to hide related subroutes of the current route added
   * Ex: Adding ordering will hide subroutes like this: ordering/full-menu, ordering/menu, etc
   */
  private notAllowedRoutesWithParameters: string[] = [
    'recent-orders',
    'accounts',
    'settings',
    'securemessaging',
    'housing/dashboard',
    'explore',
  ];

  constructor(
    private readonly router: Router,
    private elemRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly globalNav: GlobalNavService,
    private readonly navService: NavigationService
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.showHideTabs(e);
      this.navService.trackPath(e.urlAfterRedirects);
    });
  }

  private showHideTabs(e: NavigationEnd) {
    const urlNotAllowed = e.url.split('/').some(url => this.notAllowedRoutes.some(route => url && url.includes(route)));
    const urlWithParametersNotAllowed = this.notAllowedRoutesWithParameters.some(parameter =>
      e.url.split(parameter)[1] ? true : false
    );

    urlNotAllowed || urlWithParametersNotAllowed ? this.hideTabs() : this.showTabs();
  }

  private hideTabs() {
    this.renderer.setStyle(this.elemRef.nativeElement, 'display', 'none');
    this.globalNav.hideNavBar();
  }

  private showTabs() {
    this.renderer.setStyle(this.elemRef.nativeElement, 'display', 'flex');
    this.globalNav.showNavBar();
  }
}
