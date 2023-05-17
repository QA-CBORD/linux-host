import { StatusCodes } from 'http-status-codes';
import { PatronAddress } from '../addresses/address.model';
import {
  ApplicationDefinition,
  ApplicationDefinitionOptions,
  ApplicationDetails,
  ApplicationRequest,
  ApplicationRequestOptions,
  ApplicationStatus,
  PatronApplication,
  PatronApplicationOptions,
  PatronAttribute,
  PatronAttributeOptions,
  PatronPreference,
  PatronPreferenceOptions,
  RequestedRoommate,
  RequestedRoommateRequest,
  RoommatePreferences,
  RoommatePreferencesOptions,
  RoommateRequesting,
  RoommateRequestingOptions,
} from './applications.model';

describe('ApplicationDefinition', () => {
  it('should create an instance with all properties set', () => {
    const options = {
      key: 1,
      termKey: 2,
      applicationTitle: 'Title',
      applicationFormJson: '{ "form": "json" }',
      accountCodeKey: 3,
      amount: 4,
      canEdit: true,
    };

    const definition = new ApplicationDefinition(options);

    expect(definition.key).toEqual(options.key);
    expect(definition.termKey).toEqual(options.termKey);
    expect(definition.applicationTitle).toEqual(options.applicationTitle);
    expect(definition.applicationFormJson).toEqual(options.applicationFormJson);
    expect(definition.accountCodeKey).toEqual(options.accountCodeKey);
    expect(definition.amount).toEqual(options.amount);
    expect(definition.canEdit).toEqual(options.canEdit);
  });

  it('should set applicationFormJson to undefined when it is not defined in options', () => {
    const options = {
      key: 1,
      termKey: 2,
      applicationTitle: 'Title',
      accountCodeKey: 3,
      amount: 4,
      canEdit: true,
    };

    const definition = new ApplicationDefinition(options);

    expect(definition.applicationFormJson).toBeUndefined();
  });

  it('should set boolean properties to false when they are not defined in options', () => {
    const options = {
      key: 1,
      termKey: 2,
      applicationTitle: 'Title',
      accountCodeKey: 3,
      amount: 4,
    };

    const definition = new ApplicationDefinition(options);

    expect(definition.canEdit).toEqual(false);
  });
});

describe('PatronApplication', () => {
  let options: PatronApplicationOptions;

  beforeEach(() => {
    options = {
      applicationDefinitionKey: 1,
      status: ApplicationStatus.New,
      key: 2,
      patronKey: 3,
      createdDateTime: '2022-05-01',
      submittedDateTime: '2022-05-02',
      acceptedDateTime: '2022-05-03',
      cancelledDateTime: '2022-05-04',
      modifiedDate: '2022-05-05',
      isApplicationSubmitted: true,
      isApplicationAccepted: true,
      isApplicationCanceled: true,
    };
  });

  it('should create an instance with all properties set', () => {
    const patronApplication = new PatronApplication(options);

    expect(patronApplication.applicationDefinitionKey).toEqual(options.applicationDefinitionKey);
    expect(patronApplication.status).toEqual(options.status);
    expect(patronApplication.key).toEqual(options.key);
    expect(patronApplication.patronKey).toEqual(options.patronKey);
    expect(patronApplication.createdDateTime).toEqual(options.createdDateTime);
    expect(patronApplication.submittedDateTime).toEqual(options.submittedDateTime);
    expect(patronApplication.acceptedDateTime).toEqual(options.acceptedDateTime);
    expect(patronApplication.cancelledDateTime).toEqual(options.cancelledDateTime);
    expect(patronApplication.modifiedDate).toEqual(options.modifiedDate);
    expect(patronApplication.isApplicationSubmitted).toEqual(options.isApplicationSubmitted);
    expect(patronApplication.isApplicationAccepted).toEqual(options.isApplicationAccepted);
    expect(patronApplication.isApplicationCanceled).toEqual(options.isApplicationCanceled);
  });
  it('should set the applicationDefinitionKey property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.applicationDefinitionKey).toEqual(options.applicationDefinitionKey);
  });

  it('should set the status property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.status).toEqual(options.status);
  });

  it('should set the key property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.key).toEqual(options.key);
  });

  it('should set the patronKey property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.patronKey).toEqual(options.patronKey);
  });

  it('should set the createdDateTime property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.createdDateTime).toEqual(options.createdDateTime);
  });

  it('should set the submittedDateTime property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.submittedDateTime).toEqual(options.submittedDateTime);
  });

  it('should set the acceptedDateTime property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.acceptedDateTime).toEqual(options.acceptedDateTime);
  });

  it('should set the cancelledDateTime property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.cancelledDateTime).toEqual(options.cancelledDateTime);
  });

  it('should set the modifiedDate property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.modifiedDate).toEqual(options.modifiedDate);
  });

  it('should set the isApplicationSubmitted property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.isApplicationSubmitted).toEqual(options.isApplicationSubmitted);
  });

  it('should set the isApplicationAccepted property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.isApplicationAccepted).toEqual(options.isApplicationAccepted);
  });

  it('should set the isApplicationCanceled property correctly', () => {
    const patronApplication = new PatronApplication(options);
    expect(patronApplication.isApplicationCanceled).toEqual(options.isApplicationCanceled);
  });
});

describe('PatronAttribute', () => {
  describe('constructor', () => {
    it('should set all properties correctly when options is not provided', () => {
      const attribute = new PatronAttribute({} as PatronAttributeOptions);
      expect(attribute.key).toBeUndefined();
      expect(attribute.patronKey).toBeUndefined();
      expect(attribute.value).toBeNull();
    });

    it('should set all properties correctly when options is provided', () => {
      const options:PatronAttributeOptions = {
        key: 1,
        patronKey: 2,
        value: 'attribute value',
        attributeConsumerKey: 0
      };
      const attribute = new PatronAttribute(options);
      expect(attribute.key).toEqual(options.key);
      expect(attribute.patronKey).toEqual(options.patronKey);
      expect(attribute.value).toEqual(options.value);
      expect(attribute.attributeConsumerKey).toEqual(options.attributeConsumerKey);
    });
  });
});
describe('PatronPreference', () => {
  describe('constructor', () => {
    it('should set all properties correctly when options is provided', () => {
      const options = {
        rank: 1,
        facilityKey: 2,
        key: 3,
        preferenceKey: 4,
      };
      const preference = new PatronPreference(options);
      expect(preference.rank).toEqual(options.rank);
      expect(preference.facilityKey).toEqual(options.facilityKey);
      expect(preference.key).toEqual(options.key);
      expect(preference.preferenceKey).toEqual(options.preferenceKey);
    });
  });
});

describe("ApplicationRequest", () => {
  describe("constructor", () => {
    test("should initialize patronPreferences property when options.patronPreferences is defined", () => {
      const options: ApplicationRequestOptions = {
        patronApplication: {
          applicationDefinitionKey: 0,
          status: 1
        },
        patronPreferences: [
          {
            rank: 1,
            facilityKey: 123,
          },
          {
            rank: 2,
            facilityKey: 456,
          },
        ],
      };

      const applicationRequest = new ApplicationRequest(options);

      expect(applicationRequest.patronPreferences).toHaveLength(2);
      expect(applicationRequest.patronPreferences![0]).toBeInstanceOf(PatronPreference);
      expect(applicationRequest.patronPreferences![0].rank).toBe(1);
      expect(applicationRequest.patronPreferences![0].facilityKey).toBe(123);
      expect(applicationRequest.patronPreferences![1]).toBeInstanceOf(PatronPreference);
      expect(applicationRequest.patronPreferences![1].rank).toBe(2);
      expect(applicationRequest.patronPreferences![1].facilityKey).toBe(456);
    });
  });
});

describe('ApplicationDetails', () => {
  const applicationDefinition: ApplicationDefinition = {
    key: 0,
    termKey: 0,
    applicationTitle: ''
  };

  const patronApplication: PatronApplication = {
    applicationDefinitionKey: 0,
    status: ApplicationStatus.New
  };

  const patronAttributes: PatronAttribute[] = [
    // set up the properties for PatronAttribute
  ];

  const patronPreferences: PatronPreference[] = [
    // set up the properties for PatronPreference
  ];

  const patronAddresses: PatronAddress[] = [
    // set up the properties for PatronAddress
  ];

  const roommatePreferences: RoommatePreferences[] = [
    // set up the properties for RoommatePreferences
  ];

  const requestingRoommates: RoommateRequesting[] = [
    // set up the properties for RoommateRequesting
  ];

  const options = {
    applicationDefinition,
    patronApplication,
    patronAttributes,
    patronPreferences,
    patronAddresses,
    roommatePreferences,
    requestingRoommates,
  };

  describe('constructor', () => {
    it('should create an instance of ApplicationDetails with all properties initialized', () => {
      const appDetails = new ApplicationDetails(options);

      expect(appDetails.applicationDefinition).toEqual(new ApplicationDefinition(applicationDefinition));
      expect(appDetails.patronApplication).toEqual(new PatronApplication(patronApplication));
      expect(appDetails.patronAttributes).toEqual(patronAttributes.map((attribute) => new PatronAttribute(attribute)));
      expect(appDetails.patronPreferences).toEqual(patronPreferences.map((preference) => new PatronPreference(preference)));
      expect(appDetails.patronAddresses).toEqual(patronAddresses.map((address) => new PatronAddress(address)));
      expect(appDetails.roommatePreferences).toEqual(roommatePreferences.map((roommatePreference) => new RoommatePreferences(roommatePreference)));
      expect(appDetails.requestingRoommates).toEqual(requestingRoommates.map((requestingRoommate) => new RoommateRequesting(requestingRoommate)));
    });
  });

});
describe('RequestedRoommate', () => {
  const options = {
    firstName: 'John',
    lastName: 'Doe',
    preferenceKey: 1,
    patronRoommateKey: 2,
    confirmed: true,
    middleName: 'Wick',
    birthDate: new Date('2000-01-01'),
    preferredName: 'Johnny',
  };

  describe('constructor', () => {
    it('should create an instance of RequestedRoommate with all properties initialized', () => {
      const requestedRoommate = new RequestedRoommate(options);

      expect(requestedRoommate.firstName).toEqual(options.firstName);
      expect(requestedRoommate.lastName).toEqual(options.lastName);
      expect(requestedRoommate.preferenceKey).toEqual(options.preferenceKey);
      expect(requestedRoommate.patronRoommateKey).toEqual(options.patronRoommateKey);
      expect(requestedRoommate.confirmed).toEqual(options.confirmed);
      expect(requestedRoommate.middleName).toEqual(options.middleName);
      expect(requestedRoommate.birthDate).toEqual(options.birthDate);
      expect(requestedRoommate.preferredName).toEqual(options.preferredName);
    });

    it('should create an instance of RequestedRoommate with default values if no options are passed', () => {
      const requestedRoommate = new RequestedRoommate(null);

      expect(requestedRoommate.preferenceKey).toBeNaN();
      expect(requestedRoommate.patronRoommateKey).toBeNaN();
      expect(requestedRoommate.birthDate).toBeUndefined();
    });
  });
});

describe('RequestedRoommate', () => {
  describe('constructor', () => {
    const options = {
      firstName: 'John',
      lastName: 'Doe',
      preferenceKey: 1,
      patronRoommateKey: 2,
      confirmed: true,
      middleName: 'Wick',
      birthDate: new Date('2000-01-01'),
      preferredName: 'Johnny',
    };

    it('should create an instance of RequestedRoommate with all properties initialized', () => {
      const requestedRoommate = new RequestedRoommate(options);

      expect(requestedRoommate.firstName).toEqual(options.firstName);
      expect(requestedRoommate.lastName).toEqual(options.lastName);
      expect(requestedRoommate.preferenceKey).toEqual(options.preferenceKey);
      expect(requestedRoommate.patronRoommateKey).toEqual(options.patronRoommateKey);
      expect(requestedRoommate.confirmed).toEqual(options.confirmed);
      expect(requestedRoommate.middleName).toEqual(options.middleName);
      expect(requestedRoommate.birthDate).toEqual(options.birthDate);
      expect(requestedRoommate.preferredName).toEqual(options.preferredName);
    });

    it('should create an instance of RequestedRoommate with default values if no options are passed', () => {
      const requestedRoommate = new RequestedRoommate(null);

      expect(requestedRoommate.preferenceKey).toBeNaN();
      expect(requestedRoommate.patronRoommateKey).toBeNaN();
      expect(requestedRoommate.birthDate).toBeUndefined();
    });
  });
});

describe('RequestedRoommateRequest', () => {
  describe('constructor', () => {
    const requestedRoommate1 = {
      firstName: 'John',
      lastName: 'Doe',
      preferenceKey: 1,
      patronRoommateKey: 2,
      confirmed: true,
      middleName: 'Wick',
      birthDate: new Date('2000-01-01'),
      preferredName: 'Johnny',
    };

    const requestedRoommate2 = {
      firstName: 'Jane',
      lastName: 'Smith',
      preferenceKey: 3,
      patronRoommateKey: 4,
      confirmed: false,
      middleName: 'Doe',
      birthDate: new Date('1990-05-10'),
      preferredName: 'Janie',
    };

    const options = {
      patronRequests: [requestedRoommate1, requestedRoommate2],
      termKey: 5,
    };

    it('should create an instance of RequestedRoommateRequest with all properties initialized', () => {
      const requestedRoommateRequest = new RequestedRoommateRequest(options);

      expect(requestedRoommateRequest.patronRequests).toHaveLength(2);
      expect(requestedRoommateRequest.patronRequests[0]).toEqual(new RequestedRoommate(requestedRoommate1));
      expect(requestedRoommateRequest.patronRequests[1]).toEqual(new RequestedRoommate(requestedRoommate2));
      expect(requestedRoommateRequest.termKey).toEqual(options.termKey);
    });
  });
})


describe('RoommatePreferences', () => {
  describe('constructor', () => {
    it('should set properties when options are provided', () => {
      const options:RoommatePreferencesOptions = {
        rank: 1,
        patronKeyRoommate: 123,
        firstName: 'John',
        lastName: 'Doe',
        preferenceKey: 456,
        middleName: 'Middle',
        preferredName: 'Preferred',
      };
      const roommatePreferences = new RoommatePreferences(options);

      expect(roommatePreferences.rank).toBe(options.rank);
      expect(roommatePreferences.patronKeyRoommate).toBe(options.patronKeyRoommate);
      expect(roommatePreferences.firstName).toBe(options.firstName);
      expect(roommatePreferences.lastName).toBe(options.lastName);
      expect(roommatePreferences.preferenceKey).toBe(options.preferenceKey);
      expect(roommatePreferences.middleName).toBe(options.middleName);
      expect(roommatePreferences.preferredName).toBe(options.preferredName);
    });

    it('should set default values when options are not provided', () => {
      const roommatePreferences = new RoommatePreferences(null);
      expect(roommatePreferences.firstName).toBe(undefined);
      expect(roommatePreferences.lastName).toBe(undefined);
      expect(roommatePreferences.preferenceKey).toBe(undefined);
      expect(roommatePreferences.middleName).toBe(undefined);
      expect(roommatePreferences.birthDate).toBe(undefined);
      expect(roommatePreferences.preferredName).toBe(undefined);
    });

  });
});

describe('RoommateRequesting', () => {
  describe('constructor', () => {
    it('should set properties when options are provided', () => {
      const options:RoommateRequestingOptions = {
        preferenceKey: 1,
        patronKey: 123,
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'Middle',
      };
      const roommateRequesting = new RoommateRequesting(options);

      expect(roommateRequesting.preferenceKey).toBe(options.preferenceKey);
      expect(roommateRequesting.patronKeyRoommate).toBe(options.patronKey);
      expect(roommateRequesting.firstName).toBe(options.firstName);
      expect(roommateRequesting.lastName).toBe(options.lastName);
      expect(roommateRequesting.middleName).toBe(options.middleName);
      expect(roommateRequesting.preferredName).toBe(undefined);
    });

    it('should set default values when options are not provided', () => {
      const roommateRequesting = new RoommateRequesting(null);

      expect(roommateRequesting.preferenceKey).toBe(undefined);
      expect(roommateRequesting.firstName).toBe(undefined);
      expect(roommateRequesting.lastName).toBe(undefined);
      expect(roommateRequesting.rank).toBe(0);
      expect(roommateRequesting.middleName).toBe(undefined);
      expect(roommateRequesting.birthDate).toBe(undefined);
      expect(roommateRequesting.preferredName).toBe(undefined);
    });


    it('should set firstName, lastName, and middleName to strings', () => {
      const options:RoommateRequestingOptions = {
        lastName: null,
        middleName: undefined,
      };
      const roommateRequesting = new RoommateRequesting(options);

      expect(roommateRequesting.lastName).toBe(undefined);
      expect(roommateRequesting.middleName).toBe(undefined);
    });
  });
});
