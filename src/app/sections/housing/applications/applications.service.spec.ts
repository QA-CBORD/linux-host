import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { popoverCtrl } from '../pages/form-payment/form-payment.component.spec';
import { QuestionBase } from '../questions/types';
import { ApplicationDetails } from './applications.model';
import { ApplicationsService } from './applications.service';

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
});
