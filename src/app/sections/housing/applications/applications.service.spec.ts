import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';
import { popoverCtrl } from '../pages/form-payment/form-payment.component.spec';
import { QuestionBase } from '../questions/types';
import { ApplicationDetails, ApplicationRequest, ApplicationStatus } from './applications.model';
import { ApplicationsService } from './applications.service';
import { ResponseStatus } from '../housing.model';
import { CurrentForm } from '../pages/form-payment/form-payment.component';

describe('ApplicationsService', () => {
  let applicationService: ApplicationsService;
  const modalControler = {};
  const _environmentFacadeService = {
    getEnvironmentObject: jest.fn(),
  };
  const _storage = {
    clear: jest.fn(),
    ready: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApplicationsService,
        { provide: ModalController, useValue: modalControler },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: Storage, useValue: _storage },
        { provide: EnvironmentFacadeService, useValue: _environmentFacadeService },
      ],
    });
    applicationService = TestBed.inject(ApplicationsService);
  });

  describe('getQuestions', () => {
    it('should return questions', done => {
      // Mock the dependencies
      const questionsStorageServiceMock = {
        getQuestions: jest.fn().mockReturnValue(of(['Question 1', 'Question 2'])),
      };
      const applicationsStateServiceMock = {
        applicationDetails$: of({
          patronApplication: {
            status: 'Submitted',
          },
          applicationDefinition: {
            canEdit: true,
          },
        }),
      };

      applicationService['_questionsStorageService'] = questionsStorageServiceMock as any;
      applicationService['_applicationsStateService'] = applicationsStateServiceMock as any;

      // Call the function to test
      applicationService.getQuestions(1).subscribe(result => {
        // Verify the result
        expect(result).toEqual(['Question 1', 'Question 2']);

        // Verify that the dependencies were called with the correct values
        expect(questionsStorageServiceMock.getQuestions).toHaveBeenCalledWith(1);
        expect(applicationsStateServiceMock.applicationDetails$).toHaveBeenCalled();

        done();
      });
    });
  });

  describe('getQuestions', () => {
    it('should return stored questions', done => {
      // Mock the dependencies
      const getApplicationMock = jest
        .fn()
        .mockReturnValue(of({ questions: ['Stored Question 1', 'Stored Question 2'] }));
      applicationService['getApplication'] = getApplicationMock;

      // Call the function to test
      applicationService.getQuestions(1).subscribe(result => {
        // Verify the result
        expect(result).toEqual(['Stored Question 1', 'Stored Question 2']);

        // Verify that the dependencies were called with the correct values
        expect(getApplicationMock).toHaveBeenCalledWith(1);

        done();
      });
    });
  });

  describe('_getQuestionsPages', () => {
    it('should return questions pages', () => {
      // Mock the dependencies
      const questionsServiceMock = {
        getQuestions: jest.fn().mockReturnValue(['Question 1', 'Question 2']),
        mapToAddressTypeGroup: jest.fn().mockReturnValue(['Mapped Question']),
        splitByPages: jest.fn().mockReturnValue([['Mapped Question']]),
      };
      const applicationDetails: ApplicationDetails = {
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        },
      };
      applicationService['_questionsService'] = questionsServiceMock as any;

      // Call the function to test
      const result = applicationService['_getQuestionsPages'](applicationDetails);

      // Verify the result
      expect(result).toEqual([['Mapped Question']]);

      // Verify that the dependencies were called with the correct values
      expect(questionsServiceMock.getQuestions).toHaveBeenCalledWith('applicationFormJson');
      expect(questionsServiceMock.mapToAddressTypeGroup).toHaveBeenCalledWith('Question 1');
      expect(questionsServiceMock.splitByPages).toHaveBeenCalledWith(['Mapped Question']);
      expect(questionsServiceMock.mapToAddressTypeGroup).toHaveBeenCalledWith('Question 2');
      expect(questionsServiceMock.splitByPages).toHaveBeenCalledWith(['Mapped Question']);
    });
  });

  describe('_mapQuestions', () => {
    it('should map questions', () => {
      // Mock the dependencies
      const question: QuestionBase = {
        type: 'text',
        label: 'Name',
        attribute: 'name',
      };
      const applicationsStateServiceMock = {
        setRoommateSearchOptions: jest.fn(),
      };
      const routerMock = {
        navigate: jest.fn().mockResolvedValue(true),
      };
      const questionActionButtonMock = jest.fn();
      const questionsBaseMock = jest.fn().mockImplementation(params => {
        questionActionButtonMock(params);
      });
      applicationService['_applicationsStateService'] = applicationsStateServiceMock as any;
      applicationService['_router'] = routerMock as any;
      applicationService['QuestionActionButton'] = questionsBaseMock as any;

      // Call the function to test
      const result = applicationService['_mapQuestions']([question]);

      // Verify the result
      expect(result).toEqual([
        {
          label: 'Search for a roommate',
          buttonText: 'Search Roommate',
          metadata: {
            searchOptions: 'searchOptions',
            showOptions: 'showOptions',
            preferences: 'values',
            prefRank: 'prefRank',
          },
          action: expect.any(Function),
        },
      ]);
      expect(applicationsStateServiceMock.setRoommateSearchOptions).toHaveBeenCalledWith({
        searchOptions: 'searchOptions',
        showOptions: 'showOptions',
        preferences: 'values',
        prefRank: 'prefRank',
      });
    });
  });
  describe('submitApplication', () => {
    test('should return an Observable of ResponseStatus', () => {
      // Mock dependencies
      const mockApplication: CurrentForm = {
        key: 1,
        type: "application",
        details: {
          patronApplication: {
            applicationDefinitionKey: 0o121,
            status: ApplicationStatus.New,
            key: 1,
            patronKey: 0o3120,
            createdDateTime: '',
            submittedDateTime: '',
            acceptedDateTime: '',
            cancelledDateTime: '',
            modifiedDate: '',
            isApplicationSubmitted: false,
            isApplicationAccepted: true,
            isApplicationCanceled: false
          },
          applicationDefinition: {
            key: 0o121,
            termKey: 2122,
            applicationTitle: '',
            applicationFormJson: '',
            accountCodeKey: 21312,
            amount: 2,
            canEdit: false
          }
        },
        formControl: null,
      };
      const mockCreatedDateTime = 'mockCreatedDateTime';
      const mockSubmittedDateTime = 'mockSubmittedDateTime';
      const mockApplicationDetails: ApplicationDetails = {
        applicationDefinition: {
          key: 0o121,
          termKey: 2122,
          applicationTitle: '',
          applicationFormJson: '',
          accountCodeKey: 21312,
          amount: 2,
          canEdit: false
        },
        patronApplication: {
          applicationDefinitionKey: 0o121,
          status: ApplicationStatus.New,
          key: 1,
          patronKey: 0o3120,
          createdDateTime: '',
          submittedDateTime: '',
          acceptedDateTime: '',
          cancelledDateTime: '',
          modifiedDate: '',
          isApplicationSubmitted: false,
          isApplicationAccepted: true,
          isApplicationCanceled: false
        }
      };
      const mockResponse: ResponseStatus = {
        statusCode: 200,
        status: 'Ok',
        message: 'Application saved',
        traceId: '0090280342342',
        details: null
      };

      // Mock functions
      const mockUpdateCreatedDateTime = jest.fn().mockReturnValue(of(mockCreatedDateTime));
      const mockUpdateSubmittedDateTime = jest.fn().mockReturnValue(of(mockSubmittedDateTime));
      const mockCreateApplicationDetails = jest.fn().mockReturnValue(mockApplicationDetails);
      const mockUpdateApplication = jest.fn().mockReturnValue(of(mockResponse));


      // Call the function to be tested
      const result$ = applicationService.submitApplication(mockApplication);

      // Assert the expected behavior
      expect(result$).toBeInstanceOf(Observable);

      // Subscribe to the result Observable and assert the emitted value
      result$.subscribe((result) => {
        expect(result).toEqual(mockResponse);
      });

      // Assert function calls and arguments
      expect(mockUpdateSubmittedDateTime).toHaveBeenCalledWith(mockApplication.key);
      expect(mockCreateApplicationDetails).toHaveBeenCalledWith(
        mockApplication.key,
        mockApplication.details,
        ApplicationStatus.Submitted,
        mockCreatedDateTime,
        mockSubmittedDateTime
      );
      expect(mockUpdateApplication).toHaveBeenCalledWith(
        mockApplicationDetails,
        mockApplication.formControl,
        ApplicationStatus.Submitted
      );
    });
  });

  describe('_updateCreatedDateTime', () => {
    test('should return an Observable of string', () => {
      // Mock dependencies
      const mockKey = 123;
      const mockPatronApplication = {
        createdDateTime: '2023-03-12',
        key: 1,
        applicationDefinitionKey: 9231,
        status: ApplicationStatus.New
      };
      const mockCreatedDateTime = '2023-03-12';
      const mockQuestionsStorageService = {
        updateCreatedDateTime: jest.fn().mockReturnValue(of(mockCreatedDateTime)),
      };

      // Create the instance of the class containing the _updateCreatedDateTime function

      // Call the function to be tested
      const result$ = applicationService["_updateCreatedDateTime"](mockKey, mockPatronApplication);

      // Assert the expected behavior
      expect(result$).toBeInstanceOf(Observable);

      // Subscribe to the result Observable and assert the emitted value
      result$.subscribe((result) => {
        expect(result).toEqual(mockCreatedDateTime);
      });

      // Assert function calls and arguments
      expect(mockQuestionsStorageService.updateCreatedDateTime).toHaveBeenCalledWith(mockKey, mockPatronApplication.createdDateTime);
    });
  });

  describe('_createApplicationDetails', () => {
    test('should return an instance of ApplicationDetails', () => {
      // Mock dependencies
      const mockApplicationKey = 123;
      const mockApplicationDetails:ApplicationDetails = {
        applicationDefinition: {
          key: 0o121,
          termKey: 2122,
          applicationTitle: '',
          applicationFormJson: '',
          accountCodeKey: 21312,
          amount: 2,
          canEdit: false
        },
        patronApplication: {
          applicationDefinitionKey: 0o121,
          status: ApplicationStatus.New,
          key: 1,
          patronKey: 0o3120,
          createdDateTime: '',
          submittedDateTime: '',
          acceptedDateTime: '',
          cancelledDateTime: '',
          modifiedDate: '',
          isApplicationSubmitted: false,
          isApplicationAccepted: true,
          isApplicationCanceled: false
        }
      };
      const mockStatus = ApplicationStatus.Submitted;
      const mockCreatedDateTime = '2023-03-04';
      const mockSubmittedDateTime =null;
      const mockPatronApplication = {
        applicationDefinitionKey: 0o121,
        status: ApplicationStatus.New,
        key: 1,
        patronKey: 0o3120,
        createdDateTime: '',
        submittedDateTime: '',
        acceptedDateTime: '',
        cancelledDateTime: '',
        modifiedDate: '',
        isApplicationSubmitted: false,
        isApplicationAccepted: true,
        isApplicationCanceled: false
      }
      const mockRoommatePreferences = [
        // Define mock values for RoommatePreferences
      ];

      // Call the function to be tested
      const result = applicationService["_createApplicationDetails"](
        mockApplicationKey,
        mockApplicationDetails,
        mockStatus,
        mockCreatedDateTime,
        mockSubmittedDateTime
      );

      // Assert the expected behavior
      expect(result).toBeInstanceOf(ApplicationDetails);

      // Assert the properties of the returned ApplicationDetails instance
      expect(result.patronApplication).toEqual(mockPatronApplication);
      expect(result.roommatePreferences).toEqual(mockRoommatePreferences);
      // Assert other properties as needed
    });
  });

  describe('_patchApplicationByStoredStatus', () => {
    test('should return an Observable of ApplicationDetails', () => {
      // Mock dependencies
      const mockApplicationDetails = {
        applicationDefinition: {
          key: 0o121,
          termKey: 2122,
          applicationTitle: '',
          applicationFormJson: '',
          accountCodeKey: 21312,
          amount: 2,
          canEdit: false
        },
        patronApplication: {
          applicationDefinitionKey: 0o121,
          status: ApplicationStatus.New,
          key: 1,
          patronKey: 0o3120,
          createdDateTime: '',
          submittedDateTime: '',
          acceptedDateTime: '',
          cancelledDateTime: '',
          modifiedDate: '',
          isApplicationSubmitted: false,
          isApplicationAccepted: true,
          isApplicationCanceled: false
        }
      };
      const mockPatronApplication = {
        status: ApplicationStatus.New,
      };
      const mockStoredStatus = ApplicationStatus.Submitted;
      const mockQuestionsStorageService = {
        getApplicationStatus: jest.fn().mockReturnValue(of(mockStoredStatus)),
      };

      // Create the instance of the class containing the _patchApplicationByStoredStatus function

      // Call the function to be tested
      const result$ = applicationService["_patchApplicationByStoredStatus"](mockApplicationDetails);

      // Assert the expected behavior
      expect(result$).toBeInstanceOf(Observable);

      // Subscribe to the result Observable and assert the emitted value
      result$.subscribe((result) => {
        expect(result).toEqual(mockApplicationDetails);
      });

      // Assert function calls and arguments
      expect(mockQuestionsStorageService.getApplicationStatus).toHaveBeenCalledWith(
        mockApplicationDetails.applicationDefinition.key
      );
    });
  });

  describe('_updateApplication', () => {
    test('should return an Observable of ResponseStatus', () => {
      // Mock dependencies
      const mockApplicationDetails = { applicationDefinition: {
        key: 0o121,
        termKey: 2122,
        applicationTitle: '',
        applicationFormJson: '',
        accountCodeKey: 21312,
        amount: 2,
        canEdit: false
      },
      patronAttributes:[],
      patronAddresses:[],
      patronPreferences:[],
      patronApplication: {
        applicationDefinitionKey: 0o121,
        status: ApplicationStatus.New,
        key: 1,
        patronKey: 0o3120,
        createdDateTime: '',
        submittedDateTime: '',
        acceptedDateTime: '',
        cancelledDateTime: '',
        modifiedDate: '',
        isApplicationSubmitted: false,
        isApplicationAccepted: true,
        isApplicationCanceled: false
      }// Define mock values for ApplicationDetails
      };
      const mockForm = {};
      const mockStatus = ApplicationStatus.Submitted;
      const mockRemoveQuestions = true;
      const mockApplicationDefinition = {
        key: 123,
      };
      const mockStoredApplication = {
        questions: [],
      };
      const mockParsedJson = [];
      const mockPatronAttributes = [];
      const mockPatronPreferences = [];
      const mockPatronAddresses = [];
      const mockBody:ApplicationRequest = {
        patronApplication: {
          applicationDefinitionKey: 0o121,
          status: ApplicationStatus.New,
          key: 1,
          patronKey: 0o3120,
          createdDateTime: '',
          submittedDateTime: '',
          acceptedDateTime: '',
          cancelledDateTime: '',
          modifiedDate: '',
          isApplicationSubmitted: false,
          isApplicationAccepted: true,
          isApplicationCanceled: false
        }
      };
      const mockResponseStatus:ResponseStatus = {
        statusCode: 200,
        status: 'Ok',
        message: 'Saved',
        traceId: '98798798',
        details: null
      };
      const mockQuestionsStorageService = {
        updateQuestions: jest.fn().mockReturnValue(of(mockStoredApplication)),
        removeApplication: jest.fn(),
      };
      const mockHousingProxyService = {
        put: jest.fn().mockReturnValue(of(mockResponseStatus)),
      };
      const mockApplicationsStateService = {
        setApplication: jest.fn(),
      };
      const mockPatronAttributesService = {
        getAttributes: jest.fn().mockReturnValue(mockPatronAttributes),
      };
      const mockPreferencesService = {
        getPreferences: jest.fn().mockReturnValue(mockPatronPreferences),
      };
      const mockPatronAddressService = {
        getAddresses: jest.fn().mockReturnValue(mockPatronAddresses),
      };


      // Call the function to be tested
      const result$ = applicationService["_updateApplication"](
        mockApplicationDetails,
        mockForm,
        mockStatus,
        mockRemoveQuestions
      );

      // Assert the expected behavior
      expect(result$).toBeInstanceOf(Observable);

      // Subscribe to the result Observable and assert the emitted value
      result$.subscribe((result) => {
        expect(result).toEqual(mockResponseStatus);
      });

      // Assert function calls and arguments
      expect(mockQuestionsStorageService.updateQuestions).toHaveBeenCalledWith(
        mockApplicationDetails.applicationDefinition.key,
        mockForm,
        mockStatus
      );
      expect(mockHousingProxyService.put).toHaveBeenCalledWith(applicationService["_patronApplicationsUrl"], mockBody);
      expect(mockApplicationsStateService.setApplication).toHaveBeenCalledWith(
        mockApplicationDetails.applicationDefinition.key,
        mockApplicationDetails
      );
      expect(mockQuestionsStorageService.removeApplication).toHaveBeenCalledWith(
        mockApplicationDetails.applicationDefinition.key
      );
      expect(mockPatronAttributesService.getAttributes).toHaveBeenCalledWith(
        mockApplicationDetails.patronAttributes,
        mockParsedJson,
        mockStoredApplication.questions
      );
      expect(mockPreferencesService.getPreferences).toHaveBeenCalledWith(
        mockApplicationDetails.patronPreferences,
        mockParsedJson,
        mockStoredApplication.questions
      );
      expect(mockPatronAddressService.getAddresses).toHaveBeenCalledWith(
        mockApplicationDetails.patronAddresses,
        mockParsedJson,
        mockStoredApplication.questions
      );
    });
  });

});
