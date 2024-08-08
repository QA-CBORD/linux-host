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
import { CommonModule } from '@angular/common';

describe('GuestDashboard', () => {
  let component: GuestDashboard;
  let fixture: ComponentFixture<GuestDashboard>;
  let accessCardService;
  let navigationFacadeSettingsService = {
    initSettings: jest.fn().mockReturnValue(of([])),
    updateConfigState: jest.fn(),
  };
  let commonService;

  beforeEach(async () => {
    const domSanitizerStub = () => ({});
    commonService = {
      getInstitutionPhoto: jest.fn(),
      getInstitutionBackgroundImage: jest.fn(),
      getUserName: jest.fn(),
      getInstitutionName: jest.fn(),
      getInstitutionBgColor: jest.fn(),
    };
    const routerStub = () => ({
      navigate: (array, object) => ({ then: () => ({}) }),
    });
    const sessionFacadeServiceStub = () => ({
      deepLinkPath: { length: {}, join: () => ({}) },
      navigatedToLinkPath: () => ({}),
      handlePushNotificationRegistration: () => ({}),
    });
    accessCardService = {
      getInstitutionBackgroundImage: jest.fn(),
    };
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CommonModule],
      declarations: [GuestDashboard],
      providers: [
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: CommonService, useValue: commonService },
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
