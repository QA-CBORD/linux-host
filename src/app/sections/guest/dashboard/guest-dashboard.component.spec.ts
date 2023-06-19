import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GuestDashboardSection } from './model/dashboard.item.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';
import { Router } from '@angular/router';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { GuestDashboard } from './guest-dashboard.component';

describe('GuestDashboard', () => {
  let component: GuestDashboard;
  let fixture: ComponentFixture<GuestDashboard>;

  beforeEach(() => {
    const domSanitizerStub = () => ({});
    const commonServiceStub = () => ({
      getInstitutionPhoto: (arg, sanitizer) => ({}),
      getInstitutionBackgroundImage: () => ({}),
      getUserName: () => ({}),
      getInstitutionName: () => ({}),
      getInstitutionBgColor: () => ({})
    });
    const routerStub = () => ({
      navigate: (array, object) => ({ then: () => ({}) })
    });
    const messageProxyStub = () => ({ get: () => ({}) });
    const sessionFacadeServiceStub = () => ({
      deepLinkPath: { length: {}, join: () => ({}) },
      navigatedToLinkPath: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GuestDashboard],
      providers: [
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: MessageProxy, useFactory: messageProxyStub },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(GuestDashboard);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`sections has default value`, () => {
    expect(component.sections).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const messageProxyStub: MessageProxy = fixture.debugElement.injector.get(
        MessageProxy
      );
     jest.spyOn(messageProxyStub, 'get');
      component.ngOnInit();
      expect(messageProxyStub.get).toHaveBeenCalled();
    });
  });
});
