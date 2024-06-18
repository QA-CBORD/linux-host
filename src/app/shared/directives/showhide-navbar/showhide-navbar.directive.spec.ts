import { Component, DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowHideNavbarDirective } from './showhide-navbar.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage-angular';
import { IonicModule, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { NavigationService } from '@shared/services';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  template: `
    <nav class="global-navigation" stShowHideNavbar id="nav-tabs">
      <!-- rest of the template -->
    </nav>
    <div></div>
  `,
})
class TestComponent {}

const router = {
  url: '',
  events: of({event: new NavigationEnd(0, '', '')}),
};

const renderer = {
  setStyle: jest.fn(),
};
const globalNav = {
  showNavBar: jest.fn(),
  hideNavBar: jest.fn(),
};
const navService = {
  trackPath: jest.fn(),
};
const nativeProvider = {
  isMobile: jest.fn(),
};
let mockRouterElement;
describe('ShowHideNavbarDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement;
  let bareElement: DebugElement;
  let directiveInstance: ShowHideNavbarDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowHideNavbarDirective, TestComponent],
      imports: [HttpClientTestingModule, IonicModule.forRoot()],
      providers: [
        Storage,
        ModalController,
        { provide: Router, useValue: router },
        { provide: Renderer2, useValue: renderer },
        { provide: GlobalNavService, useValue: globalNav },
        { provide: NavigationService, useValue: navService },
        { provide: NativeProvider, useValue: nativeProvider },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.query(By.directive(ShowHideNavbarDirective));
    directiveInstance = elementsWithDirective.injector.get(ShowHideNavbarDirective);
    bareElement = fixture.debugElement.query(By.css(':not([stShowHideNavbar])'));
    mockRouterElement = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    };

    jest.spyOn(document, 'getElementById').mockReturnValue(mockRouterElement);
  });
  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });
  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective).toBeTruthy();
  });
  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });
  it('should show tabs', () => {
    const divElement = document.createElement('div');
    directiveInstance['elemRef'] = { nativeElement: divElement };
    const spy = jest.spyOn(directiveInstance, 'addOrRemoveRouterClass');
    directiveInstance['showTabs']();
    expect(spy).toHaveBeenCalledWith(true);

    expect(globalNav.showNavBar).toHaveBeenCalled();
  });
  it('should hide tabs', () => {
    const divElement = document.createElement('div');
    directiveInstance['elemRef'] = { nativeElement: divElement };
    const spy = jest.spyOn(directiveInstance, 'addOrRemoveRouterClass');
    directiveInstance['hideTabs']();
    expect(spy).toHaveBeenCalledWith(false);
    expect(globalNav.hideNavBar).toHaveBeenCalled();
  });

  it('should add the class when add is true', () => {
    directiveInstance.addOrRemoveRouterClass(true);

    expect(document.getElementById).toHaveBeenCalledWith('router');
    expect(mockRouterElement.classList.add).toHaveBeenCalledWith('navigation-bottom-offset');
    expect(mockRouterElement.classList.remove).not.toHaveBeenCalled();
  });

  it('should remove the class when add is false', () => {
    directiveInstance.addOrRemoveRouterClass(false);

    expect(document.getElementById).toHaveBeenCalledWith('router');
    expect(mockRouterElement.classList.remove).toHaveBeenCalledWith('navigation-bottom-offset');
    expect(mockRouterElement.classList.add).not.toHaveBeenCalled();
  });

  it('should not throw error if router element is not found', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    expect(() => directiveInstance.addOrRemoveRouterClass(true)).not.toThrow();
    expect(document.getElementById).toHaveBeenCalledWith('router');
  });
  it.each([
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
    'search-by',
  ])('should call hideTabs if URL is not allowed (%s)', url => {
    router.url = `/${url}`;
    const spyShow = jest.spyOn(directiveInstance as any, 'showTabs');
    const spyHide = jest.spyOn(directiveInstance as any, 'hideTabs');
    directiveInstance['showHideTabs']();
    expect(spyHide).toHaveBeenCalled();
    expect(spyShow).not.toHaveBeenCalled();
  });
 it ('should call showTabs if URL is  allowed', () => {
    router.url = `/home`;
    const spyShow = jest.spyOn(directiveInstance as any, 'showTabs');
    const spyHide = jest.spyOn(directiveInstance as any, 'hideTabs');
    directiveInstance['showHideTabs']();
    expect(spyHide).not.toHaveBeenCalled();
    expect(spyShow).toHaveBeenCalled();
  });
  


});
