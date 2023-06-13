import { TestBed } from '@angular/core/testing';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { QuestionsStorageService } from '@sections/housing/questions/questions-storage.service';
import { QuestionsService } from '@sections/housing/questions/questions.service';
import { HousingProxyService } from '../housing-proxy.service';
import { NonAssignmentsStateService } from './non-assignments-state.service';
import { AssetTypeDetailValue } from './non-assignments.model';
import { NonAssignmentDetails } from './non-assignments.model';
import { PatronAttributesService } from '../patron-attributes/patron-attributes.service';
import { PatronAddressService } from '../addresses/address.service';
import { NonAssignmentsService } from './non-assignments.service';

describe('NonAssignmentsService', () => {
  let service: NonAssignmentsService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const questionsStorageServiceStub = () => ({
      getApplication: key => ({ pipe: () => ({}) }),
      updateQuestions: (nonAssignmentKey, form, number) => ({
        pipe: () => ({})
      })
    });
    const questionsServiceStub = () => ({
      getQuestions: formJson => ({ map: () => ({}) }),
      mapToAddressTypeGroup: mappedQuestion => ({}),
      splitByPages: arg => ({}),
      toFormGroup: (questions, storedQuestions, function0) => ({}),
      toQuestionAssetTypeDetailsGroup: (storedValue, question) => ({}),
      getAddressValue: (patronAddresses, question) => ({}),
      getAttributeValue: (question, patronAttributes) => ({}),
      getRequiredValidator: question => ({})
    });
    const housingProxyServiceStub = () => ({
      post: (_patronNonAssignmentsUrl, body) => ({})
    });
    const nonAssignmentsStateServiceStub = () => ({
      nonAssignmentDetails$: {},
      selectedAssetType$: {}
    });
    const patronAttributesServiceStub = () => ({
      getAttributes: (patronAttributes, parsedJson, questions) => ({})
    });
    const patronAddressServiceStub = () => ({
      getAddresses: (patronAddresses, parsedJson, questions) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        NonAssignmentsService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        {
          provide: QuestionsStorageService,
          useFactory: questionsStorageServiceStub
        },
        { provide: QuestionsService, useFactory: questionsServiceStub },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        {
          provide: NonAssignmentsStateService,
          useFactory: nonAssignmentsStateServiceStub
        },
        {
          provide: PatronAttributesService,
          useFactory: patronAttributesServiceStub
        },
        { provide: PatronAddressService, useFactory: patronAddressServiceStub }
      ]
    });
    service = TestBed.inject(NonAssignmentsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
