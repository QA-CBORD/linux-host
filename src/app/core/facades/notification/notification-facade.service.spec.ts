import { TestBed } from '@angular/core/testing';
import { NotificationFacadeService } from './notification-facade.service';
import { NotificationService } from '@core/service/notification/notification.service';
import { AuthFacadeService } from '../auth/auth.facade.service';
import { InstitutionFacadeService } from '../institution/institution.facade.service';
import { of } from 'rxjs';

describe('NotificationFacadeService', () => {
  let service: NotificationFacadeService;
  let mockNotificationService: any;
  let mockAuthFacadeService: any;
  let mockInstitutionFacadeService: any;
  const mockInstitution = { id: 'institutionId' };

  beforeEach(() => {
    mockNotificationService = {
      resetPasswordNotification: jest.fn()
    };
    mockAuthFacadeService = {
      getAuthSessionToken$: jest.fn()
    };
    mockInstitutionFacadeService = {
      cachedInstitutionInfo$: of(mockInstitution)
    };

    TestBed.configureTestingModule({
      providers: [
        NotificationFacadeService,
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AuthFacadeService, useValue: mockAuthFacadeService },
        { provide: InstitutionFacadeService, useValue: mockInstitutionFacadeService }
      ]
    });

    service = TestBed.inject(NotificationFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset password request', async () => {
    const mockSessionId = 'sessionId';
    const mockUsername = 'testuser';
    const mockResponse = true;

    mockAuthFacadeService.getAuthSessionToken$.mockReturnValue(of(mockSessionId));
    mockNotificationService.resetPasswordNotification.mockReturnValue(of(mockResponse));

    const result = await service.resetPasswordRequest(mockUsername);

    expect(result).toEqual(mockResponse);
    expect(mockAuthFacadeService.getAuthSessionToken$).toHaveBeenCalled();
    expect(mockNotificationService.resetPasswordNotification).toHaveBeenCalledWith(
      mockInstitution.id,
      mockUsername,
      mockSessionId
    );
  });
});
