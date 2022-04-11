import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    'scanCode'
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
    'housing',
    'explore',
    'addfunds'
  ];

  constructor(
    private readonly router: Router, private elemRef: ElementRef, 
    private readonly renderer: Renderer2,
    private readonly globalNav: GlobalNavService) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.showHideTabs(e));
  }

  private showHideTabs(e: NavigationEnd) {
    const urlNotAllowed = e.url.split('/').some(url => this.notAllowedRoutes.some((route) => {
      debugger;
      return url && url.includes(route);
    }));
    const urlWithParametersNotAllowed = this.notAllowedRoutesWithParameters.some((parameter) => {
      return e.url.split(parameter)[1] ? true : false;
    }); 
    
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
