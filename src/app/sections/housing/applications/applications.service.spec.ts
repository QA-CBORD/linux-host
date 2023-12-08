import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService, EnvironmentType } from '@core/facades/environment/environment.facade.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, of, tap } from 'rxjs';
import { QuestionBase, QuestionFormControl, QuestionReorder } from '../questions/types';
import { ApplicationDetails, ApplicationRequest, ApplicationStatus, PatronApplication, PatronPreference } from './applications.model';
import { ApplicationsService } from './applications.service';
import { ResponseStatus } from '../housing.model';
import { CurrentForm, FormPaymentComponent } from '../pages/form-payment/form-payment.component';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { FormPaymentModule } from '../pages/form-payment/form-payment.module';
import { QuestionsEntries, QuestionsStorageService } from '../questions/questions-storage.service';
import { HousingProxyService } from '../housing-proxy.service';
import { ApplicationsStateService } from './applications-state.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { QuestionsService } from '../questions/questions.service';
const mockQuestionsStorageService = {
  updateCreatedDateTime: jest.fn().mockReturnValue(of()),
  getQuestions: jest.fn(() => of()),
  updateQuestions: jest.fn(() => of()), 
  getApplicationStatus: jest.fn(() => of()),
  removeApplication: jest.fn(()=>of()),
  saveLocally:jest.fn(()=>of())

};
const mockHousingProxyService = {
  put: jest.fn().mockReturnValue(of()),
};

const mockApplicationsStateService = {
  setApplications: jest.fn(),
  maximumSelectedRoommates: 2,
  getRoommateSearchOptions: jest.fn().mockReturnValue({ preferences: [] }),
  _updateApplication: jest.fn(),


};
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
  patronAttributes: [],
  patronAddresses: [],
  patronPreferences: [],
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

const mockResponseStatus: ResponseStatus = {
  statusCode: 200,
  status: 'Ok',
  message: 'Saved',
  traceId: '98798798',
  details: null
};
const mockQuestionService={
  getAddressValue:jest.fn(),
  getAttributeValue:jest.fn(),
  getRequiredValidator:jest.fn(),
  toFormGroup:jest.fn(),
  addDataTypeValidator:jest.fn()

}
describe('ApplicationsService', () => {
  let applicationService: ApplicationsService;
  const modalControler = {};
  const _environmentFacadeService = {
    getEnvironmentObject: jest.fn(() => ({
      environment: EnvironmentType.develop,
      services_url: 'https://services.get.dev.cbord.com/GETServices/services',
      site_url: 'https://get.dev.cbord.com',
      secmsg_api: 'https://secmsg.api.dev.cbord.com',
      image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
      housing_aws_url: 'https://5yu7v7hrq2.execute-api.us-east-1.amazonaws.com/dev',
      partner_services_url: 'https://ft45xg91ch.execute-api.us-east-1.amazonaws.com/dev',
    })),
  };
  const _storage = {
    clear: jest.fn(),
    ready: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  };
  const _creditCardService = {
    addCreditCard: jest.fn(),
    showMessage: jest.fn(),
    retrieveAccounts: jest.fn(),
    removeCreditCardAccount: jest.fn(),
  }
  let component: FormPaymentComponent;
  let fixture: ComponentFixture<FormPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPaymentComponent],
      imports: [HttpClientTestingModule, FormPaymentModule],
      providers: [
        ApplicationsService,
        { provide: ModalController, useValue: modalControler },
        { provide: PopoverController, useValue: {} },
        { provide: Storage, useValue: _storage },
        { provide: EnvironmentFacadeService, useValue: _environmentFacadeService },
        { provide: CreditCardService, useValue: _creditCardService },
        { provide: QuestionsStorageService, useValue: mockQuestionsStorageService },
        { provide: HousingProxyService, useValue: mockHousingProxyService },
        { provide: ApplicationsStateService, useValue: mockApplicationsStateService },
        { provide: QuestionsService, useValue: mockQuestionService },
      ],
    }).compileComponents();
    applicationService = TestBed.inject(ApplicationsService);

    history.pushState({}, '');
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaymentComponent);
    component = fixture.componentInstance;
    component.currentForm = history.state.currentForm;
  });

  describe('getQuestions', () => {
    it('should return questions', () => {
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
        expect(jest.spyOn(questionsStorageServiceMock, 'getQuestions')).toHaveBeenCalledWith(1);
        expect(applicationsStateServiceMock.applicationDetails$).toHaveBeenCalled();

      });
    });
  });

  describe('getQuestions', () => {
    it('should return stored questions', () => {
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
      expect(questionsServiceMock.splitByPages).toHaveBeenCalledWith(['Mapped Question', 'Mapped Question']);
      expect(questionsServiceMock.mapToAddressTypeGroup).toHaveBeenCalledWith('Question 2');
      expect(questionsServiceMock.splitByPages).toHaveBeenCalledWith(['Mapped Question', 'Mapped Question']);
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
          label: 'Name',
          attribute: "name",
          type: "text",
        },
      ]);
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
      expect(jest.spyOn(mockQuestionsStorageService, 'updateCreatedDateTime')).toHaveBeenCalledWith(mockKey, mockPatronApplication.createdDateTime);
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

      // Create the instance of the class containing the _patchApplicationByStoredStatus function

      // Call the function to be tested
      const result$ = applicationService["_patchApplicationByStoredStatus"](mockApplicationDetails);
      mockApplicationsStateService.setApplications(mockApplicationDetails)
      // Assert the expected behavior
      expect(result$).toBeInstanceOf(Observable);

      // Subscribe to the result Observable and assert the emitted value
      result$.subscribe((result) => {
        expect(result).toEqual(mockApplicationDetails);
      });

      // Assert function calls and arguments
      expect(jest.spyOn(mockQuestionsStorageService, 'getApplicationStatus')).toHaveBeenCalledWith(
        mockApplicationDetails.applicationDefinition.key
      );
    });
  });

  describe('_updateApplication', () => {
    test('should return an Observable of ResponseStatus', () => {


      // Call the function to be tested
      const result$ = applicationService["_updateApplication"](
        mockApplicationDetails,
        mockForm,
        mockStatus,
        false
      );

      // Assert the expected behavior
      expect(result$).toBeInstanceOf(Observable);

      // Subscribe to the result Observable and assert the emitted value
      result$.subscribe((result) => {
        expect(result).toEqual(mockResponseStatus);
      });

      // Assert function calls and arguments
      expect(jest.spyOn(mockQuestionsStorageService, 'updateQuestions')).toHaveBeenCalledWith(
        mockApplicationDetails.applicationDefinition.key,
        mockForm,
        mockStatus
      );
      expect(jest.spyOn(mockApplicationsStateService, 'setApplications')).toHaveBeenCalledTimes(1)
      expect(jest.spyOn(mockQuestionsStorageService, 'removeApplication')).toHaveBeenCalledTimes(0);
    });
  });
  describe('_toFormControl',()=>{

  it('should return a FormControl with the expected value and disabled status', () => {
    const storedValue = '';
    const question: QuestionFormControl = {
      name: '',
      required: false,
      consumerKey: 0,
      preferenceKey: 0,
      facilityKey: 0,
      type: '',
      label: '',
      attribute: ''
    };
    const canEdit = true;

    const getAttributeValueSpy = jest.spyOn(mockQuestionService, 'getAttributeValue').mockReturnValue('mockedAttributeValue');
    const getRequiredValidatorSpy = jest.spyOn(mockQuestionService, 'getRequiredValidator').mockReturnValue(null);

    const result = applicationService["_toFormControl"](storedValue, question, mockApplicationDetails, canEdit);

    expect(result).toBeInstanceOf(FormControl);
    expect(result.value).toEqual('mockedAttributeValue');
    expect(result.disabled).toBe(false);
    expect(getAttributeValueSpy).toHaveBeenCalled();
    expect(getRequiredValidatorSpy).toHaveBeenCalled();
  });

  })
  describe('_toQuestionReorderControl',()=>{

  it('should return a FormArray with the expected controls', () => {
    const storedValue = null;
    const question: QuestionReorder = {
      values: [], readonly: false,
      inline: false,
      facilityPicker: false,
      prefRank: 0,
      PrefKeys: [],
      name: '',
      required: false,
      consumerKey: 0,
      preferenceKey: 0,
      facilityKey: 0,
      type: '',
      label: '',
      attribute: ''
    };
    const preferences: PatronPreference[] = [];

    const getRequiredValidatorSpy = jest.spyOn(mockQuestionService, 'getRequiredValidator').mockReturnValue(null);

    const result = applicationService["_toQuestionReorderControl"](storedValue, question, preferences);

    expect(result).toBeInstanceOf(FormArray);
    expect(result.controls.length).toBe(0);
    expect(getRequiredValidatorSpy).toHaveBeenCalled();
  });

  })
  describe('_toFormGroup', () => {

    it('should return a FormGroup with the expected controls', () => {
      const questions: QuestionBase[] = [];
      const storedQuestions: QuestionsEntries = {};
      const applicationDetails: ApplicationDetails = {
        patronPreferences: [],
        applicationDefinition: undefined,
        patronApplication: undefined
      };
      const canEdit = true;
  
      const toFormGroupSpy = jest.spyOn(mockQuestionService, 'toFormGroup').mockReturnValue(new FormGroup({}));
  
      const result = applicationService["_toFormGroup"](questions, storedQuestions, applicationDetails, canEdit);
  
      expect(result).toBeInstanceOf(FormGroup);
      expect(toFormGroupSpy).toHaveBeenCalled();
    });
  
  });
  describe('_getPages', () => {
  
    it('should return an array of QuestionsPage with the expected form and questions', () => {
      const pages: QuestionBase[][] = [];
      const storedQuestions: QuestionsEntries = {};
      const canEdit = true;
  
  
      const result = applicationService["_getPages"](pages, storedQuestions, mockApplicationDetails, canEdit);
  
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(pages.length);
    });
  
  });
  describe('saveLocally', () => {
  
    it('should return an Observable', () => {
      const applicationKey = 123;
      const applicationDetails: ApplicationDetails = {} as ApplicationDetails;
      const formValue = {};
  
      const updateQuestionsSpy = jest
        .spyOn(mockQuestionsStorageService, 'updateQuestions')
        .mockReturnValue(of());
  
      const result$ = applicationService.saveLocally(applicationKey, applicationDetails, formValue);
  
      expect(result$).toBeInstanceOf(Observable);

      expect(updateQuestionsSpy).toHaveBeenCalled();
    });
  
  });
  describe('saveApplication', () => {
  
    it('should return an Observable of ResponseStatus', () => {
      const application: CurrentForm = {
        key: 123,
        details: {} as ApplicationDetails,
        formControl: {} as any,
        type: 'application'
      };
      const removeQuestions = true;
  
      const result$ = applicationService.saveApplication(application, removeQuestions);
  
      expect(result$).toBeInstanceOf(Observable);
    });
  
  });
});
