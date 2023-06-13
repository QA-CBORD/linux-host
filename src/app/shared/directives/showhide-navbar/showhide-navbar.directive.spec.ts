import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { NavigationService } from '@shared/services/navigation.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ShowHideNavbarDirective } from './showhide-navbar.directive';

@Component({
  template: `
    <div>Without Directive</div>
    <div stShowHideNavbar>Default</div>
  `
})
class TestComponent {}

describe('ShowHideNavbarDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    const elementRefStub = () => ({ nativeElement: {} });
    const renderer2Stub = () => ({
      setStyle: (nativeElement, string, string1) => ({})
    });
    const routerStub = () => ({
      events: { pipe: () => ({ subscribe: f => f({}) }) },
      url: {}
    });
    const nativeProviderStub = () => ({ isMobile: () => ({}) });
    const navigationServiceStub = () => ({
      trackPath: urlAfterRedirects => ({})
    });
    const globalNavServiceStub = () => ({
      hideNavBar: () => ({}),
      showNavBar: () => ({})
    });
    TestBed.configureTestingModule({
      declarations: [ShowHideNavbarDirective, TestComponent]
    });
    spyOn(ShowHideNavbarDirective.prototype, 'initKeyboard');
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(ShowHideNavbarDirective)
    );
    bareElement = fixture.debugElement.query(
      By.css(':not([stShowHideNavbar])')
    );
  });

  it('should have bare element', () => {
    expect(bareElement).toBeTruthy();
  });

  it('should have 1 element(s) with directive', () => {
    expect(elementsWithDirective.length).toBe(1);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(ShowHideNavbarDirective.prototype.initKeyboard).toHaveBeenCalled();
    });
  });

  describe('initKeyboard', () => {
    it('makes expected calls', () => {
      const nativeProviderStub: NativeProvider = TestBed.inject(NativeProvider);
      spyOn(nativeProviderStub, 'isMobile').and.callThrough();
      (<jasmine.Spy>pipe.initKeyboard).and.callThrough();
      pipe.initKeyboard();
      expect(nativeProviderStub.isMobile).toHaveBeenCalled();
    });
  });
});
