import { TestBed } from '@angular/core/testing';
import { ApplicationsState, ApplicationsStateService } from "./applications-state.service";
import { ApplicationDetails, RequestedRoommate, RoommatePreferences, RoommateRequesting, RoommateSearchOptions } from './applications.model';
import { Observable } from 'rxjs';

describe("ApplicationsStateService", () => {
  let applicationsService: ApplicationsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    applicationsService = TestBed.inject(ApplicationsStateService);
  });

  it('should add requested roommate and update requestedRoommates', () => {
    const requestedRoommate: RequestedRoommate = {
      preferenceKey: 0,
      patronRoommateKey: 0,
      middleName: '',
      preferredName: ''
    };

    applicationsService.setRequestedRoommate(requestedRoommate);

    expect(applicationsService.getRequestedRoommate()).toContainEqual(requestedRoommate);
  });

  it('should empty requestedRoommate', () => {
    applicationsService.emptyRequestedRoommate();

    expect(applicationsService.getRequestedRoommate()).toEqual([]);
  });

  it('should get requestedRoommate', () => {
    const requestedRoommate: RequestedRoommate = {
      preferenceKey: 0,
      patronRoommateKey: 0,
      middleName: '',
      preferredName: ''
    };
    applicationsService.setRequestedRoommate(requestedRoommate);

    const result = applicationsService.getRequestedRoommate();

    expect(result).toContainEqual(requestedRoommate);
  });

  it('should set applicationsState', () => {
    const newState: ApplicationsState = {
      entities: {},
      applicationDetails: {
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    }
    applicationsService.applicationsState = newState;

    expect(applicationsService.applicationsState).toEqual(newState);
  })
  it('should return roommateSearchOptions as an Observable', () => {
    const result = applicationsService.roommateSearchOptions;

    expect(result instanceof Observable).toBeTruthy();
  });

  it('should return requestedRoommates as an Observable', () => {
    const result = applicationsService.requestedRoommates;

    expect(result instanceof Observable).toBeTruthy();
  });

  it('should get RoommateSearchOptions', () => {
    const options = { /* create a sample RoommateSearchOptions object */ };
    applicationsService.setRoommateSearchOptions(options);

    const result = applicationsService.getRoommateSearchOptions();

    expect(result).toEqual(options);
  });

  it('should get roommatePreferencesSelecteds', () => {
    const preferences: RoommatePreferences = {
      preferenceKey: 0,
      patronKeyRoommate: 0,
      firstName: '',
      lastName: '',
      rank: 0
    };
    applicationsService.applicationsState = {
      entities: {},
      applicationDetails: {
        roommatePreferences: [preferences],
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    };

    const result = applicationsService.roommatePreferencesSelecteds;

    expect(result).toEqual([preferences]);
  });

  it('should delete roommatePreferencesSelecteds', () => {
    const preferences: RoommatePreferences = {
      preferenceKey: 0,
      patronKeyRoommate: 0,
      firstName: '',
      lastName: '',
      rank: 0
    };
    applicationsService.applicationsState = {
      entities: {},
      applicationDetails: {
        roommatePreferences: [preferences],
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    };

    applicationsService.deleteRoommatePreferencesSelecteds();

    expect(applicationsService.applicationsState.applicationDetails.roommatePreferences).toEqual([]);
  });

  it('should get requestingRoommate', () => {
    const requestingRoommates: RoommateRequesting[] = [{
      preferenceKey: 0,
      patronKeyRoommate: 0,
      firstName: '',
      lastName: '',
      rank: 0
    }];
    applicationsService.applicationsState = {
      entities: {},
      applicationDetails: {
        requestingRoommates,
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    };

    const result = applicationsService.requestingRoommate;

    expect(result).toEqual(requestingRoommates);
  });

  it('should delete local requested roommate', () => {
    const requestedRoommate: RequestedRoommate[] = [{
      preferenceKey: 1,
      patronRoommateKey: 1,
      middleName: '',
      preferredName: ''
    },
    {
      preferenceKey: 1,
      patronRoommateKey: 2,
      middleName: '',
      preferredName: ''
    },
    {
      preferenceKey: 2,
      patronRoommateKey: 1,
      middleName: '',
      preferredName: ''
    },
    ]
    applicationsService["requestedroommate"] = requestedRoommate;

    applicationsService.deleteLocalRequestedRoommate(1, 2);

    expect(applicationsService["requestedroommate"]).toEqual([
      {
        preferenceKey: 1,
        patronRoommateKey: 2,
        middleName: '',
        preferredName: ''
      },
      {
        preferenceKey: 2,
        patronRoommateKey: 1,
        middleName: '',
        preferredName: ''
      },
    ]);
  });
  it('should delete override requestingRoommate', () => {
    const roommatePreferences: RoommatePreferences[] = [{
      preferenceKey: 1,
      patronKeyRoommate: 1,
      firstName: '',
      lastName: '',
      rank: 0
    },
    {
      preferenceKey: 1,
      patronKeyRoommate: 2,
      firstName: '',
      lastName: '',
      rank: 0
    },
    {
      preferenceKey: 2,
      patronKeyRoommate: 1,
      firstName: '',
      lastName: '',
      rank: 0
    },
    ];
    applicationsService.applicationsState = {
      entities: {},
      applicationDetails: {
        roommatePreferences,
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    };

    applicationsService.deleteOverrideRequestingRoommate(1, 2);

    expect(applicationsService.applicationsState.applicationDetails.roommatePreferences).toEqual([
      {
        preferenceKey: 1,
        patronKeyRoommate: 2,
        firstName: '',
        lastName: '',
        rank: 0
      }, {
        preferenceKey: 2,
        patronKeyRoommate: 1,
        firstName: '',
        lastName: '',
        rank: 0
      },
    ]);
  });

  it('should set applications', () => {
    const applications: ApplicationDetails[] = [{
      applicationDefinition: {
        key: 1,
        termKey: 2,
        applicationTitle: 'title',
        applicationFormJson: 'applicationFormJson',
      },
      patronApplication: {
        applicationDefinitionKey: 1,
        status: 1,
      }
    }];
    applicationsService.setApplications(applications);

    const expectedEntities = applicationsService["_toApplicationEntities"](applications);
    expect(applicationsService.applicationsState.entities).toEqual(expectedEntities);
  });

  it('should set application', () => {
    const applicationKey = 1;
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
      }
    };

    applicationsService.setApplication(applicationKey, applicationDetails);

    const expectedEntities = { [applicationKey]: applicationDetails };
    expect(applicationsService.applicationsState.entities).toEqual(expectedEntities);
    expect(applicationsService.applicationsState.applicationDetails).toEqual(applicationDetails);
  });

  it('should set applicationDetails', () => {
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
      }
    };
    applicationsService.setApplicationDetails(applicationDetails);

    expect(applicationsService.applicationsState.applicationDetails).toEqual(applicationDetails);
  });

  it('should set roommateSearchOptions', () => {
    const options: RoommateSearchOptions = {
      prefRank: 2,
      searchValue: 'j'
    };

    applicationsService.setRoommateSearchOptions(options);

    expect(applicationsService["roommateSearchOptions$"].getValue()).toEqual(options);
  });

  it('should set requestedRoommates', () => {
    const roommates: RequestedRoommate[] = [{
      firstName: 'Jon',
      lastName: 'doe',
      preferenceKey: 2,
      patronRoommateKey: 2,
      confirmed: true,
      middleName: '',
      preferredName: ''
    }];

    applicationsService.setRequestedRoommates(roommates);

    expect(applicationsService["requestedRoommates$"].getValue()).toEqual(roommates);
  });

  it('should set roommatesPreferences', () => {
    const roommates: RoommatePreferences[] = [{
      preferenceKey: 1,
      patronKeyRoommate: 1,
      firstName: 'Jon',
      lastName: 'Doe',
      rank: 2
    }];

    applicationsService.setRoommatesPreferences(roommates);

    expect(applicationsService["roommatePreferences"]).toEqual(roommates);
  });

  it('should add roommate preferences without override', () => {
    const addedRoommate: RoommatePreferences =
    {
      preferenceKey: 2,
      patronKeyRoommate: 1,
      firstName: '',
      lastName: '',
      rank: 0
    };
    const roommatePreferences = [
      {
        preferenceKey: 1,
        patronKeyRoommate: 1,
        firstName: '',
        lastName: '',
        rank: 0
      },
      {
        preferenceKey: 1,
        patronKeyRoommate: 2,
        firstName: '',
        lastName: '',
        rank: 0
      },
      { ...addedRoommate },
    ];
    applicationsService.applicationsState = {
      entities: {},
      applicationDetails: {
        roommatePreferences,
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    };
    jest.spyOn(applicationsService, 'setRequestedRoommate').mockImplementation();

    applicationsService.addRoommatesPreferences(addedRoommate);

    expect(applicationsService.applicationsState.applicationDetails.roommatePreferences).toEqual([
      {
        preferenceKey: 1,
        patronKeyRoommate: 1,
        firstName: '',
        lastName: '',
        rank: 0
      },
      {
        preferenceKey: 1,
        patronKeyRoommate: 2,
        firstName: '',
        lastName: '',
        rank: 0
      },
      { preferenceKey: addedRoommate.preferenceKey, patronKeyRoommate: addedRoommate.patronKeyRoommate, firstName: addedRoommate.firstName, lastName: addedRoommate.lastName, rank: 0 }
    ]);
    expect(applicationsService.setRequestedRoommate).toHaveBeenCalled();
  });

  it('should add roommate preferences with override', () => {
    const addedRoommate: RoommatePreferences =
    {
      preferenceKey: 2,
      patronKeyRoommate: 1,
      firstName: '',
      lastName: '',
      rank: 0
    };
    const roommatePreferences = [
      {
        preferenceKey: 1,
        patronKeyRoommate: 1,
        firstName: '',
        lastName: '',
        rank: 0
      },
      {
        preferenceKey: 1,
        patronKeyRoommate: 2,
        firstName: '',
        lastName: '',
        rank: 0
      },
      { ...addedRoommate },
    ];
    applicationsService.applicationsState = {
      entities: {},
      applicationDetails: {
        roommatePreferences,
        applicationDefinition: {
          key: 1,
          termKey: 2,
          applicationTitle: 'title',
          applicationFormJson: 'applicationFormJson',
        },
        patronApplication: {
          applicationDefinitionKey: 1,
          status: 1,
        }
      }
    };
    jest.spyOn(applicationsService, 'setRequestedRoommate').mockImplementation();

    applicationsService.addRoommatesPreferences(addedRoommate, true);

    expect(applicationsService.applicationsState.applicationDetails.roommatePreferences).toEqual([
      { preferenceKey: 1, patronKeyRoommate: addedRoommate.patronKeyRoommate, firstName: addedRoommate.firstName, lastName: addedRoommate.lastName, rank: 0 },
      {
        preferenceKey: 1,
        patronKeyRoommate: 2,
        firstName: '',
        lastName: '',
        rank: 0
      },
      {
        preferenceKey: 2,
        patronKeyRoommate: 1,
        firstName: '',
        lastName: '',
        rank: 0
      }
    ]);
    expect(applicationsService.setRequestedRoommate).toHaveBeenCalled();
  });


  it('should set maximum selected roommates', () => {
    const maxRoommates = 5;

    applicationsService.setMaximumSelectedRoommates(maxRoommates);

    expect(applicationsService["maximunSelectedRoommates"]).toEqual(maxRoommates);
  });

  it('should subtract selected roommates', () => {
    applicationsService["maximunSelectedRoommates"] = 5;

    applicationsService.setSubtractSelectedRoommates();

    expect(applicationsService["maximunSelectedRoommates"]).toEqual(4);
  });

  it('should not subtract selected roommates if maximum is 0', () => {
    applicationsService["maximunSelectedRoommates"] = 0;

    applicationsService.setSubtractSelectedRoommates();

    expect(applicationsService["maximunSelectedRoommates"]).toEqual(0);
  });
});

