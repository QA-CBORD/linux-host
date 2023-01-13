import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { HousingService } from '@sections/housing/housing.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { RequestedRoommatesComponent } from './requested-roommates.component';

describe('RequestedRoommatesComponent', () => {
  let component: RequestedRoommatesComponent;
  let fixture: ComponentFixture<RequestedRoommatesComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const applicationsStateServiceStub = () => ({
      roommateSearchOptions: { pipe: () => ({ subscribe: f => f({}) }) },
      applicationsState: {
        applicationDetails: {
          roommatePreferences: {
            filter: () => ({ map: () => ({}) }),
            find: () => ({})
          }
        }
      },
      getRequestedRoommate: () => ({ some: () => ({}) })
    });
    const housingServiceStub = () => ({
      getRequestedRoommates: () => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const termsServiceStub = () => ({
      termId$: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RequestedRoommatesComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: ApplicationsStateService,
          useFactory: applicationsStateServiceStub
        },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: TermsService, useFactory: termsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RequestedRoommatesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
