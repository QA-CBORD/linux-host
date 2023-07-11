import { TestBed } from '@angular/core/testing';
import { ContractsStateService } from './contracts-state.service';

describe('ContractsStateService', () => {
  let service: ContractsStateService;
  const contract = {
    entities: {
      '2595': {
        id: 55,
        contractElementId: 2595,
        state: 'Preliminary',
        applicationDescription: '',
        applicationFormJson:
          '[{"type":"text","required":false,"label":"ID Number","name":"text-1682954729733","subtype":"text","readonly":true,"attribute":"ID Number","consumerKey":2330,"dataType":"String","source":"PATRON_CORE"},{"type":"date","required":false,"label":"Expected Start Date","name":"date-1682954731165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Expected End Date","name":"date-1682954731869","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual Start Date","name":"date-1682954733622","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual End Date","name":"date-1682954734165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Contract State","name":"text-1682954736421","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"CONTRACT_STATE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Asset Type","name":"text-1682954750630","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ASSET_TYPE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Date Signed","name":"date-1682954751725","readonly":true,"attribute":null,"consumerKey":null,"contractId":"DATE_SIGNED","dataType":"Date","source":"CONTRACT_DETAILS"}]',
        applicationTitle: 'MXD 23.2 Meal Contract 23Summ',
        applicationTypeId: 64,
        applicationAvailableEndDateTime: '2023-08-01T12:00:00',
        applicationAvailableStartDateTime: '2023-04-30T12:00:00',
        cancellationDateTime: 'null',
        expirationDateTime: 'null',
        expireWhenAssigned: 0,
        numberOfDaysToExpire: 0,
        termId: 151,
        acceptedDate: '2023-05-22T15:25:26.148',
      },
    },
    contractDetails: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ContractsStateService] });
    service = TestBed.inject(ContractsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should get default contract state', () => {
    expect(service.contractsState).toEqual({ entities: {}, contractDetails: null });
  });

  it('should set contract', () => {
    const spy = jest.spyOn(service as any, '_getEntities');
    service.contractsState = contract;
    expect(service.contractsState).toEqual(contract);
    expect(spy).toBeTruthy();
  });

  it('should set contracts', () => {
    const spy = jest.spyOn(service as any, '_toContractEntities');
    const contracts = [
      {
        id: 55,
        contractElementId: 2595,
        state: 'Preliminary',
        applicationDescription: '',
        applicationFormJson:
          '[{"type":"text","required":false,"label":"ID Number","name":"text-1682954729733","subtype":"text","readonly":true,"attribute":"ID Number","consumerKey":2330,"dataType":"String","source":"PATRON_CORE"},{"type":"date","required":false,"label":"Expected Start Date","name":"date-1682954731165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Expected End Date","name":"date-1682954731869","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual Start Date","name":"date-1682954733622","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual End Date","name":"date-1682954734165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Contract State","name":"text-1682954736421","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"CONTRACT_STATE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Asset Type","name":"text-1682954750630","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ASSET_TYPE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Date Signed","name":"date-1682954751725","readonly":true,"attribute":null,"consumerKey":null,"contractId":"DATE_SIGNED","dataType":"Date","source":"CONTRACT_DETAILS"}]',
        applicationTitle: 'MXD 23.2 Meal Contract 23Summ',
        applicationTypeId: 64,
        applicationAvailableEndDateTime: '2023-08-01T12:00:00',
        applicationAvailableStartDateTime: '2023-04-30T12:00:00',
        cancellationDateTime: 'null',
        expirationDateTime: 'null',
        expireWhenAssigned: 0,
        numberOfDaysToExpire: 0,
        termId: 151,
        acceptedDate: '2023-05-22T15:25:26.148',
      },
    ];

    service.setContracts(contracts);
    expect(spy).toBeTruthy();
    expect(service.contractsState).toEqual(contract);
  });

  it('should set contract details', () => {
    const contracts = {
      contractInfo: null,
      formJson: '',
      chargeSchedules: [],
      patronAttributes: [],
      facilityAttributes: [],
      formKey: 127,
    };

    service.setContractDetails(contracts);
    expect(service.contractsState.contractDetails).toEqual(contracts);
  });

  it('should return contracts', () => {
    const spy = jest.spyOn(service as any, '_toContractsArray');
    service['_getContracts'];
    expect(spy).toBeTruthy();
  });

  it('should return contract details', () => {
    contract.contractDetails;
    const details = service['_getContractDetails'](contract);
    expect(details).toBeNull();
  });

  it('should return convert entities to structure', () => {
    const details = service['_toContractsArray'](contract.entities);
    expect(Array.isArray(details)).toBeTruthy();
  });

  it('should set contractKey entities', () => {
    const contractDetails = {
      id: 55,
      contractElementId: 2595,
      state: 'Preliminary',
      applicationDescription: '',
      applicationFormJson:
        '[{"type":"text","required":false,"label":"ID Number","name":"text-1682954729733","subtype":"text","readonly":true,"attribute":"ID Number","consumerKey":2330,"dataType":"String","source":"PATRON_CORE"},{"type":"date","required":false,"label":"Expected Start Date","name":"date-1682954731165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Expected End Date","name":"date-1682954731869","readonly":true,"attribute":null,"consumerKey":null,"contractId":"EXPECTED_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual Start Date","name":"date-1682954733622","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_START","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Actual End Date","name":"date-1682954734165","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ACTUAL_END","dataType":"DateTime","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Contract State","name":"text-1682954736421","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"CONTRACT_STATE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"text","required":false,"label":"Asset Type","name":"text-1682954750630","subtype":"text","readonly":true,"attribute":null,"consumerKey":null,"contractId":"ASSET_TYPE","dataType":"String","source":"CONTRACT_DETAILS"},{"type":"date","required":false,"label":"Date Signed","name":"date-1682954751725","readonly":true,"attribute":null,"consumerKey":null,"contractId":"DATE_SIGNED","dataType":"Date","source":"CONTRACT_DETAILS"}]',
      applicationTitle: 'MXD 23.2 Meal Contract 23Summ',
      applicationTypeId: 64,
      applicationAvailableEndDateTime: '2023-08-01T12:00:00',
      applicationAvailableStartDateTime: '2023-04-30T12:00:00',
      cancellationDateTime: 'null',
      expirationDateTime: 'null',
      expireWhenAssigned: 0,
      numberOfDaysToExpire: 0,
      termId: 151,
      acceptedDate: '2023-05-22T15:25:26.148',
    };
    const contractKey = 12345;
    service.setContract(contractKey, contractDetails);
    expect(service.contractsState.entities[contractKey]);
  });
});
