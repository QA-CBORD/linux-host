import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { HousingProxyService } from '../housing-proxy.service';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { QuestionsStorageService } from '@sections/housing/questions/questions-storage.service';
import { ContractsStateService } from '@sections/housing/contracts/contracts-state.service';
import { ChargeSchedulesService } from '@sections/housing/charge-schedules/charge-schedules.service';
import { ContractsService } from './contracts.service';

describe('ContractsService', () => {
  let service: ContractsService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const housingProxyServiceStub = () => ({
      put: (_patronContractsUrl, body) => ({})
    });
    const questionsServiceStub = () => ({
      getQuestions: formJson => ({ map: () => ({}) }),
      mapToAddressTypeGroup: mappedQuestion => ({}),
      splitByPages: arg => ({}),
      toFormGroup: (questions, storedQuestions, function0) => ({}),
      toQuestionCheckboxControl: (storedValue, question) => ({}),
      getAttributeValue: (question, facilityAttributes) => ({}),
      getAddressValue: (patronAddresses, question) => ({})
    });
    const questionsStorageServiceStub = () => ({
      getApplication: key => ({ pipe: () => ({}) })
    });
    const contractsStateServiceStub = () => ({ contractDetails$: {} });
    const chargeSchedulesServiceStub = () => ({
      getChargeSchedules: (chargeSchedules, values) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        ContractsService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        { provide: QuestionsService, useFactory: questionsServiceStub },
        {
          provide: QuestionsStorageService,
          useFactory: questionsStorageServiceStub
        },
        {
          provide: ContractsStateService,
          useFactory: contractsStateServiceStub
        },
        {
          provide: ChargeSchedulesService,
          useFactory: chargeSchedulesServiceStub
        }
      ]
    });
    service = TestBed.inject(ContractsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
