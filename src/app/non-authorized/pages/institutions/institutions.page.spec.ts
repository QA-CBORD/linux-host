import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionsPage } from './institutions.page';
import { IonSearchbar, Platform } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { CommonService, MessageProxy } from '@shared/services';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SearchPipeModule } from '@shared/pipes/search-pipe/search.pipe.module';

describe('InstitutionPage', () => {
  let component: InstitutionsPage;
  let fixture: ComponentFixture<InstitutionsPage>;
  let searchbar: DebugElement;
  let institutionFacadeService = {
    clearCurrentInstitution: jest.fn(),
    retrieveLookupList$: jest.fn().mockReturnValue(of([])),
  };
  let settingsFacadeService;
  let environmentFacadeService = {
    resetEnvironmentAndCreateSession: jest.fn(),
  };
  let authFacadeService = {
    getAuthSessionToken$: jest.fn().mockReturnValue(of('')),
  };
  let loadingService;
  let sessionFacadeService;
  let nav;
  let toastService = {
    showToast: jest.fn(),
  };
  let registrationServiceFacade;
  let commonService;
  let messageProxy;
  let platform;
  let nativeProvider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: InstitutionFacadeService, useValue: institutionFacadeService },
        { provide: SettingsFacadeService, useValue: settingsFacadeService },
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: AuthFacadeService, useValue: authFacadeService },
        { provide: LoadingService, useValue: loadingService },
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: Router, useValue: nav },
        { provide: ToastService, useValue: toastService },
        { provide: RegistrationServiceFacade, useValue: registrationServiceFacade },
        { provide: CommonService, useValue: commonService },
        { provide: MessageProxy, useValue: messageProxy },
        { provide: Platform, useValue: platform },
        { provide: NativeProvider, useValue: nativeProvider },
      ],
      imports: [SearchPipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Wait for ion-searchbar to render
    fixture.whenStable().then(() => {
      searchbar = fixture.debugElement.query(By.directive(IonSearchbar));
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearchedValue when ionInput event is triggered', () => {
    const inputValue = 'example search';
    jest.spyOn(component, 'onSearchedValue');

    fixture.whenStable().then(() => {
      searchbar.triggerEventHandler('ionInput', {
        detail: {
          value: inputValue,
        },
      });
      fixture.detectChanges();

      expect(component.onSearchedValue).toHaveBeenCalledWith(inputValue);
    });
  });

  it('should call onEnterKeyClicked when keyup.enter event is triggered', () => {
    jest.spyOn(component, 'onEnterKeyClicked');

    // Wait for searchbar to be defined
    fixture.whenStable().then(() => {
      searchbar.triggerEventHandler('keyup.enter', {});
      fixture.detectChanges();

      expect(component.onEnterKeyClicked).toHaveBeenCalled();
    });
  });
});
