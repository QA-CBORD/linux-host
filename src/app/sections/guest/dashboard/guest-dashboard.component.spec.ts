import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { GuestDashboard } from './guest-dashboard.component';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';

describe('GuestDashboard', () => {
  let component: GuestDashboard;
  let fixture: ComponentFixture<GuestDashboard>;
  let accessCardService;
  let navigationFacadeSettingsService = {
    initSettings: jest.fn().mockReturnValue(of([])),
    updateConfigState: jest.fn(),
  };

  beforeEach(() => {
    const domSanitizerStub = () => ({});
    const commonServiceStub = () => ({
      getInstitutionPhoto: (arg, sanitizer) => ({}),
      getInstitutionBackgroundImage: () => ({}),
      getUserName: () => ({}),
      getInstitutionName: () => ({}),
      getInstitutionBgColor: () => ({}),
    });
    const routerStub = () => ({
      navigate: (array, object) => ({ then: () => ({}) }),
    });
    const messageProxyStub = () => ({ get: () => ({}) });
    const sessionFacadeServiceStub = () => ({
      deepLinkPath: { length: {}, join: () => ({}) },
      navigatedToLinkPath: () => ({}),
      handlePushNotificationRegistration: () => ({}),
    });
    accessCardService = {
      getInstitutionBackgroundImage: jest.fn(),
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GuestDashboard],
      providers: [
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: SessionFacadeService, useFactory: sessionFacadeServiceStub },
        { provide: AccessCardService, useValue: accessCardService },
        { provide: TranslateService, useValue: {} },
        { provide: ActivatedRoute, useValue: { data: of({ data: [] }) } },
        {
          provide: NavigationFacadeSettingsService,
          useValue: navigationFacadeSettingsService,
        },
      ],
    });
    fixture = TestBed.createComponent(GuestDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`sections has default value`, () => {
    expect(component.sections).toEqual([]);
  });

  it(`should call loadInfo and  get institution's image on component Init `, () => {
    const loadImageSpy = jest.spyOn(accessCardService, 'getInstitutionBackgroundImage').mockResolvedValue('/test');
    component.ngOnInit();
    expect(loadImageSpy).toHaveBeenCalledTimes(1);
  });

  describe('onClick', () => {
    it('clicks on a section', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      jest.spyOn(routerStub, 'navigate');

      component.onclick({
        id: 'title',
        title: 'title',
        imageUrl: '',
        url: '/private/url',
        willNavigate: true,
      });
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
