import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { GuestDashboard } from './guest-dashboard.component';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { mockStorageStateService } from 'src/app/testing/core-providers';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { of } from 'rxjs';
import { AccessCardService } from '@sections/dashboard/containers/access-card/services/access-card.service';

describe('GuestDashboard', () => {
  let component: GuestDashboard;
  let fixture: ComponentFixture<GuestDashboard>;
  let commonService: any;
  let router: any;
  let domSanitizer: any;
  let messageProxy: any;
  let sessionFacadeService: any;
  let environmentFacadeService = {
    getStateEntityByKey$: jest.fn().mockReturnValue(of(null)),
  };
  let accessCardService;

  beforeEach(waitForAsync(() => {
    commonService = {
      getInstitutionPhoto: jest.fn(),
      getInstitutionBackgroundImage: jest.fn(),
      getUserName: jest.fn(),
      getInstitutionName: jest.fn(),
      getInstitutionBgColor: jest.fn(),
    };

    router = {
      navigate: jest.fn(),
    };

    domSanitizer = {};
    messageProxy = {
      get: jest.fn(),
    };
    sessionFacadeService = {
      handlePushNotificationRegistration: jest.fn(),
    };
    accessCardService = {
      getInstitutionBackgroundImage: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [GuestDashboard],
      providers: [
        { provide: CommonService, useValue: commonService },
        { provide: DomSanitizer, useValue: domSanitizer },
        { provide: Router, useValue: router },
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: StorageStateService, useValue: mockStorageStateService },
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: AccessCardService, useValue: accessCardService },
        { provide: ActivatedRoute, useValue: { data: of({ data: [] }) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
