import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { AlertController } from '@ionic/angular';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { HousingService } from '@sections/housing/housing.service';
import { of } from 'rxjs';
import { SearchResultsPage } from './search-results.page';
import { Router } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.service';


const OPTIONS = {
    searchOptions: 'byExactId',
    showOptions: 'fullName',
    preferences: [
      {
        label: 'ReqRoommate',
        value: '12',
        selected: true,
      },
      {
        label: 'ReqRoommate2',
        value: '13',
      },
      {
        label: 'ReqRoommate3',
        value: '14',
        selected: true,
      },
      {
        label: 'cxp roommate pref',
        value: '60',
        selected: true,
      },
    ],
    prefRank: 5,
    searchValue: '093007007',
  };

const ROOMMATE = {
    rank: 2,
    patronKeyRoommate: 11437,
    firstName: 'Aaron',
    lastName: 'Able',
    preferenceKey: 60,
};

export const _alertController = {
  create: jest.fn(() => ({
    dismiss: () => ({ then: () => of({ role: BUTTON_TYPE.OKAY }) }),
    present: jest.fn(() => of(true)),
  })),
};

describe('SearchResultsPage', () => {
  let component: SearchResultsPage;
  let fixture: ComponentFixture<SearchResultsPage>;
  
  const _housingService = {};
  const _applicationService = {};
  const _applicationStateService = {
    roommatePreferencesSelecteds: [ROOMMATE, {...ROOMMATE, firstName: 'John', patronKeyRoommate: -1, }, {...ROOMMATE, firstName: 'Jane', patronKeyRoommate: 11735, }],
    roommateSearchOptions: ({ pipe: () => of(OPTIONS) }),
    setSubtractSelectedRoommates: jest.fn

  };
  const toastService = {
    showToast: jest.fn(),
  };

  const _loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };

  const cd = {
    detectChanges: jest.fn(),
  };

  const router = {
    detectChanges: jest.fn(),
  };

  const navigationService = {
    detectChanges: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: HousingService, useValue: _housingService },
        { provide: LoadingService, useValue: _loadingService },
        { provide: ApplicationsService, useValue: _applicationService },
        { provide: ApplicationsStateService, useValue: _applicationStateService },
        { provide: AlertController, useValue: _alertController },
        { provide: ToastService, useValue: toastService },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: Router, useValue: router},
        { provide: NavigationService, useValue: navigationService}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should prompt user for confirmation', () => {
    const spy = jest.spyOn(_alertController, 'create');
    component.selectRoommate({ patronKey: 0,
        firstName: "King",
        middleName: "",
        lastName: "James",
        birthDate: new Date,
        preferredName: "KJ"
    });
    expect(spy).toBeCalledTimes(1);
  });

  it('should substract the roommates', () => {
    const spy = jest.spyOn(_applicationStateService, 'setSubtractSelectedRoommates');
    component.getRoommatePreferencesSelecteds();
    expect(spy).toBeCalledTimes(2);
  });

  it('should format the roommates', () => {
    const roommates = component.getRoommatePreferencesSelecteds();
    expect(roommates).toEqual('Aaron, John, Jane');
  });
});
