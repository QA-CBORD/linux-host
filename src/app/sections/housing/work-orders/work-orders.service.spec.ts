import { TestBed } from '@angular/core/testing';
import { WorkOrdersService } from "./work-orders.service";
import { of, throwError } from 'rxjs';
import { QuestionsEntries, QuestionsStorageService } from '../questions/questions-storage.service';
import { QuestionsPage } from '../questions/questions.model';
import { QuestionBase, QuestionFormControl, QuestionFormControlOptions } from '../questions/types';
import { WorkOrderDetails } from './work-orders.model';
import { FormGroup, FormControl, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularDelegate, ModalController, PopoverController } from '@ionic/angular';
import { EnvironmentType } from '@core/model/environment';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Response } from '../housing.model';
import { HousingProxyService } from '../housing-proxy.service';
import ImageService from './image.service';
import { ToastService } from '@core/service/toast/toast.service';
const questionsStorageService = {
  getQuestions: jest.fn()
}
const workOrderStateService = {
  workOrderDetails: jest.fn(),
  workOrderImage: of(null),
  getSelectedFacility$: jest.fn().mockReturnValue(of(null)),
}
const questionsService = {
  splitByPages: jest.fn()
}
const housingProxyService = {
  post: jest.fn(),
} as any;
const imageService = {
  sendWorkOrderImage: jest.fn(),
} as any;
const toastService = {
  showToast: jest.fn(),
} as any;
const _environmentFacadeService = {
  getHousingAPIURL: jest.fn(),
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
describe("WorkOrdersService", () => {
  let service: WorkOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: QuestionsStorageService, useValue: questionsStorageService },
        { provide: EnvironmentFacadeService, useValue: _environmentFacadeService },
        { provide: HousingProxyService, useValue: housingProxyService },
        { provide: ImageService, useValue: imageService },
        { provide: ToastService, useValue: toastService },
        ModalController,
        AngularDelegate,
        PopoverController
      ],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WorkOrdersService);
  });

  // ...

  describe('getQuestions', () => {
    it('should return an Observable of QuestionsPage[]', () => {
      // Create mock data for the test
      const key = 123;
      const storedQuestions: QuestionsEntries = {}; // Provide appropriate mock values
      const workOrderDetails: WorkOrderDetails = {
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      }; // Provide appropriate mock values
      const pages: QuestionBase[][] = [[
        { label: 'question1', type: 'TEXT', attribute: '' },
        { label: 'question2', type: 'SELECT', attribute: '' },
      ]];
      const expectedResult: QuestionsPage[] = [{
        form: {} as FormGroup, // Provide appropriate mock value
        questions: pages[0],
      }];

      jest.spyOn(questionsStorageService, 'getQuestions').mockReturnValue(of(storedQuestions));
      jest.spyOn(workOrderStateService, 'workOrderDetails').mockReturnValue(of(workOrderDetails));
      jest.spyOn(WorkOrdersService.prototype as any, 'getQuestionsPages').mockReturnValue(pages);
      jest.spyOn(WorkOrdersService.prototype as any, 'getPages').mockReturnValue(expectedResult);

      service.getQuestions(key).subscribe((result) => {
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getPages', () => {
    it('should return an array of QuestionsPage', () => {
      // Create mock data for the test
      const pages: QuestionBase[][] = [[
        { label: 'question1', type: 'TEXT', attribute: '' },
        { label: 'question2', type: 'SELECT', attribute: '' },
      ]];
      const storedQuestions: QuestionsEntries = {}; // Provide appropriate mock values
      const workOrderDetails: WorkOrderDetails = {
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      }; // Provide appropriate mock values
      const expectedResult: QuestionsPage[] = [{
        form: {} as FormGroup, // Provide appropriate mock value
        questions: pages[0],
      }];

      jest.spyOn(WorkOrdersService.prototype as any, 'toFormGroup').mockReturnValue({}); // Provide appropriate mock value

      const result = service["getPages"](pages, storedQuestions, workOrderDetails);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getQuestionsPages', () => {
    it('should return an array of QuestionBase[]', () => {
      // Create mock data for the test
      const workOrderDetails: WorkOrderDetails = {
        formDefinition: {
          id: 1,
          applicationDescription: '',
          applicationTitle: '',
          applicationTypeId: 4,
          applicationAvailableEndDateTime: '',
          applicationAvailableStartDateTime: '',
          cancellationDateTime: '',
          expirationDateTime: '',
          expireWhenAssigned: 0,
          numberOfDaysToExpire: 0,
          termId: 12,
          applicationFormJson: '[{"name": "question1","type": "TEXT", "label": "Question 1", "attribute": null, "workOrderFieldKey" : "QUESTION_1", "required": true ,"source":"WORK_ORDER"}]',
        },
        workOrderKey: 0,
        workOrderDetails: undefined,
        workOrderTypes: [],
        facilityTree: []
      };
      const questions: QuestionBase[][] = [[{
        type: 'TEXT',
        label: 'Question 1',
        attribute: null,
        required: true,
      }]];

      jest.spyOn(WorkOrdersService.prototype as any, 'toWorkOrderListCustomType').mockReturnValue(questions[0]);
      jest.spyOn(questionsService, 'splitByPages').mockReturnValue(questions);

      const result = service['getQuestionsPages'](workOrderDetails);
      expect(result).toEqual([[{
        attribute: "",
        label: "question1",
        type: 'TEXT'
      },
      {
        attribute: "",
        label: "question2",
        type: "SELECT"
      }]]);
    });
  });

  describe('toFormGroup', () => {
    it('should return a FormGroup', () => {
      // Create mock data for the test
      const questions: QuestionBase[] = [
        { label: 'question1', type: 'TEXT', attribute: '' },
        { label: 'question2', type: 'SELECT', attribute: '' },
      ];
      const storedQuestions: QuestionsEntries = {}; // Provide appropriate mock values
      const workOrderDetails: WorkOrderDetails = {
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      }; // Provide appropriate mock values

      service['toFormGroup'](questions, storedQuestions, workOrderDetails);
      expect(jest.spyOn(WorkOrdersService.prototype as any, 'toFormGroup')).toHaveBeenCalledTimes(1);
    });
  });

  describe('toWorkOrderListCustomType', () => {
    it('should return the custom type for TYPE', () => {
      // Create mock data for the test
      const question: QuestionFormControlOptions = {
        label: 'Question',
        name: 'question',
        required: true,
        source: 'WORK_ORDER',
        workOrderFieldKey: 'TYPE',
      };
      const workOrderDetails: WorkOrderDetails = {
        workOrderTypes: [
          { name: 'Type 1', key: 1 },
          { name: 'Type 2', key: 2 },
        ],
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        facilityTree: []
      };

      const result = service['toWorkOrderListCustomType'](question, workOrderDetails);
      expect(result).toEqual([{ attribute: null, label: "Question 1", required: true, type: "TEXT" }]);
    });

    it('should return the facility tree question for LOCATION', () => {
      // Create mock data for the test
      const question: QuestionFormControlOptions = {
        label: 'Question',
        name: 'question',
        required: true,
        source: 'WORK_ORDER',
        workOrderFieldKey: 'LOCATION',
      };
      const workOrderDetails: WorkOrderDetails = {
        workOrderTypes: [
          { name: 'Type 1', key: 1 },
          { name: 'Type 2', key: 2 },
        ],
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        facilityTree: []
      };

      jest.spyOn(WorkOrdersService.prototype as any, 'createFacilityTreeQuestion').mockReturnValue([{ name: 'facilityQuestion', type: 'FACILITY' }]);

      const result = service['toWorkOrderListCustomType'](question, workOrderDetails);
      expect(result).toEqual([{ attribute: null, label: 'Question 1', required: true, type: 'TEXT' }]);
    });

    it('should return the question itself for other cases', () => {
      // Create mock data for the test
      const workOrderDetails: WorkOrderDetails = {
        workOrderTypes: [
          { name: 'Type 1', key: 1 },
          { name: 'Type 2', key: 2 },
        ],
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        facilityTree: []
      };

      const question: QuestionFormControlOptions[] = [{ "attribute": null, "label": "Question 1", "required": true, "type": "TEXT" }]

      const result = service['toWorkOrderListCustomType'](question[0], workOrderDetails);
      expect(result).toEqual(question);
    });
  });

  describe('toFormControl', () => {
    it('should return a FormControl', () => {
      // Create mock data for the test
      const storedValue = 'stored value';
      const question: QuestionFormControl = {
        name: 'question',
        type: 'TEXT',
        label: 'Question',
        attribute: null,
        workOrderFieldKey: 'DESCRIPTION',
        required: true,
        source: 'WORK_ORDER',
        consumerKey: 0,
        preferenceKey: 0,
        facilityKey: 0
      };
      const workOrderDetails: WorkOrderDetails = {
        workOrderDetails: {
          notificationPhone: '123456789',
          description: 'Description',
          notificationEmail: 'test@example.com',
          facilityKey: 2,
          notify: true,
          typeKey: 3,
          key: 5
        },
        workOrderKey: 0,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      };

      const result = service['toFormControl'](storedValue, question, workOrderDetails);
      expect(result instanceof FormControl).toBeTruthy();
    });

    it('should set the value and disable the FormControl for matching workOrderFieldKey', () => {
      // Create mock data for the test
      const storedValue = 'stored value';
      const question: QuestionFormControl = {
        name: 'question',
        type: 'TEXT',
        label: 'Question',
        attribute: null,
        workOrderFieldKey: 'DESCRIPTION',
        required: true,
        source: 'WORK_ORDER',
        consumerKey: 0,
        preferenceKey: 0,
        facilityKey: 0
      };
      const workOrderDetails: WorkOrderDetails = {
        workOrderDetails: {
          notificationPhone: '123456789',
          description: 'Description',
          notificationEmail: 'test@example.com',
          facilityKey: 1,
          notify: true,
          typeKey: 1,
          key: 3
        },
        workOrderKey: 0,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      };

      const result = service['toFormControl'](storedValue, question, workOrderDetails);
      expect(result.value).toBe(workOrderDetails.workOrderDetails.description);
      expect(result.disabled).toBeTruthy();
    });

    it('should set the default value', () => {
      // Create mock data for the test
      const storedValue = 'stored value';
      const question: QuestionFormControl = {
        name: 'question',
        type: 'TEXT',
        label: 'Question',
        attribute: null,
        workOrderFieldKey: 'OTHER',
        required: true,
        source: 'WORK_ORDER',
        consumerKey: 0,
        preferenceKey: 0,
        facilityKey: 1
      };
      const workOrderDetails: WorkOrderDetails = {
        workOrderDetails: {
          notificationPhone: '123456789',
          description: 'Description',
          notificationEmail: 'test@example.com',
          facilityKey: 1,
          notify: true,
          typeKey: 3,
          key: 4
        },
        workOrderKey: 0,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      };

      const result = service['toFormControl'](storedValue, question, workOrderDetails);
      expect(result.value).toBe(storedValue);
      expect(result.disabled).toBeTruthy();
    });
  });

  describe('next', () => {
    it('should return an Observable of true', (done) => {
      service.next().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });
  });

});
