import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { HousingProxyService } from '../housing-proxy.service';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { QuestionsEntries, QuestionsStorageService } from '@sections/housing/questions/questions-storage.service';
import { ContractsStateService } from '@sections/housing/contracts/contracts-state.service';
import { ChargeSchedulesService } from '@sections/housing/charge-schedules/charge-schedules.service';
import { ContractsService } from './contracts.service';
import {
  QuestionBase,
  QuestionChargeScheduleBase
} from '../questions/types';
import { QuestionsPage } from '../questions/questions.model';
import { first, of } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ChargeScheduleValue } from '../charge-schedules/charge-schedules.model';

describe('ContractsService', () => {
  let service: ContractsService;

  const contracts = {
    contractInfo: null,
    formJson:
      '[{"type":"text","required":false,"label":"ID Number","name":"text-1682954729733","subtype":"text","readonly":true,"attribute":"ID Number","consumerKey":2330,"dataType":"String","source":"PATRON_CORE"},{"type":"date","required":false,"label":"Expected Start Date","name":"date-1682954731165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Expected End Date","name":"date-1682954731869","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual Start Date","name":"date-1682954733622","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual End Date","name":"date-1682954734165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Contract State","name":"text-1682954736421","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"CONTRACT_STATE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Asset Type","name":"text-1682954750630","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ASSET_TYPE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Date Signed","name":"date-1682954751725","readonly":true,"attribute":null,"consumerKey":null,"contractId":"DATE_SIGNED","dataType":"Date","source":"CONTRACT_DETAILS"}]',
    chargeSchedules: [],
    patronAttributes: [],
    facilityAttributes: [],
    formKey: 127,
  };

  const storeApplication = {
    questions: null,
    status: null,
    createdDateTime: '',
  };

  const housingProxyServiceMock = {
    put: jest.fn(),
  };

  const questionsStorageServiceMock = {
    getApplication: jest.fn(),
  };

  const contractsStateServiceMock = {
    contractDetails$: of(contracts),
  };

  const chargeSchedulesServiceMock = {
    getChargeSchedules: jest.fn(),
  };

  const questionsServiceMock = {
    getQuestions: jest.fn().mockReturnValue(['Question a', 'Question b']),
    mapToAddressTypeGroup: mappedQuestion => ({}),
    splitByPages: jest.fn().mockReturnValue([]),
    toFormGroupControl: jest.fn().mockReturnValue(
      new FormGroup({
        test: new FormControl(),
      })
    ),
    toQuestionCheckboxControl: jest.fn().mockReturnValue(new FormArray([])),
    getAttributeValue: (question, facilityAttributes) => ({}),
    getAddressValue: (patronAddresses, question) => ({}),
  };

  beforeEach(() => {
    const environmentFacadeServiceMock = {
      getEnvironmentObject: jest.fn().mockReturnValue({ housing_aws_url: '' }),
    };

    TestBed.configureTestingModule({
      providers: [
        ContractsService,
        {
          provide: EnvironmentFacadeService,
          useValue: environmentFacadeServiceMock,
        },
        { provide: HousingProxyService, useValue: housingProxyServiceMock },
        { provide: QuestionsService, useValue: questionsServiceMock },
        {
          provide: QuestionsStorageService,
          useValue: questionsStorageServiceMock,
        },
        {
          provide: ContractsStateService,
          useValue: contractsStateServiceMock,
        },
        {
          provide: ChargeSchedulesService,
          useValue: chargeSchedulesServiceMock,
        },
      ],
    });
    service = TestBed.inject(ContractsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should submit contract', () => {
    const spy = jest.spyOn(housingProxyServiceMock, 'put');
    service.submitContract(15, 30);
    expect(spy).toHaveBeenCalled();
  });

  it('should sign the contract', () => {
    const spy = jest.spyOn(service['_isSigned'], 'next');
    service.sign(true);
    expect(spy).toBeCalled();
  });

  it('should get the application', fakeAsync(() => {
    const spy_1 = jest.spyOn(service as any, '_getPages');
    const spy_2 = jest.spyOn(service as any, '_getQuestionsPages');
    jest.spyOn(questionsStorageServiceMock, 'getApplication').mockReturnValue(of(storeApplication));
    service.getQuestions(5)
      .pipe(first())
      .subscribe({
        next: () => {
          expect(spy_1).toHaveBeenCalled();
          expect(spy_2).toHaveBeenCalled();
        }
      });
    tick();
    expect(questionsStorageServiceMock.getApplication).toHaveBeenCalled();
  }));

  it('should get pages', () => {
    const pages: QuestionBase[][] = [
      [
        { label: 'question1', type: 'TEXT', attribute: '' },
        { label: 'question2', type: 'SELECT', attribute: '' },
      ],
    ];
    const expectedResult: QuestionsPage[] = [
      {
        form: {} as FormGroup,
        questions: pages[0],
      },
    ];

    const storedQuestions: QuestionsEntries = {};
    service['_getPages'](pages, storedQuestions, contracts);
    expect(expectedResult).toEqual(expectedResult);
  });

  it('should get charges schedule', () => {
    const pages: QuestionBase = { label: 'question1', type: 'TEXT', attribute: '' };
    const spy = jest.spyOn(chargeSchedulesServiceMock, 'getChargeSchedules');
    service['_toChargeSchedulesGroup'](pages, contracts);
    expect(spy).not.toBeCalled();
  });

  it('should get charges schedule', () => {
    const options = {
      required: true,
      inline: false,
      name: 'test',
      other: true,
      values: [new ChargeScheduleValue({ label: 'test', value: 'test', type: '' })],
      consumerKey: 1,
      chargeSchedule: true,
    };

    const question = new QuestionChargeScheduleBase(options);
    const spy = jest.spyOn(chargeSchedulesServiceMock, 'getChargeSchedules');
    service['_toChargeSchedulesGroup'](question, contracts);
    expect(spy).toBeCalled();
  });

  it('should get the question pages', () => {
    const spy = jest.spyOn(questionsServiceMock, 'getQuestions');
    service['_getQuestionsPages'](contracts);
    expect(spy).toBeCalled();
  });
});
