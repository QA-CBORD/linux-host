import { PatronAddress } from '../addresses/address.model';
import { PatronAttribute } from '../applications/applications.model';
import { ChargeSchedule } from '../charge-schedules/charge-schedules.model';
import { FacilityAttribute } from '../facility-attributes/facility-attributes.model';
import { ContractDetails, ContractInfo, ContractListDetails, ContractRequest } from './contracts.model';

describe('Contracts model', () => {
  it('should instantiate a contract list', () => {
    const contractList = new ContractListDetails({
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
    });
    expect(contractList).toBeTruthy();
  });

  it('should instantiate a empty contract list', () => {
    const contractList = new ContractListDetails(null);
    expect(contractList).toEqual({
      applicationAvailableEndDateTime: 'undefined',
      applicationAvailableStartDateTime: 'undefined',
      applicationDescription: 'undefined',
      applicationFormJson: undefined,
      applicationTitle: 'undefined',
      applicationTypeId: NaN,
      cancellationDateTime: 'undefined',
      contractElementId: NaN,
      expirationDateTime: 'undefined',
      expireWhenAssigned: NaN,
      id: NaN,
      numberOfDaysToExpire: NaN,
      state: 'undefined',
      termId: NaN,
    });
  });

  it('should instantiate a contract detail', () => {
    const contractList = new ContractDetails({
      contractInfo: null,
      formJson: '',
      chargeSchedules: [],
      patronAttributes: [],
      facilityAttributes: [],
      formKey: 127,
    });
    expect(contractList).toBeTruthy();
  });

  it('should instantiate contract details', () => {
    const contractDetails = new ContractDetails(null);
    expect(contractDetails).toBeTruthy();
  });

  it('should instantiate a contract request', () => {
    const contractDetails = new ContractRequest(null);
    expect(contractDetails).toBeTruthy();
  });

  it('should instantiate a contract info', () => {
    const contractList = new ContractInfo(<any>{
        dateTimeSigned: ""
    });
    expect(contractList).toBeTruthy();
  });

  it('should instantiate a contract details', () => {
    const contractList = new ContractDetails({
      contractInfo: null,
      formJson: '',
      chargeSchedules: [new ChargeSchedule(null)],
      patronAttributes: [new PatronAttribute(null)],
      facilityAttributes: [new FacilityAttribute(null)],
      patronAddresses: [new PatronAddress(null)],
      formKey: 127,
    });
    expect(contractList).toBeTruthy();
  });
});
