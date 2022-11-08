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

const _applicationStateService = {
  maximumSelectedRoommates: 1,
};

const _alertController = {
  create: jest.fn(() => ({
    dismiss: () => ({ then: () => of({ role: BUTTON_TYPE.OKAY }) }),
    present: () => of(true)
  }))
}

describe('SearchResultsPage', () => {
  let component: SearchResultsPage;
  let fixture: ComponentFixture<SearchResultsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: HousingService, useValue: {} },
        { provide: LoadingService, useValue: {} },
        { provide: ApplicationsService, useValue: {} },
        { provide: ApplicationsStateService, useValue: _applicationStateService },
        { provide: AlertController, useValue: _alertController },
        { provide: ToastService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
      ],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('search roommates', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should ask for confirmation', async () => {
      const spy = jest.spyOn(_alertController as any, 'present');
      await component.selectRoommate({
        patronKey: 996,
        firstName: "test",
        middleName: "the",
        lastName: "confirmation",
        birthDate: new Date(),
        preferredName: "testy"
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});
