import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { HousingService } from '../../../sections/housing/housing.service';
import { TermsService } from '../../../sections/housing/terms/terms.service';
import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(() => {
    const applicationsStateServiceStub = () => ({
      applicationsState: {
        applicationDetails: {
          roommatePreferences: {
            filter: () => ({ map: () => ({}) }),
            find: () => ({})
          }
        }
      },
      getRequestedRoommate: () => ({ find: () => ({}) }),
      setRequestedRoommate: roommateRequest => ({})
    });
    const housingServiceStub = () => ({
      getRequestedRoommates: requestBody => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const termsServiceStub = () => ({ termId$: { subscribe: f => f({}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BackButtonComponent],
      providers: [
        {
          provide: ApplicationsStateService,
          useFactory: applicationsStateServiceStub
        },
        { provide: HousingService, useFactory: housingServiceStub },
        { provide: TermsService, useFactory: termsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`text has default value`, () => {
    expect(component.text).toEqual(`Back`);
  });
});
