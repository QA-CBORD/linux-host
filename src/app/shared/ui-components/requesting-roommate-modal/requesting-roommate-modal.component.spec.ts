import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RequestingRoommateModalComponent } from './requesting-roommate-modal.component';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { HousingService } from '@sections/housing/housing.service';
import { AlertButton, AlertController, IonicModule, ModalController } from '@ionic/angular';
import { RoommatePreferences } from '@sections/housing/applications/applications.model';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RequestingRoommateModalComponent', () => {
  let component: RequestingRoommateModalComponent;
  let fixture: ComponentFixture<RequestingRoommateModalComponent>;
  let mockApplicationsStateService: Partial<ApplicationsStateService>;
  let mockTermService: Partial<TermsService>;
  let mockHousingService: Partial<HousingService>;
  let mockAlertController: Partial<AlertController>;
  let mockModalController: Partial<ModalController>;

  beforeEach(async () => {
    mockApplicationsStateService = {
      deleteRequestingRoommate: jest.fn(),
      addRoommatesPreferences: jest.fn(),
      deleteOverrideRequestingRoommate: jest.fn(),
      deleteLocalRequestedRoommate: jest.fn(),
      roommatePreferencesSelecteds: [],
      requestingRoommate: [],
    };

    mockTermService = {
      termId$: of(123),
    };

    mockHousingService = {
      getRequestedRommate: jest.fn().mockReturnValue(of({})),
    };

    mockAlertController = {
      create: jest.fn().mockReturnValue(Promise.resolve({
        present: jest.fn(),
      })),
    };

    mockModalController = {
      dismiss: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [ RequestingRoommateModalComponent ],
      providers: [
        { provide: ApplicationsStateService, useValue: mockApplicationsStateService },
        { provide: TermsService, useValue: mockTermService },
        { provide: HousingService, useValue: mockHousingService },
        { provide: AlertController, useValue: mockAlertController },
        { provide: ModalController, useValue: mockModalController },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RequestingRoommateModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept roommate request', async () => {
    const roommate = {
      patronKeyRoommate: 1,
      preferenceKey: 1,
      firstName: 'John',
      lastName: 'Doe',
    } as RoommatePreferences;

    await component.acceptRoommateRequest(roommate);

    expect(mockApplicationsStateService.deleteRequestingRoommate).toHaveBeenCalledWith(roommate.patronKeyRoommate);
    expect(mockApplicationsStateService.addRoommatesPreferences).toHaveBeenCalledWith(roommate);
  });

  it('should deny roommate request', () => {
    const roommate = {
      patronKeyRoommate: 1,
      preferenceKey: 1,
      firstName: 'John',
      lastName: 'Doe',
    } as RoommatePreferences;

    component.denyRoommateRequest(roommate);

    expect(mockApplicationsStateService.deleteRequestingRoommate).toHaveBeenCalledWith(roommate.patronKeyRoommate);
  });

  it('should call checkIfLastRequest on initialization', () => {
    const checkIfLastRequestSpy = jest.spyOn(component as any, 'checkIfLastRequest');
  
    component.ngOnInit();
  
    expect(checkIfLastRequestSpy).toHaveBeenCalled();
  });

  it('should return the full name of a student', () => {
    const roommate = {
      firstName: 'John',
      lastName: 'Doe',
    } as RoommatePreferences;
  
    const fullName = component.studentFullName(roommate);
  
    expect(fullName).toBe('John Doe');
  });

  it('should create an alert if roommate is already selected', async () => {
    const roommate = {
      patronKeyRoommate: 1,
      preferenceKey: 1,
      firstName: 'John',
      lastName: 'Doe',
    } as RoommatePreferences;

    Object.defineProperty(mockApplicationsStateService, 'roommatePreferencesSelecteds', {
      get: jest.fn(() => [
        {
          patronKeyRoommate: 2,
          preferenceKey: 1,
          firstName: 'Jane',
          lastName: 'Doe',
        },
      ]),
    });

    await component.acceptRoommateRequest(roommate);
  
    expect(mockAlertController.create).toHaveBeenCalled();
  });
  
  it('should not create an alert if roommate is not already selected', async () => {
    const roommate = {
      patronKeyRoommate: 1,
      preferenceKey: 1,
      firstName: 'John',
      lastName: 'Doe',
    } as RoommatePreferences;
  
    Object.defineProperty(mockApplicationsStateService, 'roommatePreferencesSelecteds', {
      get: jest.fn(() => [
        {
          patronKeyRoommate: 2,
          preferenceKey: 2,
          firstName: 'Jane',
          lastName: 'Doe',
        },
      ]),
    });
  
    await component.acceptRoommateRequest(roommate);
  
    expect(mockAlertController.create).not.toHaveBeenCalled();
    expect(mockApplicationsStateService.deleteRequestingRoommate).toHaveBeenCalledWith(roommate.patronKeyRoommate);
    expect(mockApplicationsStateService.addRoommatesPreferences).toHaveBeenCalledWith(roommate);
  });
});