import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { EntryPage } from './entry.page';
import { CoreProviders, routerMock } from 'src/app/testing/core-providers';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ROLES } from 'src/app/app.global';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { AppRateService } from '@shared/services/app-rate/app-rate.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { App, AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';

describe('EntryPage', () => {
  let component: EntryPage;
  let fixture: ComponentFixture<EntryPage>;
  let loadingService ={
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  let app = {
    getInfo: jest.fn(),
  };
  let platform = {
    is: jest.fn(),
  };
  let sessionFacadeService = {
    logoutUser: jest.fn(),
  };
  let environmentFacadeService = {
    resetEnvironmentAndCreateSession: jest.fn().mockReturnValue(Promise.resolve()),
    changeEnvironment: jest.fn(),
  };
  let appRateService = {
    evaluateToRequestRateApp: jest.fn(),
    rateApp: jest.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryPage],
      imports: [...CoreTestingModules, AppRoutingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ...CoreProviders,
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: AppRateService, useValue: appRateService },
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: Platform, useValue: platform },
        { provide: App, useValue: app },
        { provide: LoadingService, useValue: loadingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to institutions', () => {
    component.redirectTo();
    expect(routerMock.navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.institutions]);
  });

  it('should call rateApp', () => {
    const rateAppSpy = jest.spyOn(appRateService, 'rateApp');
    component.showRateApp();
    expect(rateAppSpy).toHaveBeenCalled();
  });
  it('should increment rateAppClicks', () => {
    const initialClicks = component['rateAppClicks'];

    component.rateApp();

    expect(component['rateAppClicks']).toBe(initialClicks + 1);
  });

  it('should call showRateApp and reset rateAppClicks after 5 clicks', () => {
    component['rateAppClicks'] = 4;
    const showRateAppSpy = jest.spyOn(component, 'showRateApp');

    component.rateApp();

    expect(showRateAppSpy).toHaveBeenCalled();
    expect(component['rateAppClicks']).toBe(0);
  });
  it('should increment changeEnvClicks', () => {
    const initialClicks = component['changeEnvClicks'];

    component.changeEnv();

    expect(component['changeEnvClicks']).toBe(initialClicks + 1);
  });

  it('should call logoutUser, changeEnvironment, and initialization and reset changeEnvClicks after 5 clicks', async () => {
    component['changeEnvClicks'] = 4;
    const logoutUserSpy = jest.spyOn(sessionFacadeService, 'logoutUser').mockReturnValue(Promise.resolve());
    const changeEnvironmentSpy = jest
      .spyOn(environmentFacadeService, 'changeEnvironment')
      .mockReturnValue(Promise.resolve());
    const initializationSpy = jest.spyOn(component as any, 'initialization');

    await component.changeEnv();

    expect(logoutUserSpy).toHaveBeenCalledWith(false);
    expect(changeEnvironmentSpy).toHaveBeenCalled();
    expect(initializationSpy).toHaveBeenCalled();
    expect(component['changeEnvClicks']).toBe(0);
  });
  it('should call initialization', () => {
    const initializationSpy = jest.spyOn(component as any, 'initialization');

    component.ionViewWillEnter();

    expect(initializationSpy).toHaveBeenCalled();
  });
  it('should fetch app version when platform is cordova', () => {
    jest.spyOn(platform, 'is').mockReturnValue(true);
    jest.spyOn(app, 'getInfo').mockResolvedValue({ version: '1.0.0' } as AppInfo);

    component['fetchDeviceInfo']().subscribe(version => {
      expect(version).toBe('1.0.0');
    });
  });

  it('should not fetch app version when platform is not cordova', () => {
    jest.spyOn(platform, 'is').mockReturnValue(false);

    const result = component['fetchDeviceInfo']();

    expect(result).toBeUndefined();
  });
  it('should call showSpinner, resetEnvironmentAndCreateSession, and closeSpinner', async () => {
    const showSpinnerSpy = jest.spyOn(loadingService, 'showSpinner').mockReturnValue(Promise.resolve());
    const resetEnvironmentAndCreateSessionSpy = jest
      .spyOn(environmentFacadeService, 'resetEnvironmentAndCreateSession')
      .mockReturnValue(Promise.resolve());
    const closeSpinnerSpy = jest.spyOn(loadingService, 'closeSpinner').mockReturnValue(Promise.resolve());

    await component['initialization']();

    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(resetEnvironmentAndCreateSessionSpy).toHaveBeenCalledWith(true);
    expect(closeSpinnerSpy).toHaveBeenCalled();
  });
});
