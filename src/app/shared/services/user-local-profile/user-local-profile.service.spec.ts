import { TestBed } from '@angular/core/testing';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { UserLocalProfileService } from './user-local-profile.service';
import { of } from 'rxjs';
import { UserInfo } from '@core/model/user';
import { getUserFullName } from '@core/utils/general-helpers';

describe('UserLocalProfileService', () => {
  let service: UserLocalProfileService;
  let storageStateService: StorageStateService;
  let userFacadeService: UserFacadeService;
  const userFullName = 'John Doe';
  const updatedUserFullName = 'John Doe';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserLocalProfileService,
        {
          provide: StorageStateService,
          useValue: {
            getStateEntityByKey$: jest
              .fn()
              .mockReturnValue(of({ value: { userFullName: 'Fulano de tal', pronouns: '' } })),
            updateStateEntity: jest.fn(),
          },
        },
        {
          provide: UserFacadeService,
          useValue: {
            getUserData$: jest.fn().mockReturnValue({ pipe: () => of(userFullName) }),
            getUser$: jest.fn().mockReturnValue(of(updatedUserFullName)),
          },
        },
      ],
    });
    service = TestBed.inject(UserLocalProfileService);
    storageStateService = TestBed.inject(StorageStateService);
    userFacadeService = TestBed.inject(UserFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize user local profile', () => {
    expect(service.userLocalProfileSignal().userFullName).toBe(userFullName);
  });

  it('should update pronouns', () => {
    const pronouns = 'he/him';
    service.updatePronouns(pronouns);
    expect(service.userLocalProfileSignal().pronouns).toBe(pronouns);
  });
  it('should retrieve user, update profile, and call updateStorage', () => {
    const userInfo = { firstName: 'Test', lastName: 'User' };
    const userFullName = getUserFullName(userInfo as UserInfo);

    jest.spyOn(userFacadeService, 'getUser$').mockReturnValue(of(userInfo as UserInfo));
    jest.spyOn(service['_userLocalProfileSignal'], 'update');
    jest.spyOn(service as any, 'updateStorage');

    service.updateUserName().subscribe();

    expect(service['_userLocalProfileSignal'].update).toHaveBeenCalledWith(expect.any(Function));
    expect(service['updateStorage']).toHaveBeenCalled();
  });
});
